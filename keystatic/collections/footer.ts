import {collection, fields} from "@keystatic/core";
import {z} from "zod";

export const zodFooterSchema = z.object({
	name: z.string().min(1),
	sections: z.array(
		z.object({
			title: z.string().min(1),
			links: z.array(z.string().min(1)),
		})
	),
	links: z.array(z.string()).optional(),

	copyright: z.string().min(1),
});

export type IFooter = z.infer<typeof zodFooterSchema> & {slug: string};
export interface Footer extends z.infer<typeof zodFooterSchema> {
	slug: string;
}

const footer = collection({
	label: "Footer",
	columns: ["name"],
	previewUrl: "/",
	slugField: "name",
	schema: {
		name: fields.slug({name: {label: "Name"}}),
		sections: fields.array(
			fields.object({
				title: fields.text({label: "Section Title"}),
				links: fields.array(fields.relationship({collection: "links", label: "Links"}), {
					label: "Links",
					itemLabel: (s) => s.value ?? "",
				}),
			}),
			{
				label: "Sections",
				itemLabel: (s) => {
					const str = [s.fields.title.value];
					return str.join(" ");
				},
			}
		),
		links: fields.multiRelationship({
			label: "Links",
			collection: "links",
		}),

		copyright: fields.text({
			label: "Copyright Notice",
			description:
				"Text shown in the site footer indicating copyright ownership and year (e.g., © 2026 Your Name. All rights reserved.)",
			validation: {isRequired: true, length: {min: 1}},
		}),
	},
});

export default footer;
