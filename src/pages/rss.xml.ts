import {getMatters} from "@/dal/astro";
import rss from "@astrojs/rss";
import type {APIRoute} from "astro";
import {getCollection, getEntry} from "astro:content";

export const GET: APIRoute = async (context) => {
	const posts = getMatters(await getCollection("posts"));
	const site = await getEntry("site", "index");

	return rss({
		site:
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: context.site || "missing-site-url",
		title: site.data.title,
		stylesheet: "/styles/rss.xsl",
		description: site.data.metaDescription || site.data.description,
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
