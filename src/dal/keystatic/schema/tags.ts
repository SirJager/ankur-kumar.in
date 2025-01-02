import {fields, collection} from "@keystatic/core";
import {dateField, slugField} from "./common";
import {capitalizeWords} from "@/lib/utils";

export const tags = collection({
	label: "Tags",
	slugField: "name",
	path: "src/content/tags/*",
	columns: ["name", "description", "created"],
	format: {
		data: "json",
	},
	schema: {
		created: dateField("Created At"),
		name: slugField("Name"),
		description: fields.text({
			label: "Description",
			multiline: true,
			validation: {
				isRequired: true,
				length: {min: 1},
			},
		}),
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
