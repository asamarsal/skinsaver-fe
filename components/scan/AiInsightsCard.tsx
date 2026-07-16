'use client';

import React from 'react';
import { CheckCircle, Sun } from 'lucide-react';

const observations = [
  'Well-hydrated skin with balanced oil levels.',
  'Mild sensitivity detected on cheeks.',
  'Some pigmentation spots on forehead.',
  'Texture is smooth with minimal pores.',
];

export default function AiInsightsCard() {
  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">3. AI Insights</h2>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-full border border-gray-100 hidden lg:block whitespace-nowrap">
          Powered by OKX.AI ASP
        </span>
      </div>

      {/* AI Summary */}
      <p className="text-[13px] text-gray-600 leading-relaxed mb-4">
        Overall, your skin shows good balance with healthy hydration and smooth texture. Focus on strengthening your barrier and evening pigmentation for a radiant glow.
      </p>

      {/* Key Observations */}
      <div className="mb-4">
        <h3 className="text-[11px] font-black text-gray-800 uppercase tracking-wide mb-2">Key Observations</h3>
        <ul className="space-y-2">
          {observations.map((obs) => (
            <li key={obs} className="flex items-start gap-2">
              <CheckCircle size={13} className="text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-[12px] text-gray-600 leading-tight">{obs}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Skin Age Estimate */}
      <div className="mt-auto pt-3 border-t border-gray-50">
        <div className="flex items-center justify-between bg-gray-50 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-amber-400" />
            <span className="text-[11px] font-bold text-gray-700">Skin Age Estimate</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-black text-teal-600 leading-none">24</span>
            <span className="text-[10px] text-gray-400 font-medium">± 2 yrs</span>
          </div>
        </div>
      </div>
    </div>
  );
}
