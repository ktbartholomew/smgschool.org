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
    // redirects from old site
    {
      source: "/welcome",
      destination: "/",
      permanent: true,
    },
    {
      source: "/why-saint-maria-goretti-old",
      destination: "/about/the-smg-difference",
      permanent: true,
    },
    {
      source: "/enroll",
      destination: "/admissions",
      permanent: true,
    },
    {
      source: "/enroll-1",
      destination: "/admissions",
      permanent: true,
    },
    {
      source: "/2024-2025-tuition-rates",
      destination: "/admissions",
      permanent: true,
    },
    {
      source: "/admissions-info",
      destination: "/admissions",
      permanent: true,
    },
    {
      source: "/schedule-a-tour",
      destination: "/admissions/tour",
      permanent: true,
    },
    {
      source: "/inquire-now",
      destination: "/admissions/tour",
      permanent: true,
    },
    {
      source: "/visit-us",
      destination: "/admissions/tour",
      permanent: true,
    },
    {
      source: "/how-to-apply",
      destination: "/admissions",
      permanent: true,
    },
    {
      source: "/our-history",
      destination: "/about",
      permanent: true,
    },
    {
      source: "/our-mission-and-vision",
      destination: "/about/mission",
      permanent: true,
    },
    {
      source: "/faculty-and-staff",
      destination: "/about/faculty-and-staff",
      permanent: true,
    },
    {
      source: "/faculty-and-staff-1",
      destination: "/about/faculty-and-staff",
      permanent: true,
    },
    {
      source: "/tuition-rates",
      destination: "/admissions/tuition",
      permanent: true,
    },
    {
      source: "/smgcs-experience",
      destination: "/about/the-smg-difference",
      permanent: true,
    },
    {
      source: "/2024-2025-school-calendar",
      destination: "/parents/documents",
      permanent: true,
    },
    {
      source: "/lunchinformation",
      destination: "/parents/lunch",
      permanent: true,
    },
    {
      source: "/news-events",
      destination: "/parents",
      permanent: true,
    },
    {
      source: "/news",
      destination: "/parents",
      permanent: true,
    },
    {
      source: "/newsRSS",
      destination: "/parents",
      permanent: true,
    },
    {
      source: "/academics",
      destination: "/values/curriculum",
      permanent: true,
    },
    {
      source: "/academics",
      destination: "/values/curriculum",
      permanent: true,
    },
    {
      source: "/give-now",
      destination: "/support-us",
      permanent: true,
    },
    {
      source: "/give-now",
      destination: "/support-us",
      permanent: true,
    },
  ],
};

export default nextConfig;
