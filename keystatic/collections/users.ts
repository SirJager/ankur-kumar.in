import {keystaticLinkSchema, zodLinkSchema} from "./links";
import {slugify} from "@/lib/utils";
import {collection, fields} from "@keystatic/core";
import shared from "@keystatic/shared";
import {z} from "zod";

const itemLabel = (s: {value: string}) => s.value.charAt(0).toUpperCase() + s.value.slice(1);

const zodImageSchema = z.object({
	discriminant: z.string().min(1),
	value: z.string().min(1),
});

export const zodUsersSchema = z.object({
	avatar: zodImageSchema,
	created: shared.zodDate,
	firstName: z.string().min(1).max(255),
	fullName: z.string().min(1).max(255),
	lastName: z.string().min(1).max(255),
	socials: z.array(zodLinkSchema).optional(),
	updated: shared.zodDate,
	about: z.string().min(1).max(500),
	skills: z.object({
		languages: z.array(z.string().min(1)),
		database: z.array(z.string().min(1)),
		programming: z.array(z.string().min(1)),
		frameworks: z.array(z.string().min(1)),
		libraries: z.array(z.string().min(1)),
		technologies: z.array(z.string().min(1)),
		softskills: z.array(z.string().min(1)),
	}),
});

export type IUser = z.infer<typeof zodUsersSchema> & {slug: string};
export interface User extends z.infer<typeof zodUsersSchema> {
	slug: string;
}

const users = collection({
	entryLayout: "content",
	slugField: "fullName",
	format: {contentField: "story"},
	label: "Users",
	schema: {
		avatar: fields.conditional(
			fields.select({
				label: "Image Provider",
				defaultValue: "none",
				options: [
					{label: "None", value: "none"},
					{label: "Remote Image", value: "remote"},
					{label: "Local Image", value: "local"},
				],
			}),
			{
				none: fields.empty(),
				local: fields.image({
					label: "Local Image",
					directory: "public/avatars",
					transformFilename: (f) => slugify(f),
				}),
				remote: fields.url({
					label: "Remote Image URL",
					validation: {isRequired: true},
				}),
			}
		),

		firstName: fields.text({
			label: "First Name",
			validation: {isRequired: true},
			// description: "The user's given name.",
		}),
		fullName: fields.slug({
			name: {
				label: "Full Name",
				validation: {isRequired: true},
				// description: "The user's complete name, displayed publicly.",
			},
			slug: {
				generate: (s) => slugify(s),
				label: "Username",
				validation: {length: {max: 100, min: 2}},
				// description: "Unique identifier for the user, used in URLs and references.",
			},
		}),
		lastName: fields.text({
			label: "Last Name",
			// description: "The user's family name or surname.",
		}),
		about: fields.text({
			label: "About",
			description: "A short bio or description of the user.",
			multiline: true,
			validation: {isRequired: true, length: {min: 1, max: 500}},
		}),
		socials: fields.array(fields.object(keystaticLinkSchema), {
			label: "Social Links",
		}),
		skills: fields.object(
			{
				languages: fields.array(
					fields.text({
						label: "Language",
						description: "Spoken languages e.g. English, Hindi, Spanish.",
						validation: {isRequired: true, length: {min: 1, max: 100}},
					}),
					{
						itemLabel,
						label: "Languages",
						description: "Spoken languages e.g. English, Hindi, Spanish.",
					}
				),

				database: fields.array(
					fields.text({
						label: "Database",
						description: "Database systems e.g. PostgreSQL, MySQL, MongoDB, SQLite.",
						validation: {isRequired: true, length: {min: 1, max: 60}},
					}),
					{
						itemLabel,
						label: "Databases",
						description: "Database systems e.g. PostgreSQL, MySQL, MongoDB, SQLite.",
					}
				),

				programming: fields.array(
					fields.text({
						label: "Programming Language",
						description: "Programming languages e.g. Go, TypeScript, C++, Python.",
						validation: {isRequired: true, length: {min: 1, max: 100}},
					}),
					{
						itemLabel,
						label: "Programming Languages",
						description: "Programming languages e.g. Go, TypeScript, C++, Python.",
					}
				),

				frameworks: fields.array(
					fields.text({
						label: "Framework",
						description: "Frameworks e.g. Astro, Next.js, Express, Django.",
						validation: {isRequired: true, length: {min: 1, max: 100}},
					}),
					{
						itemLabel,
						label: "Framework",
						description: "Frameworks e.g. Astro, Next.js, Express, Django.",
					}
				),

				libraries: fields.array(
					fields.text({
						label: "Library",
						description: "Libraries e.g. React, Zod, Lodash, Three.js.",
						validation: {isRequired: true, length: {min: 1, max: 100}},
					}),
					{
						itemLabel,
						label: "Libraries",
						description: "Libraries e.g. React, Zod, Lodash, Three.js.",
					}
				),

				technologies: fields.array(
					fields.text({
						label: "Tools or Technology",
						description: "Tools or tech e.g. Docker, Git, Linux, Cloudflare.",
						validation: {isRequired: true, length: {min: 1, max: 100}},
					}),
					{
						itemLabel,
						label: "Tools And Technologies",
						description: "Tools or tech e.g. Docker, Git, Linux, Cloudflare.",
					}
				),

				softskills: fields.array(
					fields.text({
						label: "Soft Skill",
						description: "Soft skills e.g. Communication, Leadership, Problem Solving.",
						validation: {isRequired: true, length: {min: 1, max: 100}},
					}),
					{
						itemLabel,
						label: "Soft Skills",
						description: "Soft skills e.g. Communication, Leadership, Problem Solving.",
					}
				),
			},
			{label: "Skills"}
		),
		story: fields.mdx({
			extension: "md",
			label: "Story",
			description: "Tell us about your story",
		}),
		created: shared.date("Date Created"),
		updated: shared.date("Date Updated"),
	},
});

export default users;
