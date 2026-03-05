import {type OGTheme, themeNames} from "./themes";

interface Colors {
	backgroundColor?: string | null;
	borderColor?: string | null;
	textColor?: string | null;
}

interface TextSize {
	avatarSize?: string | null;
	categorySize?: string | null;
	dateSize?: string | null;
	tagSize?: string | null;
	titleSize?: string | null;
}

export interface OGPropsData {
	author: string;
	avatar: string;
	backgroundImage: string;
	categories: string[];
	colors: Colors;
	date: Date;
	footer?: string | null;
	length: number;
	logo: string;
	size: TextSize;
	tags: string[];
	theme: OGTheme;
	title: string;
}

export type Result = {error: string; data?: null} | {error?: null; data: OGPropsData};

export const extractOGProps = (url: URL): Result => {
	const title = url.searchParams.get("title");
	if (!title) {
		return {error: "title is required"};
	}

	const length = Number(url.searchParams.get("length") || "100");

	const datePublished = url.searchParams.get("date");
	if (!datePublished) {
		return {error: "date is required"};
	}
	const date = new Date(datePublished);

	const author = url.searchParams.get("author");
	if (!author) {
		return {error: "author is required"};
	}

	const avatar = url.searchParams.get("avatar");
	if (!avatar) {
		return {error: "avatar is required"};
	}

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
		if (theme === "dark") {
			backgroundImage = `${url.origin}/images/grid-dark.png`;
		}
	}

	const colors = {backgroundColor, borderColor, textColor};
	const size = {avatarSize, categorySize, dateSize, tagSize, titleSize};

	const props: OGPropsData = {
		author,
		avatar,
		backgroundImage,
		categories,
		colors,
		date,
		footer,
		length,
		logo,
		size,
		tags,
		theme,
		title,
	};

	return {data: props, error: null};
};
