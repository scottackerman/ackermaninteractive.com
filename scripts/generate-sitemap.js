import { writeFileSync, statSync } from 'fs'
import { resolve } from 'path'

const siteUrl = 'https://insmedclinicaltrials.com'
const routes = ['/']
const outputDir = './.output/public'

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((route) => {
    const filePath = resolve(
      outputDir,
      route === '/' ? 'index.html' : `${route.slice(1)}/index.html`
    )
    let lastmod = new Date().toISOString().split('T')[0]

    try {
      const stats = statSync(filePath)
      lastmod = stats.mtime.toISOString().split('T')[0]
    } catch (e) {
      console.warn(`File not found: ${filePath} : ${e}`)
    }

    return `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
  })
  .join('\n')}
</urlset>
`

writeFileSync('./public/sitemap.xml', xml)