import type { Metadata } from 'next';
import ScanHeroSection from '@/components/scan/ScanHeroSection';
import WalletStatusPanel from '@/components/landing/WalletStatusPanel';
import SelfieScanCard from '@/components/scan/SelfieScanCard';
import FacialScanVisualizationCard from '@/components/scan/FacialScanVisualizationCard';
import AiInsightsCard from '@/components/scan/AiInsightsCard';
import ScanAspPanel from '@/components/scan/ScanAspPanel';
import SkinGoalsCard from '@/components/scan/SkinGoalsCard';
import RunScanCTA from '@/components/scan/RunScanCTA';
import PremiumAnalysisCTA from '@/components/scan/PremiumAnalysisCTA';
import DashboardFooter from '@/components/layout/DashboardFooter';

export const metadata: Metadata = {
  title: 'SkinSaver AI | Selfie Scan',
  description: 'AI-powered 5-dimensional skin analysis. See your skin clearly, personalize your glow.',
};

export default function SelfieScanPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans w-full px-[1%] sm:px-[2%] lg:px-[2.5%]">

      {/* ── BACKGROUND ──────────────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#fbfbfa]">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-pink-50/60 rounded-full blur-[120px]" />
      </div>

      <div className="flex flex-col gap-4 md:gap-6 w-full">

        {/* ── ROW 1: Hero + Wallet ────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full">
          <div className="flex-1 min-w-0">
            <ScanHeroSection />
          </div>
          <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
            <WalletStatusPanel />
          </div>
        </div>

        {/* ── ROW 2: 3 Main Cards + ASP Sidebar ───────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full pt-2 md:pt-4">
          {/* 3 main cards */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_0.85fr] gap-4 md:gap-6 min-w-0">
            <SelfieScanCard />
            <FacialScanVisualizationCard />
            <AiInsightsCard />
          </div>
          {/* ASP Sidebar */}
          <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
            <ScanAspPanel />
          </div>
        </div>

        {/* ── ROW 3: Skin Goals + CTAs ─────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full items-stretch">
          {/* Skin Goals — fit content, no extra stretch */}
          <div className="min-w-0 lg:max-w-fit">
            <SkinGoalsCard />
          </div>
          {/* CTA pair — fill remaining space */}
          <div className="flex-1 flex flex-col sm:flex-row gap-4 md:gap-6">
            <div className="flex-1 min-w-0">
              <RunScanCTA />
            </div>
            <div className="flex-1 min-w-0">
              <PremiumAnalysisCTA />
            </div>
          </div>
        </div>

      </div>

      <DashboardFooter />
    </div>
  );
}
