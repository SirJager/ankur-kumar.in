import {getMatters} from "@/dal/astro";
import {site} from "@/lib/constants";
import rss from "@astrojs/rss";
import type {APIRoute} from "astro";
import {getCollection} from "astro:content";

export const GET: APIRoute = async (context) => {
	const posts = getMatters(await getCollection("blog"));
	return rss({
		site:
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: context.site || "missing-site-url",
		title: site.title,
		stylesheet: "/styles/rss.xsl",
		description: site.metaDescription || site.description,
		customData: "<language>en-us</language>",
		items: posts.map((post) => {
			const taxonomies = new Set<string>();
			post.tags.forEach((tag) => taxonomies.add(`#${tag}`));
			post.categories.forEach((cat) => taxonomies.add(cat));
			return {
				title: post.title,
				description: post.description,
				pubDate: post.published,
				link: `/blog/${post.slug}`,
				categories: Array.from(taxonomies),
			};
		}),
	});
};
