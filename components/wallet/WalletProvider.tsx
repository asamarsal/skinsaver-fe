'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { api } from '@/lib/api';
import toast from 'react-hot-toast';

interface WalletContextType {
  address: string | null;
  network: string;
  balances: { usdt: string; okb: string };
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  switchNetwork: (chainId: number) => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [address, setAddress] = useState<string | null>(null);
  const [network, setNetwork] = useState<string>('Unknown Network');
  const [balances, setBalances] = useState({ usdt: '0.00', okb: '0.00' });
  const [isConnecting, setIsConnecting] = useState(false);
  const [uiInstance, setUiInstance] = useState<any>(null);

  useEffect(() => {
    // Initialize OKX Wallet UI on client side only
    async function initWallet() {
      try {
        const { OKXUniversalConnectUI } = await import('@okxconnect/ui');
        const ui = await OKXUniversalConnectUI.init({
          dappMetaData: {
            name: "SkinSaver AI",
            icon: "https://cryptologos.cc/logos/okb-okb-logo.png",
          },
          actionsConfiguration: { returnStrategy: "none" },
          uiPreferences: { theme: "SYSTEM" },
          language: "en_US",
        });
        setUiInstance(ui);
      } catch (e) {
        console.error("Failed to initialize OKX Wallet UI", e);
      }
    }
    initWallet();
  }, []);

  const connect = async () => {
    if (!uiInstance) return;
    setIsConnecting(true);
    try {
      const session = await uiInstance.openModal({
        namespaces: {
          eip155: {
            chains: ["eip155:196", "eip155:1952"], // X Layer Mainnet & Testnet
            defaultChain: "196",
          },
        },
      });
      
      const accountStr = session?.namespaces?.eip155?.accounts?.[0];
      if (accountStr) {
        // e.g. eip155:196:0xAddress -> 0xAddress
        const parts = accountStr.split(':');
        const extractedAddress = parts.length > 2 ? parts[2] : accountStr;
        
        // --- Phase 2: Backend Authentication ---
        try {
          // 1. Get Challenge Nonce
          const challengeRes = await api.post('/auth/challenge');
          const nonce = challengeRes.data.nonce;
          
          // 2. Sign the Nonce
          let signature = "0xMockSignature" + "1234567890abcdef".repeat(8); 
          
          if (typeof window !== 'undefined' && (window as any).okxwallet) {
            signature = await (window as any).okxwallet.request({
              method: 'personal_sign',
              params: [nonce, extractedAddress]
            });
          }

          // 3. Verify Signature & Get Sanctum Token
          const verifyRes = await api.post('/auth/verify', {
            address: extractedAddress,
            signature: signature,
            nonce: nonce
          });

          // 4. Save Token
          localStorage.setItem('skinsaver_token', verifyRes.data.token);
          
        } catch (authErr) {
          console.error("Backend auth failed:", authErr);
          throw new Error("Authentication failed");
        }

        setAddress(extractedAddress);

        setAddress(extractedAddress);

        // --- Phase 3: Fetch Realtime Balances & Network ---
        const provider = (window as any).okxwallet || uiInstance;
        if (provider) {
          await fetchWalletData(provider, extractedAddress);
        }
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  const fetchWalletData = async (provider: any, currentAddress: string) => {
    try {
      const chainIdHex = await provider.request({ method: 'eth_chainId' });
      const chainId = parseInt(chainIdHex, 16);
      setNetwork(chainId === 196 ? 'X Layer Mainnet' : chainId === 1952 ? 'X Layer Testnet' : `Chain ID: ${chainId}`);

      // Get OKB Native Balance
      const balHex = await provider.request({ method: 'eth_getBalance', params: [currentAddress, "latest"] });
      const okbBal = (parseInt(balHex, 16) / 1e18).toFixed(4);
      
      // Get USDT Balance
      let usdtBal = '0.00';
      if (chainId === 196 || chainId === 1952) { // Allow for testnet to try as well
        const USDT_CONTRACT = chainId === 196 
          ? '0x1E4a5963aBFD975d8c9021ce480b42188849D41d' 
          : '0x1E4a5963aBFD975d8c9021ce480b42188849D41d'; // Using same mock address for testnet if unknown
        const paddedAddress = currentAddress.toLowerCase().replace('0x', '').padStart(64, '0');
        const data = '0x70a08231' + paddedAddress;
        try {
          const usdtHex = await provider.request({ 
            method: 'eth_call', 
            params: [{ to: USDT_CONTRACT, data }, "latest"] 
          });
          if (usdtHex && usdtHex !== '0x') {
            usdtBal = (parseInt(usdtHex, 16) / 1e6).toFixed(2);
          }
        } catch (err) {
          console.log("Failed to fetch USDT, defaulting to 0.00");
        }
      }
      setBalances({ usdt: usdtBal, okb: okbBal });
    } catch (e) {
      console.error("Failed to fetch balance/network", e);
    }
  };

  const switchNetwork = async (chainId: number) => {
    const newNetworkName = chainId === 196 ? 'Mainnet' : 'Testnet';
    try {
      const provider = (window as any).okxwallet;
      if (!provider) {
        toast.error("OKX Wallet extension not found. Please use the extension.");
        return;
      }
      if (!address) {
        toast.error("Please connect your wallet first.");
        return;
      }
      const chainIdHex = `0x${chainId.toString(16)}`;
      try {
        await provider.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: chainIdHex }],
        });
      } catch (switchError: any) {
        // Error code 4902 indicates that the chain has not been added to the wallet
        if (switchError.code === 4902 || switchError.message?.includes('Unrecognized chain')) {
          try {
            const chainParams = chainId === 196 ? {
              chainId: '0xc4',
              chainName: 'X Layer Mainnet',
              rpcUrls: ['https://xlayerrpc.okx.com'],
              nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 },
              blockExplorerUrls: ['https://www.okx.com/web3/explorer/xlayer'],
            } : {
              chainId: '0x7a0',
              chainName: 'X Layer Testnet',
              rpcUrls: ['https://xlayertestrpc.okx.com'],
              nativeCurrency: { name: 'OKB', symbol: 'OKB', decimals: 18 },
              blockExplorerUrls: ['https://www.okx.com/web3/explorer/xlayer-test'],
            };
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [chainParams],
            });
          } catch (addError: any) {
            console.error("Failed to add network", addError);
            toast.error(`Failed to add X Layer ${newNetworkName} to wallet.`);
            return;
          }
        } else {
          throw switchError;
        }
      }
      // Refresh data after successful switch
      await fetchWalletData(provider, address);
      
      toast.success(`Successfully switched to X Layer ${newNetworkName}!`, {
        style: {
          borderRadius: '16px',
          background: '#333',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
    } catch (e: any) {
      console.error("Failed to switch network", e);
      toast.error(e?.message || `Failed to switch to X Layer ${newNetworkName}.`);
    }
  };

  const disconnect = async () => {
    if (!uiInstance) return;
    try {
      await api.post('/auth/logout').catch(() => {});
      await uiInstance.disconnect();
      setAddress(null);
      setNetwork('Unknown Network');
      setBalances({ usdt: '0.00', okb: '0.00' });
      localStorage.removeItem('skinsaver_token');
    } catch (error) {
      console.error("Wallet disconnection failed:", error);
    }
  };

  const contextValue = useMemo(() => ({
    address, 
    network,
    balances,
    isConnecting, 
    connect, 
    disconnect,
    switchNetwork
  }), [address, network, balances, isConnecting, uiInstance]);

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}
