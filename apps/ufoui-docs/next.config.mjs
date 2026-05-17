import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        rehypePlugins: [
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                },
            ],
        ],
    },
});

const nextConfig = {
    pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
    output: 'standalone',
    transpilePackages: ['@ufoui/core'],
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        externalDir: true,
        mdxRs: false,
    },
};

export default withMDX(nextConfig);
