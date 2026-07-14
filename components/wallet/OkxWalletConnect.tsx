'use client';

import React from 'react';
import { useWallet } from './WalletProvider';
import { Wallet, LogOut, CheckCircle2, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/useMobile';

export default function OkxWalletConnect() {
  const { address, isConnecting, connect, disconnect } = useWallet();

  const isMobile = useIsMobile();
  const [showDropdown, setShowDropdown] = React.useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  if (address) {
    return (
      <div className="relative">
        <button 
          onClick={() => setShowDropdown(!showDropdown)}
          className="h-9 px-3 md:px-4 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
        >
          {isMobile ? <CheckCircle2 size={16} /> : <Wallet size={16} />}
          {!isMobile && formatAddress(address)}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-xs text-gray-500">Connected as</p>
              <p className="text-sm font-medium text-gray-900 truncate">{formatAddress(address)}</p>
            </div>
            <button 
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              onClick={() => {
                setShowDropdown(false);
                alert("Scan history will be displayed here!");
              }}
            >
              <Sparkles size={14} className="text-pink-500" /> Scan History
            </button>
            <button 
              onClick={() => {
                setShowDropdown(false);
                disconnect();
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <LogOut size={14} /> Disconnect
            </button>
          </div>
        )}
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
