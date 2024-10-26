import { fields, collection } from "@keystatic/core";
import { dateField } from "./common";
import { capitalizeWords } from "@/lib/utils";

export const tags = collection({
	label: "Tags",
	slugField: "name",
	path: "src/content/tags/*",
	format: {
		data: "yaml",
		contentField: "content",
	},
	schema: {
		content: fields.emptyContent({ extension: "md" }),
		created: dateField("Created At"),
		name: fields.slug({ name: { label: "Name" } }),
		description: fields.text({ label: "Description" }),
	},
});


export const tagsField = fields.array(
	fields.relationship({
		label: "Tags",
		description: "Tags associated with this entity max(6)",
		collection: "tags",
		validation: {
			isRequired: true,
		},
	}),
	{
		label: "Tags",
		itemLabel: (props) => capitalizeWords(`${props.value}`),
		validation: {
			length: {
				max: 6,
			},
		},
	}
);


export default tags;
