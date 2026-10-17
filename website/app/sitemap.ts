import type { MetadataRoute } from 'next';
import { pages, docHref } from '@/lib/catalog';
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  return origin
    ? ['/', '/brand', ...pages.map((page) => docHref(page.slug))].map(
        (path) => ({ url: `${origin}${path}` }),
      )
    : [];
}
