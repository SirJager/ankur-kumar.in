import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import astroParser from "astro-eslint-parser";
import qwik from "eslint-plugin-qwik";
import prettier from "eslint-config-prettier";

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,
	qwik.configs.recommended,
	...astro.configs.recommended,
	prettier,

	{
		files: ["**/*.{ts,tsx,js,jsx}"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: "./tsconfig.json",
				tsconfigRootDir: new URL(".", import.meta.url).pathname,
				ecmaVersion: 2021,
				sourceType: "module",
				ecmaFeatures: {jsx: true},
			},
		},
		rules: {
			"@typescript-eslint/triple-slash-reference": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/explicit-module-boundary-types": "off",
			"@typescript-eslint/no-inferrable-types": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/no-namespace": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-this-alias": "off",
			"@typescript-eslint/ban-types": "off",
			"@typescript-eslint/ban-ts-comment": "off",

			"@typescript-eslint/consistent-type-imports": "warn",
			"@typescript-eslint/no-unnecessary-condition": "warn",

			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],

			"no-unused-vars": [
				"warn",
				{
					args: "after-used",
					argsIgnorePattern: "^_",
				},
			],

			"prefer-spread": "off",
			"no-case-declarations": "off",
			"no-console": "off",

			quotes: ["error", "double"],
			"linebreak-style": ["error", "unix"],
			"require-jsdoc": "off",
			"react/no-unknown-property": "off",
		},
	},

	{
		files: ["**/*.astro"],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				parser: tseslint.parser,
				extraFileExtensions: [".astro"],
			},
		},
		rules: {
			"qwik/jsx-key": "off",
		},
	},
];
