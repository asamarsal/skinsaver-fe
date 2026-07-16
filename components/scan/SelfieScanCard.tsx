'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Camera, ShieldCheck, Sparkles, X, Lightbulb } from 'lucide-react';

const trustBadges = [
  { icon: ShieldCheck, label: 'Private & Secure',  sub: 'Your data is encrypted' },
  { icon: Sparkles,    label: 'AI-Powered',         sub: 'Advanced skin analysis' },
  { icon: () => <div className="w-3 h-3 bg-black rounded text-white text-[7px] flex items-center justify-center font-black">X</div>, label: 'On X Layer', sub: 'Decentralized & Verifiable' },
];

interface SelfieScanCardProps {
  onFileReady?: (file: File, preview: string) => void;
}

export default function SelfieScanCard({ onFileReady }: SelfieScanCardProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (selected: File) => {
    if (!selected.type.match(/image\/(jpeg|png|webp)/)) return;
    if (selected.size > 10 * 1024 * 1024) return;
    const url = URL.createObjectURL(selected);
    setFile(selected);
    setPreview(url);
    onFileReady?.(selected, url);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) handleFile(e.target.files[0]);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  }, []);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const clear = () => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-5 flex flex-col h-full hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">1. Selfie Scan</h2>
        <button className="flex items-center gap-1 text-[11px] font-semibold text-pink-500 hover:text-pink-600">
          <Lightbulb size={12} /> Tips
        </button>
      </div>

      {/* Upload Zone */}
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all p-6 text-center min-h-[180px]
            ${isDragging ? 'border-pink-400 bg-pink-50' : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50/40'}`}
        >
          <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <Camera size={28} className="text-pink-500" />
          </div>
          <p className="text-sm font-bold text-gray-800 mb-1">Upload a clear selfie</p>
          <p className="text-xs text-gray-400 mb-4">or drag and drop your photo here</p>
          <button
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-xs font-bold rounded-full transition-colors shadow-sm"
          >
            Choose Photo
          </button>
          <p className="text-[10px] text-gray-400 mt-3">Supports JPG, PNG (Max 10MB)</p>

          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} className="hidden" />
          <input ref={cameraInputRef} type="file" accept="image/jpeg,image/png,image/webp" capture="user" onChange={handleChange} className="hidden" />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center gap-3">
          <div className="relative w-full max-h-[200px] rounded-2xl overflow-hidden border border-gray-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview!} alt="Selfie preview" className="w-full h-[200px] object-cover" />
            <button onClick={clear} className="absolute top-2 right-2 bg-gray-900/60 backdrop-blur-sm text-white rounded-full p-1.5 hover:bg-gray-900 transition-colors">
              <X size={14} />
            </button>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-pink-500 hover:text-pink-600 font-semibold"
          >
            Choose a different photo
          </button>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handleChange} className="hidden" />
        </div>
      )}

      {/* Trust Badges */}
      <div className="mt-4 pt-3 border-t border-gray-50 grid grid-cols-3 gap-2">
        {trustBadges.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex flex-col items-center text-center gap-0.5">
            <div className="w-5 h-5 flex items-center justify-center text-gray-400 mb-0.5">
              <Icon size={12} />
            </div>
            <p className="text-[9px] font-bold text-gray-700 leading-tight">{label}</p>
            <p className="text-[8px] text-gray-400 leading-tight">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
