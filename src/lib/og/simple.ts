import type {OGBuilderProps} from ".";
import {parseDate} from "../utils";
import {ogThemes, themeNames, type OGTheme} from "./themes";

const getTitle = (title: string, maxLength?: number | null) => {
	const len = maxLength || 56;
	return title.slice(0, len) + (title.length > len ? " ..." : "");
};

const simpleOGBuilder = (props: OGBuilderProps) => {
	// Astro doesn't support tsx endpoints so usign React-element objects
	// Every element must have "flex"

	const _theme = props.theme;
	const theme = themeNames.includes(_theme as any)
		? (_theme as OGTheme)
		: "dark";

	const date = parseDate(props.date.toISOString());
	const styl = ogThemes[theme];
	const textColor = props.textColor ?? styl.color;
	const backgroundColor = props.backgroundColor ?? styl.backgroundColor;
	let backgroundImage = props.backgroundImage;

	const textStyle = {color: textColor, fontFamily: "Raleway"};
	const borderStyle = {
		...styl.border,
		borderColor: props.borderColor ?? styl.border.borderColor,
	};

	const categories = props.categories || [];
	const tags = props.tags || [];

	return {
		type: "div",
		key: props.title,
		props: {
			children: [
				{
					type: "div",
					props: {
						tw: "flex w-14 h-14 flex shadow-2xl rounded-full overflow-hidden",
						style: borderStyle,
						children: [{type: "img", props: {src: props.logo}}],
					},
				},
				{
					type: "div",
					props: {
						tw: "flex flex-col items-start justify-start",
						style: {gap: "1rem"},
						children: [
							{
								type: "div",
								props: {
									tw: "flex flex-row items-center",
									children: [
										...categories.map((category, i) => {
											return {
												type: "div",
												props: {
													tw: "shadow-xl text-lg rounded-3xl px-4 py-1",
													children: category,
													style: {
														...textStyle,
														...borderStyle,
														marginLeft: i === 0 ? "0" : "0.5rem",
													},
												},
											};
										}),
									],
								},
							},
							{
								type: "div",
								props: {
									tw: "text-5xl leading-[52px] mt-5 max-w-2xl w-full",
									children: getTitle(props.title, props.length),
									style: textStyle,
								},
							},
							{
								type: "div",
								props: {
									tw: "shrink flex-wrap items-center flex mt-5 w-full",
									style: {gap: "1rem"},
									children: [
										{
											type: "div",
											props: {
												tw: "text-lg font-bold",
												children: `${date?.date} ${date?.month.slice(0, 3).toUpperCase()} ${date?.year}`,
												style: textStyle,
											},
										},
										{
											type: "div",
											props: {
												tw: "h-2 w-2 shadow-xl rounded-full",
												style: {backgroundColor: textStyle.color, opacity: 0.3},
											},
										},
										...tags.map((tags) => ({
											type: "div",
											props: {
												children: `#${tags}`,
												tw: "text-lg",
												style: textStyle,
											},
										})),
									],
								},
							},
						],
					},
				},

				{
					type: "div",
					props: {
						tw: "flex items-center w-full justify-start",
						children: [
							{
								type: "img",
								props: {
									src: props.avatar,
									tw: "w-24 h-24 mr-4 flex rounded-full shadow-xl overflow-hidden",
									style: borderStyle,
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
												tw: "text-2xl font-light",
												children: props.author,
												style: textStyle,
											},
										},
									],
								},
							},
						],
					},
				},
				typeof props.footer !== "string"
					? undefined
					: {
							type: "div",
							props: {
								tw: "flex absolute bottom-14 mx-14 left-0 w-full items-center",
								children: [
									{
										type: "div",
										props: {
											tw: "text-2xl font-bold w-fit shadow-xl items-center justify-center mx-auto py-4 px-10 overflow-hidden",
											children: props.footer,
											style: {
												...borderStyle,
												color: textStyle.color,
												borderRadius: 100,
												backgroundColor: backgroundColor,
											},
										},
									},
								],
							},
						},
			],
			tw: "w-full h-full flex flex-col items-start justify-start relative p-14",
			style: {
				backgroundImage:
					backgroundImage.length > 0 ? `url('${backgroundImage}')` : undefined,
				backgroundColor: backgroundColor,
				gap: "3rem",
				alignItems: "flex-start",
				justifyContent: "space-between",
			},
		},
	};
};

export default simpleOGBuilder;
