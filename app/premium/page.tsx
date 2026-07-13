'use client';

import React from 'react';
import { 
  Sparkles, Sun, Moon, Download, ShieldAlert, 
  ArrowRight, Check, Tag, ChevronDown, CheckCircle2
} from 'lucide-react';

export default function PremiumReport() {
  const [reportData, setReportData] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedReport = sessionStorage.getItem('skinsaver_premium_report');
      if (savedReport) {
        try {
          const parsed = JSON.parse(savedReport);
          
          setReportData({
            routine: parsed.routine || { am: [], pm: [] },
            alternatives: parsed.alternatives || [],
            budget_summary: parsed.budget_summary || { total_cost: "$0.00", efficiency_score: 0 },
            medical_disclaimer: parsed.medical_disclaimer || "Medical Disclaimer missing."
          });
        } catch (e) {
          console.error("Failed to parse premium report", e);
        }
      } else {
        // Fallback for direct navigation
        setReportData({
          routine: { am: [], pm: [] },
          alternatives: [],
          budget_summary: { total_cost: "$0.00", efficiency_score: 0 },
          medical_disclaimer: "No data found. Please unlock premium from the analysis page."
        });
      }
    }
  }, []);

  if (!reportData) {
    return <div className="flex justify-center items-center h-screen"><span className="text-gray-500 font-medium flex items-center gap-2">Loading your premium report...</span></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end items-start justify-between mb-10 gap-5">
        <div className="w-full md:w-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-100">
            <CheckCircle2 size={14} /> Premium Access Unlocked
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-start md:items-center gap-2">
            <Sparkles className="text-pink-500 shrink-0 mt-1 md:mt-0" size={28} />
            Your Personalized Skincare Blueprint
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Optimized for your skin type, concerns, and budget.</p>
        </div>
        <button className="w-full md:w-auto h-11 px-6 rounded-full bg-white border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 shrink-0 shadow-sm">
          <Download size={18} />
          Download PDF Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Main Column: Routine Builder */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* AM Routine */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center">
                <Sun size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Morning (AM) Routine</h2>
                <p className="text-xs text-gray-500">Focus on protection and prevention</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {reportData.routine.am.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-pink-600 mb-0.5">{item.category || item.type}</p>
                    <h3 className="text-sm font-medium text-gray-900">{item.product}</h3>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-1/3 shrink-0 mt-2 sm:mt-0">
                    <span className="text-sm font-semibold text-gray-600">{item.price || "Market Price"}</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {item.usage || "Daily"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PM Routine */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center">
                <Moon size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Evening (PM) Routine</h2>
                <p className="text-xs text-gray-500">Focus on treatment and repair</p>
              </div>
            </div>
            
            <div className="space-y-3">
              {reportData.routine.pm.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100/50 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-indigo-500 mb-0.5">{item.category || item.type}</p>
                    <h3 className="text-sm font-medium text-gray-900">{item.product}</h3>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-1/3 shrink-0 mt-2 sm:mt-0">
                    <span className="text-sm font-semibold text-gray-600">{item.price || "Market Price"}</span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                      {item.usage || "Daily"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Cheaper Alternatives & Budget Summary */}
        <div className="space-y-8">
          
          {/* Budget Summary Card */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-md">
            <h3 className="font-bold text-lg mb-4 text-white">Estimated Spend</h3>
            <div className="flex justify-between items-end border-b border-gray-700 pb-4 mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Total Routine Cost</p>
                <p className="text-3xl font-bold text-white">{reportData.budget_summary.total_cost || "$0.00"}</p>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full text-xs font-medium">
                  <Check size={12} /> Within Budget
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400">Your routine operates at a {reportData.budget_summary.efficiency_score}% budget efficiency score.</p>
          </div>

          {/* Alternatives Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Tag className="text-pink-500" size={18} />
              Smart Swaps
            </h3>
            <p className="text-sm text-gray-500 mb-6">Cheaper alternatives to popular products that deliver similar results.</p>
            
            <div className="space-y-6">
              {reportData.alternatives.length > 0 ? reportData.alternatives.map((item: any, idx: number) => (
                <div key={idx} className="relative">
                  {/* Original */}
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 mb-2 opacity-60">
                    <div className="flex justify-between">
                      <span className="text-xs font-medium text-gray-500 line-through">{item.original.name}</span>
                      <span className="text-xs text-gray-400">{item.original.price || "Market Price"}</span>
                    </div>
                  </div>
                  
                  {/* Swap Icon */}
                  <div className="absolute top-7 left-1/2 -translate-x-1/2 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 z-10 shadow-sm">
                    <ChevronDown size={14} />
                  </div>
                  
                  {/* Alternative */}
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 mt-2">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-emerald-900 pr-2">{item.alternative.name}</h4>
                      <span className="text-sm font-bold text-emerald-700 shrink-0">{item.alternative.price || "Market Price"}</span>
                    </div>
                    <p className="text-xs text-emerald-700/80 mb-3">{item.reason}</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-semibold">
                        {item.alternative.fit || 100}% Match
                      </span>
                      {item.alternative.saving && (
                        <span className="px-2 py-0.5 rounded-full bg-white text-emerald-600 border border-emerald-100 text-xs font-semibold">
                          Save {item.alternative.saving}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              )) : (
                <p className="text-sm text-gray-500 text-center py-4">No alternatives needed! Your wishlist is already optimal.</p>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Mandatory Medical Disclaimer from compliance.md */}
      <div className="mt-12 bg-amber-50 rounded-xl p-4 md:p-6 flex items-start gap-4 border border-amber-200">
        <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={24} />
        <div>
          <h4 className="text-sm font-bold text-amber-900 mb-1">Medical Disclaimer</h4>
          <p className="text-xs md:text-sm text-amber-800/80 leading-relaxed">
            {reportData.medical_disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
