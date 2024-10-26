import {fields, collection} from "@keystatic/core";
import {dateField} from "./common";
import {capitalizeWords} from "@/lib/utils";

export const categories = collection({
	label: "Categories",
	slugField: "name",
	path: "src/content/categories/*",
	format: {
		data: "yaml",
		contentField: "content",
	},
	schema: {
		content: fields.emptyContent({extension: "md"}),
		created: dateField("Created At"),
		name: fields.slug({name: {label: "Name"}}),
		description: fields.text({label: "Description"}),
	},
});


export const categoriesField = fields.array(
	fields.relationship({
		label: "Categories",
		description: "Categories associated with this entity max(2)",
		collection: "categories",
		validation: {
			isRequired: true,
		},
	}),
	{
		label: "Categories",
		itemLabel: (props) => capitalizeWords(`${props.value}`),
		validation: {
			length: {
				max: 2,
			},
		},
	}
);


export default categories;
