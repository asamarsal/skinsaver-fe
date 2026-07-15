'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Wallet, Check, CheckCircle2, Lock, Download,
  FileText, ShoppingBag, Sun, ThumbsUp, Copy,
  ChevronDown, Sparkles, ScanFace, FlaskConical, Layers, Leaf
} from 'lucide-react';
import { useWallet } from '@/components/wallet/WalletProvider';

const UNLOCKED_FEATURES = [
  { icon: <FileText   size={20} className="text-orange-400"  />, label: 'Full Report'          },
  { icon: <ShoppingBag size={20} className="text-violet-500" />, label: 'Wishlist Audit'       },
  { icon: <Sun        size={20} className="text-cyan-500"    />, label: 'Routine Builder'      },
  { icon: <ThumbsUp   size={20} className="text-emerald-500" />, label: 'Cheaper Alternatives' },
];

export default function OkxPaymentCard() {
  const { address, connect, isConnecting } = useWallet();
  const router = useRouter();
  const [paid, setPaid]       = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);

  const shortAddr = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : null;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setPaid(true); setLoading(false); }, 1800);
  };

  const handleCopy = () => {
    if (address) { navigator.clipboard.writeText(address); setCopied(true); setTimeout(() => setCopied(false), 1500); }
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-[700px]">

      {/* ── Main Payment Card ─────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_4px_24px_rgb(0,0,0,0.04)] overflow-hidden">
        {/* Card header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-900 rounded-[12px] flex items-center justify-center shadow-sm">
              <Wallet size={18} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-[16px]">Pay with OKX Wallet</span>
          </div>
          <span className="flex items-center gap-2 text-[12px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full shadow-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            Secured by OKX
          </span>
        </div>

        {/* Card body — TWO COLUMNS */}
        <div className="grid grid-cols-2 divide-x divide-gray-100">

          {/* LEFT: Wallet + Network */}
          <div className="p-6 space-y-6">
            {/* Wallet Connection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[13px] text-gray-900 font-bold">Wallet Connection</p>
                {address && (
                  <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full border border-emerald-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Connected
                  </span>
                )}
              </div>
              <div className="bg-gray-50/80 rounded-[14px] border border-gray-200 p-3">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-900 rounded-[10px] flex items-center justify-center shrink-0">
                    <span className="text-white text-[11px] font-bold">OKX</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-gray-900">OKX Wallet</p>
                  </div>
                  {address && <CheckCircle2 size={18} className="text-emerald-500 ml-auto shrink-0" />}
                </div>
                {address ? (
                  <div className="flex items-center gap-2 mt-1.5 ml-12">
                    <span className="text-[12px] text-gray-500 font-mono">{shortAddr}</span>
                    <button onClick={handleCopy} className="text-gray-400 hover:text-gray-600 transition-colors p-1">
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                ) : (
                  <p className="text-[12px] text-gray-400 ml-12">Not connected</p>
                )}
              </div>
            </div>

            {/* Network */}
            <div>
              <p className="text-[13px] text-gray-900 font-bold mb-3">Network</p>
              <div className="bg-gray-50/80 rounded-[14px] border border-gray-200 p-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-900 rounded-[10px] flex items-center justify-center shrink-0">
                    <span className="text-white text-[14px] font-bold">X</span>
                  </div>
                  <span className="text-[13px] font-bold text-gray-900">X Layer</span>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-white border border-gray-200 px-3 py-1.5 rounded-[10px] shadow-sm">
                  Active <ChevronDown size={12} />
                </span>
              </div>
            </div>

            {/* Status message */}
            {address && !paid && (
              <div className="flex items-center gap-2.5 bg-emerald-50/80 border border-emerald-100 rounded-[14px] px-4 py-3">
                <CheckCircle2 size={20} className="text-emerald-500 shrink-0" />
                <p className="text-[12px] font-bold text-emerald-800 leading-snug">You&apos;re all set to unlock premium insights.</p>
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary + Pay */}
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <p className="text-[13px] font-bold text-gray-900">Order Summary</p>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[13px] font-bold text-gray-900">Premium SkinSaver Audit</p>
                  <p className="text-[11px] text-gray-500 mt-1">Full Access · Instant Unlock</p>
                </div>
                <span className="text-[13px] font-bold text-gray-900 shrink-0 ml-2">5 USDT</span>
              </div>
              
              <div className="flex justify-between text-[12px] text-gray-500 pt-1.5">
                <span>Network</span>
                <span>X Layer</span>
              </div>
              
              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex justify-between items-start">
                  <span className="text-[13px] text-gray-600 font-bold">You Pay</span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900 tracking-tight leading-none">5 USDT</p>
                    <p className="text-[11px] text-gray-400 mt-1.5">≈ $5.00 USD</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-2 text-[11px] text-gray-500 leading-relaxed bg-gray-50/80 p-3 rounded-xl border border-gray-100 mt-3">
                <CheckCircle2 size={16} className="text-pink-400 mt-0.5 shrink-0" />
                <span>Secure payment with x402 protocol<br />Instant settlement · <span className="text-pink-500 font-bold">Instant unlock</span></span>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-5">
              {!paid ? (
                address ? (
                  <button
                    onClick={handlePay}
                    disabled={loading}
                    className="w-full h-12 rounded-[14px] bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-[14px] transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-md shadow-pink-200"
                  >
                    {loading
                      ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Processing…</>
                      : <><Lock size={16} /> Pay &amp; Unlock 5 USDT</>
                    }
                  </button>
                ) : (
                  <button
                    onClick={connect}
                    disabled={isConnecting}
                    className="w-full h-12 rounded-[14px] bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[14px] transition-colors flex items-center justify-center gap-2"
                  >
                    <Wallet size={16} /> {isConnecting ? "Connecting..." : "Connect Wallet First"}
                  </button>
                )
              ) : (
                <button
                  onClick={() => router.push('/premium')}
                  className="w-full h-12 rounded-[14px] bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-md shadow-pink-200"
                >
                  <Download size={16} /> View Full Report
                </button>
              )}
              <p className="text-[10px] text-gray-400 text-center mt-3">
                🔒 Secure, encrypted, and trustless. Powered by OKX x402.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Premium Unlocked Card (always visible after payment) ─────── */}
      {paid && (
        <div className="bg-white rounded-3xl border border-emerald-200 shadow-sm overflow-hidden animate-in fade-in slide-in-from-top-2 duration-500 mt-2">
          {/* Banner row */}
          <div className="flex items-center justify-between px-6 py-4 bg-emerald-50/50">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm shadow-emerald-200">
                  <Check size={20} className="text-white" />
                </div>
                <Sparkles size={16} className="absolute -top-1 -right-1 text-amber-400" />
              </div>
              <div>
                <p className="font-bold text-emerald-800 text-[15px]">Premium Unlocked! 🎉</p>
                <p className="text-[12px] text-emerald-600/80 font-bold mt-0.5">You now have full access to your complete SkinSaver Audit.</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/premium')}
              className="shrink-0 h-10 px-4 rounded-full border border-pink-200 bg-white text-pink-600 text-[13px] font-bold hover:bg-pink-50 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Download size={16} /> Download Full Report
            </button>
          </div>

          {/* 4 Feature badges */}
          <div className="grid grid-cols-4 border-t border-emerald-100 bg-white">
            {UNLOCKED_FEATURES.map((u, i) => (
              <div key={i} className={`flex flex-col items-center gap-2 py-4 ${i < 3 ? 'border-r border-emerald-50' : ''}`}>
                <div className="p-2.5 bg-gray-50 rounded-[14px]">{u.icon}</div>
                <p className="text-[12px] font-bold text-gray-700 text-center">{u.label}</p>
                <span className="text-[10px] text-emerald-500 font-black uppercase tracking-wider mt-0.5">Unlocked</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show preview of unlocked card even before payment */}
      {/* New Premium Locked Layouts (From Image) */}
      {!paid && address && (
        <div className="flex flex-col gap-4 mt-4">
          
          {/* Card 1: Premium Status */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] overflow-hidden relative px-8 py-10">
            <h3 className="font-bold text-gray-900 text-[16px] mb-6">Premium Status</h3>
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-4">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-6 h-6 rounded-full bg-[#1db55c] flex items-center justify-center text-white shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </div>
                  <span className="text-[#de4998] font-bold text-[15px]">Not Unlocked</span>
                </div>
                <p className="text-gray-500 text-[14px] leading-relaxed max-w-[210px]">
                  Complete payment to unlock your full premium audit.
                </p>
              </div>
              <div className="relative shrink-0 w-[80px] h-[80px] mr-2 flex items-center justify-center">
                <div className="w-full h-full bg-[#fcecf4] rounded-[20px] flex items-center justify-center relative shadow-sm border border-pink-50">
                  <Lock size={36} className="text-[#f4a1cc]" style={{ fill: '#f4a1cc' }} />
                  <Sparkles size={16} className="absolute -top-2 -right-3 text-pink-200" style={{ fill: '#fbcfe8' }} />
                  <Sparkles size={12} className="absolute bottom-2 -left-3 text-pink-200" style={{ fill: '#fbcfe8' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Your Audit At a Glance */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-[0_2px_15px_rgb(0,0,0,0.02)] overflow-hidden p-6">
            <h3 className="font-bold text-gray-900 text-[15px] mb-5">Your Audit At a Glance</h3>
            
            <div className="grid grid-cols-4 gap-2.5">
              {/* Box 1 */}
              <div className="flex flex-col items-center justify-center border border-gray-50 bg-white shadow-[0_1px_8px_rgb(0,0,0,0.03)] rounded-[14px] py-3.5 gap-2.5">
                <div className="w-9 h-9 bg-[#fcecf4] rounded-[10px] flex items-center justify-center text-[#de4998]">
                  <ScanFace size={18} />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-900 leading-tight">Skin Score</p>
                  <p className="text-[14px] font-black text-gray-400 mt-0.5">—</p>
                </div>
              </div>
              {/* Box 2 */}
              <div className="flex flex-col items-center justify-center border border-gray-50 bg-white shadow-[0_1px_8px_rgb(0,0,0,0.03)] rounded-[14px] py-3.5 gap-2.5">
                <div className="w-9 h-9 bg-[#f4effc] rounded-[10px] flex items-center justify-center text-[#8c62e5]">
                  <FlaskConical size={18} />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-900 leading-tight">Risk Factors</p>
                  <p className="text-[14px] font-black text-gray-400 mt-0.5">—</p>
                </div>
              </div>
              {/* Box 3 */}
              <div className="flex flex-col items-center justify-center border border-gray-50 bg-white shadow-[0_1px_8px_rgb(0,0,0,0.03)] rounded-[14px] py-3.5 gap-2.5">
                <div className="w-9 h-9 bg-[#fff5ee] rounded-[10px] flex items-center justify-center text-[#f77e21]">
                  <FileText size={18} />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-900 leading-tight">Products</p>
                  <p className="text-[14px] font-black text-gray-400 mt-0.5">—</p>
                </div>
              </div>
              {/* Box 4 */}
              <div className="flex flex-col items-center justify-center border border-gray-50 bg-white shadow-[0_1px_8px_rgb(0,0,0,0.03)] rounded-[14px] py-3.5 gap-2.5">
                <div className="w-9 h-9 bg-[#eef8f2] rounded-[10px] flex items-center justify-center text-[#1f9350]">
                  <Leaf size={18} />
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-gray-900 leading-tight">Ingredients</p>
                  <p className="text-[14px] font-black text-gray-400 mt-0.5">—</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
