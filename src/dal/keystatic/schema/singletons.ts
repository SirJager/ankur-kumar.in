import {fields, singleton} from "@keystatic/core";
import {linksField} from "./common";

export const site = singleton({
	label: "Site Configurations",
	format: "json",
	entryLayout: "content",
	path: "src/content/site/index",
	schema: {
		title: fields.text({
			label: "Site Title",
			validation: {isRequired: true, length: {min: 1}},
		}),
		description: fields.text({
			label: "Description",
			multiline: true,
			validation: {isRequired: true, length: {min: 1}},
		}),
		metaTitle: fields.text({
			label: "Meta Title",
			validation: {isRequired: true, length: {min: 1}},
		}),
		metaDescription: fields.text({
			label: "Meta Description",
			multiline: true,
			validation: {isRequired: true, length: {min: 1}},
		}),
		navigation: linksField("Home Navigation", "Homepage navigation links"),
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
				validation: {
					length: {
						min: 1,
					},
				},
			}
		),
	},
});

export const blog = singleton({
	label: "Blog Configurations",
	format: "json",
	entryLayout: "content",
	path: "src/content/blog/index",
	schema: {
		title: fields.text({
			label: "Blog Title",
			validation: {isRequired: true, length: {min: 1}},
		}),
		description: fields.array(
			fields.text({
				label: "Description",
				multiline: true,
				validation: {isRequired: true, length: {min: 1}},
			}),
			{
				label: "Blog Description",
				description: "First item will be always displayed and rest will be hidden inside readmore",
				itemLabel: (props) => props.value,
				validation: {
					length: {
						min: 1,
					},
				},
			}
		),
		metaTitle: fields.text({
			label: "Meta Title",
			validation: {isRequired: true, length: {min: 1}},
		}),
		metaDescription: fields.text({
			label: "Meta Description",
			multiline: true,
			validation: {isRequired: true, length: {min: 1}},
		}),
		navigation: linksField("Blog Navigation", "Blog's navigation links"),
	},
});
