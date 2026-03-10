import type {OGBuilderProps} from ".";
import {parseDate} from "../utils";
import {type OGTheme, ogThemes, themeNames} from "./themes";

const getTitle = (title: string, maxLength?: number | null) => {
	const len = maxLength || 56;
	return title.slice(0, len) + (title.length > len ? " ..." : "");
};

const simpleOGBuilder = (props: OGBuilderProps) => {
	// Astro doesn't support tsx endpoints so usign React-element objects
	// Every element must have "flex"

	const _theme = props.theme;
	const theme = themeNames.includes(_theme as OGTheme) ? (_theme as OGTheme) : "dark";

	const date = parseDate(new Date().toISOString());
	const styl = ogThemes[theme];
	const textColor = props.textColor ?? styl.color;
	const backgroundColor = props.backgroundColor ?? styl.backgroundColor;
	const backgroundImage = props.backgroundImage;

	const textStyle = {color: textColor, fontFamily: "Raleway"};
	const borderStyle = {...styl.border, borderColor: props.borderColor ?? styl.border.borderColor};

	const categories = props.categories || [];
	const tags = props.tags || [];

	return {
		key: props.title,
		props: {
			children: [
				{
					props: {
						children: [{props: {src: props.logo}, type: "img"}],
						style: borderStyle,
						tw: "flex w-14 h-14 flex shadow-2xl rounded-full overflow-hidden",
					},
					type: "div",
				},
				{
					props: {
						children: [
							{
								props: {
									children: [
										...categories.map((category, i) => {
											return {
												props: {
													children: category,
													style: {
														...textStyle,
														...borderStyle,
														marginLeft: i === 0 ? "0" : "0.5rem",
													},
													tw: "shadow-xl text-lg rounded-3xl px-4 py-1",
												},
												type: "div",
											};
										}),
									],
									tw: "flex flex-row items-center",
								},
								type: "div",
							},
							{
								props: {
									children: getTitle(props.title, props.length),
									style: textStyle,
									tw: "text-5xl leading-[52px] mt-5 max-w-2xl w-full",
								},
								type: "div",
							},
							{
								props: {
									children: [
										{
											props: {
												children: `${date?.date} ${date?.month.slice(0, 3).toUpperCase()} ${date?.year}`,
												style: textStyle,
												tw: "text-lg font-bold",
											},
											type: "div",
										},
										{
											props: {
												style: {backgroundColor: textStyle.color, opacity: 0.3},
												tw: "h-2 w-2 shadow-xl rounded-full",
											},
											type: "div",
										},
										...tags.map((tags) => ({
											props: {children: `#${tags}`, style: textStyle, tw: "text-lg"},
											type: "div",
										})),
									],
									style: {gap: "1rem"},
									tw: "shrink flex-wrap items-center flex mt-5 w-full",
								},
								type: "div",
							},
						],
						style: {gap: "1rem"},
						tw: "flex flex-col items-start justify-start",
					},
					type: "div",
				},

				{
					props: {
						children: [
							{
								props: {
									src: props.avatar,
									style: {
										...borderStyle,
									},
									tw: "w-24 h-24 mr-4 flex rounded-full shadow-xl overflow-hidden",
								},
								type: "img",
							},
							{
								props: {
									children: [
										{
											props: {children: props.author, style: textStyle, tw: "text-2xl font-light"},
											type: "div",
										},
									],
									tw: "flex flex-col",
								},
								type: "div",
							},
						],
						tw: "flex items-center w-full justify-start",
					},
					type: "div",
				},
				typeof props.footer !== "string"
					? undefined
					: {
							props: {
								children: [
									{
										props: {
											children: props.footer,
											style: {
												...borderStyle,
												backgroundColor,
												borderRadius: 100,
												color: textStyle.color,
											},
											tw: "text-2xl font-bold w-fit shadow-xl items-center justify-center mx-auto py-4 px-10 overflow-hidden",
										},
										type: "div",
									},
								],
								tw: "flex absolute bottom-14 mx-14 left-0 w-full items-center",
							},
							type: "div",
						},
			],
			style: {
				alignItems: "flex-start",
				backgroundColor,
				backgroundImage: backgroundImage.length > 0 ? `url('${backgroundImage}')` : undefined,
				gap: "3rem",
				justifyContent: "space-between",
			},
			tw: "w-full h-full flex flex-col items-start justify-start relative p-14",
		},
		type: "div",
	};
};

export default simpleOGBuilder;
