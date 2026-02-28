import {fields, collection} from "@keystatic/core";

export const categories = collection({
	label: "Categories",
	slugField: "slug",
	schema: {
		slug: fields.slug({
			name: {label: "Slug", validation: {isRequired: true}},
		}),
		name: fields.text({
			label: "Name",
			validation: {isRequired: true},
		}),
		description: fields.text({
			label: "Description",
		}),
	},
});

export default categories;
