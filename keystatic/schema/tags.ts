import {fields, collection} from "@keystatic/core";
import {slugify} from "@/lib/utils";
import shared from "keystatic/shared";

const tags = collection({
	label: "Tags",
	slugField: "name",
	columns: ["name", "description", "created"],
	schema: {
		created: shared.datetime("Date Created"),
		name: fields.slug({
			name: {
				label: "Name",
				validation: {isRequired: true},
				description: "The display name of the tag, used to label content.",
			},
			slug: {
				validation: {length: {min: 2, max: 100}},
				generate: (f) => slugify(f),
			},
		}),
		description: fields.text({
			label: "Description",
			validation: {isRequired: true},
			description:
				"A brief explanation of the tag’s purpose or what it represents.",
		}),
	},
});

export default tags;
