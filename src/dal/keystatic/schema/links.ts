import {collection, fields} from "@keystatic/core";
import {z} from "astro:content";
import {slugField} from "./common";

export const links = collection({
	label: "Links",
	slugField: "text",
	path: "src/content/links/*",
	columns: ["href", "text", "label", "newtab"],
	format: {
		data: "json",
	},
	entryLayout: "form",
	schema: {
		text: slugField("Text"),
		href: fields.url({
			label: "URL",
			validation: {
				isRequired: true,
			},
		}),
		label: fields.text({
			label: "Label",
			description: "for seo: aria-label",
		}),
		icon: fields.text({
			label: "Icon",
			description: "Only Supports icons from: https://icon-sets.iconify.design",
			validation: {
				isRequired: true,
			},
		}),
		color: fields.text({
			label: "Icon Color",
			description: "Only hexcode example: #EA4335",
			validation: {
				isRequired: true,
				pattern: {
					regex: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
					message: "Only hexcode is supported. example: #EA4335",
				},
			},
		}),
		newtab: fields.checkbox({
			label: "Opens the link in a new tab or window",
			defaultValue: true,
		}),
	},
});

export const linkSchema = z.object({
	text: z.string().min(1).max(100),
	href: z.string().url().min(1),
	label: z.string().optional().default(""),
	icon: z.string().optional().default(""),
	color: z
		.string()
		.regex(/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)
		.optional()
		.default(""),
	newtab: z.boolean().optional().default(false),
});
