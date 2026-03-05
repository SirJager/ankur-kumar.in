import {z} from "astro:content";

export const linkSchema = z.object({
	color: z
		.string()
		.regex(/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)
		.optional()
		.default(""),
	href: z.string().url().min(1),
	icon: z.string().optional().default(""),
	label: z.string().optional().default(""),
	newtab: z.boolean().optional().default(false),
	text: z.string().min(1).max(100),
});
