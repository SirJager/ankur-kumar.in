import mdx from "@astrojs/mdx";
import partytown from "@astrojs/partytown";
import qwik from "@qwikdev/astro";
import tailwindcss from "@tailwindcss/vite";
import robots from "astro-robots-txt";
import sitemap from "@astrojs/sitemap";
import webmanifest from "astro-webmanifest";
import {defineConfig} from "astro/config";
import {astroImageTools} from "astro-imagetools";
import compressor from "astro-compressor";
import astroIcon from "astro-icon";
import react from "@astrojs/react";
import AutoImport from "astro-auto-import";
import path from "path";

// adapters
import node from "@astrojs/node";
import vercel from "@astrojs/vercel";

// markdown
import remarkToc from "remark-toc";
import markdoc from "@astrojs/markdoc";
import readingTime from "reading-time";
import {toString} from "mdast-util-to-string";
import {links, site} from "./src/lib/constants";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const PORT = Number(process.env.PORT || 3000);
const isDev = process.env.NODE_ENV === "development";
const siteURL = isDev ? `http://localhost:${PORT}` : links.website.href;

const AutoImportComponents = [
	// import paths for components which will be used in .mdx
	// example directly use: <ThemeSwitcher /> in .mdx
	"./src/components/ThemeSwitcher",
	"./src/components/Link.astro",
	"./src/components/ReadMore.astro",
	"./src/components/Logo.astro",
];

// https://astro.build/config
export default defineConfig({
	site: siteURL,
	trailingSlash: "ignore",
	devToolbar: {enabled: true, placement: "bottom-right"},
	integrations: [
		AutoImport({imports: AutoImportComponents}),
		react(),
		qwik(),
		markdoc(),
		mdx({
			gfm: true,
			optimize: true,
			smartypants: true,
			syntaxHighlight: false,
			extendMarkdownConfig: true,
		}),
		astroIcon(),
		astroImageTools,
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
		sitemap({
			priority: 0.7,
			entryLimit: 10000,
			changefreq: "weekly",
			lastmod: new Date(),
			filter: (page) => !page.includes(`${siteURL}/admin`) && !page.includes(`${siteURL}/api`),
		}),
		robots({
			sitemap: `${siteURL}${links.sitemap.href}`,
			policy: [{userAgent: "*", disallow: ["/admin", "/api"]}],
		}),
		webmanifest({
			name: site.title,
			lang: site.lang,
			start_url: "/",
			description: site.description,
			display: "standalone",
			theme_color: "#111827",
			background_color: "#111827",
			icon: "./public/icons/android-chrome-512x512.png",
			icons: [
				{src: "./public/icons/favicon-16x16.png", sizes: "16x16", type: "image/png"},
				{src: "./public/icons/favicon-32x32.png", sizes: "32x32", type: "image/png"},
				{src: "./public/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png"},
				{src: "./public/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png"},
				{src: "./public/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png"},
			],
		}),
		compressor({brotli: true}),
	],
	prefetch: {defaultStrategy: "viewport"},
	image: {
		remotePatterns: [{protocol: "https"}, {protocol: "http"}],
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {
				kernel: "mks2021",
			},
		},
	},
	markdown: {
		gfm: true,
		smartypants: true,
		syntaxHighlight: false,
		extendDefaultPlugins: true,
		remarkRehype: {allowDangerousHtml: true},
		remarkPlugins: [readtime, remarkToc],
		rehypePlugins: [[rehypeAutolinkHeadings, {behavior: "wrap"}]],
	},
	output: "static",
	adapter: isDev ? node({mode: "standalone"}) : vercel(),
	// https://docs.astro.build/en/reference/configuration-reference
	build: {inlineStylesheets: "never", assets: "_assets"},
	server: {port: PORT},
	vite: {
		resolve: {alias: {"@": path.resolve("./src")}},
		plugins: [tailwindcss()],
	},
});

function readtime() {
	return function (tree, {data}) {
		// eslint-disable-next-line qwik/loader-location
		const textOnPage = toString(tree);
		data.astro.frontmatter.readtime = readingTime(textOnPage);
	};
}
