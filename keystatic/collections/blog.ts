import {fields, singleton} from "@keystatic/core";
import {z} from "zod";
import shared from "../shared";

export const zodBlogSchema = z.object({
	blog: z.object({
		title: z.string().min(1),
		description: z.string().min(1),
		metaDescription: z.string().min(1),
		readmore: z.array(z.string().min(1)),
	}),
});

export type Blog = z.infer<typeof zodBlogSchema> & {slug: string};
export interface IBlog extends z.infer<typeof zodBlogSchema> {
	slug: string;
}

const keystaticBlogSchema = {
	blog: fields.object(
		{
			title: fields.text({
				description: "Headline describing the blog section.",
				label: "Blog Title",
				...shared.required,
			}),

			description: fields.text({
				description: "Introductory text explaining the blog’s theme and focus.",
				label: "Description",
				multiline: true,
				...shared.required,
			}),

			metaDescription: fields.text({
				description: "SEO-friendly summary for the blog section.",
				label: "Meta Description",
				multiline: true,
				...shared.required,
			}),

			readmore: fields.array(
				fields.text({
					description: "Additional detailed paragraph expanding the blog story.",
					label: "Paragraph",
					multiline: true,
				}),
				{
					description: "Extended narrative sections for the blog introduction.",
					itemLabel: (s) => s.value,
					label: "Read More Content",
				}
			),
		},
		{
			description: "Configuration and content for the blog section.",
			label: "Blog Settings",
			layout: [12, 12, 12, 12],
		}
	),
};

const blog = singleton({label: "Blog", schema: keystaticBlogSchema});

export default blog;
