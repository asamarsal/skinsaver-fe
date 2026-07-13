import SelfieUploader from "@/components/upload/SelfieUploader";
import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkinSaver AI | Smarter Skincare Choices",
  description: "Upload a selfie, share your wishlist, and let AI detect active ingredient conflicts, find cheaper alternatives, and build a routine that fits your budget.",
};

export default function Home() {
  return (
    <div className="w-full flex-1 bg-gray-50 pb-20 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-pink-100/50 rounded-full blur-[100px] opacity-60 -z-10 pointer-events-none" />

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 container mx-auto text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-semibold uppercase tracking-wider mb-8">
          <ShieldCheck size={14} />
          Powered by OKX.AI A2MCP ASP
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
          Smarter Skincare Choices, <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
            Powered by Your Selfie.
          </span>
        </h1>
        
        <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed">
          Stop guessing if that viral product works for you. Upload a selfie, share your wishlist, and let AI detect active ingredient conflicts, find cheaper alternatives, and build a routine that fits your budget.
        </p>
      </section>

      {/* Main Upload Area */}
      <section className="px-4 container mx-auto relative z-10">
        <SelfieUploader />
        
        {/* ZK Privacy Note */}
        <div className="text-center mt-8 flex flex-col items-center justify-center gap-2">
          <span className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
            <ShieldCheck size={14} /> 
            Your data is private and secure. We never store your raw selfie on-chain.
          </span>
        </div>
      </section>
    </div>
  );
}
