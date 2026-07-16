'use client';

import React from 'react';
import Image from 'next/image';
import { Droplets, Droplet, Sparkles, Heart, Sun, RefreshCw } from 'lucide-react';

const metrics = [
  { icon: Droplet, label: 'Hydration', score: 78, barColor: 'bg-[#3b82f6]', bgClass: 'bg-blue-50/80', iconClass: 'text-blue-500', status: 'Good', statusColor: 'text-[#22c55e]' },
  { icon: Droplet, label: 'Oil Balance', score: 72, barColor: 'bg-[#10b981]', bgClass: 'bg-emerald-50/80', iconClass: 'text-emerald-500', status: 'Balanced', statusColor: 'text-[#22c55e]' },
  { icon: Sparkles, label: 'Texture', score: 85, barColor: 'bg-[#a855f7]', bgClass: 'bg-purple-50/80', iconClass: 'text-purple-500', status: 'Smooth', statusColor: 'text-[#22c55e]' },
  { icon: Heart, label: 'Sensitivity', score: 65, barColor: 'bg-[#f43f5e]', bgClass: 'bg-rose-50/80', iconClass: 'text-rose-500', status: 'Care', statusColor: 'text-[#f43f5e]' },
  { icon: Sun, label: 'Pigmentation', score: 65, barColor: 'bg-[#f97316]', bgClass: 'bg-orange-50/80', iconClass: 'text-orange-500', status: 'Care', statusColor: 'text-[#f97316]' },
];

export default function ScanHeroSection() {
  return (
    <section className="relative w-full h-full rounded-[24px] overflow-hidden bg-gradient-to-bl from-pink-100 via-rose-50 to-white min-h-[260px] flex flex-col md:flex-row items-center justify-between py-4 px-8 md:py-5 md:px-12 mt-4">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-50 z-0 hidden lg:block" />

      {/* Center Background: Model Image */}
      <div className="absolute bottom-0 right-[10%] lg:right-[21%] xl:right-[22%] w-[230px] lg:w-[300px] h-[95%] z-0 pointer-events-none hidden md:block">
        <Image
          src="/image/selfiescan/artist-face.png"
          alt="Model"
          fill
          className="object-contain object-bottom"
          priority
        />
      </div>

      {/* Left: Product Image */}
      <div className="w-full md:w-1/4 relative z-10 hidden md:flex md:justify-start -ml-8 md:-ml-12">
        <Image
          src="/image/selfiescan/skincare.png"
          alt="SkinSaver Products"
          width={220}
          height={300}
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
          priority
        />
      </div>

      {/* Center: Text Content */}
      <div className="w-full md:w-2/5 z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-3 relative -left-2 md:-left-12 lg:-left-20 xl:-left-24">
        <div className="inline-flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-widest bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
          <span className="text-[14px]">✦</span> AI POWERED SKIN INTELLIGENCE
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-black leading-[1.15] text-gray-900">
          See your skin.<br />
          <span className="text-pink-500 italic font-bold">Perfect your glow.</span>
        </h1>

        <p className="text-gray-500 text-sm md:text-base max-w-xs leading-relaxed">
          Our AI analyzes 5 key skin dimensions to reveal your unique skin profile and personalized recommendations.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1 justify-center md:justify-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold border border-gray-800 shadow-sm">
            <div className="w-4 h-4 bg-white rounded flex items-center justify-center text-black text-[10px] leading-none shrink-0">X</div>
            On X Layer
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-gray-900 text-xs font-bold border border-gray-200 shadow-sm">
            <span>✦</span> Powered by OKX.AI ASP
          </div>
        </div>
      </div>

      {/* Right: Skin Metrics Panel */}
      <div className="w-full md:w-[28%] lg:w-[28%] xl:w-[26%] z-10 mt-6 md:mt-0 relative md:-right-4 lg:-right-8 xl:-right-10">
        <div className="bg-white/95 backdrop-blur-md rounded-[20px] shadow-sm p-3 lg:p-4 relative border border-white/60">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-black text-[#1e293b] uppercase tracking-wide">YOUR SKIN METRICS</h3>
            <div className="flex items-center gap-1.5 text-gray-500">
              <span className="text-[9px] font-medium">Updated just now</span>
              <RefreshCw size={10} className="text-indigo-400 opacity-70" />
            </div>
          </div>
          <div className="space-y-2.5">
            {metrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="flex items-center gap-2.5">
                  {/* Circle Icon */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${m.bgClass}`}>
                    <Icon size={14} className={m.iconClass} strokeWidth={2.5} />
                  </div>

                  {/* Middle Section (Label + Bar + Scores) */}
                  <div className="flex-1 flex flex-col justify-center gap-0.5">
                    <div className="flex justify-between items-end leading-none">
                      <span className="text-[11px] font-bold text-[#1e293b]">{m.label}</span>
                      <span className="text-[12px] font-black text-gray-900 leading-none">{m.score}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${m.barColor} transition-all duration-700`} style={{ width: `${m.score}%` }} />
                      </div>
                      <span className="text-[9px] font-bold text-gray-400 w-5 text-right leading-none">/100</span>
                    </div>
                  </div>

                  {/* Right Status */}
                  <div className="w-[42px] shrink-0 text-right">
                    <span className={`text-[10px] font-bold ${m.statusColor}`}>{m.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
