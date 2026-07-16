'use client';

import React from 'react';
import Link from 'next/link';
import { Droplet, Flame, Sparkles, ShieldAlert, Sun } from 'lucide-react';

export default function SkinScanCard() {
  // SVG Donut Chart variables
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const score = 82;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">1. Skin Selfie Scan</h2>
        <Link href="/upload" className="text-[10px] font-bold text-pink-500 bg-pink-50 px-2.5 py-1 rounded-full hover:bg-pink-100 transition-colors">
          Latest Scan
        </Link>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-between gap-6 flex-1">
        
        {/* Score Gauge */}
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                className="text-gray-100"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
              />
              {/* Progress Circle - Gradient/Solid Color */}
              <circle
                className="text-purple-500 transition-all duration-1000 ease-out"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r={radius}
                cx="50"
                cy="50"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-gray-900 leading-none">{score}</span>
              <span className="text-[11px] font-bold text-gray-400">/100</span>
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-1.5">
            <span className="text-xs font-bold text-gray-500">Skin</span>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              Good <span className="w-3 h-3 rounded-full border border-emerald-500 flex items-center justify-center text-[8px]">✓</span>
            </span>
          </div>
        </div>

        {/* Scan Insights Table */}
        <div className="w-full flex-1">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Scan Insights</p>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplet size={14} className="text-blue-400" />
                <span className="text-xs font-semibold text-gray-600">Hydration</span>
              </div>
              <span className="text-xs font-black text-gray-900">78</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame size={14} className="text-emerald-400" />
                <span className="text-xs font-semibold text-gray-600">Oil Balance</span>
              </div>
              <span className="text-xs font-black text-gray-900">72</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-pink-400" />
                <span className="text-xs font-semibold text-gray-600">Texture</span>
              </div>
              <span className="text-xs font-black text-gray-900">85</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-rose-400" />
                <span className="text-xs font-semibold text-gray-600">Sensitivity Risk</span>
              </div>
              <span className="text-xs font-black text-gray-900">28</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun size={14} className="text-orange-400" />
                <span className="text-xs font-semibold text-gray-600">Pigmentation</span>
              </div>
              <span className="text-xs font-black text-gray-900">65</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-[10px] text-gray-400 font-medium">May 16, 2025 · Full 5-D Analysis</span>
        <Link 
          href="/analysis"
          className="w-full sm:w-auto px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-pink-500 hover:bg-gray-50 transition-colors text-center"
        >
          View Full Report
        </Link>
      </div>
    </div>
  );
}
