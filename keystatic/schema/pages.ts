import {fields, collection} from "@keystatic/core";

const pages = collection({
	label: "Pages",
	slugField: "title",
	path: "src/content/pages/*",
	entryLayout: "content",
	format: {contentField: "content"},
	schema: {
		title: fields.slug({name: {label: "Title"}}),
		description: fields.text({
			label: "Site Description",
			description: "Full summary describing the page and its purpose.",
			validation: {isRequired: true},
			multiline: true,
		}),
		content: fields.markdoc({label: "Content"}),
	},
});

export default pages;
