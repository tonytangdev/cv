import { AppConfig, localePath } from '@/app.config';
import { getData } from '@/data';
import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    AppConfig.locales.map(({ id }) => [id, `${AppConfig.host}${localePath(id)}`])
  );

  return AppConfig.locales.map(({ id }) => ({
    url: `${AppConfig.host}${localePath(id)}`,
    lastModified: getData(id).lastUpdatedAt,
    changeFrequency: 'monthly',
    priority: id === AppConfig.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
