const styles = {
	focus:
		"outline-none ring-offset-white focus:outline-none focus:ring-2 focus:ring-base-300 focus:ring-offset-2 dark:focus:ring-offset-black",
	slidefx: {
		main: [
			"transition-all duration-300 ease-in-out",
			"after:transition-all after:duration-300 after:ease-in-out",
			"after:absolute after:left-0 after:h-full after:w-0 after:content-['']",
			"after:bottom-0 after:bg-base-content",
			"hover:text-base-100 hover:after:w-full",
		],
		span: "relative z-[1]",
	},
	underlinefx: {
		main: [
			"relative after:transition-all after:ease-in-out after:duration-100",
			"after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5",
			"after:bg-accent after:w-0 hover:after:w-full",
		],
		span: "z-[1] relative",
	},
} as const;

export default styles;
