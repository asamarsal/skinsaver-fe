'use client';

import { useEffect, useState } from 'react';
import WishlistEmptyView from './empty/page';
import WishlistResultView from './result/page';

export default function WishlistPage() {
  const [hasData, setHasData] = useState<boolean | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem('skinsaver_audit_results');
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        // Valid if has products array with at least 1 item
        setHasData(Array.isArray(parsed?.products) && parsed.products.length > 0);
      } catch {
        setHasData(false);
      }
    } else {
      setHasData(false);
    }
  }, []);

  // Still loading sessionStorage
  if (hasData === null) return null;

  return hasData ? <WishlistResultView /> : <WishlistEmptyView />;
}
