import { MetadataRoute } from 'next';

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
    sitemap: 'https://skineinfachschoen.de/sitemap.xml',
  };
}
