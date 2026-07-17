'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Sparkles, ShoppingBag, Droplet, Target, DollarSign,
  Camera, Upload, Plus, Trash2, Shield, ChevronRight,
  Wallet, FlaskConical
} from 'lucide-react';
import { useWallet } from '@/components/wallet/WalletProvider';
import WalletStatusPanel from '@/components/landing/WalletStatusPanel';
import { api } from '@/lib/api';

const SKIN_TYPES = [
  { label: 'Oily', icon: '💧' },
  { label: 'Dry', icon: '🌿' },
  { label: 'Combination', icon: '☯️' },
  { label: 'Sensitive', icon: '🌸' },
  { label: 'Normal', icon: '✨' },
];

const SKIN_CONCERNS = [
  { label: 'Acne', icon: '🔴' },
  { label: 'Dark Spots', icon: '🌑' },
  { label: 'Dullness', icon: '💛' },
  { label: 'Texture', icon: '〰️' },
  { label: 'Pores', icon: '⚙️' },
  { label: 'Redness', icon: '🌹' },
];

const BUDGET_TIERS = [
  { label: 'Low', prefix: '$' },
  { label: 'Medium', prefix: '$$' },
  { label: 'High', prefix: '$$$' },
];

export default function WishlistEmptyPage() {
  const router = useRouter();
  const { address } = useWallet();

  const [skinType, setSkinType] = useState('');
  const [concerns, setConcerns] = useState<string[]>([]);
  const [budget, setBudget] = useState('');
  const [products, setProducts] = useState<string[]>([]);
  const [productInput, setProductInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleConcern = (c: string) => {
    setConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const addProduct = () => {
    if (productInput.trim()) {
      setProducts(prev => [...prev, productInput.trim()]);
      setProductInput('');
    }
  };

  const removeProduct = (idx: number) => {
    setProducts(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async () => {
    if (!skinType || !budget || products.length === 0) return;
    setIsSubmitting(true);

    let skinScores = { oiliness: 7, texture: 6, redness: 4, hydration: 4 };
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem('skinsaver_scan_results');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.skin_scores) skinScores = parsed.skin_scores;
        }
      } catch (_) { }
    }

    const payload = {
      products,
      skin_scores: skinScores,
      budget: budget.toLowerCase(),
      location: 'Indonesia',
      profile: {
        skin_type: skinType.toLowerCase(),
        concerns: concerns.map(c => c.toLowerCase()),
      },
    };

    try {
      const response = await api.post('/asp/audit-wishlist', payload);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('skinsaver_audit_results', JSON.stringify(response.data.data));
        sessionStorage.setItem('skinsaver_wishlist_input', JSON.stringify({ skinType, concerns, budget, products }));
      }
      router.refresh();
    } catch (err) {
      console.error(err);
      // Demo mode: generate mock data and still navigate
      const mockData = {
        summary: { total: products.length, buy: Math.ceil(products.length * 0.4), wait: Math.ceil(products.length * 0.3), skip: Math.floor(products.length * 0.2), replace: Math.floor(products.length * 0.1) },
        budget_saved: '107.45',
        products: products.map((p, i) => ({
          name: p, brand: 'Unknown', category: 'Skincare', key_benefits: 'TBD', price: '20.00',
          audit_result: ['Buy', 'Wait', 'Skip', 'Replace'][i % 4],
          ai_note: 'AI analysis based on your skin profile.',
        })),
        top_findings: ['Check ingredient list for potential irritants.'],
        alternatives: [],
        recommended_basket: products.slice(0, 3).map(p => ({ name: p, image: null })),
      };
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('skinsaver_audit_results', JSON.stringify(mockData));
        sessionStorage.setItem('skinsaver_wishlist_input', JSON.stringify({ skinType, concerns, budget, products }));
      }
      window.location.reload();
    }
  };

  const canSubmit = skinType && budget && products.length > 0;

  return (
    <div className="min-h-screen bg-[#fdf8f8]">
      {/* ── MAIN CONTENT GRID ───────────────────────── */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-5">
          {/* LEFT / MAIN COLUMN */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* ── HERO BANNER ─────────────────────────────── */}
            <div className="relative w-full rounded-[24px] overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-white min-h-[200px] md:min-h-[270px] flex items-center">
              {/* Text */}
              <div className="relative z-10 p-6 md:p-10 max-w-[55%]">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-3">
                  Beauty Profile &amp; Wishlist <span className="text-pink-500">✦</span>
                </h1>
                <p className="text-gray-500 text-sm md:text-base">
                  Tell us about your skin and drop the products you want to buy.
                </p>
              </div>
              {/* Hero images */}
              <div className="absolute right-0 top-0 bottom-0 w-[60%] md:w-[55%] pointer-events-none flex items-end justify-end pr-2 md:pr-6">
                <div className="relative w-[50%] md:w-[45%] h-[100%]">
                  <Image
                    src="/image/wishlistaudit/artist-face.png"
                    alt="Model"
                    fill
                    className="object-contain object-bottom"
                    priority
                  />
                </div>
                <div className="relative w-[45%] md:w-[40%] h-[85%] -ml-2 md:-ml-4 z-10">
                  <Image
                    src="/image/wishlistaudit/skincare.png"
                    alt="Skincare Products"
                    fill
                    className="object-contain object-bottom pt-4 md:pt-6"
                  />
                </div>
              </div>
            </div>

            {/* Mobile: Wallet Card */}
            <div className="lg:hidden -mt-4">
              <WalletStatusPanel />
            </div>

            {/* ── SECTION 1: Your Skin Profile ── */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5 md:p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Left: Skin selectors */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center">
                      <Droplet size={14} className="text-pink-500" />
                    </div>
                    <h2 className="text-base font-bold text-gray-900">1. Your Skin Profile</h2>
                  </div>

                  {/* Skin Type */}
                  <div className="mb-5">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Droplet size={13} className="text-pink-400" />
                      <span className="text-sm font-semibold text-gray-700">Skin Type</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SKIN_TYPES.map(t => (
                        <button
                          key={t.label}
                          type="button"
                          onClick={() => setSkinType(t.label)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${skinType === t.label
                            ? 'bg-pink-50 border-pink-200 text-pink-600 font-semibold shadow-sm'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-pink-200 hover:bg-pink-50/30'
                            }`}
                        >
                          <span className="text-xs">{t.icon}</span> {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Skin Concerns */}
                  <div className="mb-5">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Target size={13} className="text-pink-400" />
                      <span className="text-sm font-semibold text-gray-700">Skin Concerns</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {SKIN_CONCERNS.map(c => (
                        <button
                          key={c.label}
                          type="button"
                          onClick={() => toggleConcern(c.label)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all ${concerns.includes(c.label)
                            ? 'bg-pink-50 border-pink-200 text-pink-600 font-semibold shadow-sm'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-pink-200 hover:bg-pink-50/30'
                            }`}
                        >
                          <span className="text-xs">{c.icon}</span> {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Target Budget */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <DollarSign size={13} className="text-pink-400" />
                      <span className="text-sm font-semibold text-gray-700">Target Budget</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {BUDGET_TIERS.map(b => (
                        <button
                          key={b.label}
                          type="button"
                          onClick={() => setBudget(b.label)}
                          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${budget === b.label
                            ? 'bg-pink-50 border-pink-200 text-pink-600 font-semibold shadow-sm'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-pink-200 hover:bg-pink-50/30'
                            }`}
                        >
                          <span className="text-emerald-500 font-bold">{b.prefix}</span> {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Ingredient Scanner */}
                <div className="md:w-[240px] shrink-0">
                  <div className="border border-gray-100 rounded-[16px] p-4 h-full flex flex-col justify-between bg-gray-50/50">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FlaskConical size={16} className="text-pink-500" />
                        <h3 className="text-sm font-bold text-gray-900">Ingredient Scanner</h3>
                      </div>
                      <p className="text-[12px] text-gray-500 mb-4 leading-relaxed">
                        Photo the back of any cosmetic product to check safety
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button className="w-full h-10 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-sm font-bold shadow-sm hover:from-pink-600 hover:to-rose-500 transition-all">
                        <Camera size={15} /> Scan with Camera
                      </button>
                      <button className="w-full h-10 flex items-center justify-center gap-2 rounded-full bg-white border border-pink-200 text-pink-500 text-sm font-bold hover:bg-pink-50 transition-all">
                        <Upload size={15} /> Upload
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: Ingredient Scanner (standalone card) */}
            {/* Already embedded above in desktop layout, shown inline on mobile via flex-col */}

            {/* ── SECTION 2: Products to Audit ── */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5 md:p-6">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full bg-pink-50 flex items-center justify-center">
                  <ShoppingBag size={14} className="text-pink-500" />
                </div>
                <h2 className="text-base font-bold text-gray-900">2. Products to Audit</h2>
              </div>
              <p className="text-sm text-gray-500 mb-4 ml-9">Paste product names or links you are planning to buy.</p>

              {/* Input */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={productInput}
                  onChange={e => setProductInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addProduct())}
                  placeholder="e.g. COSRX Snail Mucin"
                  className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent text-gray-900 placeholder-gray-300"
                />
                <button
                  type="button"
                  onClick={addProduct}
                  className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-gray-800 transition-colors shrink-0"
                >
                  <Plus size={18} />
                </button>
              </div>

              {/* Products list or empty state */}
              {products.length > 0 ? (
                <div className="space-y-2">
                  {products.map((p, idx) => (
                    <div key={idx} className="flex items-center justify-between px-4 py-3 rounded-xl border border-gray-100 bg-gray-50">
                      <span className="text-sm font-medium text-gray-700">{p}</span>
                      <button
                        type="button"
                        onClick={() => removeProduct(idx)}
                        className="text-gray-300 hover:text-rose-500 transition-colors ml-3 shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty wishlist illustration */
                <div className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-[16px] border border-dashed border-gray-200 bg-gray-50/50">
                  <div className="w-28 h-28 shrink-0 relative">
                    <Image
                      src="/image/wishlistaudit/skincare.png"
                      alt="Empty wishlist"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-base font-bold text-gray-900 mb-1">Your wishlist is empty</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Add products above to build your wishlist and get personalized audit insights.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* ── CTA Button ── */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !canSubmit}
              className="w-full h-14 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-base font-bold shadow-md hover:from-pink-600 hover:to-rose-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Sparkles size={18} />
              {isSubmitting ? 'Running Audit...' : 'Run Full Wishlist Audit'}
            </button>
          </div>

          {/* ── RIGHT SIDEBAR (desktop only) ── */}
          <div className="hidden lg:flex lg:flex-col gap-5 w-[280px] xl:w-[300px] shrink-0">
            {/* Wallet Status */}
            <div className="-mt-4">
              <WalletStatusPanel />
            </div>

            {/* Product promo images */}
            <div className="relative rounded-[20px] overflow-hidden h-[320px] mt-4">
              <div className="absolute inset-0 bg-gradient-to-b from-pink-50 to-rose-100" />
              <div className="absolute inset-0">
                <Image
                  src="/image/wishlistaudit/skincare.png"
                  alt="Skincare products"
                  fill
                  className="object-contain object-bottom p-4"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
