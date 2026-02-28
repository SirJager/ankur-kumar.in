import type {APIRoute} from "astro";
import {authors} from "@/lib/constants";
import {ImageResponse} from "@vercel/og";
import {getMatters} from "@/dal/astro";
import type {Post} from "@/dal/schema";
import {getCollection} from "astro:content";
import simpleOGBuilder from "@/lib/og/simple";

export async function getStaticPaths() {
	const posts = getMatters(await getCollection("blog"));
	return posts.map((post) => ({params: {slug: post.slug}, props: {post}}));
}

export const GET: APIRoute = async ({props, url}) => {
	const post: Post = props.post;

	const title = post.title;
	const author = authors.ankur.fullName;
	const length = 56;

	const tags = post.tags;
	const categories = post.categories;
	const date = post.publish;
	const footer = null;

	const avatar = authors.ankur.image;

	// styling
	const theme = url.searchParams.get("theme");
	const isDark = (typeof theme === "string" && theme === "dark") || true;
	const backgroundImage =
		url.origin + (isDark ? "/images/grid-dark.png" : "/images/grid.png");

	const logo = avatar;
	const style = {backgroundImage, logo, footer};
	const data = {title, author, avatar, date, length, tags, categories};
	const html = simpleOGBuilder({...data, ...style});
	return new ImageResponse(html, {width: 1200, height: 630});
};
