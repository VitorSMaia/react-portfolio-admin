import { useGaButtonClickTracking } from '@/hooks/useGaButtonClickTracking';
import { useGaPageViews } from '@/hooks/useGaPageViews';

/**
 * Deve renderizar-se dentro de &lt;BrowserRouter&gt;.
 */
export default function GaListeners() {
  useGaPageViews();
  useGaButtonClickTracking();
  return null;
}
