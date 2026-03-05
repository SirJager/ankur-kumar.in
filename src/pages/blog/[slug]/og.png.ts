import {getCollection} from "astro:content";
import {ImageResponse} from "@vercel/og";
import type {APIRoute} from "astro";
import {getMatters} from "@/dal/astro";
import type {Post} from "@/dal/schema/posts";
import {authors} from "@/lib/constants";
import simpleOGBuilder from "@/lib/og/simple";

export async function getStaticPaths() {
	const posts = getMatters(await getCollection("posts"));
	return posts.map((post) => ({params: {slug: post.slug}, props: {post}}));
}

export const GET: APIRoute = ({props, url}) => {
	const post: Post = props.post;

	const title = post.title;
	const author = authors.ankur.fullName;
	const length = 56;

	const tags = post.tags;
	const categories = post.categories;
	const date = post.publish;
	const footer = undefined;

	const avatar = authors.ankur.image;

	// styling
	// const _theme = url.searchParams.get("theme");
	const isDark = true;
	const backgroundImage = url.origin + (isDark ? "/images/grid-dark.png" : "/images/grid.png");

	const logo = avatar;
	const style = {backgroundImage, footer, logo};
	const data = {author, avatar, categories, date, length, tags, title};
	const html = simpleOGBuilder({...data, ...style});
	return new ImageResponse(html, {height: 630, width: 1200});
};
