import {fields, collection} from "@keystatic/core";
import {slugify} from "@/lib/utils";
import shared from "keystatic/shared";

const users = collection({
	label: "Users",
	slugField: "fullName",
	entryLayout: "content",
	format: {contentField: "summary"},
	schema: {
		avatar: fields.image({
			label: "Avatar",
			// description: "Profile picture representing the user.",
			directory: "public/images/avatars",
			publicPath: "/images/avatars/",
			validation: {isRequired: false},
			transformFilename: (f) => slugify(f),
		}),

		created: shared.date("Date Created"),
		updated: shared.date("Date Updated"),
		fullName: fields.slug({
			name: {
				label: "Full Name",
				validation: {isRequired: true},
				// description: "The user's complete name, displayed publicly.",
			},
			slug: {
				label: "Username",
				validation: {length: {min: 2, max: 100}},
				generate: (s) => slugify(s),
				// description: "Unique identifier for the user, used in URLs and references.",
			},
		}),
		firstName: fields.text({
			label: "First Name",
			validation: {isRequired: true},
			// description: "The user's given name.",
		}),
		lastName: fields.text({
			label: "Last Name",
			// description: "The user's family name or surname.",
		}),
		summary: fields.mdx({
			extension: "mdx",
			label: "Summary",
			// description: "A short bio or description of the user.",
		}),
		socials: fields.array(
			fields.object({
				label: fields.text({
					label: "Label",
					validation: {isRequired: true},
					description: "Name of the social platform, e.g., Twitter, LinkedIn.",
				}),
				url: fields.text({
					label: "Url",
					validation: {isRequired: true},
					description: "Full link to the user's social profile.",
				}),
			}),
			{
				label: "Profiles Links",
				description: "List of the user's social media profiles.",
				itemLabel: ({fields: f}) => `${f.label.value}  -  ${f.url.value}`,
			}
		),
	},
});

export default users;
