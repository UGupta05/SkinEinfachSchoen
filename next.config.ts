import type { NextConfig } from 'next';
import { TREATMENT_DETAILS } from './src/data/treatmentDetails';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    // The previous site exposed treatments at the root (e.g. /jetpeel).
    // Google still has those URLs and they now 404, so send them to the
    // current /leistungen/<slug> structure with a permanent redirect to
    // preserve any link equity.
    return Object.keys(TREATMENT_DETAILS).map((slug) => ({
      source: `/${slug}`,
      destination: `/leistungen/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
