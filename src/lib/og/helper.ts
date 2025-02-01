import {themeNames, type OGTheme} from "./themes";

type Colors = {
	textColor?: string | null;
	borderColor?: string | null;
	backgroundColor?: string | null;
};

type TextSize = {
	titleSize?: string | null;
	avatarSize?: string | null;
	dateSize?: string | null;
	categorySize?: string | null;
	tagSize?: string | null;
};

export type OGPropsData = {
	title: string;
	date: Date;
	author: string;
	tags: string[];
	categories: string[];
	logo: string;
	avatar: string;
	length: number;
	theme: OGTheme;
	colors: Colors;
	size: TextSize;
	footer?: string | null;
	backgroundImage: string;
};

export type Result = {error: string; data?: null} | {error?: null; data: OGPropsData};

export const extractOGProps = (url: URL): Result => {
	const title = url.searchParams.get("title");
	if (!title) return {error: "title is required"};

	const length = Number(url.searchParams.get("length") || "100");

	const datePublished = url.searchParams.get("date");
	if (!datePublished) return {error: "date is required"};
	const date = new Date(datePublished);

	const author = url.searchParams.get("author");
	if (!author) return {error: "author is required"};

	const avatar = url.searchParams.get("avatar");
	if (!avatar) return {error: "avatar is required"};

	const _tags = url.searchParams.get("tags");
	const tags = (_tags ? _tags.split(",") : []).filter((s) => s.length > 0);

	const _categories = url.searchParams.get("categories");
	const categories = (_categories ? _categories.split(",") : []).filter((s) => s.length > 0);

	const footer = url.searchParams.get("button");
	const logo = `${url.origin}/icons/android-chrome-512x512.png`;

	const _theme = url.searchParams.get("theme") || "dark";
	const theme = themeNames.includes(_theme as any) ? (_theme as OGTheme) : "dark";

	const backgroundColor = url.searchParams.get("backgroundColor");
	const borderColor = url.searchParams.get("borderColor");
	const textColor = url.searchParams.get("textColor");
	const titleSize = url.searchParams.get("titleSize");
	const avatarSize = url.searchParams.get("avatarSize");
	const dateSize = url.searchParams.get("dateSize");
	const categorySize = url.searchParams.get("categorySize");
	const tagSize = url.searchParams.get("tagSize");

	let backgroundImage = url.searchParams.get("backgroundImage");
	if (!backgroundImage) {
		backgroundImage = `${url.origin}/images/grid.png`;
		if (theme === "dark") backgroundImage = `${url.origin}/images/grid-dark.png`;
	}

	const colors = {borderColor, backgroundColor, textColor};
	const size = {titleSize, avatarSize, dateSize, categorySize, tagSize};

	const props: OGPropsData = {
		title,
		date,
		author,
		tags,
		categories,
		footer,
		logo,
		length,
		avatar,
		theme,
		colors,
		size,
		backgroundImage,
	};

	return {data: props, error: null};
};
