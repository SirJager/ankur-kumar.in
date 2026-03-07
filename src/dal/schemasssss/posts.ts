import {z} from "astro:content";

export const status = ["published", "draft", "archived", "obsolete"] as const;
export type Status = (typeof status)[number];

const dateSchema = z.any().transform((str) => new Date(str));
const postOpts = ["toc-off", "toc-sticky-off", "toc-opened-off", "comments-off"] as const;
export type PostOpts = (typeof postOpts)[number];

export interface Heading {
	depth: number;
	slug: string;
	text: string;
}

export const postSchema = z.object({
	status: z.enum(status).default("draft"),
	//
	created: dateSchema,
	updated: dateSchema,
	publish: dateSchema,
	//
	title: z.string().min(1).max(100),
	description: z.string().min(1).max(180),
	//
	tags: z.array(z.string()).optional().default([]),
	keywords: z.array(z.string()).optional().default([]),
	categories: z.array(z.string()).optional().default([]),

	readtime: z
		.object({minutes: z.number(), text: z.string(), time: z.number(), words: z.number()})
		.optional()
		.default({minutes: 0, text: "few minutes", time: 0, words: 0}),
});

export type IPost = z.infer<typeof postSchema> & {slug: string};
export interface Post extends z.infer<typeof postSchema> {
	slug: string;
}
