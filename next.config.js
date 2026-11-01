/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // /fr/ like tonytang.dev; GitHub Pages serves out/fr/index.html for it.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
