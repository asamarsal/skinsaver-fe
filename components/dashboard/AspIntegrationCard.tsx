'use client';

import React from 'react';
import AgentCard from './AgentCard';
import { ScanFace, FlaskConical, Sun, Tag, ShieldCheck } from 'lucide-react';

export default function AspIntegrationCard() {
  const agents = [
    {
      title: "Skin Scan Agent",
      description: "Deep 5D analysis from your selfie to identify real skin conditions.",
      icon: <ScanFace size={24} className="text-purple-600" />,
      colorClass: "bg-purple-100",
      buttonText: "View Insights",
      href: "/upload"
    },
    {
      title: "Product Intelligence Agent",
      description: "Analyzes ingredients, efficacy, safety, and user feedback to score products.",
      icon: <FlaskConical size={24} className="text-pink-600" />,
      colorClass: "bg-pink-100",
      buttonText: "Analyze Products",
      href: "/analysis"
    },
    {
      title: "Routine Builder Agent",
      description: "Builds effective AM/PM routines tailored to your skin goals.",
      icon: <Sun size={24} className="text-amber-600" />,
      colorClass: "bg-amber-100",
      buttonText: "Build Routine",
      href: "/premium"
    },
    {
      title: "Audit Recommendation Agent",
      description: "Finds better alternatives and smart picks within your budget.",
      icon: <Tag size={24} className="text-emerald-600" />,
      colorClass: "bg-emerald-100",
      buttonText: "View Alternatives",
      href: "/wishlist"
    }
  ];

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-6 flex flex-col h-full hover:shadow-md transition-shadow relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-pink-50 rounded-full blur-3xl pointer-events-none -z-10"></div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2 md:gap-0">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">6. OKX.AI ASP Integration</h2>
          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">
            AI AGENTS WORKING FOR YOUR SKIN
          </span>
        </div>
        <div className="flex items-center gap-1.5 opacity-60">
          <ShieldCheck size={14} className="text-gray-500" />
          <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Secured by OKX.AI.ASP</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 mt-2">
        {agents.map((agent, idx) => (
          <AgentCard key={idx} {...agent} />
        ))}
      </div>
    </div>
  );
}
