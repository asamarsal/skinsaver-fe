'use client';

import React from 'react';
import Image from 'next/image';

const mappings = [
  { img: '/image/selfiescan/facial-visualization/1.png', label: 'Hydration Map', sub: 'Moisture distribution' },
  { img: '/image/selfiescan/facial-visualization/2.png', label: 'Oil Map', sub: 'Sebum concentration' },
  { img: '/image/selfiescan/facial-visualization/3.png', label: 'Texture Map', sub: 'Surface smoothness' },
  { img: '/image/selfiescan/facial-visualization/4.png', label: 'Redness Map', sub: 'Sensitivity detection' },
  { img: '/image/selfiescan/facial-visualization/5.png', label: 'Pigmentation Map', sub: 'Melanin distribution' },
];

export default function FacialScanVisualizationCard() {
  return (
    <div className="relative bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 flex flex-col h-full hover:shadow-md transition-shadow overflow-hidden">
      {/* Background Face Image (3/4 width) */}
      <div className="absolute inset-y-0 left-0 w-3/4 z-0 pointer-events-none">
        <Image
          src="/image/selfiescan/face-scan.png"
          alt="Facial Scan Background"
          fill
          className="object-cover object-left"
          priority
        />
        {/* Overlay scan grid */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
          <defs>
            <pattern id="grid-bg" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22c55e" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-bg)" />
        </svg>
        {/* Gradients to ensure text is readable and blends smoothly into the white right-side */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-white"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-white/80"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">2. Facial Scan Visualization</h2>
        <span className="text-[10px] font-bold text-gray-700 bg-white/50 backdrop-blur-sm px-2 py-1 rounded-full border border-gray-200 hidden xl:block">
          Multi Mapping
        </span>
      </div>

      {/* Content: spacer + labels */}
      <div className="relative z-10 flex-1 flex flex-col lg:flex-row gap-4 xl:gap-6">
        {/* Spacer to maintain exact original layout size */}
        <div className="flex-1 min-h-[160px]"></div>

        {/* Mapping Labels */}
        <div className="flex flex-col justify-center gap-3">
          {mappings.map((m) => (
            <div key={m.label} className="flex items-center gap-3">
              <div className="w-10 h-10 relative shrink-0 rounded-[10px] overflow-hidden shadow-sm border border-gray-100">
                <Image
                  src={m.img}
                  alt={m.label}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-[12px] font-bold text-gray-900 leading-tight mb-0.5">{m.label}</p>
                <p className="text-[10px] text-gray-700 font-medium leading-tight">{m.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend Bar */}
      <div className="relative z-10 mt-5 flex items-center gap-2 px-2">
        <span className="text-[10px] text-gray-700 font-bold shrink-0">Low</span>
        <div className="flex-1 h-2 rounded-full bg-gradient-to-r from-[#94a3b8] via-[#cbd5e1] via-[#fde047] to-[#f87171] shadow-sm" />
        <span className="text-[10px] text-gray-700 font-bold shrink-0">High</span>
      </div>
    </div>
  );
}
