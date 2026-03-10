import colorBlock, {COLOR_REGEX} from "../blocks/color";
import iconBlock from "../blocks/icon";
import {collection, fields} from "@keystatic/core";
import shared from "@keystatic/shared";
import {z} from "zod";

export const zodLinkSchema = z.object({
	name: z.string().min(1),
	text: z.string().min(1).max(100),
	href: z.string().min(1),
	label: z.string(),
	color: z.string().regex(COLOR_REGEX).optional(),
	icon: z.string().optional(),
	newtab: z.boolean().optional(),
});

export type IReusableLink = z.infer<typeof zodLinkSchema> & {slug: string};
export interface ReusableLink extends z.infer<typeof zodLinkSchema> {
	slug: string;
}

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

	icon: iconBlock,
	color: colorBlock,
	newtab: fields.checkbox({
		defaultValue: false,
		description: "Enable to open the link in a new browser tab (recommended for external links).",
		label: "Open in New Tab",
	}),

	description: fields.text({
		description:
			"Optional internal note explaining where or why this link is used across the site.",
		label: "Internal Description",
	}),
};

const links = collection({
	slugField: "name",
	label: "Reusable Links",
	columns: ["name", "text", "href", "icon", "color", "newtab"],
	schema: keystaticLinkSchema,
});

export default links;
