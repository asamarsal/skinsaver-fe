'use client';

import React from 'react';
import Link from 'next/link';

interface AgentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  colorClass: string;
  buttonText: string;
  href: string;
}

export default function AgentCard({ title, description, icon, colorClass, buttonText, href }: AgentCardProps) {
  return (
    <div className="flex flex-col bg-white border border-gray-100 rounded-2xl p-4 md:p-5 hover:border-gray-300 hover:shadow-sm transition-all h-full">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shrink-0 ${colorClass}`}>
        {icon}
      </div>
      <h3 className="text-xs md:text-sm font-bold text-gray-900 mb-1.5 leading-tight">{title}</h3>
      <p className="text-[10px] md:text-xs text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3 md:line-clamp-none">{description}</p>
      
      <Link 
        href={href}
        className="w-full mt-auto py-2 rounded-xl text-[10px] md:text-xs font-bold bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center gap-1"
      >
        {buttonText} <span className="text-[8px] md:text-[10px]">→</span>
      </Link>
    </div>
  );
}
