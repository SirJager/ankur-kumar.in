import {collection, fields} from "@keystatic/core";
import shared from "@keystatic/shared";
import {z} from "zod";
import {slugify} from "@/lib/utils";

const dateSchema = z.any().transform((str) => new Date(str));

export const zodTagSchema = z.object({
	created: dateSchema,
	name: z.string().min(1).max(100),
	description: z.string().min(1).max(255),
});

const tags = collection({
	columns: ["name", "description", "created"],
	label: "Tags",
	schema: {
		created: shared.datetime("Date Created"),
		name: fields.slug({
			name: {
				description: "The display name of the tag, used to label content.",
				label: "Name",
				...shared.required,
			},
			slug: {generate: (f) => slugify(f), validation: {length: {max: 100, min: 2}}},
		}),
		description: fields.text({
			description: "A brief explanation of the tag’s purpose or what it represents.",
			label: "Description",
			...shared.required,
		}),
	},
	slugField: "name",
});

export default tags;
