import {z} from "astro:content";

export const linkSchema = z.object({
	text: z.string().min(1).max(100),
	href: z.string().url().min(1),
	label: z.string().optional().default(""),
	icon: z.string().optional().default(""),
	color: z
		.string()
		.regex(/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)
		.optional()
		.default(""),
	newtab: z.boolean().optional().default(false),
});
