'use client';

import React from 'react';
import { CheckCircle, ExternalLink } from 'lucide-react';
import Link from 'next/link';

const trustBadges = [
  'Private & Secure Analysis',
  'On-Chain Verifiable',
  'AI Agents Working for Your Skin',
];

const ingredients = [
  { emoji: '🌿', name: 'Niacinamide', desc: 'Brightening & Even Tone', match: 92, bg: 'bg-green-50', border: 'border-green-100' },
  { emoji: '💧', name: 'Hyaluronic Acid', desc: 'Hydration Booster', match: 95, bg: 'bg-blue-50', border: 'border-blue-100' },
  { emoji: '🛡️', name: 'Panthenol', desc: 'Soothing & Barrier Care', match: 89, bg: 'bg-purple-50', border: 'border-purple-100' },
];

export default function ScanAspPanel() {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* OKX.AI ASP Integration Card */}
      <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 flex flex-col relative overflow-hidden hover:shadow-md transition-shadow">
        {/* Decorative abstract shape */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-pink-100/60 blur-xl pointer-events-none" />
        <div className="absolute -bottom-2 right-4 w-12 h-12 rounded-full bg-rose-200/50 blur-md pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-black text-gray-700 uppercase tracking-wider">OKX.AI ASP Integration</h2>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-emerald-600">Connected</span>
          </div>
        </div>

        <p className="text-[11px] text-gray-500 mb-1 font-medium">Skin Intelligence Engine</p>
        <p className="text-[10px] text-gray-400 mb-3">Powered by OKX.AI ASP</p>

        {/* Trust badges */}
        <div className="space-y-1.5 relative z-10">
          {trustBadges.map((badge) => (
            <div key={badge} className="flex items-center gap-2">
              <CheckCircle size={11} className="text-emerald-500 shrink-0" />
              <span className="text-[11px] font-medium text-gray-700">{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Ingredient Spotlight */}
      <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 flex flex-col flex-1 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-[11px] font-black text-gray-700 uppercase tracking-wider">Ingredient Spotlight</h2>
          <span className="text-[10px] text-gray-400">Based on your skin</span>
        </div>

        <div className="space-y-2.5 flex-1">
          {ingredients.map((ing) => (
            <div key={ing.name} className={`flex items-center gap-2.5 rounded-xl p-2.5 border ${ing.bg} ${ing.border}`}>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sm shrink-0 shadow-sm">
                {ing.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-gray-900 leading-tight">{ing.name}</p>
                <p className="text-[9px] text-gray-500 leading-tight">{ing.desc}</p>
              </div>
              <span className="text-[10px] font-black text-emerald-600 shrink-0">{ing.match}% Match</span>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-50">
          <Link
            href="/analysis"
            className="flex items-center gap-1 text-[11px] font-bold text-pink-500 hover:text-pink-600 transition-colors group"
          >
            View All Ingredients
            <ExternalLink size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
