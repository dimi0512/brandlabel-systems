import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.147"],
  async redirects() {
    return [
      {
        source: "/insights/custom-business-software-belgium",
        destination: "/en/insights/custom-business-software-belgium",
        permanent: true,
      },
      {
        source: "/fr",
        destination: "/",
        permanent: true,
      },
      {
        source: "/fr/:path*",
        destination: "/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "centre-plongee-rague.com",
          },
        ],
        destination: "https://brandlabelagency.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.centre-plongee-rague.com",
          },
        ],
        destination: "https://brandlabelagency.com/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "index, follow",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
