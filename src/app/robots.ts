import { MetadataRoute } from 'next';
import { absoluteUrl } from '../config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/termin-antwort'],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'PerplexityBot',
          'OAI-SearchBot',
          'Google-Extended',
          'cohere-ai'
        ],
        allow: ['/', '/llms.txt'],
        disallow: ['/admin', '/api/', '/termin-antwort'],
      }
    ],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
