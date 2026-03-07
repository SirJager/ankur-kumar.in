import { collection, fields } from "@keystatic/core";
import shared from "@keystatic/shared";
import { z } from "zod";
import { slugify } from "@/lib/utils";

const dateSchema = z.any().transform((str) => new Date(str));

export const zodCategoriesSchema = z.object({
	created: dateSchema,
	description: z.string().min(1).max(255),
	name: z.string().min(1).max(100),
});

const categories = collection({
	columns: ["name", "description", "created"],
	label: "Categories",
	schema: {
		created: shared.datetime("Date Created"),
		description: fields.text({
			description: "A short explanation of what this category represents or contains.",
			label: "Description",
		}),
		name: fields.slug({
			name: {
				description: "The display name of the category, shown in menus or lists.",
				label: "Name",
				validation: { isRequired: true },
			},
			slug: { generate: (f) => slugify(f), validation: { length: { max: 100, min: 2 } } },
		}),
	},
	slugField: "name",
});

export default categories;
