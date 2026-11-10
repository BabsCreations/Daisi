// Render the project's actual server components to static HTML for a fast local preview.
// The production app remains Next.js; this fallback is useful when its native compiler is unavailable.
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const root = path.resolve(__dirname, '..');
const output = path.join(root, 'preview-site');
const ts = require(path.join(root, 'node_modules/typescript'));
const React = require(path.join(root, 'node_modules/react'));
const { renderToStaticMarkup } = require(path.join(root, 'node_modules/react-dom/server'));

for (const ext of ['.ts', '.tsx']) {
  require.extensions[ext] = (mod, filename) => {
    const source = fs.readFileSync(filename, 'utf8');
    const result = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
      fileName: filename,
    });
    mod._compile(result.outputText, filename);
  };
}

const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request, parent, isMain, options) {
  if (request.startsWith('@/')) request = path.join(root, 'src', request.slice(2));
  return originalResolve.call(this, request, parent, isMain, options);
};

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request === 'next/link') {
    return function Link({ href, children, ...props }) {
      return React.createElement('a', { href, ...props }, children);
    };
  }
  if (request.endsWith('.css')) return {};
  return originalLoad.call(this, request, parent, isMain);
};

const content = require(path.join(root, 'src/data/content.ts'));
const { Shell } = require(path.join(root, 'src/components/Site.tsx'));
const route = (file) => require(path.join(root, 'src/app', file)).default;
const entries = [
  { path: '/', title: 'Home', render: () => route('page.tsx')() },
  { path: '/about/', title: 'About Daisi', render: () => route('about/page.tsx')() },
  { path: '/services/', title: 'Services', render: () => route('services/page.tsx')() },
  { path: '/portfolio/', title: 'Portfolio', render: () => route('portfolio/page.tsx')() },
  { path: '/insights/', title: 'Insights', render: () => route('insights/page.tsx')() },
  { path: '/contact/', title: 'Contact', render: () => route('contact/page.tsx')() },
  ...content.services.map((item) => ({ path: `/${item.slug}/`, title: item.title, render: () => route('[service]/page.tsx')({ params: Promise.resolve({ service: item.slug }) }) })),
  ...content.cases.map((item) => ({ path: `/portfolio/${item.slug}/`, title: item.title, render: () => route('portfolio/[slug]/page.tsx')({ params: Promise.resolve({ slug: item.slug }) }) })),
  ...content.articles.map((item) => ({ path: `/insights/${item.slug}/`, title: item.title, render: () => route('insights/[slug]/page.tsx')({ params: Promise.resolve({ slug: item.slug }) }) })),
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const css = fs.readFileSync(path.join(root, 'src/app/globals.css'), 'utf8');

(async () => {
  fs.rmSync(output, { recursive: true, force: true });
  fs.mkdirSync(path.join(output, 'images'), { recursive: true });
  fs.cpSync(path.join(root, 'public/images'), path.join(output, 'images'), { recursive: true });
  fs.copyFileSync(path.join(root, 'src/app/icon.svg'), path.join(output, 'icon.svg'));
  for (const item of entries) {
    const element = React.createElement(Shell, null, await item.render());
    const html = renderToStaticMarkup(element);
    const document = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" type="image/svg+xml" href="/icon.svg"><title>${escapeHtml(item.title)} | Daisi</title><meta name="description" content="Notion project management and practical business systems by Daisi."><style>${css}</style></head><body>${html}</body></html>`;
    const destination = path.join(output, item.path.replace(/^\/+|\/+$/g, ''));
    fs.mkdirSync(destination, { recursive: true });
    fs.writeFileSync(path.join(destination, 'index.html'), document, 'utf8');
  }
  console.log(`Rendered ${entries.length} pages to ${output}`);
})();
