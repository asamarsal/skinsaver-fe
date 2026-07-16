'use client';

import React from 'react';
import Link from 'next/link';
import { Diamond } from 'lucide-react';

export default function PremiumAnalysisCTA() {
  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-4 xl:px-5 xl:py-4 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-indigo-100/60 blur-xl pointer-events-none" />

      {/* Top link */}
      <div className="flex justify-end items-center h-6 mb-1.5 relative z-10">
        <Link href="/premium" className="text-[10px] font-bold text-pink-500 hover:text-pink-600 transition-colors">
          Unlock Advanced Insights
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center mb-1.5">
          <Diamond size={16} className="text-indigo-500" />
        </div>
        <h3 className="text-sm font-black text-gray-900 mb-0.5 leading-tight">View Premium Analysis</h3>
        <p className="text-[11px] text-gray-500 leading-relaxed mb-2 min-h-[32px]">
          Deep AI insights, product matches &amp; custom routine builder
        </p>
      </div>

      {/* CTA Button + price badge */}
      <div className="relative z-10 mt-auto">
        <Link
          href="/premium"
          className="flex items-center justify-center gap-2 w-full h-9 rounded-full bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-bold transition-colors mb-2"
        >
          View Premium Report →
        </Link>
        <div className="flex items-center justify-center h-6">
          <span className="text-[9px] font-bold text-gray-500 bg-gray-50 px-3 py-1 rounded-full border border-gray-200">
            💎 Unlock for 5 USDT
          </span>
        </div>
      </div>
    </div>
  );
}
