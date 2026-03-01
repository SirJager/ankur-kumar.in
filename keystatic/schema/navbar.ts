import {fields, singleton} from "@keystatic/core";

const navbar = singleton({
	label: "Navigation",
	schema: {
		links: fields.array(
			fields.object({
				label: fields.text({
					label: "Label",
					description: "Text shown to users in the navigation menu.",
				}),
				url: fields.url({
					label: "URL",
					description:
						"Destination link for this navigation item (internal or external).",
				}),
			}),
			{
				label: "Site Navigation Links",
				description: "Manage the links displayed in the main site navigation.",
				itemLabel: (s) => `${s.fields.label.value} - ${s.fields.url.value}`,
			}
		),
	},
});


export default navbar
