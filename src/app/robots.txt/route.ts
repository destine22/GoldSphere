export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /account/\nSitemap: ${process.env.NEXT_PUBLIC_URL}/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  )
}
