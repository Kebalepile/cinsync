/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
  
})
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/404",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = withPWA(nextConfig);