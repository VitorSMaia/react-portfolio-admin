'use client';

import { useEffect, Suspense } from 'react';
import { initGa } from '@/analytics/ga';
import { useGaPageViews } from '@/hooks/useGaPageViews';
import { useGaButtonClickTracking } from '@/hooks/useGaButtonClickTracking';

function GaListenersInner() {
  useEffect(() => { initGa(); }, []);
  useGaPageViews();
  useGaButtonClickTracking();
  return null;
}

export default function GaListeners() {
  return (
    <Suspense fallback={null}>
      <GaListenersInner />
    </Suspense>
  );
}
