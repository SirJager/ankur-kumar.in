import {fields, singleton} from "@keystatic/core";
import {z} from "zod";
import shared from "../shared";

export const zodSiteSchema = z.object({
	site: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		metaDescription: z.string().min(1),
	}),
});

export type Site = z.infer<typeof zodSiteSchema> & {slug: string};
export interface ISite extends z.infer<typeof zodSiteSchema> {
	slug: string;
}

const site = singleton({
	label: "Site",
	path: "content/site",
	schema: {
		site: fields.object(
			{
				title: fields.text({
					description: "Main title of the site, used in headers and metadata.",
					label: "Site Title",
					...shared.required,
				}),

				description: fields.text({
					description: "Full introduction describing the site and its purpose.",
					label: "Site Description",
					multiline: true,
					...shared.required,
				}),

				metaDescription: fields.text({
					description: "Short SEO-friendly summary for search engines and previews.",
					label: "Meta Description",
					multiline: true,
					...shared.required,
				}),
			},
			{
				description: "Global Configuration and content for the Website",
				label: "Site Configurations",
				layout: [12, 12, 12],
			}
		),
	},
});

export default site;
