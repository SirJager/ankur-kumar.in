import {collection, fields} from "@keystatic/core";
import shared from "@keystatic/shared";
import {z} from "zod";
import colorBlock, {COLOR_REGEX} from "../blocks/color";
import iconBlock from "../blocks/icon";

export const zodLinkSchema = z.object({
	text: z.string().min(1).max(100),
	href: z.string().min(1),
	label: z.string(),
	color: z.string().regex(COLOR_REGEX).optional().default(""),
	icon: z.string().optional(),
	newtab: z.boolean().optional(),
});

export const keystaticLinkSchema = {
	created: shared.datetime("Date Created"),
	updated: shared.datetime("Date Updated"),
	name: fields.slug({
		name: {
			description: "Name to indetify this particular resuable link",
			label: "Link name",
			validation: {isRequired: true},
		},
	}),

	text: fields.text({
		description: "Visible text shown on buttons or link UI elements.",
		label: "Text",
		validation: {isRequired: true},
	}),

	href: fields.url({
		description:
			"Target location for this link. Use '/about' for internal pages or a full URL for external sites.",
		label: "Destination URL",
		validation: {isRequired: true},
	}),

	label: fields.text({
		description:
			"Accessibility and SEO label (aria-label). Describes the link’s purpose for screen readers and search engines.",
		label: "SEO Label",
		validation: {isRequired: true},
	}),

	description: fields.text({
		description:
			"Optional internal note explaining where or why this link is used across the site.",
		label: "Internal Description",
	}),

	color: colorBlock,
	icon: iconBlock,
	newtab: fields.checkbox({
		defaultValue: false,
		description: "Enable to open the link in a new browser tab (recommended for external links).",
		label: "Open in New Tab",
	}),
};

const links = collection({
	slugField: "name",
	label: "Reusable Links",
	columns: ["name", "text", "href", "updated"],
	schema: keystaticLinkSchema,
});

export default links;
