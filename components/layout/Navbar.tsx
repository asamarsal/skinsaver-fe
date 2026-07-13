'use client';
import { useState } from 'react';
import Link from "next/link";
import { Sparkles, ShoppingBag, Menu, X, Camera } from "lucide-react";
import OkxWalletConnect from "@/components/wallet/OkxWalletConnect";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-50 text-pink-500">
            <Sparkles size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">
            SkinSaver<span className="text-pink-500">.AI</span>
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1.5">
            <Camera size={16} /> Scan Selfie
          </Link>
          <Link href="/wishlist" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1.5">
            <ShoppingBag size={16} /> Wishlist
          </Link>
          
          <OkxWalletConnect />
        </div>

        {/* Mobile Navigation Toggle & Wallet */}
        <div className="flex md:hidden items-center gap-2">
          <OkxWalletConnect />
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 text-gray-600 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-xl py-4 px-4 flex flex-col gap-3 animate-in slide-in-from-top-2">
          <Link 
            href="/" 
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium active:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-pink-100 text-pink-500 flex items-center justify-center">
              <Camera size={16} />
            </div>
            Scan Selfie
          </Link>
          <Link 
            href="/wishlist" 
            onClick={() => setIsMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium active:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center">
              <ShoppingBag size={16} />
            </div>
            My Wishlist
          </Link>
        </div>
      )}
    </nav>
  );
}
