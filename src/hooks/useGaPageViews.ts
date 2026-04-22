import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { getGaMeasurementId } from '@/analytics/ga';

/**
 * Envia pageview em SPAs sempre que a rota (pathname + query) muda.
 */
export function useGaPageViews(): void {
  const location = useLocation();
  const lastSentRef = useRef<{ page: string; at: number } | null>(null);

  useEffect(() => {
    if (!getGaMeasurementId()) return;

    const page = `${location.pathname}${location.search}`;
    const now = Date.now();
    const last = lastSentRef.current;
    if (last && last.page === page && now - last.at < 400) return;
    lastSentRef.current = { page, at: now };

    ReactGA.send({ hitType: 'pageview', page });
  }, [location.pathname, location.search]);
}
