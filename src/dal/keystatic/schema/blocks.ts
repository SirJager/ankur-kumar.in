import {fields} from "@keystatic/core";

export const blocks = fields.blocks(
	{
		link: {
			label: "Link",
			schema: fields.object({
				label: fields.text({label: "Label"}),
				url: fields.text({label: "URL"}),
			}),
		},
		text: {
			label: "Text",
			schema: fields.text({label: "Text", validation: {isRequired: true}, multiline: true}),
		},
		markdown: {
			label: "Markdown",
			schema: fields.markdoc({label: "Markdown", extension: "md"}),
		},
		button: {
			label: "Button",
			itemLabel: (item) => item.fields.label.value,
			schema: fields.object({
				label: fields.text({label: "Label", validation: {isRequired: true, length: {min: 1}}}),
				url: fields.url({label: "URL"}),
			}),
		},
		//
	},
	{
		label: "Blocks",
	}
);
