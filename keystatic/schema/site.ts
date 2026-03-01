import {fields, singleton} from "@keystatic/core";

const site = singleton({
	label: "Site Info",
	path: "content/site",
	schema: {
		lang: fields.text({
			label: "Language",
			description: "Primary locale of the site (e.g., en-US).",
			validation: {isRequired: true},
		}),

		title: fields.text({
			label: "Site Title",
			description: "Main title of the site, used in headers and metadata.",
			validation: {isRequired: true},
		}),

		metaDescription: fields.text({
			label: "Meta Description",
			description:
				"Short SEO-friendly summary for search engines and previews.",
			validation: {isRequired: true},
			multiline: true,
		}),

		description: fields.text({
			label: "Site Description",
			description: "Full introduction describing the site and its purpose.",
			validation: {isRequired: true},
			multiline: true,
		}),

		blog: fields.object(
			{
				title: fields.text({
					label: "Blog Title",
					description: "Headline describing the blog section.",
					validation: {isRequired: true},
				}),

				metaDescription: fields.text({
					label: "Blog Meta Description",
					description: "SEO-friendly summary for the blog section.",
					validation: {isRequired: true},
					multiline: true,
				}),

				description: fields.text({
					label: "Blog Description",
					description:
						"Introductory text explaining the blog’s theme and focus.",
					validation: {isRequired: true},
					multiline: true,
				}),

				readmore: fields.array(
					fields.text({
						label: "Paragraph",
						description:
							"Additional detailed paragraph expanding the blog story.",
						multiline: true,
					}),
					{
						label: "Read More Content",
						description:
							"Extended narrative sections for the blog introduction.",
						itemLabel: (s) => s.value,
					}
				),
			},
			{
				label: "Blog Settings",
				description: "Configuration and content for the blog section.",
			}
		),
	},
});

export default site
