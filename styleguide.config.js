const { resolve } = require('path');
const rules = require('vue-webpack-loaders');

const sassResourcesLoader = {
	loader: 'sass-resources-loader',
	options: {
		resources: ['./assets/scss/framework.scss'],
	},
};

function isVueRule(rule) {
	return rule && rule.test && rule.test.toString() === '/\\.vue$/';
}

function isSASSRule(rule) {
	return (
		rule &&
		rule.test &&
		['/\\.sass$/', '/\\.scss$/'].indexOf(rule.test.toString()) !== -1
	);
}

module.exports = {
	components: 'components/**/[A-Z]*.vue',
	styleguideDir: 'web',
	webpackConfig: {
		resolve: {
			extensions: ['.js', '.json', '.vue', '.ts'],
			alias: {
				'~': resolve(__dirname),
				'@': resolve(__dirname),
			},
		},
		module: {
			rules: [
				...rules.map((rule) => {
					if (rule && !rule.test) {
						rule.exclude.push(/\.svg$/);
					}

					if (isVueRule(rule)) {
						rule.options.loaders.sass.push(sassResourcesLoader);
						rule.options.loaders.scss.push(sassResourcesLoader);
					}
					if (isSASSRule(rule)) {
						rule.use.push(sassResourcesLoader);
					}

					return rule;
				}),
				// Other loaders that are needed for your components
				{
					test: /\.css$/,
					loader: 'style-loader!css-loader',
				},
				{
					test: /\.svg$/,
					use: [
						{
							loader: 'vue-svg-loader', // `vue-svg` for webpack 1.x
							options: {
								// optional [svgo](https://github.com/svg/svgo) options
								svgo: {
									plugins: [
										{ removeDoctype: true },
										{ removeComments: true },
										{ collapseGroups: false },
									],
								},
							},
						},
					],
				},
			],
		},
	},
	showUsage: true,
	// vuex: './store/index',
	title: 'Styleguide Kontainer',
	sections: [
		{
			name: 'Nuclides',
			components: () => [
				'./components/_nuclides/colors/index.vue',
				'./components/_nuclides/grid/index.vue',
				'./components/_nuclides/icons/index.vue',
				'./components/_nuclides/shadows/index.vue',
				'./components/_nuclides/typography/index.vue',
				'./components/_nuclides/borders/index.vue',
			],
		},
		{
			name: 'UI Components',
			sections: [
				{
					name: 'Atoms',
					components: () => [
						'./components/atoms/button/index.vue',
						'./components/atoms/checklist/index.vue',
						'./components/atoms/input/index.vue',
						'./components/atoms/select/index.vue',
						'./components/atoms/textarea/index.vue',
						'./components/atoms/toggle/index.vue',
						'./components/atoms/hamburger/index.vue',
						'./components/atoms/linklist/index.vue',
						'./components/atoms/pin/index.vue',
						'./components/atoms/section/index.vue',
					],
				},
				{
					name: 'Molecules',
					components: () => [
						'./components/molecules/price/index.vue',
						'./components/molecules/teaser/index.vue',
						'./components/molecules/feature/index.vue',
					],
				},
				{
					name: 'Organisms',
					components: () => [
						'./components/organisms/logos/index.vue',
						'./components/organisms/prices/index.vue',
						'./components/organisms/signup/index.vue',
					],
				},
			],
		},
		{
			name: 'README',
			content: 'README.md',
		},
	],
	vuex: 'store/styleguidist',
};
