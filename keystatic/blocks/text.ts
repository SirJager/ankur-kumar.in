import colorField from "./color";
import {fields} from "@keystatic/core";

export const text = fields.text({label: "String"});
export const textarea = fields.text({label: "TextArea", multiline: true});
export const markdown = fields.mdx({label: "Markdown", extension: "md"});
export const markdoc = fields.markdoc({label: "Markdoc", extension: "md"});

export const twclass = fields.text({
	label: "Tailwind or Daisy ui classes",
	multiline: true,
	validation: {pattern: {regex: /^[^\r\n]*$/}},
});

export const textstyle = fields.object(
	{
		font: fields.text({
			label: "Font Family",
			description: "CSS font-family value (e.g., Inter, Roboto, serif).",
		}),
		size: fields.number({label: "Font Size", description: "Font size in pixels (px)."}),
		color: colorField,
		classes: twclass,
	},
	{layout: [8, 4, 12, 12], label: "Text Styles"}
);
