import {slugify} from "@/lib/utils";
import {collection, fields} from "@keystatic/core";
import shared from "@keystatic/shared";
import {z} from "zod";

export const status = ["published", "draft", "archived", "obsolete"] as const;
export type Status = (typeof status)[number];

const postOpts = [
	"none",
	"toc-off",
	"toc-left",
	"toc-sticky-off",
	"toc-opened-off",
	"comments-off",
] as const;
export type PostOpts = (typeof postOpts)[number];

export interface Heading {
	depth: number;
	slug: string;
	text: string;
}

export const zodPostsSchema = z.object({
	status: z.enum(status).default("draft"),
	//
	created: shared.zodDate,
	updated: shared.zodDate,
	publish: shared.zodDate,
	//
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(180),
	thumbnail: z.string().optional(),
	//
	tags: z.array(z.string()).optional().default([]),
	keywords: z.array(z.string()).optional().default([]),
	categories: z.array(z.string()).optional().default([]),
	author: z.string().min(1),
	options: z.array(z.enum(postOpts)),

	// readtime: z
	// 	.object({ minutes: z.number(), text: z.string(), time: z.number(), words: z.number() })
	// 	.optional()
	// 	.default({ minutes: 0, text: "few minutes", time: 0, words: 0 }),
});

export type IPost = z.infer<typeof zodPostsSchema> & {slug: string};
export interface Post extends z.infer<typeof zodPostsSchema> {
	slug: string;
}

const posts = collection({
	label: "Posts",
	slugField: "title",
	columns: ["status", "title", "created", "description"],
	entryLayout: "content",
	format: {contentField: "content"},
	schema: {
		status: shared.status,
		publish: shared.datetime("Date Published"),
		thumbnail: fields.image({
			label: "Thumbnail",
			directory: "public/images/thumbnail",
			publicPath: "/images/thumbnail/",
			transformFilename: (f) => slugify(f),
			validation: {isRequired: false},
		}),
		title: fields.slug({name: {label: "Title"}}),
		description: fields.text({label: "Description", multiline: true}),
		content: fields.mdx({
			description:
				"Write your post content here using MDX. You can embed components, images, and code.",
			extension: "md",
			label: "Content",
		}),
		author: fields.relationship({
			collection: "users",
			label: "Select a author",
			validation: {isRequired: true},
		}),

		tags: fields.multiRelationship({
			label: "Select a tag",
			collection: "tags",
		}),

		categories: fields.multiRelationship({
			label: "Select a category",
			collection: "categories",
		}),

		keywords: fields.multiRelationship({
			label: "Add a keyword",
			collection: "keywords",
		}),

		created: shared.datetime("Date Created"),
		updated: shared.datetime("Date Updated"),

		options: fields.array(
			fields.select({
				label: "Article View Options",
				description: "Customize how the this post will look in live mode",
				defaultValue: "none",
				options: [
					{label: "Select To Customize View", value: "none"},
					{label: "Disable Table Of Content", value: "toc-off"},
					{label: "Disable Sticky Table Of Content", value: "toc-sticky-off"},
					{label: "Start Collapsed Table Of Content", value: "toc-opened-off"},
					{label: "Keep Left Table Of Content", value: "toc-left"},
					{label: "Disable Comments Section", value: "comments-off"},
				],
			}),
			{
				label: "Article View Options",
				itemLabel: (s) => s.schema.options.find((o) => o.value === s.value)?.label ?? s.value,
			}
		),

		type: fields.ignored(), // for frontmatter
	},
});

export default posts;
