import type { Metadata } from 'next';
import HeroSection from '@/components/landing/HeroSection';
import WalletStatusPanel from '@/components/landing/WalletStatusPanel';
import SkinScanCard from '@/components/dashboard/SkinScanCard';
import WishlistAuditCard from '@/components/dashboard/WishlistAuditCard';
import ProductRecommendationsCard from '@/components/dashboard/ProductRecommendationsCard';
import RoutineBuilderCard from '@/components/dashboard/RoutineBuilderCard';
import PremiumReportCard from '@/components/dashboard/PremiumReportCard';
import AspIntegrationCard from '@/components/dashboard/AspIntegrationCard';
import DashboardFooter from '@/components/layout/DashboardFooter';

export const metadata: Metadata = {
  title: 'SkinSaver AI | Dashboard',
  description: 'AI-powered skincare copilot dashboard.',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans w-full px-[1%] sm:px-[2%] lg:px-[2.5%]">

      {/* ── BACKGROUND ────────────────────────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[#fbfbfa]">
        <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-pink-50/60 rounded-full blur-[120px]" />
      </div>

      <div className="flex flex-col gap-4 md:gap-6 w-full">
        {/* Top Section: Hero + Wallet */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 w-full">
          <div className="flex-1 min-w-0">
            <HeroSection />
          </div>
          <div className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
            <WalletStatusPanel />
          </div>
        </div>

        {/* Baris 1: 4 Kartu */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 w-full mt-2 md:mt-4">
          <SkinScanCard />
          <WishlistAuditCard />
          <ProductRecommendationsCard />
          <RoutineBuilderCard />
        </div>

        {/* Baris 2: 2 Kartu */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-4 md:gap-6 w-full">
          <div className="order-2 lg:order-1">
            <PremiumReportCard />
          </div>
          <div className="order-1 lg:order-2">
            <AspIntegrationCard />
          </div>
        </div>
      </div>

      <DashboardFooter />
    </div>
  );
}
