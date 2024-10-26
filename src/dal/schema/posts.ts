import { z } from "astro:content";

export const status = ["published", "draft", "archived", "obsolete"] as const;
export type Status = (typeof status)[number];


const dateSchema = z.string().transform((str) => new Date(str));
const postOpts = ["toc-off", "toc-sticky-off", "toc-opened-off", "comments-off"] as const;
export type PostOpts = (typeof postOpts)[number];

export type Heading = {
	slug: string;
	text: string;
	depth: number;
};

export const postSchema = z.object({
	status: z.enum(status).default("draft"),

	published: dateSchema,
	created: dateSchema,
	updated: dateSchema,

	banner: z.string().optional(),
	banner_x: z.number().optional().default(0.5),
	banner_y: z.number().optional().default(0.5),

	title: z.string().min(1).max(100),
	description: z.string().min(1).max(180),

	markdown: z.string().optional().default(""),
	html: z.string().optional().default(""),

	headings: z
		.array(
			z.object({
				text: z.string(),
				slug: z.string(),
				depth: z.number(),
			})
		)
		.optional()
		.default([]),

	readtime: z
		.object({
			text: z.string(),
			time: z.number(),
			words: z.number(),
			minutes: z.number(),
		})
		.optional()
		.default({ text: "few minutes", time: 0, words: 0, minutes: 0 }),

	tags: z.array(z.string()).optional().default([]),
	keywords: z.array(z.string()).optional().default([]),
	categories: z.array(z.string()).optional().default([]),
	options: z.array(z.enum(postOpts)).optional().default([]),
});

export type Post = z.infer<typeof postSchema> & { slug: string };
export interface IPost extends z.infer<typeof postSchema> {
	slug: string;
}
