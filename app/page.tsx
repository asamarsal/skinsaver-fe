import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Sparkles, CheckCircle2, ShieldCheck, Star,
  ScanFace, FlaskConical, Layers, ThumbsUp,
  ShoppingBag, Sun, Download, Tag, Check, Lock,
} from 'lucide-react';
import OkxPaymentCard from '@/components/landing/OkxPaymentCard';

export const metadata: Metadata = {
  title: 'SkinSaver AI | Unlock Your Full Skincare Audit',
  description: 'AI-powered skincare copilot. Analyze your selfie, audit your wishlist, build AM/PM routines, and find cheaper alternatives — all in one premium report.',
};

const INCLUDED = [
  {
    icon: <ScanFace size={24} className="text-pink-500" />,
    bg: 'bg-pink-50/50', borderColor: 'border-pink-100',
    title: 'Full Skin Selfie Report',
    desc: 'Comprehensive 5D skin analysis with insights, scores, and root causes.',
  },
  {
    icon: <ShoppingBag size={24} className="text-purple-500" />,
    bg: 'bg-purple-50/50', borderColor: 'border-purple-100',
    title: 'Full Wishlist Audit',
    desc: 'In-depth evaluation of every product with scores and recommendations.',
  },
  {
    icon: <Tag size={24} className="text-orange-500" />,
    bg: 'bg-orange-50/50', borderColor: 'border-orange-100',
    title: 'Cheaper & Smarter Alternatives',
    desc: 'Better options that save you money without compromising results.',
  },
  {
    icon: <Sun size={24} className="text-purple-500" />,
    bg: 'bg-purple-50/50', borderColor: 'border-purple-100',
    title: 'AM / PM Routine Builder',
    desc: 'Personalized, step-by-step routines tailored to your goals and skin.',
  },
  {
    icon: <Download size={24} className="text-indigo-500" />,
    bg: 'bg-indigo-50/50', borderColor: 'border-indigo-100',
    title: 'Downloadable PDF Report',
    desc: 'Your complete audit in a clean, shareable, downloadable report.',
  },
];

const AGENTS = [
  {
    icon: <ScanFace size={28} className="text-[#8c62e5]" />, bg: 'bg-[#f4effc]',
    title: 'AI Skincare Scan Agent',
    desc: 'Analyzes your selfie across 5 dimensions for deep skin insights.',
    linkColor: 'text-[#de4998]'
  },
  {
    icon: <FlaskConical size={28} className="text-[#de4998]" />, bg: 'bg-[#fcecf4]',
    title: 'Product Intelligence Agent',
    desc: 'Evaluates ingredients, efficacy, safety, and real user feedback.',
    linkColor: 'text-[#de4998]'
  },
  {
    icon: <Sun size={28} className="text-[#f77e21]" />, bg: 'bg-[#fff5ee]',
    title: 'Routine Builder Agent',
    desc: 'Creates personalized AM/PM routines that actually work.',
    linkColor: 'text-[#de4998]'
  },
  {
    icon: <Tag size={28} className="text-[#1f9350]" />, bg: 'bg-[#eef8f2]',
    title: 'Audit Recommendation Agent',
    desc: 'Finds better alternatives and builds smart, budget-friendly picks.',
    linkColor: 'text-[#de4998]'
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* ── BACKGROUND ────────────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#f9f9fa]">
        <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-pink-50/70 via-purple-50/40 to-transparent" />
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-pink-100/40 rounded-full blur-[120px]" />
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative flex-1 pt-6 pb-12 px-6 md:px-12 lg:px-16">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-20 items-start">

            {/* ── LEFT COLUMN ─────────────────────────────────────────────── */}
            <div className="pt-2">

              {/* Headline */}
              <div className="mb-6 relative">
                <h1 className="text-4xl md:text-[56px] font-black text-[#1a1f36] leading-[1.08] tracking-tight font-serif">
                  Unlock your<br />
                  <span className="text-pink-500">full</span> skinsaver audit
                </h1>
              </div>

              {/* Subtext */}
              <p className="text-gray-600 text-[16px] leading-relaxed mb-8 max-w-[650px]">
                Get the complete AI analysis, personalized routine, product swaps,{' '}
                and a downloadable report designed just for your skin.
              </p>

              {/* What's Included Card & Social Proof */}
              <div id="features" className="w-full max-w-[700px]">
                {/* Main Card */}
                <div className="bg-white rounded-[20px] shadow-[0_2px_20px_rgb(0,0,0,0.03)] p-6 mb-4">
                  <h3 className="text-[17px] font-bold text-gray-900 mb-5">What&apos;s Included</h3>

                  <div className="flex flex-col gap-5">
                    {INCLUDED.map((item, i) => (
                      <div key={i} className={`flex items-start gap-4 pb-5 ${i !== INCLUDED.length - 1 ? 'border-b border-gray-50' : 'pb-0'}`}>
                        <div className={`w-[46px] h-[46px] rounded-[14px] flex items-center justify-center shrink-0 border ${item.bg} ${item.borderColor}`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[15px] font-bold text-gray-900 leading-snug">{item.title}</p>
                          <p className="text-[13px] text-gray-500 leading-relaxed mt-1">{item.desc}</p>
                        </div>
                        <div className="shrink-0 flex items-center h-[46px] pl-2">
                          <CheckCircle2 size={22} className="text-emerald-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Proof Card */}
                <div className="bg-white rounded-[16px] shadow-[0_2px_15px_rgb(0,0,0,0.03)] p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3.5">
                      {[
                        { img: 'https://i.pravatar.cc/100?img=1' },
                        { img: 'https://i.pravatar.cc/100?img=5' },
                        { img: 'https://i.pravatar.cc/100?img=9' },
                      ].map(({ img }, i) => (
                        <div
                          key={i}
                          className="w-[34px] h-[34px] rounded-full border-2 border-white overflow-hidden shadow-sm bg-gray-100"
                        >
                          <img src={img} alt="User" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <p className="text-[13px] text-gray-600 font-medium">Trusted by skincare lovers worldwide</p>
                  </div>
                  <div className="bg-pink-50 text-pink-500 text-[12px] font-bold px-3 py-1.5 rounded-full">
                    10K+
                  </div>
                </div>
              </div>

              {/* ── TRUST BADGES (From Image 2) ───────────────────────────── */}
              <div className="mt-6 w-full max-w-[700px] bg-white rounded-[16px] shadow-[0_2px_15px_rgb(0,0,0,0.03)] p-4 flex flex-wrap items-center justify-between gap-y-4 px-6">
                {/* Badge 1: Secure by OKX */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[12px] bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck size={20} className="text-gray-800" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-700 leading-snug">Secure<br/>by OKX</span>
                </div>
                
                {/* Badge 2: X Layer Network */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[12px] bg-[#000] border border-gray-900 flex items-center justify-center shrink-0 shadow-sm">
                    <div className="grid grid-cols-2 gap-[4px] p-1.5">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className={`w-[7px] h-[7px] rounded-[1px] ${i === 2 ? 'bg-[#000]' : 'bg-white'}`} />
                      ))}
                    </div>
                  </div>
                  <span className="text-[13px] font-bold text-gray-700 leading-snug">X Layer<br/>Network</span>
                </div>

                {/* Badge 3: Encrypted & Safe */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[12px] bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm">
                    <Lock size={20} className="text-emerald-600" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-700 leading-snug">Encrypted<br/>& Safe</span>
                </div>

                {/* Badge 4: Privacy First */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-[12px] bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 shadow-sm">
                    <ShieldCheck size={20} className="text-purple-600" />
                  </div>
                  <span className="text-[13px] font-bold text-gray-700 leading-snug">Privacy<br/>First</span>
                </div>
              </div>

            </div>

            {/* ── RIGHT COLUMN: OKX Payment Card ─────────────────────────── */}
            <div id="pricing" className="flex justify-center md:justify-end">
              <OkxPaymentCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── AI AGENTS SECTION (From Image 1) ───────────────────────────────── */}
      <section id="agents" className="py-12 px-6 md:px-12 lg:px-16 bg-white border-t border-gray-100">
        <div className="w-full max-w-[1500px] mx-auto">
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-[0_4px_24px_rgb(0,0,0,0.02)] p-6 lg:p-10">
            <h2 className="text-[18px] md:text-[22px] font-black text-[#1a1f36] mb-8">
              AI Agents Powering Your Skincare Intelligence
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {AGENTS.map((a, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-[20px] border border-gray-100 bg-white hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                  <div className={`w-[72px] h-[72px] rounded-[18px] ${a.bg} flex items-center justify-center shrink-0`}>
                    {a.icon}
                  </div>
                  <div className="flex flex-col flex-1">
                    <h3 className="text-[14px] font-bold text-[#1a1f36] mb-1.5 leading-snug">{a.title}</h3>
                    <p className="text-[13px] text-gray-500 leading-relaxed flex-1">{a.desc}</p>
                    <Link href="/premium" className={`inline-flex items-center gap-1.5 text-[12px] font-bold mt-4 hover:opacity-80 transition-opacity ${a.linkColor}`}>
                      Learn more <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="py-6 px-6 md:px-12 lg:px-16 border-t border-gray-100 mt-auto">
        <div className="w-full max-w-[1500px] mx-auto flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-[12px] text-gray-400 font-medium">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={14} className="text-gray-300" /> Your data is encrypted and never shared.
          </span>
          <span>Privacy First</span>
          <span className="flex items-center gap-1.5">
            <div className="w-3 h-3 bg-gray-900 rounded-[3px]" /> Powered by OKX
          </span>
        </div>
      </footer>

    </div>
  );
}
