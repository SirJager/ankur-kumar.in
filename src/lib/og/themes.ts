const borderStyles = {
	borderWidth: 2,
	borderStyle: "solid",
} as const;

export const ogThemes = {
	light: {
		color: "#121212",
		backgroundColor: "#FAFAFA",
		border: {
			...borderStyles,
			borderColor: "#262626",
		},
	},
	dark: {
		color: "#FAFAFA",
		backgroundColor: "#121212",
		border: {
			...borderStyles,
			borderColor: "#D7D7D7",
		},
	},
} as const;

export type OGTheme = keyof typeof ogThemes;

export const themeNames = Object.keys(ogThemes) as OGTheme[];
