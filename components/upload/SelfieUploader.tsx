'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Camera, ShieldAlert, Sparkles, Check, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

export default function SelfieUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cleanup object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // Ephemeral preview, strictly client-side. Will not be persisted anywhere in local storage.
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    
    // As per security.md, we send multipart/form-data to secure backend endpoint
    // NO saving to localStorage or on-chain.
    const formData = new FormData();
    formData.append('selfie_image', file);

    try {
      // Call Backend ZK-Privacy endpoint
      const response = await api.post('/scan/selfie', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Save ephemeral scan results for the next wizard steps
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('skinsaver_scan_results', JSON.stringify(response.data.data));
      }
      
      // Move to the next step defined in user-flow.md (Wishlist/Profile)
      router.push('/wishlist');
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to analyze selfie. Please make sure your wallet is connected and try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-2">
          <Sparkles className="text-pink-500" size={24} />
          Scan Your Skin
        </h2>
        <p className="text-gray-500 text-sm">
          Upload a clean, well-lit selfie. Our AI will analyze your skin type and concerns to personalize your routine.
        </p>
      </div>

      {!file ? (
        <div 
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-2xl p-6 md:p-10 flex flex-col items-center justify-center cursor-pointer hover:bg-pink-50 hover:border-pink-300 transition-all group min-h-[200px] md:min-h-[240px]"
        >
          <div className="w-16 h-16 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Camera size={32} />
          </div>
          <span className="text-gray-900 font-medium mb-1">Click to upload or take a photo</span>
          <span className="text-gray-500 text-xs mb-4">JPG, PNG, WEBP (Max 5MB)</span>
          
          <div className="flex gap-3 mt-2 w-full justify-center">
            <button
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium hover:bg-gray-50 text-gray-700"
            >
              Upload File
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); cameraInputRef.current?.click(); }}
              className="px-4 py-2 bg-pink-100 border border-pink-200 rounded-full text-sm font-medium hover:bg-pink-200 text-pink-700 flex items-center gap-1.5"
            >
              <Camera size={14} /> Buka Kamera
            </button>
          </div>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/jpeg, image/png, image/webp"
            className="hidden" 
          />
          <input 
            type="file" 
            ref={cameraInputRef} 
            onChange={handleFileChange} 
            accept="image/jpeg, image/png, image/webp"
            capture="user"
            className="hidden" 
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl overflow-hidden mb-6 border border-gray-200 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview!} alt="Selfie preview" className="object-cover w-full h-full" />
            <button 
              onClick={() => { setFile(null); setPreview(null); }}
              className="absolute top-2 right-2 bg-gray-900/60 backdrop-blur-sm text-white rounded-full p-1.5 hover:bg-gray-900 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 w-full max-w-sm mb-6">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-3">Selfie Guidelines Met</h4>
            <ul className="text-sm text-emerald-600 space-y-2">
              <li className="flex items-center gap-2"><Check size={16} /> Bare face (no makeup)</li>
              <li className="flex items-center gap-2"><Check size={16} /> Good natural lighting</li>
              <li className="flex items-center gap-2"><Check size={16} /> No filters applied</li>
            </ul>
          </div>

          <button 
            onClick={handleUpload}
            disabled={isUploading}
            className="w-full h-12 rounded-full bg-pink-500 text-white font-medium hover:bg-pink-600 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isUploading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
            {isUploading ? "Analyzing visual data..." : "Analyze Selfie"}
          </button>
        </div>
      )}

      {/* Mandatory Medical Disclaimer from compliance.md */}
      <div className="mt-8 bg-amber-50/50 rounded-xl p-4 flex items-start gap-3 border border-amber-100/50">
        <ShieldAlert className="text-amber-500 shrink-0 mt-0.5" size={18} />
        <p className="text-xs text-gray-500 leading-relaxed">
          SkinSaver AI provides visual observations for shopping recommendations. It cannot diagnose skin conditions. Always consult a dermatologist for medical concerns.
        </p>
      </div>
    </div>
  );
}
