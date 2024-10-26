import {fields, collection} from "@keystatic/core";
import {dateField} from "./common";

export const users = collection({
	label: "Users",
	slugField: "fullName",
	path: "src/content/users/*/",
	format: {
		data: "yaml",
		contentField: "content",
	},
	schema: {
		content: fields.emptyContent({extension: "md"}),
		created: dateField("Created At"),
		updated: dateField("Updated At"),
		publish: dateField("Publish At"),

		avatar: fields.image({
			label: "Avatar",
			directory: "assets/images/avatars",
			publicPath: "/assets/images/avatars/",
		}),

		fullName: fields.slug({
			name: {
				label: "Full Name",
			},
		}),
		firstName: fields.text({
			label: "First Name",
			validation: {
				isRequired: true,
			},
		}),
		lastName: fields.text({
			label: "Last Name",
		}),

		summary: fields.text({
			label: "Summary",
			description: "Tell us something about yourself",
			multiline: true,
		}),

		// ignore fields
		type: fields.ignored(),
		status: fields.ignored(),
		tags: fields.ignored(),
		categories: fields.ignored(),
	},
});

export default users;
