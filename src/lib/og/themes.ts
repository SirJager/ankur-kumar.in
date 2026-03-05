const borderStyles = {borderStyle: "solid", borderWidth: 2} as const;

export const ogThemes = {
	dark: {
		backgroundColor: "#121212",
		border: {...borderStyles, borderColor: "#D7D7D7"},
		color: "#FAFAFA",
	},
	light: {
		backgroundColor: "#FAFAFA",
		border: {...borderStyles, borderColor: "#262626"},
		color: "#121212",
	},
} as const;

export type OGTheme = keyof typeof ogThemes;

export const themeNames = Object.keys(ogThemes) as OGTheme[];
