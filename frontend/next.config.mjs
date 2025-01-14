/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "Vercel-CDN-Cache-Control",
          value: "max-age=360",
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  redirects: async () => [
    {
      source: "/edit",
      destination: "https://smgschool-org-yqyo9yvq.sanity.studio/",
      permanent: false,
    },
  ],
};

export default nextConfig;
