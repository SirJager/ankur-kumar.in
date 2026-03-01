import {fields, collection} from "@keystatic/core";
import {slugify} from "@/lib/utils";
import shared from "keystatic/shared";

const categories = collection({
	label: "Categories",
	slugField: "name",
	columns: ["name", "description", "created"],
	schema: {
		created: shared.datetime("Date Created"),
		name: fields.slug({
			name: {
				label: "Name",
				validation: {isRequired: true},
				description:
					"The display name of the category, shown in menus or lists.",
			},
			slug: {
				validation: {length: {min: 2, max: 100}},
				generate: (f) => slugify(f),
			},
		}),
		description: fields.text({
			label: "Description",
			description:
				"A short explanation of what this category represents or contains.",
		}),
	},
});

export default categories;
