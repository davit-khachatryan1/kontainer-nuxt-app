module.exports = {
	root: true,
	parser: '@babel/eslint-parser',
	parserOptions: {
		requireConfigFile: false,
		babelOptions: {
			configFile: false,
		},
	},
	env: {
		browser: true,
		node: true
	},
	extends: 'airbnb',
	// required to lint *.vue files
	plugins: [
		'html'
	],
	// add your custom rules here
	"rules": {
		"no-tabs": [0],
		"no-console": [0, { "allow": ["warn", "error"] }],
		"max-params": [2, { "max": 4 }],
		"brace-style": [1, "1tbs"],
		"no-use-before-define": [2, { "functions": false, "classes": true, "variables": false }],
		"arrow-parens": [2, "always"],
		"indent": [
			2,
			"tab",
			{
				"SwitchCase": 1
			}
		],
		"object-curly-newline": [0],
		"function-paren-newline": [0],
		"space-before-function-paren": [2, "never"],
		"func-names": [0],
		"max-len": [1, 140],
		"new-cap": [0],
		"no-unused-vars": [
			1,
			{
				"varsIgnorePattern": "css",
				"args": "none"
			}
		],
		"prefer-template": [1],
		"arrow-body-style": [0],
		"no-unused-expressions": [
			"error", {
				"allowShortCircuit": true,
				"allowTernary": true
			}
		],
	"no-param-reassign": ["error", { "props": false }],
		"import/no-unresolved": [0],
		"import/extensions": [0],
		"no-constant-condition": [0],
		"quote-props": [2, "consistent-as-needed"],
		"react/jsx-indent": [2, "tab"],
		"react/jsx-indent-props": [2, "tab"],
		"jsx-quotes": [1, "prefer-double"],
		"react/sort-comp": [
			1,
			{
				"order": [
					"static-methods",
					"lifecycle",
					"render",
					"everything-else"
				],
				"groups": {}
			}
		],
		"import/no-extraneous-dependencies": [0],
		"import/no-dynamic-require": 0,
		"comma-dangle": [
			"error",
			{
				"arrays": "only-multiline",
				"objects": "only-multiline",
				"imports": "only-multiline",
				"exports": "only-multiline",
				"functions": "ignore",
			}
		]
	},
  	globals: {}
}
