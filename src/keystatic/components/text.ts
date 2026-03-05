import {fields} from "@keystatic/core";
import colorField from "./color";

const options = ["textarea", "markdoc"] as const;

const editor = fields.select({
	defaultValue: "textarea",
	label: "Blocks",
	options: options.map((str) => ({label: str.charAt(0).toUpperCase() + str.slice(1), value: str})),
});

export const text = fields.conditional(editor, {
	textarea: fields.object({
		text: fields.text({label: "TextArea", multiline: true}),
		options: fields.object({
			font: fields.text({
				label: "Font Family",
				description:
					"Font family used to render the text. Enter a valid CSS font name such as Inter, Roboto, or serif.",
			}),
			color: colorField,
			size: fields.number({
				label: "Font Size",
				description:
					"Font size in pixels. Use larger values for headings or emphasis, smaller values for subtle text.",
			}),
			classes: fields.text({
				label: "tailwind css classes",
				multiline: true,
				validation: {pattern: {regex: /^[^\r\n]*$/}},
			}),
		}),
	}),
	markdoc: fields.markdoc({label: "Markdoc", extension: "md"}),
});

export default text;
