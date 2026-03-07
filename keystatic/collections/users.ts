import { collection, fields } from "@keystatic/core";
import shared from "@keystatic/shared";
import { z } from "zod";
import { slugify } from "@/lib/utils";

export const zodUsersSchema = z.object({
	avatar: z.string().optional(),
	created: shared.zodDate,
	firstName: z.string().min(1).max(255),
	fullName: z.string().min(1).max(255),
	lastName: z.string().min(1).max(255),
	socials: z.array(z.object({ label: z.string().min(1), url: z.string().min(1) })).default([]),
	updated: shared.zodDate,
});

const users = collection({
	entryLayout: "content",
	slugField: "fullName",
	format: { contentField: "summary" },
	label: "Users",
	schema: {
		avatar: fields.image({
			label: "Avatar",
			// description: "Profile picture representing the user.",
			directory: "public/images/avatars",
			publicPath: "/images/avatars/",
			transformFilename: (f) => slugify(f),
			validation: { isRequired: false },
		}),
		created: shared.date("Date Created"),
		firstName: fields.text({
			label: "First Name",
			validation: { isRequired: true },
			// description: "The user's given name.",
		}),
		fullName: fields.slug({
			name: {
				label: "Full Name",
				validation: { isRequired: true },
				// description: "The user's complete name, displayed publicly.",
			},
			slug: {
				generate: (s) => slugify(s),
				label: "Username",
				validation: { length: { max: 100, min: 2 } },
				// description: "Unique identifier for the user, used in URLs and references.",
			},
		}),
		lastName: fields.text({
			label: "Last Name",
			// description: "The user's family name or surname.",
		}),
		socials: fields.array(
			fields.object({
				label: fields.text({
					description: "Name of the social platform, e.g., Twitter, LinkedIn.",
					label: "Label",
					validation: { isRequired: true },
				}),
				url: fields.text({
					description: "Full link to the user's social profile.",
					label: "Url",
					validation: { isRequired: true },
				}),
			}),
			{
				description: "List of the user's social media profiles.",
				itemLabel: ({ fields: f }) => `${f.label.value}  -  ${f.url.value}`,
				label: "Profiles Links",
			}
		),
		summary: fields.mdx({
			extension: "mdx",
			label: "Summary",
			// description: "A short bio or description of the user.",
		}),
		updated: shared.date("Date Updated"),
	},
});

export default users;
