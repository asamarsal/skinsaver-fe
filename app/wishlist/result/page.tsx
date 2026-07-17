'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShoppingCart, ArrowRight, RefreshCw, Shield, FlaskConical, Copy } from 'lucide-react';
import { useWallet } from '@/components/wallet/WalletProvider';
import WalletStatusPanel from '@/components/landing/WalletStatusPanel';

const MOCK_PRODUCTS = [
  { brand: 'Anua', name: 'Heartleaf 77% Soothing Toner', category: 'Toner', benefits: 'Soothing, Hydration', price: '19.90', result: 'Buy' },
  { brand: 'COSRX', name: 'Advanced Snail 96 Mucin Power Essence', category: 'Essence', benefits: 'Repair, Hydration', price: '22.00', result: 'Buy' },
  { brand: 'Beauty of Joseon', name: 'Relief Sun: Rice + Probiotics SPF50+', category: 'Sunscreen', benefits: 'UV Protection, Soothing', price: '18.00', result: 'Buy' },
  { brand: 'The Ordinary', name: 'Niacinamide 10% + Zinc 1%', category: 'Serum', benefits: 'Pore Care, Sebum Control', price: '6.90', result: 'Wait' },
  { brand: 'SKIN1004', name: 'Madagascar Centella Ampoule', category: 'Ampoule', benefits: 'Calming, Skin Barrier', price: '15.50', result: 'Wait' },
  { brand: 'Laneige', name: 'Water Sleeping Mask', category: 'Moisturizer', benefits: 'Hydration, Barrier', price: '24.00', result: 'Skip' },
  { brand: 'Some By Mi', name: 'AHA.BHA.PHA 30 Days Miracle Toner', category: 'Exfoliant', benefits: 'Exfoliating, Pore Care', price: '18.00', result: 'Skip' },
  { brand: 'Dr.Jart+', name: 'Cicapair Tiger Grass Cream', category: 'Moisturizer', benefits: 'Soothing, Recover', price: '35.00', result: 'Replace' },
  { brand: 'Torriden', name: 'DIVE-IN Low Molecular Hyaluronic Acid Serum', category: 'Serum', benefits: 'Hydration, Plump', price: '16.00', result: 'Replace' },
];

const RESULT_STYLE: Record<string, { badge: string; dot: string; action: string }> = {
  Buy: { badge: 'text-emerald-600 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', action: 'text-emerald-500' },
  Wait: { badge: 'text-amber-600 bg-amber-50 border-amber-200', dot: 'bg-amber-400', action: 'text-amber-500' },
  Skip: { badge: 'text-rose-600 bg-rose-50 border-rose-200', dot: 'bg-rose-500', action: 'text-rose-500' },
  Replace: { badge: 'text-purple-600 bg-purple-50 border-purple-200', dot: 'bg-purple-500', action: 'text-purple-500' },
};

const IMGS = ['/image/wishlistaudit/product/1.png', '/image/wishlistaudit/product/2.png', '/image/wishlistaudit/product/3.png', '/image/wishlistaudit/product/4.png', '/image/wishlistaudit/product/5.png', '/image/wishlistaudit/product/6.png'];

type AuditData = { summary?: { total: number; buy: number; wait: number; skip: number; replace: number }; budget_saved?: string; products?: typeof MOCK_PRODUCTS; top_findings?: string[] };

export default function WishlistResultPage() {
  const { address } = useWallet();
  const [data, setData] = useState<AuditData | null>(null);

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? sessionStorage.getItem('skinsaver_audit_results') : null;
    if (raw) { try { setData(JSON.parse(raw)); } catch { setData({}); } } else { setData({}); }
  }, []);

  const products = data?.products?.length ? data.products : MOCK_PRODUCTS;
  const summary = data?.summary ?? { total: 12, buy: 5, wait: 3, skip: 2, replace: 2 };
  const budgetSaved = data?.budget_saved ?? '107.45';
  const topFindings = data?.top_findings ?? ['3 products contain potential irritating ingredients', '2 items have duplicate functions', `You can save up to ${budgetSaved} USDT`];

  if (!data) return null;

  const circumference = 2 * Math.PI * 32;
  const segments = [
    { count: summary.buy, color: '#22c55e', label: 'Buy' },
    { count: summary.wait, color: '#f59e0b', label: 'Wait' },
    { count: summary.skip, color: '#f43f5e', label: 'Skip' },
    { count: summary.replace, color: '#a855f7', label: 'Replace' },
  ];
  let offset = 0;

  return (
    <div className="min-h-screen bg-[#fdf8f8]">
      <div className="flex gap-0 h-full">

        {/* ── LEFT SIDEBAR ── */}
        <div className="hidden lg:flex flex-col gap-4 xl:gap-5 w-[280px] xl:w-[300px] shrink-0 pt-6 pl-4 md:pl-6 lg:pl-8">
          <div className="-mt-4">
            <WalletStatusPanel />
          </div>

          <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4">Audit Summary</span>
            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-[80px] h-[80px] shrink-0">
                <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                  <circle cx="40" cy="40" r="32" fill="none" stroke="#f1f5f9" strokeWidth="10" />
                  {segments.map((s, i) => {
                    const dash = (s.count / summary.total) * circumference;
                    const el = <circle key={i} cx="40" cy="40" r="32" fill="none" stroke={s.color} strokeWidth="10" strokeDasharray={`${dash} ${circumference}`} strokeDashoffset={-offset} strokeLinecap="butt" />;
                    offset += dash;
                    return el;
                  })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-black text-gray-900">{summary.total}</span>
                  <span className="text-[9px] text-gray-400 font-bold">Products</span>
                </div>
              </div>
              <div className="space-y-1.5">
                {segments.map(s => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: s.color }} />
                    <span className="text-[11px] text-gray-500 w-12">{s.label}</span>
                    <span className="text-[12px] font-black text-gray-900">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="pt-3 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-1">Est. Budget Savings</p>
              <p className="text-2xl font-black text-gray-900">{budgetSaved} <span className="text-sm text-gray-500">USDT</span> <span className="text-emerald-500 text-sm font-bold">(~15.4%)</span></p>
              <p className="text-[11px] text-gray-400">vs buying all items</p>
            </div>
          </div>

          <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5 flex-1">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest block mb-4">Top Findings</span>
            <div className="space-y-4">
              {topFindings.map((f, i) => (
                <div key={i} className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-sm shrink-0">{['✦', '🔶', '✅'][i]}</span>
                    <p className="text-[12px] text-gray-700 leading-relaxed">{f}</p>
                  </div>
                  <button className="text-[11px] text-pink-500 font-bold shrink-0 flex items-center gap-0.5">View <ArrowRight size={10} /></button>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-4">Audit completed: May 16, 2025 · 10:30 AM</p>
          </div>

          <div className="mb-8">
            <button onClick={() => { sessionStorage.removeItem('skinsaver_audit_results'); window.location.reload(); }}
              className="w-full h-12 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-sm font-bold hover:from-pink-600 hover:to-rose-500 transition-all shadow-sm">
              <RefreshCw size={15} /> Re-audit Wishlist
            </button>
          </div>
        </div>

        {/* ── CENTER ── */}
        <div className="flex-1 min-w-0 flex flex-col bg-gray-50/30">
          {/* Hero */}
          <div className="mx-4 md:mx-6 lg:mx-8 xl:mx-12 mt-6 relative rounded-[20px] overflow-hidden bg-gradient-to-br from-pink-100 via-rose-50 to-white min-h-[200px] flex items-center">
            <div className="relative z-10 p-6 md:p-8 max-w-[55%]">
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-2">
                Wishlist Audit <span className="text-pink-500">✦</span>
              </h1>
              <p className="text-gray-500 text-sm mb-1">AI-powered audit of your saved skincare</p>
              <p className="text-gray-400 text-xs mb-3">Smart analysis · Ingredient safety · Smarter spending</p>
              <div className="flex items-center gap-1.5 text-[11px] text-pink-500 mb-4">
                <Sparkles size={12} /> AI agents on OKX.AI ASP analyze your list to help you buy smarter and safer.
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-xs font-bold">
                  <span className="w-4 h-4 bg-white rounded flex items-center justify-center text-black text-[9px] font-black">X</span> On X Layer
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-gray-200 text-gray-900 text-xs font-bold">
                  <span>✦</span> Powered by OKX.AI ASP
                </span>
              </div>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-[50%] pointer-events-none">
              <Image src="/image/wishlistaudit/artist-face.png" alt="Model" fill className="object-cover object-left-top" priority />
            </div>
          </div>

          {/* Results Table */}
          <div className="mx-4 md:mx-6 lg:mx-8 xl:mx-12 mt-6 bg-white rounded-[20px] border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100">
              <h2 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Your Wishlist Audit Results</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['Product', 'Category', 'Key Benefits', 'Price', 'Audit Result', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-[10px] font-bold text-gray-400 uppercase whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, idx) => {
                    const s = RESULT_STYLE[p.result] ?? RESULT_STYLE.Buy;
                    return (
                      <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0 relative">
                              <Image src={IMGS[idx % IMGS.length]} alt={p.name} fill className="object-cover" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-[12px]">{p.brand}</p>
                              <p className="text-[10px] text-gray-400 leading-tight max-w-[160px] truncate">{p.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-gray-500">{p.category}</td>
                        <td className="px-4 py-3 text-[11px] text-gray-500">{p.benefits}</td>
                        <td className="px-4 py-3 text-[12px] font-bold text-gray-900 whitespace-nowrap">{p.price} USDT</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold border ${s.badge}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{p.result}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center hover:bg-pink-50 hover:border-pink-200 transition-colors">
                            {p.result === 'Skip' ? <span className="text-rose-400 text-sm font-black">×</span> : p.result === 'Replace' ? <span className="text-purple-400 text-sm">⇄</span> : <ShoppingCart size={12} className="text-gray-500" />}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
              <button className="text-sm text-pink-500 font-bold flex items-center gap-1">+ Add More Products <ArrowRight size={13} /></button>
              <span className="text-[11px] text-gray-400">{products.length} / 50 products</span>
            </div>
          </div>

          {/* Bottom 2 cards */}
          <div className="mx-4 md:mx-6 lg:mx-8 xl:mx-12 mt-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-6">
            {/* Cheaper Alternatives */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Cheaper Alternatives Found</h3>
                <button className="text-[11px] text-pink-500 font-bold flex items-center gap-0.5">View All <ArrowRight size={11} /></button>
              </div>
              <p className="text-[11px] text-gray-400 mb-4">2 products have better alternatives</p>
              {[
                { orig: "Dr.Jart+ Cicapair Tiger Grass Cream", alt: "Purito Centella Unscented Recovery Cream", op: '35.00', ap: '18.90', save: '16.10' },
                { orig: "Torriden DIVE-IN Serum", alt: "Inntree Hyaluronic Water Essence", op: '16.00', ap: '11.20', save: '4.80' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 mb-3">
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 relative shrink-0">
                    <Image src={IMGS[(i + 7) % IMGS.length]} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-gray-800 truncate">{a.orig}</p>
                    <p className="text-[10px] text-gray-400">{a.op} USDT</p>
                  </div>
                  <ArrowRight size={13} className="text-pink-400 shrink-0" />
                  <div className="w-9 h-9 rounded-lg overflow-hidden bg-emerald-50 border border-emerald-100 relative shrink-0">
                    <Image src={IMGS[(i + 3) % IMGS.length]} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-gray-800 truncate">{a.alt}</p>
                    <p className="text-[10px] text-emerald-600 font-bold">{a.ap} USDT</p>
                  </div>
                  <span className="text-[10px] font-black text-emerald-500 shrink-0">Save {a.save}</span>
                </div>
              ))}
              <button className="w-full mt-1 text-[11px] text-pink-500 font-bold flex items-center justify-center gap-1">View All Alternatives <ArrowRight size={11} /></button>
            </div>

            {/* Recommended Basket */}
            <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Recommended Basket</h3>
                <span className="text-[11px] font-bold text-gray-500">({summary.buy} Items)</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black text-gray-900">{budgetSaved} USDT</span>
                <span className="text-sm text-gray-400 line-through">214.90 USDT</span>
              </div>
              <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {IMGS.slice(0, 5).map((img, i) => (
                  <div key={i} className="w-10 h-10 lg:w-12 lg:h-12 shrink-0 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
                    <Image src={img} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mb-4 flex-wrap">
                {['Better Results', 'Safer Ingredients', 'Smart Savings'].map(t => (
                  <span key={t} className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full whitespace-nowrap">+ {t}</span>
                ))}
              </div>
              <button className="w-full mt-4 h-11 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 text-white text-sm font-bold">
                <ShoppingCart size={14} /> Add All to Basket
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT SIDEBAR ── */}
        <div className="hidden xl:flex flex-col gap-4 xl:gap-5 w-[280px] xl:w-[300px] shrink-0 pt-6 pr-4 md:pr-6 lg:pr-8">
          {/* Ingredients & Safety Insights */}
          <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Ingredients &amp; Safety Insights</h3>
              <button className="text-[11px] text-pink-500 font-bold flex items-center gap-0.5">View Full Report <ArrowRight size={11} /></button>
            </div>
            {[
              { icon: '⚠️', label: 'Potential Irritants', sub: 'Fragrance, Limonene, Alcohol Denat.', count: 3, color: 'text-rose-500' },
              { icon: '🚫', label: 'Fungal Acne Triggers', sub: 'Polysorbate 20', count: 1, color: 'text-amber-500' },
              { icon: '🔬', label: 'Comedogenic Risks', sub: 'Isopropyl Myristate, Glyceryl Stearate', count: 2, color: 'text-orange-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center shrink-0 text-sm">{item.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-bold text-gray-900 leading-tight">{item.label}</p>
                  <p className="text-[10px] text-gray-400 leading-tight">{item.sub}</p>
                </div>
                <span className={`text-lg font-black ${item.color} shrink-0`}>{item.count}</span>
              </div>
            ))}
          </div>

          {/* Duplicate Functions */}
          <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Duplicate Functions</h3>
              <button className="text-[11px] text-pink-500 font-bold flex items-center gap-0.5">View Details <ArrowRight size={11} /></button>
            </div>
            {[
              { label: 'Hydration Boosters', sub: 'Consider keeping only one', count: 2, imgs: [0, 1] },
              { label: 'Soothing &amp; Calming', sub: 'Consider keeping only one', count: 2, imgs: [2, 3] },
            ].map((g, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {g.imgs.map(ii => (
                      <div key={ii} className="w-9 h-9 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 relative">
                        <Image src={IMGS[ii]} alt="" fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-bold text-gray-900" dangerouslySetInnerHTML={{ __html: g.label }} />
                    <p className="text-[10px] text-gray-400">{g.sub}</p>
                  </div>
                  <span className="text-[11px] text-gray-400 shrink-0">{g.count} items</span>
                </div>
              </div>
            ))}
          </div>

          {/* OKX.AI ASP Agents */}
          <div className="bg-white rounded-[20px] border border-gray-100 shadow-sm p-5 mb-8">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">OKX.AI ASP Agents at Work</h3>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-3 h-3 bg-black rounded flex items-center justify-center text-white text-[7px] font-black">X</span> Secured by OKX.AI ASP
              </span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { icon: '🔬', title: 'Product Intelligence Agent', sub: 'Analyzes ingredients, efficacy, and price to score each product.', link: 'View Insights' },
                { icon: '🤝', title: 'Recommendation Agent', sub: "Finds better alternatives and builds your optimal skincare basket.", link: 'View Recommendations' },
              ].map((a, i) => (
                <div key={i} className="bg-gray-50 rounded-[14px] p-3">
                  <span className="text-xl">{a.icon}</span>
                  <p className="text-[11px] font-bold text-gray-900 mt-1 mb-1 leading-tight">{a.title}</p>
                  <p className="text-[10px] text-gray-400 leading-relaxed mb-2">{a.sub}</p>
                  <button className="text-[11px] text-pink-500 font-bold flex items-center gap-0.5">{a.link} <ArrowRight size={10} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
