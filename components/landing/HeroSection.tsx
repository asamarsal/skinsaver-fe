'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full h-full rounded-[24px] overflow-hidden bg-gradient-to-bl from-pink-100 via-rose-50 to-white min-h-[260px] flex flex-col md:flex-row items-center justify-between py-4 px-8 md:py-5 md:px-12 mt-4">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-50 bg-cover bg-no-repeat z-0 hidden lg:block"></div>

      {/* Left: Product Image */}
      <div className="w-full md:w-1/4 relative z-10 flex justify-center md:justify-start hidden md:block md:-ml-6 lg:-ml-8">
        <Image
          src="/image/dashboard/skincare.png"
          alt="SkinSaver Products"
          width={220}
          height={300}
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out"
          priority
        />
      </div>

      {/* Center: Text Content */}
      <div className="w-full md:w-2/4 z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-4 relative lg:-left-4 xl:-left-6">
        <div className="inline-flex items-center gap-2 text-pink-500 font-bold text-xs uppercase tracking-widest bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
          <span className="text-[14px]">✦</span> AI POWERED SKINCARE INTELLIGENCE
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-[40px] font-black leading-[1.15] text-gray-900">
          Your skin, your data,<br />
          your <span className="text-pink-500 italic font-bold">best skin era.</span>
        </h1>

        <p className="text-gray-500 text-sm md:text-base max-w-md leading-relaxed">
          AI agents on OKX.AI.ASP analyze, audit, and optimize <br /> your skincare with deep intelligence on X Layer.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2 justify-center md:justify-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-bold border border-gray-800 shadow-sm">
            <div className="w-4 h-4 bg-white rounded flex items-center justify-center text-black text-[10px] leading-none shrink-0">X</div>
            On X Layer
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-gray-900 text-xs font-bold border border-gray-200 shadow-sm">
            <span className="text-gray-900">✦</span>
            Powered by OKX.AI ASP
          </div>
        </div>
      </div>

      {/* Right: Model & Bubbles */}
      <div className="w-full md:w-1/4 relative z-10 h-full min-h-[300px] md:min-h-full flex justify-start mt-8 md:mt-0 md:self-end md:-mb-5">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 md:hidden pointer-events-none"></div>
        <Image
          src="/image/dashboard/artist-face.png"
          alt="Model"
          width={500}
          height={640}
          className="object-cover object-bottom absolute md:static top-0 md:bottom-0 max-h-48 md:max-h-full opacity-30 md:opacity-100 md:-ml-12 lg:-ml-24 xl:-ml-32"
          priority
        />

        {/* Bubbles - Desktop only */}
        <div className="hidden lg:flex absolute right-0 lg:-right-4 top-10 flex-col gap-4 items-end">
          <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm border border-pink-100 flex items-center gap-2 animate-[float_3s_ease-in-out_infinite] mr-6">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
              <span className="text-[10px]">💧</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-900 leading-none mb-1">Niacinamide</p>
              <p className="text-[8px] text-gray-500 leading-none">Brightening</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm border border-blue-100 flex items-center gap-2 animate-[float_4s_ease-in-out_infinite_reverse]">
            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
              <span className="text-[10px]">🌊</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-900 leading-none mb-1">Hyaluronic Acid</p>
              <p className="text-[8px] text-gray-500 leading-none">Hydration</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm border border-orange-100 flex items-center gap-2 animate-[float_3.5s_ease-in-out_infinite] mr-4">
            <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
              <span className="text-[10px]">🌿</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-900 leading-none mb-1">Panthenol</p>
              <p className="text-[8px] text-gray-500 leading-none">Soothing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
