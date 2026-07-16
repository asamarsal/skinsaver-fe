'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export default function RunScanCTA() {
  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-4 xl:px-5 xl:py-4 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-pink-100/60 blur-xl pointer-events-none" />

      {/* Badge */}
      <div className="flex justify-end items-center h-6 mb-1.5 relative z-10">
        <span className="text-[10px] font-bold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
          🏷️ Recommended
        </span>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="w-8 h-8 bg-pink-100 rounded-xl flex items-center justify-center mb-1.5">
          <ShieldCheck size={16} className="text-pink-500" />
        </div>
        <h3 className="text-sm font-black text-gray-900 mb-0.5 leading-tight">Run Private Skin Scan</h3>
        <p className="text-[11px] text-gray-500 leading-relaxed mb-2 min-h-[32px]">
          Secure, private &amp; on-chain analysis in under 30 seconds
        </p>
      </div>

      {/* CTA Button */}
      <div className="relative z-10 mt-auto">
        <Link
          href="/upload"
          className="flex items-center justify-center gap-2 w-full h-9 rounded-full bg-pink-500 hover:bg-pink-600 text-white text-[13px] font-bold transition-colors shadow-sm"
        >
          Run Scan Now →
        </Link>
        <div className="flex items-center justify-center h-6 mt-1.5">
          <p className="text-[9px] text-gray-400 text-center">Powered by OKX.AI ASP on X Layer</p>
        </div>
      </div>
    </div>
  );
}
