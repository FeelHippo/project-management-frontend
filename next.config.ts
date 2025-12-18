import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // https://nextjs.org/docs/app/api-reference/config/next-config-js/crossOrigin
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/crossorigin#use-credentials
    crossOrigin: 'use-credentials',
    experimental: {
        viewTransition: true,
    },
};

export default nextConfig;