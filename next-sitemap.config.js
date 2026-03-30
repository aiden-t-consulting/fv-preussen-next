/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://fvpreussen-eberswalde.de",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/api/", "/studio/"] },
    ],
  },
  exclude: ["/api/*", "/studio/*", "/impressum", "/datenschutz"],
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 7000,
};
