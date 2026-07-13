'use client';

import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, Clock, RefreshCcw, ShieldAlert, 
  Lock, ArrowRight, Activity, DollarSign, Layers
} from 'lucide-react';
import PremiumUnlockModal from '@/components/premium/PremiumUnlockModal';
import { useRouter } from 'next/navigation';

const loadAnalysisData = () => {
  if (typeof window === 'undefined') return null;

  const savedData = sessionStorage.getItem('skinsaver_audit_results');
  if (!savedData) return null;

  try {
    const parsed = JSON.parse(savedData);
    
    let visualObs = "We analyzed your skin and wishlist.";
    const scanResults = sessionStorage.getItem('skinsaver_scan_results');
    if (scanResults) {
      const parsedScan = JSON.parse(scanResults);
      if (parsedScan.visual_notes) {
        visualObs = parsedScan.visual_notes.join('. ');
      }
    }

    const recommendations: any[] = [];
    ['buy', 'wait', 'skip', 'replace'].forEach(status => {
      if (parsed[status]) {
        parsed[status].forEach((item: any, index: number) => {
          recommendations.push({
            id: `${status}-${index}`,
            product: item.product,
            category: "Skincare",
            status: status.charAt(0).toUpperCase() + status.slice(1),
            reason: item.reason,
            price: "Market Price" 
          });
        });
      }
    });

    return {
      scores: parsed.scores || { wishlist_fit: 82, budget_efficiency: 95, duplicate_risk: "Low", irritation_risk: "Low" },
      recommendations: recommendations.length > 0 ? recommendations : [],
      estimated_total: parsed.estimated_savings ? `Savings: ${parsed.estimated_savings}` : "Calculation pending",
      visual_observation: visualObs
    };
  } catch (e) {
    console.error("Failed to parse audit results", e);
    return null;
  }
};

export default function AnalysisDashboard() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [analysisData, setAnalysisData] = React.useState<any>(null);

  React.useEffect(() => {
    const data = loadAnalysisData();
    if (data) {
      setAnalysisData(data);
    } else if (typeof window !== 'undefined') {
      // Fallback for direct navigation
      setAnalysisData({
        scores: { wishlist_fit: 82, budget_efficiency: 95, duplicate_risk: "Low", irritation_risk: "Low" },
        recommendations: [{ id: 1, product: "No products audited", category: "System", status: "Skip", reason: "Go back and submit your wishlist.", price: "$0" }],
        estimated_total: "$0.00",
        visual_observation: "No visual data found."
      });
    }
  }, []);

  if (!analysisData) {
    return <div className="flex justify-center items-center h-screen"><span className="text-gray-500 font-medium flex items-center gap-2"><RefreshCcw className="animate-spin" size={20}/> Loading analysis...</span></div>;
  }

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Buy':
        return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'Wait':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'Replace':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'Skip':
        return 'bg-rose-50 border-rose-200 text-rose-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Buy': return <CheckCircle2 size={16} className="text-emerald-500" />;
      case 'Wait': return <Clock size={16} className="text-amber-500" />;
      case 'Replace': return <RefreshCcw size={16} className="text-purple-500" />;
      default: return null;
    }
  };

  const handleUnlockPremium = () => {
    setIsModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsModalOpen(false);
    router.push('/premium');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-center items-start justify-between mb-8 gap-4">
        <div className="w-full md:w-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="text-pink-500 shrink-0" size={28} />
            Wishlist Audit Results
          </h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">AI-powered analysis to help you buy smarter.</p>
        </div>
        <button 
          onClick={handleUnlockPremium}
          className="w-full md:w-auto h-11 px-6 rounded-full bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shrink-0"
        >
          <Lock size={18} />
          Unlock Full Routine (5 USDT)
        </button>
      </div>

      {/* Observation Note */}
      <div className="bg-pink-50 border border-pink-100 rounded-xl p-4 mb-8 text-sm text-pink-900 flex items-start gap-3">
        <Sparkles className="shrink-0 mt-0.5 text-pink-500" size={18} />
        <p><strong>Visual Observation:</strong> {analysisData.visual_observation}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Product List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Your Wishlist Decisions</h2>
              <span className="text-sm font-medium text-gray-500">Est. Total: <span className="text-gray-900">{analysisData.estimated_total}</span></span>
            </div>

            <div className="space-y-4">
              {analysisData.recommendations.map((item: any) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-full">{item.category}</span>
                      <span className="text-sm font-medium text-gray-500">{item.price}</span>
                    </div>
                    <h3 className="text-gray-900 font-medium">{item.product}</h3>
                    <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
                  </div>
                  <div className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border ${getStatusStyle(item.status)}`}>
                    {getStatusIcon(item.status)}
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Scores */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Routine Fit Scores</h2>
            
            <div className="space-y-6">
              {/* Wishlist Fit */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2"><Activity size={16} className="text-pink-500"/> Wishlist Fit</span>
                  <span className="text-sm font-bold text-gray-900">{analysisData.scores.wishlist_fit}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-pink-400 to-pink-500 h-2.5 rounded-full" style={{ width: `${analysisData.scores.wishlist_fit}%` }}></div>
                </div>
              </div>

              {/* Budget Efficiency */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 flex items-center gap-2"><DollarSign size={16} className="text-emerald-500"/> Budget Efficiency</span>
                  <span className="text-sm font-bold text-gray-900">{analysisData.scores.budget_efficiency}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2.5 rounded-full" style={{ width: `${analysisData.scores.budget_efficiency}%` }}></div>
                </div>
              </div>
              
              {/* Duplicate Risk */}
              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2"><Layers size={16} className="text-gray-400"/> Duplicate Risk</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {analysisData.scores.duplicate_risk}
                </span>
              </div>
            </div>
          </div>

          {/* Premium CTA Card */}
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-20"><Sparkles size={64} /></div>
            <h3 className="font-bold text-lg mb-2 relative z-10">Get the Full Picture</h3>
            <p className="text-pink-100 text-sm mb-6 relative z-10">Unlock your personalized AM/PM routine, cheaper product alternatives, and a downloadable PDF report.</p>
            <button 
              onClick={handleUnlockPremium}
              className="w-full h-10 bg-white text-pink-600 rounded-full font-bold text-sm hover:bg-pink-50 transition-colors flex items-center justify-center gap-2 relative z-10"
            >
              Pay 5 USDT to Unlock <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Compliance Disclaimer */}
      <div className="mt-12 bg-amber-50/50 rounded-xl p-4 flex items-start gap-3 border border-amber-100/50">
        <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-gray-500 leading-relaxed">
          SkinSaver AI provides visual observations for shopping recommendations. It cannot diagnose skin conditions, nor is it a substitute for professional medical advice. Always consult a dermatologist for medical concerns.
        </p>
      </div>

      <PremiumUnlockModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}
