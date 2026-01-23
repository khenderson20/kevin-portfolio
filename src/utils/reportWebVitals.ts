import {
  onCLS,
  onFCP,
  onINP,
  onLCP,
  onTTFB,
  type Metric,
} from 'web-vitals';

type ReportHandler = (metric: Metric) => void;

/**
 * Web Vitals reporting.
 *
 * Default behavior:
 * - DEV: logs to console
 * - PROD: no-op (wire to analytics when available)
 */
export function reportWebVitals(handler?: ReportHandler) {
  const defaultHandler: ReportHandler = (metric) => {
    if (import.meta.env.DEV) {
      // Log to console in development
      console.log('[web-vitals]', metric);
    }
  };

  const h = handler ?? defaultHandler;

  onCLS(h);
  onFCP(h);
  onINP(h);
  onLCP(h);
  onTTFB(h);
}
