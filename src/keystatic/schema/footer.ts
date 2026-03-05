import {collection, fields} from "@keystatic/core";
import {z} from "zod";
import {zodLinkSchema} from "./links";

export const zodFooterSchema = z.object({
	name: z.string().min(1),
	sections: z.array(
		z.object({
			title: z.string().min(1),
			links: z.array(zodLinkSchema),
			//
		})
	),
});

const footer = collection({
	label: "Footer",
	columns: ["name"],
	previewUrl: "/",
	slugField: "name",
	schema: {
		name: fields.slug({name: {label: "Name"}}),
		sections: fields.array(
			fields.object({
				title: fields.text({label: "Title"}),
				links: fields.array(fields.relationship({collection: "links", label: "Links"}), {}),
			}),
			{
				label: "Sections",
				itemLabel: (s) => {
					const str = [s.fields.title.value];
					return str.join(" ");
				},
			}
		),
	},
});

export default footer;
