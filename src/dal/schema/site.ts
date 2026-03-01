import {z} from "astro:content";

export const siteSchema = z.object({
	lang: z.string().min(1).max(30),
	title: z.string().min(1),
	description: z.string().min(1),
	metaDescription: z.string().min(1),
	blog: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		metaDescription: z.string().min(1),
		readmore: z.array(z.string().min(1)).optional().default([]),
	}),
});

export type Site = z.infer<typeof siteSchema> & {slug: string};
export interface ISite extends z.infer<typeof siteSchema> {
	slug: string;
}
