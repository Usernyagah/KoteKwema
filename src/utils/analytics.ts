// Analytics utility for tracking page views and events
// Replace with your actual analytics service (Google Analytics, etc.)

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export const trackPageView = (path: string, title?: string) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.VITE_GA_MEASUREMENT_ID || '', {
      page_path: path,
      page_title: title,
    });
  }

  // Custom analytics tracking
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: 'page_view',
      page_path: path,
      page_title: title,
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Page view tracked:', { path, title });
  }
};

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  // Google Analytics 4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  // Custom analytics tracking
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventParams,
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Event tracked:', { eventName, eventParams });
  }
};

// Initialize analytics (call this in your main.tsx or App.tsx)
export const initAnalytics = () => {
  // Add your analytics initialization code here
  // Example for Google Analytics:
  /*
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.VITE_GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', process.env.VITE_GA_MEASUREMENT_ID);
  */

  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics initialized (development mode)');
  }
};

