import {fields, collection} from "@keystatic/core";
import shared from "keystatic/shared";

const posts = collection({
	label: "Posts",
	slugField: "title",
	columns: ["title", "status", "created"],
	format: {contentField: "content"},
	entryLayout: "content",
	schema: {
		status: shared.status,
		created: shared.datetime("Date Created"),
		updated: shared.datetime("Date Updated"),
		publish: shared.datetime("Date Published"),
		title: fields.slug({name: {label: "Title"}}),
		description: fields.text({label: "Title", multiline: true}),
		content: fields.mdx({
			label: "Content",
			extension: "mdx",
			description:
				"Write your post content here using MDX. You can embed components, images, and code.",
		}),
		authors: fields.array(
			fields.relationship({
				label: "Select a author",
				collection: "users",
				validation: {isRequired: true},
			}),
			{
				label: "Authors",
				itemLabel: (f) => `${f.value}`,
			}
		),
		tags: fields.array(
			fields.relationship({
				label: "Select a tag",
				collection: "tags",
				validation: {isRequired: true},
			}),
			{
				label: "Tags",
				itemLabel: (f) => `${f.value}`,
			}
		),
		categories: fields.array(
			fields.relationship({
				label: "Select a category",
				collection: "categories",
				validation: {isRequired: true},
			}),
			{
				label: "Categories",
				itemLabel: (f) => `${f.value}`,
			}
		),
		keywords: fields.array(
			fields.text({
				label: "Add a keyword",
				validation: {isRequired: true, length: {min: 1, max: 30}},
				description: "",
			}),
			{
				label: "Keywords",
				itemLabel: (f) => `${f.value}`,
				description: "Keywords for seo",
			}
		),
	},
});

export default posts;
