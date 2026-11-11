const productionSiteUrl = 'https://www.daisi.name.ng';
const localSiteUrl = 'http://localhost:3000';

const configuredLocalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '');

export const siteUrl = process.env.NODE_ENV === 'production'
  ? productionSiteUrl
  : configuredLocalSiteUrl || localSiteUrl;
