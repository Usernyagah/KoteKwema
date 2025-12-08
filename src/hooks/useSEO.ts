import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
}: SEOProps) => {
  useEffect(() => {
    const baseTitle = 'Kote Kwema - Award-Winning Architecture Firm in Nairobi';
    const baseDescription = 'Award-winning architecture firm creating innovative and sustainable designs across residential, commercial, and cultural spaces in Nairobi, Kenya.';
    const baseUrl = 'https://kotekwema.com';
    const baseImage = '/logo.jpg';

    // Update title
    if (title) {
      document.title = `${title} | ${baseTitle}`;
    }

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, attribute: string = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description || baseDescription);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph tags
    updateMetaTag('og:title', title ? `${title} | ${baseTitle}` : baseTitle, 'property');
    updateMetaTag('og:description', description || baseDescription, 'property');
    updateMetaTag('og:type', type, 'property');
    updateMetaTag('og:url', url || `${baseUrl}${window.location.pathname}`, 'property');
    updateMetaTag('og:image', image || baseImage, 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title ? `${title} | ${baseTitle}` : baseTitle);
    updateMetaTag('twitter:description', description || baseDescription);
    updateMetaTag('twitter:image', image || baseImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url || `${baseUrl}${window.location.pathname}`);
  }, [title, description, keywords, image, url, type]);
};

