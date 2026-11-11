import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/site';

export default function robots():MetadataRoute.Robots {
  return {
    rules:[{userAgent:'*',allow:'/',disallow:'/api/'},{userAgent:'GPTBot',disallow:'/'},{userAgent:'ClaudeBot',disallow:'/'},{userAgent:'OAI-SearchBot',allow:'/'},{userAgent:'Claude-SearchBot',allow:'/'},{userAgent:'Claude-User',allow:'/'}],
    sitemap:`${siteUrl}/sitemap.xml`,
  };
}
