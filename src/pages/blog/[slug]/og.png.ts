import type {APIRoute} from "astro";

import {authors} from "@/lib/constants";
import {parseDate} from "@/lib/utils";
import {ImageResponse} from "@vercel/og";
import {getMatters} from "@/dal/astro";
import type {Post} from "@/dal/schema";
import {getCollection} from "astro:content";

export async function getStaticPaths() {
	const posts = getMatters(await getCollection("blog"));
	return posts.map((post) => ({params: {slug: post.slug}, props: {post}}));
}

export const GET: APIRoute = async ({props, url}) => {
	const post: Post = props.post;

	const title = post.title;
	const author = authors.ankur.fullName;
	const titleLength = 56;

	const tags = post.tags;
	const cats = post.categories;
	const published = post.publish;
	const date = parseDate((published ? new Date(published) : new Date()).toISOString());
	const button = null;

	const avatarURL = authors.ankur.image;

	// styling

	const darkmode = url.searchParams.get("darkmode");
	const isDark = (typeof darkmode === "string" && darkmode === "true") || true;
	const textColor = url.searchParams.get("color") || isDark ? "#FAFAFA" : "#121212";
	const backgroundColor = url.searchParams.get("backgroundColor") || isDark ? "#121212" : "#FAFAFA";
	const backgroundURL = url.origin + (isDark ? "/images/grid-dark.png" : "/images/grid.png");

	const textStyle = {color: textColor, fontFamily: "Raleway"};
	const borderColor = url.searchParams.get("borderColor") || textColor;
	const borderWidth = url.searchParams.get("borderWidth") || 2;
	const borderStyle = url.searchParams.get("borderStyle") || "solid";
	const border = {borderColor, borderWidth, borderStyle: borderStyle};

	// Astro doesn't support tsx endpoints so usign React-element objects
	// Every element must have "flex"
	const html = {
		type: "div",
		key: title,
		props: {
			children: [
				{
					type: "div",
					props: {
						tw: "flex w-14 h-14 flex shadow-xl rounded-full overflow-hidden",
						style: {},
						children: [{type: "img", props: {src: avatarURL}}],
					},
				},
				{
					type: "div",
					props: {
						tw: "flex mt-14 flex-row items-center",
						children: [
							...cats.map((category, i) => {
								return {
									type: "div",
									props: {
										tw: "shadow-xl text-lg rounded-3xl px-4 py-1",
										children: category,
										style: {...textStyle, ...border, marginLeft: i === 0 ? "0" : "0.5rem"},
									},
								};
							}),
						],
					},
				},
				{
					type: "div",
					props: {
						tw: "text-4xl mt-2 max-w-2xl w-full",
						children: title.slice(0, titleLength) + (title.length > titleLength ? " ..." : ""),
						style: textStyle,
					},
				},
				{
					type: "div",
					props: {
						tw: "shrink flex-wrap mt-10 items-center flex mx-auto w-full",
						style: {gap: "1rem"},
						children: [
							{
								type: "div",
								props: {
									tw: "text-lg",
									children: `${date?.date} ${date?.month} ${date?.year}`,
									style: textStyle,
								},
							},
							{type: "div", props: {tw: "h-2 w-2 shadow-xl rounded-full bg-[#121212]/30"}},
							...tags.map((tags, i) => {
								return {
									type: "div",
									props: {
										tw: "text-lg",
										children: `#${tags}`,
										style: {...textStyle, marginLeft: i === 0 ? "0" : "0.5rem"},
									},
								};
							}),
						],
					},
				},
				{
					type: "div",
					props: {
						tw: "flex mt-6 items-center w-full justify-start",
						children: [
							{
								type: "img",
								props: {
									src: avatarURL,
									tw: "w-24 h-24 mr-4 flex rounded-full shadow-xl overflow-hidden",
									style: border,
								},
							},
							{
								type: "div",
								props: {
									tw: "flex flex-col",
									children: [
										{
											type: "div",
											props: {
												tw: "text-2xl text-center text-center font-light",
												children: author,
												style: textStyle,
											},
										},
									],
								},
							},
						],
					},
				},
				typeof button !== "string"
					? undefined
					: {
							type: "div",
							props: {
								tw: "text-xl font-bold shadow-xl max-w-2xl items-center justify-center mx-auto py-6 px-10 overflow-hidden",
								children: button,
								style: {
									...border,
									color: textStyle.color,
									borderRadius: 100,
									backgroundColor: backgroundColor,
								},
							},
						},
			],
			tw: "w-full h-full flex flex-col items-start justify-start relative p-12",
			style: {
				backgroundImage: `url('${backgroundURL}')`,
				backgroundColor: backgroundColor,
				gap: "0.8rem",
			},
		},
	};

	return new ImageResponse(html, {
		width: 1200,
		height: 630,
	});
};
