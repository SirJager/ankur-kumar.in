import { collection, fields } from "@keystatic/core";
import shared from "@keystatic/shared";
import { z } from "zod";
import { slugify } from "@/lib/utils";

export const status = ["published", "draft", "archived", "obsolete"] as const;
export type Status = (typeof status)[number];

const postOpts = ["toc-off", "toc-sticky-off", "toc-opened-off", "comments-off"] as const;
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
	//
	tags: z.array(z.string()).optional().default([]),
	keywords: z.array(z.string()).optional().default([]),
	categories: z.array(z.string()).optional().default([]),

	readtime: z
		.object({ minutes: z.number(), text: z.string(), time: z.number(), words: z.number() })
		.optional()
		.default({ minutes: 0, text: "few minutes", time: 0, words: 0 }),
});

export type IPost = z.infer<typeof zodPostsSchema> & { slug: string };
export interface Post extends z.infer<typeof zodPostsSchema> {
	slug: string;
}

const posts = collection({
	label: "Posts",
	slugField: "title",
	columns: ["title", "status", "created"],
	entryLayout: "content",
	format: { contentField: "content" },
	schema: {
		status: shared.status,
		publish: shared.datetime("Date Published"),
		thumbnail: fields.image({
			label: "Thumbnail",
			directory: "public/images/thumbnail",
			publicPath: "/posts/thumbnail/",
			transformFilename: (f) => slugify(f),
			validation: { isRequired: false },
		}),

		title: fields.slug({ name: { label: "Title" } }),
		description: fields.text({ label: "Description", multiline: true }),
		content: fields.mdx({
			description:
				"Write your post content here using MDX. You can embed components, images, and code.",
			extension: "mdx",
			label: "Content",
		}),

		authors: fields.array(
			fields.relationship({
				collection: "users",
				label: "Select a author",
				validation: { isRequired: true },
			}),
			{ itemLabel: (f) => `${f.value}`, label: "Authors" }
		),
		tags: fields.array(
			fields.relationship({
				collection: "tags",
				label: "Select a tag",
				validation: { isRequired: true },
			}),
			{ itemLabel: (f) => `${f.value}`, label: "Tags" }
		),
		categories: fields.array(
			fields.relationship({
				collection: "categories",
				label: "Select a category",
				validation: { isRequired: true },
			}),
			{ itemLabel: (f) => `${f.value}`, label: "Categories" }
		),
		keywords: fields.array(
			fields.text({
				label: "Add a keyword",
				validation: { isRequired: true, length: { max: 30, min: 1 } },
			}),
			{ description: "Keywords for seo", itemLabel: (f) => `${f.value}`, label: "Keywords" }
		),
		created: shared.datetime("Date Created"),
		updated: shared.datetime("Date Updated"),
	},
});

export default posts;
