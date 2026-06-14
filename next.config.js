/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // This replaces the old @zeit/next-sass plugin entirely
  sassOptions: {
    CSSModules: true,
  },
  // Keeps your SVGs working cleanly without the old next-svgr plugin
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
