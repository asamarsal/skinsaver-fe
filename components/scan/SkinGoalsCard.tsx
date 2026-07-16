'use client';

import React from 'react';

const goals = [
  { emoji: '💧', title: 'Boost Hydration',   desc: 'Strengthen moisture barrier', priority: 'High Priority',   priorityColor: 'bg-red-50 text-red-500 border-red-100'    },
  { emoji: '✨', title: 'Even Skin Tone',     desc: 'Reduce dark spots',           priority: 'High Priority',   priorityColor: 'bg-red-50 text-red-500 border-red-100'    },
  { emoji: '🛡️', title: 'Calm Sensitivity',  desc: 'Reduce redness & irritation', priority: 'Medium Priority', priorityColor: 'bg-amber-50 text-amber-600 border-amber-100'},
  { emoji: '💎', title: 'Refine Texture',     desc: 'Smooth & minimize pores',     priority: 'Medium Priority', priorityColor: 'bg-amber-50 text-amber-600 border-amber-100'},
  { emoji: '⚖️', title: 'Maintain Balance',  desc: 'Keep skin healthy',           priority: 'Ongoing',         priorityColor: 'bg-emerald-50 text-emerald-600 border-emerald-100'},
];

export default function SkinGoalsCard() {
  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 xl:py-6 flex flex-col hover:shadow-md transition-shadow h-full justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">4. Recommended Skin Goals</h2>
        <span className="text-[10px] font-bold text-pink-500 bg-pink-50 px-2 py-1 rounded-full border border-pink-100">
          Personalized for you
        </span>
      </div>

      {/* Goals Row — horizontal scroll on mobile */}
      <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
        {goals.map((g) => (
          <div
            key={g.title}
            className="flex flex-col items-center text-center gap-2 bg-gray-50 border border-gray-100 rounded-2xl p-3 hover:border-pink-200 hover:bg-pink-50/30 transition-colors cursor-pointer shrink-0 w-[120px]"
          >
            <div className="text-2xl">{g.emoji}</div>
            <div>
              <p className="text-[11px] font-bold text-gray-900 leading-tight mb-0.5">{g.title}</p>
              <p className="text-[9px] text-gray-500 leading-tight">{g.desc}</p>
            </div>
            <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border mt-auto ${g.priorityColor}`}>
              {g.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
