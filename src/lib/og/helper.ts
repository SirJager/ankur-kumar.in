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

type OGURLOpts = {
	title: string;
	author: string;
	description?: string;
	date?: Date;
	tags?: string[];
	categories?: string[];
	avatar?: string;
};

export const ogurl = (opts: OGURLOpts) => {
	const params = new URLSearchParams({title: opts.title, author: opts.author});
	if (opts.description) params.set("description", opts.description);
	if (opts.date) params.set("date", opts.date.toISOString());
	if (opts.tags?.length) params.set("tags", opts.tags.join(","));
	if (opts.categories?.length) params.set("categories", opts.categories.join(","));
	if (opts.avatar) params.set("avatar", opts.avatar);
	if (!opts.avatar) params.set("avatar", `https://ui-avatars.com/api/?name=${opts.author}`);
	const string = `?${params.toString()}`;
	return string;
};

export const extractOGProps = (url: URL): Result => {
	const example = url.searchParams.get("example");

	let title = url.searchParams.get("title");
	if (!title) {
		if (typeof example !== "string") {
			return {error: "title is required"};
		}
		title = "This is an example";
	}

	const length = Number(url.searchParams.get("length") || "100");

	let datePublished = url.searchParams.get("date");
	if (!datePublished) {
		if (typeof example !== "string") {
			return {error: "date is required"};
		}
		datePublished = new Date().toISOString();
	}
	const date = new Date(datePublished);

	let author = url.searchParams.get("author");
	if (!author) {
		if (typeof example !== "string") {
			return {error: "author is required"};
		}
		author = "John Doe";
	}

	let avatar = url.searchParams.get("avatar");
	if (!avatar) {
		if (typeof example !== "string") {
			return {error: "avatar is required"};
		}
		avatar = `https://ui-avatars.com/api/?name=${author}`;
	}

	const _tags = url.searchParams.get("tags");
	const tags = (_tags ? _tags.split(",") : []).filter((s) => s.length > 0);

	const _categories = url.searchParams.get("categories");
	const categories = (_categories ? _categories.split(",") : []).filter((s) => s.length > 0);

	const footer = url.searchParams.get("button");
	const logo = `${url.origin}/icons/android-chrome-512x512.png`;

	const _theme = url.searchParams.get("theme") || "dark";
	const theme = themeNames.includes(_theme as OGTheme) ? (_theme as OGTheme) : "dark";

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
