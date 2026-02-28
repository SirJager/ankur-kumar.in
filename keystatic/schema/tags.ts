import {fields, collection} from "@keystatic/core";

export const tags = collection({
	label: "Tags",
	slugField: "name",
	schema: {
		created: fields.date({
			label: "Date Created",
		}),
		name: fields.text({
			label: "Name",
		}),
		description: fields.text({
			label: "Description",
		}),
	},
});

export default tags;
