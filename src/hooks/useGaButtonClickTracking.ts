import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { getGaMeasurementId } from '@/analytics/ga';

function resolveButtonLabel(el: HTMLElement): string {
  const explicit =
    el.getAttribute('data-ga-label') ||
    el.getAttribute('aria-label') ||
    el.getAttribute('title');
  if (explicit?.trim()) return explicit.trim();

  const text = el.textContent?.replace(/\s+/g, ' ').trim();
  if (text) return text;

  const name = (el as HTMLButtonElement).name;
  if (name) return `name:${name}`;

  return '(sem rótulo)';
}

/**
 * Regista cliques em &lt;button&gt; e inputs de tipo botão/submit/reset (delegação no documento).
 */
export function useGaButtonClickTracking(): void {
  const location = useLocation();
  const locationRef = useRef(location);
  locationRef.current = location;

  useEffect(() => {
    if (!getGaMeasurementId()) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const el = target.closest(
        'button, input[type="button"], input[type="submit"], input[type="reset"]',
      ) as HTMLElement | null;
      if (!el) return;

      if (el instanceof HTMLButtonElement && el.disabled) return;
      if (el instanceof HTMLInputElement && el.disabled) return;

      const label = resolveButtonLabel(el);
      const loc = locationRef.current;
      const route = `${loc.pathname}${loc.search}`;
      const combinedLabel = `${route} — ${label}`.slice(0, 500);

      ReactGA.event({
        category: 'Interação',
        action: 'clique_botao',
        label: combinedLabel,
      });
    };

    document.addEventListener('pointerdown', onPointerDown, true);
    return () => document.removeEventListener('pointerdown', onPointerDown, true);
  }, []);
}
