'use client';

import React, { useState } from 'react';
import { useWallet } from '@/components/wallet/WalletProvider';
import { Copy, Check, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

export default function WalletStatusPanel() {
  const { address, network, balances, isConnecting, connect } = useWallet();
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isConnected = !!address;

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm overflow-hidden flex flex-col mt-4 h-full min-h-[260px]">
      <div className="p-3 md:p-4 flex-1 flex flex-col border-b border-gray-100">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Wallet Connection</h3>
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
            <span className={`text-[11px] font-bold ${isConnected ? 'text-emerald-600' : 'text-gray-500'}`}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>

        {isConnected ? (
          <div className="bg-gray-50 rounded-2xl p-2.5 flex-1 flex flex-col justify-start gap-2">
            <div className="flex flex-col md:flex-row md:items-center gap-2">
              <div className="w-9 h-9 bg-gray-900 rounded-[10px] flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white text-[11px] font-bold">OKX</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-bold text-gray-900 leading-tight">OKX Wallet</p>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[12px] font-mono text-gray-500 hover:text-pink-500 transition-colors mt-0.5 bg-white px-2 py-0.5 rounded-lg border border-gray-200 w-fit"
                  title="Click to copy address"
                >
                  <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                  {copied ? <Check size={12} className="text-emerald-500 shrink-0" /> : <Copy size={12} className="shrink-0" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
              <span className="text-[11px] font-bold text-gray-500">Network</span>
              <div className="flex items-center gap-1.5 bg-white px-2 py-0.5 rounded-lg border border-gray-200">
                <div className="w-3.5 h-3.5 bg-black rounded flex items-center justify-center text-white text-[9px] leading-none shrink-0 font-bold">X</div>
                <span className="text-[11px] font-bold text-gray-900">{network.includes('Testnet') ? 'X Layer Testnet' : 'X Layer'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-2xl py-0 px-3 flex-1 flex flex-col items-center justify-center text-center gap-1 border border-dashed border-gray-300">
            <p className="text-[11px] text-gray-500 max-w-[250px] leading-tight">Connect your OKX Wallet to track your onchain data and access premium features.</p>
            <button
              onClick={connect}
              disabled={isConnecting}
              className="mt-1 h-8 px-4 rounded-xl bg-gray-900 text-[11px] font-bold text-white hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </button>
          </div>
        )}
      </div>

      <div className="p-3 md:p-4 bg-gray-50/50">
        <div
          className="flex items-center justify-between cursor-pointer md:cursor-default"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">X Layer Status</h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 bg-emerald-100/50 px-2 py-1 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] font-bold text-emerald-700">Active</span>
            </div>
            <div className="md:hidden text-gray-400">
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </div>

        <div className={`mt-2.5 grid grid-cols-2 md:grid-cols-2 gap-2 ${isExpanded ? 'block' : 'hidden md:grid'}`}>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Block Height</p>
            <p className="text-[12px] font-black text-gray-900">19,842,761</p>
          </div>
          <div>
            <p className="text-[10px] text-gray-500 font-bold uppercase mb-0.5">Gas Fee</p>
            <p className="text-[12px] font-black text-gray-900">0.00021 <span className="text-[10px] font-bold text-gray-500">OKB</span></p>
          </div>
          <div className="col-span-2">
            <a
              href="https://www.oklink.com/xlayer"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-bold text-pink-500 hover:text-pink-600 transition-colors group mt-0.5"
            >
              Explorer: View on OKLink
              <ExternalLink size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
