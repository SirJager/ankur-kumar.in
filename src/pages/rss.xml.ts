import {getCollection} from "astro:content";
import rss from "@astrojs/rss";
import type {APIRoute} from "astro";
import {getMatters} from "@/dal/astro";
import {site} from "@/lib/constants";

export const GET: APIRoute = async (context) => {
	const posts = getMatters(await getCollection("posts"));
	return rss({
		customData: "<language>en-us</language>",
		description: site.metaDescription || site.description,
		items: posts.map((post) => {
			const taxonomies = new Set<string>();
			for (const tag of post.tags) {
				taxonomies.add(`#${tag}`);
			}
			for (const cat of post.categories) {
				taxonomies.add(cat);
			}

			return {
				categories: Array.from(taxonomies),
				description: post.description,
				link: `/blog/${post.slug}`,
				pubDate: post.published,
				title: post.title,
			};
		}),
		site:
			process.env.NODE_ENV === "development"
				? "http://localhost:3000"
				: context.site || "missing-site-url",
		stylesheet: "/styles/rss.xsl",
		title: site.title,
	});
};
