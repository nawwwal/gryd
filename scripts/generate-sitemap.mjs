
import { createClient } from '@sanity/client';
import { format } from 'date-fns';
import fs from 'fs';

const projectId = 'c0rjrvm3';
const dataset = 'production';
const apiVersion = '2023-05-03';

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

async function generateSitemap() {
  const baseUrl = 'https://thegryd.com'; 

  const staticPages = [
    { url: `${baseUrl}/`, changefreq: 'daily', priority: 1.0 },
    { url: `${baseUrl}/about`, changefreq: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/work`, changefreq: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/playground`, changefreq: 'monthly', priority: 0.8 },
  ];

  const projects = await client.fetch(`*[_type == "workProject"]{ "slug": slug.current, "updatedAt": _updatedAt }`);
  const playgroundEntries = await client.fetch(`*[_type == "playgroundEntry"]{ "slug": slug.current, "updatedAt": _updatedAt }`);

  const projectUrls = projects.map(project => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastmod: format(new Date(project.updatedAt), 'yyyy-MM-dd'),
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const playgroundUrls = playgroundEntries.map(entry => ({
    url: `${baseUrl}/playground/${entry.slug}`,
    lastmod: format(new Date(entry.updatedAt), 'yyyy-MM-dd'),
    changefreq: 'weekly',
    priority: 0.7,
  }));

  const urls = [...staticPages, ...projectUrls, ...playgroundUrls];

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.map(page => `
        <url>
          <loc>${page.url}</loc>
          ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}
          <changefreq>${page.changefreq}</changefreq>
          <priority>${page.priority}</priority>
        </url>
      `).join('')}
    </urlset>
  `;

  fs.writeFileSync('public/sitemap.xml', sitemap.trim());
  console.log('Sitemap generated successfully!');
}

generateSitemap().catch(console.error);
