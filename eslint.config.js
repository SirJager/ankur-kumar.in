import eslintJavascript from "@eslint/js";
import astroParser from "astro-eslint-parser";
import eslintPrettierConfig from "eslint-config-prettier";
import eslintAstro from "eslint-plugin-astro";
import typescriptEslint from "typescript-eslint";

export default [
	// javascript linting
	eslintJavascript.configs.recommended,

	// typescript  linting
	...typescriptEslint.configs.recommended,

	// astro files linting
	...eslintAstro.configs.recommended,

	// accessibility linting
	...eslintAstro.configs["jsx-a11y-strict"],

	// Adds prettier rules to eslint so we will get eslint errors if
	// formatting is off. if these rules conflict with something else
	// you should use eslint-config-prettier instead to disable all
	// rules that might conflict with prettier
	eslintPrettierConfig,

	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		rules: {
			"@typescript-eslint/no-unused-vars": ["warn"],
			"no-unused-vars": ["warn", {args: "after-used", argsIgnorePattern: "^_"}],
			"no-console": "warn",
			quotes: ["error", "double"],
			"linebreak-style": ["error", "unix"],
			"require-jsdoc": "off",
		},
	},

	{
		files: ["**/*.astro"],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: typescriptEslint.parser,
				extraFileExtensions: [".astro"],
			},
		},
		rules: {
			"qwik/jsx-key": "off",
		},
	},

	{
		ignores: [
			// build output
			"dist/",

			// dependencies
			"node_modules/",

			// logs
			"npm-debug.log*",
			"yarn-debug.log*",
			"yarn-error.log*",
			"pnpm-debug.log*",
			"*.log",
			"vite.config.ts.timestamp*",

			// macOS
			".DS_Store",

			// obsidian
			".obsidian/",
			".trash/",

			// pagefind
			"**/_pagefind",

			// temp
			"generated/",
			".tmp",
			"tmp/",
			"tmp-*",

			// build metadata
			"*.tsbuildinfo",

			// cache
			"cache/",
			".cache/",

			// cloudflare
			"functions/**/*.js",
			".vercel",

			// assets
			"*.css",
			"*.svg",

			//
			"*pagefind/**/*.js",
		],
	},
];
