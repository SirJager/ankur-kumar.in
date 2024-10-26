import { fields, collection } from "@keystatic/core";
import { components, dateField } from "./common";
import { tagsField } from "./tags";
import { categoriesField } from "./categories";
import { capitalizeWords } from "@/lib/utils";
import { blocks } from "./blocks";

export const status = ["published", "draft", "archived", "obsolete"] as const;
export type Status = (typeof status)[number];

export const posts = collection({
	label: "Posts",
	slugField: "title",
	path: "src/content/posts/*/",
	previewUrl: `/preview/{slug}`,
	format: {
		data: "yaml",
		contentField: "markdown",
	},
	entryLayout: "content",
	schema: {
		markdown: fields.mdx({
			label: "Markdown",
			extension: "md",
			components: components,
		}),

		status: fields.select({
			label: "Status",
			defaultValue: "draft",
			description: "Current status of this entity",
			options: status.map((status) => {
				return { label: capitalizeWords(status), value: status };
			}),
		}),

		created: dateField("Created At", "The date when the project was created."),
		updated: dateField("Updated At", "The date when the project was last updated."),
		published: dateField("Publish At"),

		//
		title: fields.slug({
			name: {
				label: "Title",
				validation: {
					isRequired: true,
				},
			},
		}),
		description: fields.text({
			label: "Description",
			multiline: true,
			description: "description of this post",
			validation: {
				isRequired: true,
			},
		}),
		authors: fields.array(
			fields.relationship({
				label: "Authors",
				collection: "users",
				validation: {
					isRequired: true,
				},
			}),
			{
				label: "Authors",
				itemLabel: (props) => `${props.value}`,
				validation: {
					length: {
						min: 1,
					},
				},
			}
		),

		//  Taxonomies
		tags: tagsField,
		categories: categoriesField,
		keywords: fields.array(
			fields.text({
				label: "Keyword",
				validation: {
					isRequired: true,
				},
			}),
			{
				label: "Keywords",
				itemLabel: (props) => capitalizeWords(`${props.value}`),
			}
		),

		blogs: blocks,

		// ignore fields that might are used by other cms or services
		type: fields.ignored(),
		modifided: fields.ignored(),
		options: fields.ignored(),
		banner: fields.ignored(),
		banner_x: fields.ignored(),
		banner_y: fields.ignored(),
		banner_lock: fields.ignored(),
		banner_icon: fields.ignored(),
	},
});
