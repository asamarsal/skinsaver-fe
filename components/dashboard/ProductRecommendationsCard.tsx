'use client';

import React from 'react';
import Link from 'next/link';

export default function ProductRecommendationsCard() {
  const recommendations = [
    {
      id: 1,
      name: "Heartleaf 77% Soothing Toner",
      brand: "Anua",
      match: 95,
      isBestMatch: true,
      image: "/image/dashboard/recommendation/1.png"
    },
    {
      id: 2,
      name: "Advanced Snail 96 Mucin Power",
      brand: "COSRX",
      match: 92,
      isBestMatch: false,
      image: "/image/dashboard/recommendation/2.png"
    },
    {
      id: 3,
      name: "Relief Sun : Rice + Probiotics",
      brand: "Beauty of Joseon",
      match: 89,
      isBestMatch: false,
      image: "/image/dashboard/recommendation/3.png"
    }
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 md:p-6 flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">3. Product Recommendations</h2>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 flex-1">
        {recommendations.map((item, index) => (
          <div key={item.id} className="relative flex flex-col items-center bg-gray-50 border border-gray-100 rounded-[12px] p-2 hover:border-pink-200 transition-colors">
            
            {item.isBestMatch && (
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 px-1.5 py-0.5 bg-pink-500 text-white text-[7px] sm:text-[8px] font-bold uppercase rounded-full shadow-sm whitespace-nowrap">
                Best Match
              </div>
            )}

            {/* Image */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 shrink-0 bg-white rounded-xl mb-2 flex items-center justify-center p-1.5 shadow-sm border border-gray-100 relative">
              <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col items-center w-full min-w-0 text-center">
              <h3 className="text-[9px] font-bold text-gray-900 leading-tight line-clamp-2 mb-0.5 min-h-[22px] w-full">
                {item.name}
              </h3>
              <p className="text-[8px] font-semibold text-gray-500 mb-2 truncate w-full">{item.brand}</p>

              <div className="flex flex-col items-center w-full gap-1 mt-auto">
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded text-center w-full whitespace-nowrap">
                  {item.match}% Match
                </span>
                <button className="text-[9px] font-bold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 px-2 py-0.5 rounded text-center w-full transition-colors">
                  Buy ↗
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto pt-2 border-t border-gray-50 flex justify-center">
        <Link
          href="/analysis"
          className="text-xs font-bold text-pink-500 hover:text-pink-600 transition-colors py-1"
        >
          View All Recommendations <span className="text-sm leading-none ml-1">→</span>
        </Link>
      </div>
    </div>
  );
}
