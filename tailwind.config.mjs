import daisyThemes from "daisyui/src/theming/themes";
import defaultTheme from "tailwindcss/defaultTheme";
import {themes} from "./src/lib/themes";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	plugins: [
		require("@tailwindcss/container-queries"),
		require("@tailwindcss/typography"),
		require("daisyui"),
	],
	content: [
		"./src/**/*.{astro,html,svelte,ts,tsx,vue}",
		"./public/**/*.{astro,html,xsl,svelte,ts,tsx,vue}",
	],
	daisyui: {
		themeRoot: ":root",
		base: true,
		styled: true,
		utils: true,
		logs: false,
		prefix: "",
		themes: [
			...themes,
			{
				light: {
					...daisyThemes.light,
					"base-100": "#F5F5F5",
					"base-200": "#E2E8F0",
					"base-300": "#CBD1D7",
					"base-content": "#0A0A0A",
					primary: "#171717",
					"primary-content": "#FAFAFA",
					secondary: "#F5F5F5",
					"secondary-content": "#171717",
					accent: "#F5F5F5",
					"accent-content": "#171717",
					neutral: "#757575",
					"neutral-content": "#FFFFFF",
					"--rounded-btn": "0.35rem",
					"--rounded-box": "0.35rem",
					"--rounded-badge": "0.5rem",
				},
			},
			{
				dark: {
					...daisyThemes.dark,
					"base-100": "#000000",
					"base-200": "#0A0A0A",
					"base-300": "#242424",
					"base-content": "#FAFAFA",
					primary: "#FAFAFA",
					"primary-content": "#171717",
					secondary: "#262626",
					"secondary-content": "#FAFAFA",
					accent: "#262626",
					"accent-content": "#FAFAFA",
					neutral: "#666666",
					"neutral-content": "#A3A3A3",
					"--rounded-btn": "0.35rem",
					"--rounded-box": "0.35rem",
					"--rounded-badge": "0.5rem",
				},
			},
		],
	},
	theme: {
		container: {
			padding: "2rem",
			center: true,
		},
		extend: {
			fontFamily: {
				headline: ["Barlow Condensed", ...defaultTheme.fontFamily.serif],
				body: ["X", ...defaultTheme.fontFamily.sans],
				X: ["X", ...defaultTheme.fontFamily.sans],
				ag: ["AG", ...defaultTheme.fontFamily.serif],
			},
		},
	},
};
