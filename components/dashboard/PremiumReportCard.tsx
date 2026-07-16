'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Lock } from 'lucide-react';
import { useWallet } from '@/components/wallet/WalletProvider';
import { useRouter } from 'next/navigation';

export default function PremiumReportCard() {
  const { address } = useWallet();
  const router = useRouter();

  const handleUnlock = () => {
    if (!address) {
      alert('Please connect your OKX wallet first.');
      return;
    }
    router.push('/premium');
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-50 to-transparent pointer-events-none -z-10"></div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide flex items-center gap-1.5">
          <span className="text-amber-500 text-base">⭐</span> Premium Report
        </h2>
        <span className="text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2.5 py-1 rounded-full hidden sm:inline-block">
          Unlock Deeper Insights
        </span>
      </div>

      <p className="text-xs text-gray-500 mb-6 leading-relaxed max-w-[200px] z-10">
        Get your complete AI skin analysis with root causes, product swaps, and personalized roadmap.
      </p>

      <div className="flex flex-col sm:flex-row gap-6 flex-1 z-10 relative">
        <div className="flex-1 flex flex-col justify-between">
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={10} className="text-pink-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700">Deep 5D Skin Analysis</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={10} className="text-pink-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700">Personalized Product Swaps</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={10} className="text-pink-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700">AM/PM Routine Roadmap</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-pink-100 flex items-center justify-center shrink-0 mt-0.5">
                <Check size={10} className="text-pink-500" />
              </div>
              <span className="text-xs font-semibold text-gray-700">Progress Tracking & Re-Scan</span>
            </li>
          </ul>
        </div>
        
        {/* Book Image */}
        <div className="w-32 h-40 shrink-0 relative self-center sm:self-start rotate-3 hover:rotate-0 transition-transform duration-300 hidden md:block absolute right-0 bottom-12">
           <Image 
             src="/image/dashboard/book.png" 
             alt="Premium Report" 
             fill 
             className="object-contain drop-shadow-xl" 
           />
        </div>
        <div className="w-32 h-40 shrink-0 relative self-center sm:self-start rotate-3 hover:rotate-0 transition-transform duration-300 md:hidden mx-auto mb-4">
           <Image 
             src="/image/dashboard/book.png" 
             alt="Premium Report" 
             fill 
             className="object-contain drop-shadow-xl" 
           />
        </div>
      </div>

      <button 
        onClick={handleUnlock}
        className="w-full h-11 rounded-xl bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold text-xs flex items-center justify-center gap-2 hover:from-pink-500 hover:to-rose-500 transition-all shadow-md shadow-pink-500/20 z-10"
      >
        <Lock size={14} />
        Unlock Premium Report — 5 USDT
      </button>
    </div>
  );
}
