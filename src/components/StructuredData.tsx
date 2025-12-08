import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface StructuredDataProps {
  type?: 'Organization' | 'WebSite' | 'BreadcrumbList' | 'Article';
  data?: Record<string, unknown>;
}

const StructuredData = ({ type = 'Organization', data }: StructuredDataProps) => {
  const location = useLocation();

  useEffect(() => {
    const baseUrl = 'https://kotekwema.com';
    const currentUrl = `${baseUrl}${location.pathname}`;

    let structuredData: Record<string, unknown> = {};

    switch (type) {
      case 'Organization':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Kote Kwema',
          url: baseUrl,
          logo: `${baseUrl}/logo.jpg`,
          description: 'Award-winning architecture firm creating innovative and sustainable designs across residential, commercial, and cultural spaces in Nairobi, Kenya.',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Nairobi',
            addressCountry: 'KE',
          },
          sameAs: [
            'https://x.com/KoteKwema',
          ],
          ...data,
        };
        break;

      case 'WebSite':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Kote Kwema',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
          ...data,
        };
        break;

      case 'BreadcrumbList':
        if (data && Array.isArray(data.itemListElement)) {
          structuredData = {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: data.itemListElement,
          };
        }
        break;

      case 'Article':
        structuredData = {
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data?.headline || 'Kote Kwema Architecture',
          url: currentUrl,
          ...data,
        };
        break;

      default:
        structuredData = data || {};
    }

    // Remove existing structured data script
    const existingScript = document.getElementById('structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data script
    const script = document.createElement('script');
    script.id = 'structured-data';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [type, data, location.pathname]);

  return null;
};

export default StructuredData;

