const path = require('path');

module.exports = {
	stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		{
			name: '@storybook/preset-scss',
			options: {
				sassLoaderOptions: {
					additionalData: '@import "./src/styles/main.scss";',
				},
			},
		},
	],
	webpackFinal: async (config) => {
		config.resolve.alias['@/components'] = path.resolve(__dirname, '../src/components');
		config.resolve.alias['@/UI'] = path.resolve(__dirname, '../src/components/UI');
		config.resolve.alias['@/icons'] = path.resolve(__dirname, '../src/components/Icons');

		const fileLoaderRule = config.module.rules.find((rule) => rule.test && rule.test.test('.svg'));
		fileLoaderRule.exclude = /\.svg$/;

		config.module.rules.push({
			test: /\.svg$/,
			enforce: 'pre',
			loader: require.resolve('@svgr/webpack'),
			options: {
				icon: true,
			},
		});

		return config;
	},
	framework: '@storybook/react',
	core: {
		builder: '@storybook/builder-webpack5',
	},
};
