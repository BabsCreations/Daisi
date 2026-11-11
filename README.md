# Daisi — professional website

A responsive Next.js App Router website for Daisi, a Notion project management and business systems consultant. The project uses TypeScript, custom CSS and Lucide icons.

## Run locally

Install Node.js 20.9 or newer, then from this folder:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Build and serve the production version with `npm run build` and `npm run start`.

If the Next.js native compiler is unavailable, the included fallback preview renders the site’s actual React pages to static HTML, then serves every route locally:

```bash
npm run preview:render
python -m http.server 3000 --bind 127.0.0.1 --directory preview-site
```

This fallback is for visual review and does not provide Next.js runtime features. The contact form posts directly to FormSubmit and will deliver only after its first-use activation email is confirmed.

## Project structure

- `src/app/` — routes, metadata, sitemap and robots configuration
- `src/components/Site.tsx` — shared navigation, footer, CTA and content components
- `src/data/content.ts` — service, case study and article content
- `src/app/globals.css` — responsive design system and page styling
- `public/` — add approved photographs and project screenshots here

Most site copy is in `src/data/content.ts` and the page files. Replace the portrait placeholder with a real supplied portrait. Project pages use the supplied overview documents and screenshots. Confirm client permission before publishing any confidential material.

## Required information before launch

1. Production URL. Production builds use `https://www.daisi.name.ng`, the final destination of the domain redirect, for canonical metadata, sitemap URLs and the robots sitemap reference. Local development uses `http://localhost:3000` by default; `NEXT_PUBLIC_SITE_URL` is an optional local override.
2. Confirm client permission for supplied project details and screenshots.
3. Contact form activation and delivery. The contact form posts to FormSubmit at publishingmadeeasy1@gmail.com. Confirm the first-use activation email from FormSubmit, then send a real test submission and check the inbox and spam folder. FormSubmit handles delivery; this site does not store submissions.
4. Confirm the public email addresses and LinkedIn profile are correct. A genuine portrait can be added if Daisi wants one displayed.
5. Analytics / verification IDs only after the relevant accounts are configured.

Calendly and Upwork use the supplied links. The contact email addresses and LinkedIn URL are supplied by Daisi. Confirm the production domain before launch.

## Deploy

This is a standard Next.js application and can be deployed to Vercel or another Node.js host that supports Next.js. Deploy from this project directory. Production sitemap, robots and canonical URLs use `https://www.daisi.name.ng` automatically; no URL environment variable is required in Vercel. After deployment, open `/sitemap.xml` and `/robots.txt` on the production domain and submit `https://www.daisi.name.ng/sitemap.xml` in Google Search Console. No secret environment variables are currently needed.

## Search setup

- `src/app/sitemap.ts` serves `/sitemap.xml`; `src/app/robots.ts` serves `/robots.txt`.
- Submit `https://www.daisi.name.ng/sitemap.xml` in Google Search Console and Bing Webmaster Tools after deployment.
- The robots policy allows public search crawlers, permits OAI-SearchBot, Claude-SearchBot and Claude-User, and disallows the training crawlers GPTBot and ClaudeBot. Review the policy against the chosen host/CDN rules before launch.
- Add Search Console / Bing verification values through their supported verification method after obtaining real values. Do not paste account secrets into source code.
- `NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_CLARITY_ID` are placeholders only; analytics scripts are not active. Add a consent/privacy approach appropriate to the audience before enabling analytics.
- Review the sitemap after adding/removing content. Portfolio pages are included in the sitemap.
- Article and website structured data are generated from visible site content; the About page includes Person/ProfilePage data. No fabricated ratings, awards or certifications are present.

## Environment variables

Copy `.env.example` to `.env.local` only when configuring the optional public site URL or analytics identifiers. Never place private credentials in `NEXT_PUBLIC_*` variables.

## Notes

Remote Google Fonts are referenced in CSS. For fully self-hosted font delivery, add licensed font files to `public/fonts/` and update `src/app/globals.css`. Portfolio images were supplied in the project reference documents.
