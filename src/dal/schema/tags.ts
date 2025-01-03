import {z} from "astro:content";

const dateSchema = z.any().transform((str) => new Date(str));

export const tagsSchema = z.object({
	created: dateSchema,
	name: z.string().min(1).max(100),
	description: z.string().min(1).max(255),
});
