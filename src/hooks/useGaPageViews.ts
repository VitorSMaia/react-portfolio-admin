'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import ReactGA from 'react-ga4';
import { getGaMeasurementId } from '@/analytics/ga';

export function useGaPageViews(): void {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastSentRef = useRef<{ page: string; at: number } | null>(null);

  useEffect(() => {
    if (!getGaMeasurementId()) return;

    const search = searchParams?.toString() ?? '';
    const page = `${pathname}${search ? `?${search}` : ''}`;
    const now = Date.now();
    const last = lastSentRef.current;
    if (last && last.page === page && now - last.at < 400) return;
    lastSentRef.current = { page, at: now };

    ReactGA.send({ hitType: 'pageview', page });
  }, [pathname, searchParams]);
}
