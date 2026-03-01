import {fields, collection} from "@keystatic/core";
import shared from "keystatic/shared";

const links = collection({
	label: "Reusable Links",
	slugField: "name",
	columns: ["text", "href", "updated"],
	schema: {
		created: shared.datetime("Date Created"),
		updated: shared.datetime("Date Updated"),
		name: fields.text({
			label: "Link name",
			validation: {isRequired: true},
			description: "Name to indetify this particular resuable link",
		}),
		text: fields.text({
			label: "Button Text",
			validation: {isRequired: true},
			description: "Visible text shown on buttons or link UI elements.",
		}),

		href: fields.url({
			label: "Destination URL",
			validation: {isRequired: true},
			description:
				"Target location for this link. Use '/about' for internal pages or a full URL for external sites.",
		}),

		label: fields.text({
			label: "SEO Label",
			validation: {isRequired: true},
			description:
				"Accessibility and SEO label (aria-label). Describes the link’s purpose for screen readers and search engines.",
		}),

		description: fields.text({
			label: "Internal Description",
			multiline: true,
			description:
				"Optional internal note explaining where or why this link is used across the site.",
		}),

		icon: fields.text({
			label: "Icon Name",
			description:
				"Icon identifier (string). Example: 'github', 'arrow-right', 'home'. Rendering depends on your icon system.",
		}),

		color: fields.text({
			label: "CSS Color",
			validation: {
				pattern: {
					regex:
						/^(#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})|rgb\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)|rgba\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(0|1|0?\.\d+)\s*\)|hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)|hsla\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*,\s*(0|1|0?\.\d+)\s*\)|[a-zA-Z]+)$/,
					message:
						"Enter a valid CSS color (hex, rgb, rgba, hsl, hsla, or named color).",
				},
			},
			description:
				"Any valid CSS color value. Examples: '#ff0000', '#f00', 'rgb(255,0,0)', 'hsl(0,100%,50%)', 'red'.",
		}),

		newtab: fields.checkbox({
			label: "Open in New Tab",
			defaultValue: false,
			description:
				"Enable to open the link in a new browser tab (recommended for external links).",
		}),
	},
});

export default links;
