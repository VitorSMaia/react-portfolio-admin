
import ReactGA from 'react-ga4';

export function getGaMeasurementId(): string | undefined {
  const id = process.env.NEXT_PUBLIC_GA_ID?.trim();
  return id || undefined;
}

export function initGa(): void {
  const id = getGaMeasurementId();
  if (!id) return;
  ReactGA.initialize(id);
}
