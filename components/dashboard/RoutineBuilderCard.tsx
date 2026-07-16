'use client';

import React from 'react';
import Link from 'next/link';
import { Sun, Moon, ChevronRight, ShieldCheck } from 'lucide-react';

export default function RoutineBuilderCard() {
  const amSteps = [
    { id: 1, image: "/image/dashboard/routine/1.png" },
    { id: 2, image: "/image/dashboard/routine/2.png" },
    { id: 3, image: "/image/dashboard/routine/3.png" },
  ];

  const pmSteps = [
    { id: 1, image: "/image/dashboard/routine/4.png" },
    { id: 2, image: "/image/dashboard/routine/5.png" },
    { id: 3, image: "/image/dashboard/routine/6.png" },
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">4. AM / PM Routine Builder</h2>
        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full p-1">
          <button className="w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center text-pink-500">
            <Sun size={12} />
          </button>
          <button className="w-6 h-6 rounded-full text-gray-400 hover:text-indigo-500 transition-colors flex items-center justify-center">
            <Moon size={12} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-6 flex-1">

        {/* Morning Routine */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-800">Morning Routine</h3>
            <span className="text-[10px] font-bold text-gray-400">7 Steps</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar mask-gradient-right">
              {amSteps.map((step) => (
                <div key={step.id} className="w-10 h-12 shrink-0 bg-white border border-gray-100 shadow-sm rounded-lg flex items-center justify-center p-1">
                  <img src={step.image} alt="Step" className="max-w-full max-h-full object-contain" />
                </div>
              ))}
              <div className="w-10 h-12 shrink-0 bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400">+3</span>
              </div>
            </div>
            <button className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-colors shrink-0">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Evening Routine */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-gray-800">Evening Routine</h3>
            <span className="text-[10px] font-bold text-gray-400">6 Steps</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar mask-gradient-right">
              {pmSteps.map((step) => (
                <div key={step.id} className="w-10 h-12 shrink-0 bg-white border border-gray-100 shadow-sm rounded-lg flex items-center justify-center p-1">
                  <img src={step.image} alt="Step" className="max-w-full max-h-full object-contain" />
                </div>
              ))}
              <div className="w-10 h-12 shrink-0 bg-gray-50 border border-dashed border-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400">+3</span>
              </div>
            </div>
            <button className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:border-gray-400 transition-colors shrink-0">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-between">
        <Link
          href="/premium"
          className="text-[11px] font-bold text-pink-500 hover:text-pink-600 transition-colors"
        >
          Open Routine Builder <span className="text-sm leading-none ml-0.5">→</span>
        </Link>
        <div className="flex items-center gap-1.5 opacity-60">
          <ShieldCheck size={12} className="text-gray-500" />
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Secured by OKX.AI.ASP</span>
        </div>
      </div>

      {/* CSS for hiding scrollbar and edge mask */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-gradient-right { mask-image: linear-gradient(to left, transparent, black 15%); }
      `}} />
    </div>
  );
}
