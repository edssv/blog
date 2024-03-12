/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  images: {
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'https://xn--80abvtaen6c.xn--p1ai',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'https://api.xn--80abvtaen6c.xn--p1ai',
        pathname: '**'
      }
    ]
  }
};

export default nextConfig;
