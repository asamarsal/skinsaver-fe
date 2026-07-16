'use client';

import React from 'react';
import Link from 'next/link';

export default function WishlistAuditCard() {
  // SVG Donut Chart for Wishlist
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const total = 12;
  const buy = 5;
  const wait = 4;
  const skip = 3;

  // Calculate dash arrays for each segment
  const buyPct = (buy / total) * circumference;
  const waitPct = (wait / total) * circumference;
  const skipPct = (skip / total) * circumference;

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">2. Wishlist Audit</h2>
        <span className="text-[10px] font-bold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full">
          12 Products Analyzed
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 flex-1 mb-6">
        
        {/* Colorful Donut Chart */}
        <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Buy Segment */}
            <circle
              className="text-emerald-400"
              strokeWidth="12"
              strokeDasharray={`${buyPct} ${circumference - buyPct}`}
              strokeDashoffset={0}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            {/* Wait Segment */}
            <circle
              className="text-amber-400"
              strokeWidth="12"
              strokeDasharray={`${waitPct} ${circumference - waitPct}`}
              strokeDashoffset={-buyPct}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
            {/* Skip Segment */}
            <circle
              className="text-rose-400"
              strokeWidth="12"
              strokeDasharray={`${skipPct} ${circumference - skipPct}`}
              strokeDashoffset={-(buyPct + waitPct)}
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Empty center */}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-row sm:flex-col flex-wrap justify-center gap-3 w-full sm:w-auto">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
              <span className="text-xs font-bold text-gray-700">Buy</span>
            </div>
            <span className="text-xs font-black text-gray-900">{buy}</span>
          </div>
          
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
              <span className="text-xs font-bold text-gray-700">Wait</span>
            </div>
            <span className="text-xs font-black text-gray-900">{wait}</span>
          </div>
          
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
              <span className="text-xs font-bold text-gray-700">Skip</span>
            </div>
            <span className="text-xs font-black text-gray-900">{skip}</span>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="mb-4">
          <span className="text-[11px] font-bold text-gray-900 mb-1 block">Top Finding</span>
          <p className="text-xs text-gray-500 leading-relaxed italic">
            "2 products may cause irritation based on your sensitivity risk."
          </p>
        </div>
        
        <div className="flex justify-end">
          <Link 
            href="/wishlist"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-pink-50 hover:bg-pink-100 text-pink-500 text-xs font-bold rounded-xl transition-colors"
          >
            View Audit <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
