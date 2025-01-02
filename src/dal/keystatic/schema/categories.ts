import {fields, collection} from "@keystatic/core";
import {dateField, slugField} from "./common";
import {capitalizeWords} from "@/lib/utils";

export const categories = collection({
	label: "Categories",
	slugField: "name",
	path: "src/content/categories/*",
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
