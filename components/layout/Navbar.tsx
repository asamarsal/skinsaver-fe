'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, Wallet, Copy, Check } from 'lucide-react';
import { useWallet } from '@/components/wallet/WalletProvider';
import OkxWalletConnect from '@/components/wallet/OkxWalletConnect';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { address, network, balances, isConnecting, connect, disconnect, switchNetwork } = useWallet();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      toast.success("Address copied to clipboard!", {
        style: {
          borderRadius: '16px',
          background: '#333',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const navLinks = [
    { label: 'Selfie Scan', href: '/upload' },
    { label: 'Wishlist Audit', href: '/wishlist' },
    { label: 'Analysis', href: '/analysis' },
    { label: 'Premium Report', href: '/premium' },
  ];

  return (
    <div className={`w-full flex justify-center sticky top-0 z-50 transition-all duration-300 ease-out ${isScrolled ? 'pt-0 px-0' : 'pt-4 px-4 md:px-6 lg:px-6'}`}>
      <nav className={`w-full bg-white/90 backdrop-blur-md shadow-sm transition-all duration-300 ease-out border border-gray-100 ${isScrolled ? 'max-w-full rounded-none border-x-0 border-t-0' : 'max-w-none xl:max-w-[1536px] rounded-[20px]'}`}>
        <div className="px-6 md:px-8 h-[72px] flex items-center justify-between">
          {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-50 text-pink-500">
            <Sparkles size={20} />
          </div>
          <span className="text-[20px] font-bold tracking-tight text-gray-900">
            SkinSaver <span className="text-pink-500 font-medium">AI</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(l => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[14px] font-bold text-gray-800 hover:text-gray-900 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex relative">
          {address ? (
            <div className="relative">
              <button
                onClick={() => setIsWalletOpen(!isWalletOpen)}
                className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-bold text-gray-700 hover:bg-gray-100 transition-all shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                {address.slice(0, 6)}...{address.slice(-4)}
              </button>
              
              {isWalletOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsWalletOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-5 border-b border-gray-50 bg-gray-50/50">
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Connected Wallet</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-900 rounded-[10px] flex items-center justify-center shrink-0 shadow-sm">
                           <span className="text-white text-[11px] font-bold">OKX</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[14px] font-bold text-gray-900 leading-tight">OKX Wallet</p>
                          <button 
                            onClick={handleCopy}
                            className="flex items-center gap-1 text-[12px] font-mono text-gray-500 hover:text-pink-500 transition-colors mt-0.5"
                            title="Click to copy address"
                          >
                            <span>{address.slice(0, 6)}...{address.slice(-4)}</span>
                            {copied ? <Check size={11} className="text-emerald-500 shrink-0" /> : <Copy size={11} className="shrink-0" />}
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-5 border-b border-gray-50 space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-gray-500 font-medium">Network</p>
                        <div className="flex items-center gap-1.5">
                          <button 
                            onClick={() => switchNetwork(196)}
                            className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors ${network.includes('Mainnet') ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                          >
                            Mainnet
                          </button>
                          <button 
                            onClick={() => switchNetwork(1952)}
                            className={`px-2 py-1 text-[11px] font-bold rounded-md transition-colors ${network.includes('Testnet') ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                          >
                            Testnet
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-gray-500 font-medium">USDT Balance</p>
                        <p className="text-[14px] font-black text-gray-900">{balances?.usdt || '0.00'} <span className="text-[12px] text-gray-500 font-bold">USDT</span></p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] text-gray-500 font-medium">X Layer (OKB)</p>
                        <p className="text-[14px] font-black text-gray-900">{balances?.okb || '0.00'} <span className="text-[12px] text-gray-500 font-bold">OKB</span></p>
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button
                        onClick={() => {
                          disconnect();
                          setIsWalletOpen(false);
                        }}
                        className="w-full h-11 flex items-center justify-center gap-2 rounded-2xl text-red-500 hover:bg-red-50 text-[14px] font-bold transition-colors"
                      >
                        Disconnect Wallet
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={connect}
              disabled={isConnecting}
              className="h-10 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e97db5] to-[#db5a9f] text-[14px] font-bold text-white hover:from-pink-500 hover:to-rose-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
              <Wallet size={16} />
              {isConnecting ? "Connecting..." : "Connect OKX Wallet"}
            </button>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
      </nav>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="absolute top-[88px] left-4 right-4 bg-white border border-gray-100 rounded-3xl p-6 shadow-xl md:hidden z-50 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map(l => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-[15px] font-bold text-gray-800 hover:text-gray-900 transition-colors py-2.5 border-b border-gray-50 last:border-b-0"
              >
                {l.label}
              </Link>
            ))}
          </div>
          {/* Mobile CTA */}
          <div className="pt-2 border-t border-gray-50">
            {address ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-[13px] font-bold text-gray-700">{address.slice(0, 6)}...{address.slice(-4)}</span>
                  </div>
                  <span className="text-[12px] font-black text-gray-900">{balances?.usdt || '0.00'} USDT</span>
                </div>
                <button
                  onClick={() => {
                    disconnect();
                    setIsMenuOpen(false);
                  }}
                  className="w-full h-11 flex items-center justify-center gap-2 rounded-2xl text-red-500 bg-red-50 hover:bg-red-100 text-[14px] font-bold transition-all"
                >
                  Disconnect Wallet
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  connect();
                  setIsMenuOpen(false);
                }}
                disabled={isConnecting}
                className="w-full h-11 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e97db5] to-[#db5a9f] text-[14px] font-bold text-white hover:from-pink-500 hover:to-rose-500 transition-all disabled:opacity-50"
              >
                <Wallet size={16} />
                {isConnecting ? "Connecting..." : "Connect OKX Wallet"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
