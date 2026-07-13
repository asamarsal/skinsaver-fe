'use client';

import React, { useState } from 'react';
import { Sparkles, Check, Lock, X, ShieldCheck, Loader2 } from 'lucide-react';
import { useWallet } from '@/components/wallet/WalletProvider';
import { api } from '@/lib/api';

interface PremiumUnlockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PremiumUnlockModal({ isOpen, onClose, onSuccess }: PremiumUnlockModalProps) {
  const { address, connect } = useWallet();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentState, setPaymentState] = useState<'idle' | 'signing' | 'success'>('idle');

  if (!isOpen) return null;

  const handlePayment = async () => {
    if (!address) {
      await connect();
      return;
    }

    setIsProcessing(true);
    setPaymentState('signing');

    try {
      // Step 1: Deliberately call Premium API without X-Payment header to trigger 402
      let paymentDetails = null;
      try {
        await api.post('/asp/generate-premium-report', {});
      } catch (err: any) {
        if (err.response && err.response.status === 402) {
          paymentDetails = err.response.data; // { error, accepts: [...] }
        } else {
          throw err;
        }
      }

      if (!paymentDetails) throw new Error("Could not fetch payment requirements");

      // Step 2: Request EIP-3009/x402 off-chain signature via OKX Wallet
      let signature = "0xMockPaymentSignature" + "1234567890abcdef".repeat(8);
      
      if (typeof window !== 'undefined' && (window as any).okxwallet) {
        signature = await (window as any).okxwallet.request({
          method: 'personal_sign',
          params: [`Pay ${paymentDetails.accepts[0].price} ${paymentDetails.accepts[0].token} for Premium Audit`, address]
        });
      }

      // Step 3: Replay Request with X-Payment Header
      const premiumResponse = await api.post('/asp/generate-premium-report', {}, {
        headers: {
          'X-Payment': signature
        }
      });
      
      // Save the generated premium report to sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('skinsaver_premium_report', JSON.stringify(premiumResponse.data.data));
      }

      setPaymentState('success');
      
      // Allow user to see success state before closing/redirecting
      setTimeout(() => {
        onSuccess();
      }, 1500);
      
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed or was rejected. Please try again.");
      setIsProcessing(false);
      setPaymentState('idle');
    }
  };

  const formatAddress = (addr: string) => `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative flex flex-col md:flex-row border border-gray-100">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          disabled={isProcessing}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          <X size={16} />
        </button>

        {/* Left Side: Value Proposition */}
        <div className="w-full md:w-1/2 p-6 md:p-10 relative overflow-hidden bg-gradient-to-br from-pink-50 to-white shrink-0">
          <div className="absolute top-0 left-0 w-full h-full bg-pink-100/50 rounded-full blur-[100px] opacity-40 -z-10 pointer-events-none" />
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles size={14} /> Premium Audit Unlock
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            Unlock Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">Full SkinSaver Audit</span>
          </h2>
          
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            Get the complete AI analysis, personalized routine, product swaps, and a downloadable report designed just for your skin.
          </p>
          
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-sm">What's Included</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-pink-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Full Skin Selfie Report</h4>
                  <p className="text-xs text-gray-500">Comprehensive 5D skin analysis with insights and root causes.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-pink-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">Cheaper & Smarter Alternatives</h4>
                  <p className="text-xs text-gray-500">Better options that save you money without compromising results.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-pink-600" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">AM / PM Routine Builder</h4>
                  <p className="text-xs text-gray-500">Personalized, step-by-step routines tailored to your goals.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Payment flow */}
        <div className="w-full md:w-1/2 p-6 md:p-10 bg-white border-t md:border-t-0 md:border-l border-gray-100 flex flex-col justify-center shrink-0">
          
          {paymentState === 'success' ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Unlocked! ✨</h3>
              <p className="text-gray-500 mb-6">You now have full access to your complete SkinSaver Audit.</p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100">
                <ShieldCheck size={16} /> Payment Verified via x402
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <Lock size={18} /> Pay with OKX Wallet
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                  <ShieldCheck size={12} /> Secured by OKX
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="p-4 border border-gray-200 rounded-2xl bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Wallet Connection</p>
                    <p className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full bg-black block"></span>
                      OKX Wallet
                    </p>
                  </div>
                  {address ? (
                    <div className="text-right">
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1 inline-block">Connected</span>
                      <p className="text-xs text-gray-500">{formatAddress(address)}</p>
                    </div>
                  ) : (
                    <button 
                      onClick={connect}
                      className="text-xs font-semibold text-pink-600 hover:text-pink-700"
                    >
                      Connect Now
                    </button>
                  )}
                </div>

                <div className="p-4 border border-gray-200 rounded-2xl bg-gray-50 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Network</p>
                    <p className="text-sm font-semibold text-gray-900">X Layer Mainnet</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-700 bg-gray-200 px-2 py-0.5 rounded-full">Active</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-500 text-sm">Premium SkinSaver Audit</span>
                  <span className="text-gray-900 font-semibold">5 USDT</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 text-sm">Network Fee</span>
                  <span className="text-emerald-600 font-semibold text-sm">Gasless (x402)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 font-bold text-lg">You Pay</span>
                  <span className="text-pink-600 font-bold text-xl">5 USDT</span>
                </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full h-14 rounded-full bg-pink-500 text-white font-bold text-base hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-pink-500/20"
              >
                {paymentState === 'signing' ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Awaiting Wallet Signature...
                  </>
                ) : !address ? (
                  "Connect Wallet to Pay"
                ) : (
                  <>
                    <Lock size={18} /> Pay & Unlock 5 USDT
                  </>
                )}
              </button>
              
              <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={14} /> Secure, encrypted, off-chain signature.
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
