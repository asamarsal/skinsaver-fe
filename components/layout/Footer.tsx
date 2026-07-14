import { ShieldAlert } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-gray-50 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col max-w-2xl">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <ShieldAlert size={16} className="text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-600">
                Medical Disclaimer
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              SkinSaver AI provides visual observations for shopping recommendations. It cannot diagnose skin conditions, nor is it a substitute for professional medical advice. Always consult a dermatologist for medical concerns. Patch test all new products before full application.
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 text-sm text-gray-500">
            <span className="font-medium text-gray-900">SkinSaver AI</span>
            <span>OKX.AI Agent Service Provider</span>
            <span>&copy; {new Date().getFullYear()} All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
