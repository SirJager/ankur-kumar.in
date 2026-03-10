import {findEntries, findEntry} from "@/dal";
import simpleOGBuilder from "@/lib/og/simple";
import type {Post} from "@keystatic/collections/posts";
import type {User} from "@keystatic/collections/users";
import {ImageResponse} from "@vercel/og";
import type {APIRoute} from "astro";

export async function getStaticPaths() {
	const posts = await findEntries<Post>("posts");
	return posts.map((post) => ({params: {slug: post.slug}, props: {post}}));
}

export const GET: APIRoute = async ({props, url}) => {
	const post: Post = props.post;
	const _author = await findEntry<User>("users", post.author);

	const title = post.title;
	const author = _author.fullName;
	const length = 56;

	const tags = post.tags;
	const categories = post.categories;
	const date = post.publish;
	const footer = undefined;

	const avatar = _author.avatar && url.origin + _author.avatar;

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
