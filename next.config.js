const { i18n } = require('./next-i18next.config');

const nextConfig = {
	experimental: {
		images: {
			unoptimized: true,
			layoutRaw: true,
		},
	},
	i18n,
	trailingSlash: true,
	env: {
		API_KEY: process.env.API_KEY,
		API_URL: process.env.API_URL,
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://zabartv.com/:path*',
			},
		];
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						icon: true,
					},
				},
			],
		});

		return config;
	},
};

module.exports = nextConfig;
