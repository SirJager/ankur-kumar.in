import {links, site} from "./src/lib/constants";
import markdoc from "@astrojs/markdoc";
import mdx from "@astrojs/mdx";
// adapters
import node from "@astrojs/node";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
// cms
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import AutoImport from "astro-auto-import";
import compressor from "astro-compressor";
import astroIcon from "astro-icon";
import {astroImageTools} from "astro-imagetools";
import robots from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import {defineConfig, envField} from "astro/config";
import {toString as toStringMethod} from "mdast-util-to-string";
import path from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// markdown
import remarkToc from "remark-toc";

const PORT = Number(process.env.PORT || 3000);
const isDev = process.env.NODE_ENV === "development";
const siteURL = isDev ? `http://localhost:${PORT}` : links.website.href;
const EXCLUDE_ROUTES = ["/admin", "/api", "/keystatic"];

const AutoImportComponents = [
	// import paths for components which will be used in .mdx
	// example directly use: <ThemeSwitcher /> in .mdx
	"./src/components/Link.astro",
	"./src/components/ReadMore.astro",
	"./src/components/Logo.astro",
];

// https://astro.build/config
export default defineConfig({
	env: {
		validateSecrets: true,
		schema: {
			UMAMI_SCRIPT_URL: envField.string({context: "server", access: "public", min: 10}),
			UMAMI_WEBSITE_ID: envField.string({context: "server", access: "public", min: 10}),
			DATABASE_URL: envField.string({context: "server", access: "secret", min: 10}),
		},
	},
	site: siteURL,
	trailingSlash: "ignore",
	server: {port: PORT},
	devToolbar: {enabled: true, placement: "bottom-right"},
	adapter: node({mode: "standalone"}),
	prefetch: {defaultStrategy: "viewport"},
	redirects: {
		"/admin": "/keystatic/",
		"/admin/[...slug]": "/keystatic/[...slug]",
	},
	output: "static",
	build: {assets: "_assets", inlineStylesheets: "never"},
	//
	vite: {plugins: [tailwindcss()], resolve: {alias: {"@": path.resolve("./src")}}},
	image: {
		responsiveStyles: true,
		remotePatterns: [{protocol: "https"}, {protocol: "http"}],
		service: {config: {kernel: "mks2021"}, entrypoint: "astro/assets/services/sharp"},
	},
	markdown: {
		extendDefaultPlugins: true,
		gfm: true,
		rehypePlugins: [[rehypeAutolinkHeadings, {behavior: "wrap"}]],
		remarkPlugins: [readtime, remarkToc],
		remarkRehype: {allowDangerousHtml: true},
		smartypants: true,
		syntaxHighlight: false,
	},
	integrations: [
		AutoImport({imports: AutoImportComponents}),
		react(),
		markdoc(),
		mdx({
			extendMarkdownConfig: true,
			gfm: true,
			optimize: true,
			smartypants: true,
			syntaxHighlight: false,
		}),
		astroIcon(),
		astroImageTools,
		...(process.env.NODE_ENV === "development" ? [keystatic()] : []),
		partytown({config: {forward: ["dataLayer.push"]}}),
		sitemap({
			changefreq: "weekly",
			entryLimit: 10_000,
			filter: (page) => !EXCLUDE_ROUTES.some((p) => page.includes(`${siteURL}${p}`)),
			lastmod: new Date(),
			priority: 0.7,
		}),
		robots({
			policy: [{disallow: EXCLUDE_ROUTES, userAgent: "*"}],
			sitemap: `${siteURL}${links.sitemap.href}`,
		}),
		webmanifest({
			background_color: "#111827",
			description: site.description,
			display: "standalone",
			icon: "./public/icons/android-chrome-512x512.png",
			icons: [
				{sizes: "16x16", src: "./public/icons/favicon-16x16.png", type: "image/png"},
				{sizes: "32x32", src: "./public/icons/favicon-32x32.png", type: "image/png"},
				{sizes: "180x180", src: "./public/icons/apple-touch-icon.png", type: "image/png"},
				{sizes: "192x192", src: "./public/icons/android-chrome-192x192.png", type: "image/png"},
				{sizes: "512x512", src: "./public/icons/android-chrome-512x512.png", type: "image/png"},
			],
			lang: site.lang,
			name: site.title,
			start_url: "/",
			theme_color: "#111827",
		}),
		compressor({brotli: true}),
	],
});

function readtime() {
	return (tree, {data}) => {
		// eslint-disable-next-line qwik/loader-location
		const textOnPage = toStringMethod(tree);
		data.astro.frontmatter.readtime = readingTime(textOnPage);
	};
}
