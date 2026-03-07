import {fields} from "@keystatic/core";

export const COLOR_REGEX =
	/^$|^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})|rgb\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)|rgba\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(0|1|0?\.\d+)\s*\)|hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)|hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)|[a-zA-Z]+)$/;

const colorBlock = fields.text({
	description:
		"Any valid CSS color value. Examples: '#ff0000', '#f00', 'rgb(255,0,0)', 'hsl(0,100%,50%)', 'red'.",
	label: "CSS Color",
	validation: {
		pattern: {
			message: "Enter a valid CSS color (hex, rgb, rgba, hsl, hsla, or named color).",
			regex: COLOR_REGEX,
		},
	},
});

export default colorBlock;
