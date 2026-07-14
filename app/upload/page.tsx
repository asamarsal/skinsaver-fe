'use client';

import React from 'react';
import SelfieUploader from '@/components/upload/SelfieUploader';
import { ShieldCheck } from 'lucide-react';

export default function UploadPage() {
  return (
    <div className="w-full flex-1 bg-gray-50 py-12 px-4 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-pink-100/50 rounded-full blur-[100px] opacity-60 -z-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} /> Step 1: Skin Analysis
          </div>
        </div>

        {/* Render SelfieUploader component */}
        <SelfieUploader />

        {/* Privacy details */}
        <div className="text-center mt-8 flex flex-col items-center justify-center gap-2">
          <span className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
            <ShieldCheck size={14} className="text-gray-400" />
            Your privacy matters. We run on-chain zero-knowledge proofs and secure storage.
          </span>
        </div>
      </div>
    </div>
  );
}
