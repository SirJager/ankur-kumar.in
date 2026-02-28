import {fields, collection} from "@keystatic/core";

export const blog = collection({
	label: "Posts",
	slugField: "title",
	path: "src/content/posts/*",
	format: {contentField: "content"},
	schema: {
		title: fields.slug({name: {label: "Title"}}),
		content: fields.markdoc({label: "Content"}),
	},
});

export default blog;
