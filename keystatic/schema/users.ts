import {fields, collection} from "@keystatic/core";

export const users = collection({
	label: "Users",
	slugField: "username",
	schema: {
		username: fields.slug({
			name: {label: "Username", validation: {isRequired: true}},
		}),
		fullName: fields.text({
			label: "Full Name",
			validation: {isRequired: true},
		}),
		firstName: fields.text({
			label: "First Name",
			validation: {isRequired: true},
		}),
		lastName: fields.text({
			label: "Last Name",
		}),
		avatar: fields.image({
			label: "Avatar",
		}),
		summary: fields.text({
			label: "Summary",
		}),
		socials: fields.array(
			fields.object({
				label: fields.text({
					label: "Label",
					validation: {isRequired: true},
				}),
				url: fields.text({
					label: "Url",
					validation: {isRequired: true},
				}),
			})
		),
	},
});

export default users;
