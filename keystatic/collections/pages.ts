import colorBlock from "../blocks/color";
import iconBlock from "../blocks/icon";
import {text, textarea, textstyle, twclass} from "../blocks/text";
import shared from "../shared";
import {collection, fields} from "@keystatic/core";

const button = fields.object({
	text: fields.text({label: "Button text", ...shared.required}),
	href: fields.text({label: "Href"}),
	buttonstyle: fields.object(
		{
			font: fields.text({
				label: "Font Family",
				description: "CSS font-family value (e.g., Inter, Roboto, serif).",
			}),
			size: fields.number({label: "Font Size", description: "Font size in pixels (px)."}),
			icon: fields.object(
				{
					value: iconBlock,
					placement: fields.select({
						label: "Icon placement",
						description:
							"Position of the icon relative to the text (left or right). Affects alignment, spacing, and overall visual balance of the component.",
						defaultValue: "left",
						options: [
							{label: "Left", value: "left"},
							{label: "Right", value: "right"},
						],
					}),
				},
				{layout: [6, 6]}
			),
			color: colorBlock,
			classes: twclass,
		},
		{
			label: "Button Style",
			layout: [7, 5, 12, 12, 12],
			//
		}
	),
	//
});

const pages = collection({
	entryLayout: "content",
	label: "Pages",
	slugField: "title",
	schema: {
		title: fields.slug({name: {label: "Title"}}),
		blocks: fields.blocks(
			{
				string: {
					label: "String",
					schema: fields.object({string: text, style: textstyle}),
					itemLabel: (s) => `[STRING] --> ${s.fields.string.value}`,
				},
				textarea: {
					label: "TextArea",
					schema: fields.object({string: textarea, style: textstyle}),
					itemLabel: (s) => `[TEXTAREA] --> ${s.fields.string.value}`,
				},
				button: {
					label: "Button",
					schema: button,
					itemLabel: (s) =>
						`[BUTTON] --> ${s.fields.text.value}` +
						(s.fields.href.value.length === 0 ? "" : ` ---> ${s.fields.href.value}`),
					//
				},
				//
			},
			{label: "Blocks"}
		),
	},
});

export default pages;
