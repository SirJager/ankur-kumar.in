import {fields, collection} from "@keystatic/core";
import {dateField, slugField} from "./common";

export const users = collection({
	label: "Users",
	slugField: "fullName",
	path: "src/content/users/*",
	format: {
		data: "json",
	},
	columns: ["fullName", "summary", "updated"],
	schema: {
		joined: dateField("Joined"),
		updated: dateField("Updated"),
		avatar: fields.image({
			label: "Avatar",
			directory: "public/images/avatars",
			publicPath: "/images/avatars/",
		}),

		fullName: slugField("Full Name"),
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

		socials: fields.array(
			fields.relationship({
				label: "Links",
				collection: "links",
				validation: {
					isRequired: true,
				},
			}),
			{
				label: "Social Links",
				itemLabel: (props) => `${props.value}`,
			}
		),
	},
});

export default users;
