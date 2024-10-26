import {fields, collection} from "@keystatic/core";
import {tagsField} from "./tags";
import {categoriesField} from "./categories";
import {dateField} from "./common";

export const notes = collection({
	label: "Notes",
	slugField: "title",
	path: "src/content/notes/*",
	format: {
		data: "yaml",
		contentField: "content",
	},
	schema: {
		content: fields.mdx({label: "Content", extension: "md"}),
		created: dateField("Created At"),
		updated: dateField("Updated At"),
		title: fields.slug({
			name: {
				label: "Title",
			},
		}),
		description: fields.text({
			label: "Description",
			multiline: true,
			description: "description of this note",
			validation: {
				isRequired: true,
			},
		}),
		tags: tagsField,
		categories: categoriesField,
	},
});

export default notes;
