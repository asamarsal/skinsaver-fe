'use client';

import React from 'react';
import { useWallet } from './WalletProvider';
import { Wallet, LogOut, CheckCircle2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/useMobile';

export default function OkxWalletConnect() {
  const { address, isConnecting, connect, disconnect } = useWallet();

  const isMobile = useIsMobile();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (address) {
    return (
      <div className="flex items-center gap-1.5 md:gap-2">
        <div className="h-9 px-3 md:px-4 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700">
          {isMobile ? <CheckCircle2 size={16} /> : <Wallet size={16} />}
          {!isMobile && formatAddress(address)}
        </div>
        <button 
          onClick={disconnect}
          className="h-9 w-9 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
          title="Disconnect Wallet"
        >
          <LogOut size={16} />
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={connect}
      disabled={isConnecting}
      className="h-9 px-3 md:px-4 inline-flex items-center justify-center gap-2 rounded-full bg-gray-900 text-sm font-medium text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Wallet size={16} />
      {isConnecting 
        ? (isMobile ? "..." : "Connecting...") 
        : (isMobile ? "Connect" : "Connect Wallet")}
    </button>
  );
}
