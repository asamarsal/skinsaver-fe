'use client';

import React, { useRef, useState } from 'react';
import { ScanLine, Camera, X, Loader2, ShieldCheck, ShieldAlert, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '@/lib/api';

interface IngredientParsed {
  name: string;
  function: string;
  flag: 'safe' | 'caution' | 'avoid';
  reason: string;
}

interface ScanResult {
  product_name_detected: string;
  ingredients_raw: string;
  ingredients_parsed: IngredientParsed[];
  warnings: string[];
  overall_safety: 'safe' | 'caution' | 'avoid';
  summary: string;
}

const flagConfig = {
  safe:    { color: 'text-emerald-700 bg-emerald-50 border-emerald-200',  icon: <ShieldCheck size={12} />, label: 'Safe' },
  caution: { color: 'text-amber-700 bg-amber-50 border-amber-200',       icon: <AlertTriangle size={12} />, label: 'Caution' },
  avoid:   { color: 'text-red-700 bg-red-50 border-red-200',             icon: <ShieldAlert size={12} />, label: 'Avoid' },
};

const safetyBanner = {
  safe:    { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', icon: <ShieldCheck size={20} className="text-emerald-600" />, label: '✅ Overall Safe' },
  caution: { bg: 'bg-amber-50 border-amber-200',     text: 'text-amber-800',   icon: <AlertTriangle size={20} className="text-amber-600" />, label: '⚠️ Use with Caution' },
  avoid:   { bg: 'bg-red-50 border-red-200',         text: 'text-red-800',     icon: <ShieldAlert size={20} className="text-red-600" />,   label: '🚫 Not Recommended' },
};

export default function IngredientScanner() {
  const cameraRef = useRef<HTMLInputElement>(null);
  const uploadRef = useRef<HTMLInputElement>(null);
  const [scanning, setScanning]       = useState(false);
  const [result, setResult]           = useState<ScanResult | null>(null);
  const [error, setError]             = useState<string | null>(null);
  const [showRaw, setShowRaw]         = useState(false);
  const [preview, setPreview]         = useState<string | null>(null);

  const handleImage = async (file: File) => {
    setError(null);
    setResult(null);
    setPreview(URL.createObjectURL(file));
    setScanning(true);

    const form = new FormData();
    form.append('packaging_image', file);

    try {
      const res = await api.post('/asp/scan-ingredients', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data.data);
    } catch (err: any) {
      const msg = err?.response?.data?.message ?? 'Failed to scan ingredients. Please try again.';
      setError(msg);
    } finally {
      setScanning(false);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImage(file);
    e.target.value = '';
  };

  const reset = () => {
    setResult(null);
    setPreview(null);
    setError(null);
    setShowRaw(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-violet-100 text-violet-600 rounded-xl flex items-center justify-center">
          <ScanLine size={20} />
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-base">Ingredient Scanner</h3>
          <p className="text-xs text-gray-500">Photo the back of any cosmetic product to check safety</p>
        </div>
      </div>

      {/* Hidden inputs */}
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFileChange} />
      <input ref={uploadRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />

      {/* Scan Buttons (when no result) */}
      {!result && !scanning && (
        <div className="flex gap-3">
          <button
            id="btn-scan-camera"
            onClick={() => cameraRef.current?.click()}
            className="flex-1 h-12 rounded-xl bg-violet-600 text-white font-medium hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <Camera size={16} /> Scan with Camera
          </button>
          <button
            id="btn-scan-upload"
            onClick={() => uploadRef.current?.click()}
            className="h-12 px-4 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors flex items-center justify-center text-sm font-medium"
          >
            Upload
          </button>
        </div>
      )}

      {/* Loading State */}
      {scanning && (
        <div className="flex flex-col items-center justify-center py-10 gap-4">
          {preview && (
            <div className="w-24 h-24 rounded-xl overflow-hidden border border-gray-200 mb-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={preview} alt="Scanning..." className="object-cover w-full h-full" />
            </div>
          )}
          <Loader2 size={28} className="animate-spin text-violet-600" />
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800">Extracting ingredients & analyzing...</p>
            <p className="text-xs text-gray-500 mt-1">AI is reading the packaging. This may take 10–20 seconds.</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700 flex items-start gap-2 mt-3">
          <ShieldAlert size={16} className="mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold mb-1">Scan Failed</p>
            <p>{error}</p>
            <button onClick={reset} className="mt-2 text-xs underline text-red-600">Try again</button>
          </div>
        </div>
      )}

      {/* Result Panel */}
      {result && !scanning && (
        <div className="mt-4 space-y-4">
          {/* Preview + Product Name */}
          <div className="flex items-center gap-4">
            {preview && (
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={preview} alt="Scanned" className="object-cover w-full h-full" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-xs text-gray-500">Detected Product</p>
              <p className="font-bold text-gray-900 truncate">{result.product_name_detected || 'Unknown Product'}</p>
            </div>
            <button onClick={reset} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors shrink-0">
              <X size={14} />
            </button>
          </div>

          {/* Overall Safety Banner */}
          {(() => {
            const banner = safetyBanner[result.overall_safety] ?? safetyBanner.caution;
            return (
              <div className={`flex items-start gap-3 p-4 rounded-xl border ${banner.bg}`}>
                {banner.icon}
                <div>
                  <p className={`font-bold text-sm ${banner.text}`}>{banner.label}</p>
                  <p className={`text-xs mt-0.5 ${banner.text} opacity-80`}>{result.summary}</p>
                </div>
              </div>
            );
          })()}

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="space-y-1.5">
              {result.warnings.map((w, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-amber-800 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
                  <AlertTriangle size={12} className="mt-0.5 shrink-0" /> {w}
                </div>
              ))}
            </div>
          )}

          {/* Ingredient List */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Ingredients ({result.ingredients_parsed.length})</h4>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {result.ingredients_parsed.map((ing, i) => {
                const cfg = flagConfig[ing.flag] ?? flagConfig.caution;
                return (
                  <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg border border-gray-100 bg-gray-50">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border shrink-0 ${cfg.color}`}>
                      {cfg.icon} {cfg.label}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 leading-tight">{ing.name}</p>
                      <p className="text-xs text-gray-500">{ing.function}{ing.reason ? ` · ${ing.reason}` : ''}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Raw Ingredients Accordion */}
          {result.ingredients_raw && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowRaw(!showRaw)}
                className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                View Raw Ingredients Text
                {showRaw ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              </button>
              {showRaw && (
                <div className="px-4 py-3 text-xs text-gray-600 leading-relaxed bg-white max-h-32 overflow-y-auto">
                  {result.ingredients_raw}
                </div>
              )}
            </div>
          )}

          {/* Scan Again */}
          <button
            onClick={() => { reset(); setTimeout(() => cameraRef.current?.click(), 100); }}
            className="w-full h-11 rounded-xl border border-violet-200 bg-violet-50 text-violet-700 text-sm font-medium hover:bg-violet-100 transition-colors flex items-center justify-center gap-2"
          >
            <Camera size={16} /> Scan Another Product
          </button>

          {/* Compliance Disclaimer */}
          <p className="text-[10px] text-gray-400 text-center leading-relaxed">
            SkinSaver AI provides visual observations based on cosmetic databases. This is not medical advice.
          </p>
        </div>
      )}
    </div>
  );
}
