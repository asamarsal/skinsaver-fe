'use client';

import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function WishlistPage() {
  const router = useRouter();
  
  // Profile State
  const [skinType, setSkinType] = useState<string>('');
  const [budget, setBudget] = useState<string>('');
  const [concerns, setConcerns] = useState<string[]>([]);
  
  // Wishlist State
  const [products, setProducts] = useState<string[]>([]);
  const [productInput, setProductInput] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const skinTypes = ['Oily', 'Dry', 'Combination', 'Sensitive', 'Normal'];
  const budgetTiers = ['Low', 'Medium', 'High'];
  const commonConcerns = ['Acne', 'Dark Spots', 'Dullness', 'Texture', 'Pores', 'Redness'];

  const toggleConcern = (c: string) => {
    setConcerns(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };

  const addProduct = () => {
    if (productInput.trim()) {
      setProducts([...products, productInput.trim()]);
      setProductInput('');
    }
  };

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!skinType || !budget || products.length === 0) return;
    
    setIsSubmitting(true);
    
    // Retrieve selfie skin scores from sessionStorage
    let skinScores = { oiliness: 7, texture: 6, redness: 4, hydration: 4 }; // fallback
    if (typeof window !== 'undefined') {
      const savedScores = sessionStorage.getItem('skinsaver_scan_results');
      if (savedScores) {
        try {
          const parsed = JSON.parse(savedScores);
          if (parsed.skin_scores) skinScores = parsed.skin_scores;
        } catch (e) {}
      }
    }

    const payload = {
      products,
      skin_scores: skinScores,
      budget: budget.toLowerCase(),
      location: "Indonesia",
      profile: { skin_type: skinType.toLowerCase(), concerns: concerns.map(c => c.toLowerCase()) }
    };
    
    try {
      // Call Core ASP Endpoint
      const response = await api.post('/asp/audit-wishlist', payload);
      
      // Save results to sessionStorage for the next page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('skinsaver_audit_results', JSON.stringify(response.data.data));
      }
      
      router.push('/analysis');
    } catch (error) {
      console.error(error);
      alert("Failed to run wishlist audit. Make sure your wallet is connected.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
          <Sparkles className="text-pink-500" /> Beauty Profile & Wishlist
        </h1>
        <p className="text-gray-500">Tell us about your skin and drop the products you want to buy.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Beauty Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">1. Your Skin Profile</h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Skin Type</label>
              <div className="flex flex-wrap gap-2">
                {skinTypes.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setSkinType(t)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                      skinType === t 
                      ? 'bg-pink-50 text-pink-600 border-pink-200' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Skin Concerns</label>
              <div className="flex flex-wrap gap-2">
                {commonConcerns.map(c => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleConcern(c)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                      concerns.includes(c)
                      ? 'bg-pink-50 text-pink-600 border-pink-200' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Target Budget</label>
              <div className="flex flex-wrap gap-2">
                {budgetTiers.map(b => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                      budget === b 
                      ? 'bg-pink-50 text-pink-600 border-pink-200' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">2. Products to Audit</h2>
          <p className="text-sm text-gray-500 mb-6">Paste product names or links you are planning to buy.</p>
          
          <div className="flex gap-2 mb-6">
            <input 
              type="text" 
              value={productInput}
              onChange={(e) => setProductInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addProduct())}
              placeholder="e.g. COSRX Snail Mucin"
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900"
            />
            <button 
              type="button"
              onClick={addProduct}
              className="h-10 w-12 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              <Plus size={18} />
            </button>
          </div>

          {products.length > 0 ? (
            <div className="space-y-3">
              {products.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
                  <span className="text-gray-700 font-medium">{p}</span>
                  <button 
                    type="button"
                    onClick={() => removeProduct(idx)}
                    className="text-gray-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-xl">
              <span className="text-gray-400">Your wishlist is empty</span>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button 
            type="submit"
            disabled={isSubmitting || !skinType || !budget || products.length === 0}
            className="w-full sm:w-auto h-12 px-8 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Running Audit..." : "Run Full Wishlist Audit"}
            <ArrowRight size={18} />
          </button>
        </div>

      </form>
    </div>
  );
}
