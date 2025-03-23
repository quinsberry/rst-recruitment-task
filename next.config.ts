import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        typedEnv: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    eslint: {
        ignoreDuringBuilds: false,
    },
};

export default nextConfig;
