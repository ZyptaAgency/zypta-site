import { MetadataRoute } from 'next';

const SITE_URL = 'https://zypta.be';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['fr', 'en'];
  const paths = ['', '/about', '/services', '/contact'];

  const urls: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ];

  for (const locale of locales) {
    for (const path of paths) {
      const fullPath = path ? `/${locale}${path}` : `/${locale}`;
      urls.push({
        url: `${SITE_URL}${fullPath}`,
        lastModified: new Date(),
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      });
    }
  }

  return urls;
}
