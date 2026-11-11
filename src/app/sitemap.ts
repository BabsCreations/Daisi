import type {MetadataRoute} from 'next';
import {services,articles,cases} from '@/data/content';
import {siteUrl} from '@/lib/site';

export default function sitemap():MetadataRoute.Sitemap {
  const pages=['/','/about','/services','/portfolio','/insights','/contact'];
  const entries:MetadataRoute.Sitemap=[
    ...pages.map(path=>({url:new URL(path,siteUrl).toString(),changeFrequency:'monthly' as const,priority:path==='/'?1:.7})),
    ...services.map(item=>({url:new URL(`/${item.slug}`,siteUrl).toString(),changeFrequency:'monthly' as const,priority:.8})),
    ...articles.map(item=>({url:new URL(`/insights/${item.slug}`,siteUrl).toString(),changeFrequency:'yearly' as const,priority:.6})),
    ...cases.map(item=>({url:new URL(`/portfolio/${item.slug}`,siteUrl).toString(),changeFrequency:'monthly' as const,priority:.6})),
  ];
  const seenPaths=new Set<string>();
  return entries.filter(entry=>{
    const path=new URL(entry.url).pathname;
    if(seenPaths.has(path)) return false;
    seenPaths.add(path);
    return true;
  });
}
