import {z} from "astro:content";

const dateSchema = z.any().transform((str) => new Date(str));

export const usersSchema = z.object({
	created: dateSchema,
	updated: dateSchema,
	avatar: z.string().optional(),
	fullName: z.string().min(1).max(255),
	firstName: z.string().min(1).max(255),
	lastName: z.string().min(1).max(255),
	summary: z.string().min(1).max(255),
	socials: z
		.array(
			z.object({
				label: z.string().min(1),
				url: z.string().min(1),
			})
		)
		.default([]),
});
