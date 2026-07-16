'use client';

import React from 'react';

export default function DashboardFooter() {
  return (
    <footer className="w-full flex flex-col-reverse md:flex-row items-center justify-between mt-8 mb-12 gap-4">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center font-bold text-xs shadow-sm">
          SS
        </div>
        <div className="flex items-center gap-2 text-[10px] md:text-xs text-gray-500">
          <span className="text-pink-300">✦</span>
          Your data is encrypted and never shared.
        </div>
      </div>
      
      {/* Center */}
      <div className="text-[10px] md:text-xs font-semibold text-gray-500 text-center md:text-left">
        Privacy First <span className="mx-2 text-gray-300">·</span> 
        Transparent AI <span className="mx-2 text-gray-300">·</span> 
        You Own Your Data
      </div>
      
      {/* Right */}
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-900 rounded-[4px] flex items-center justify-center shrink-0">
          <span className="text-white text-[7px] font-bold leading-none">OKX</span>
        </div>
        <span className="text-[10px] md:text-xs font-bold text-gray-600">Built on <span className="text-gray-900">X Layer</span></span>
        <span className="text-pink-300 text-xs ml-1">✦</span>
      </div>
    </footer>
  );
}
