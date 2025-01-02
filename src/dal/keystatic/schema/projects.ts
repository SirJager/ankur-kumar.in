import {fields, collection} from "@keystatic/core";
import {categoriesField} from "./categories";
import {tagsField} from "./tags";
import {capitalizeWords} from "@/lib/utils";
import {dateField, slugField} from "./common";

export const projects = collection({
	label: "Projects",
	slugField: "title",
	path: "src/content/projects/*/",
	entryLayout: "content",
	columns: ["title", "type", "status", "github"],
	format: {
		data: "yaml",
		contentField: "content",
	},
	schema: {
		content: fields.mdx({
			label: "Content",
			extension: "mdx",
			description: "Detailed content for the project in MDX format.",
		}),
		type: fields.select({
			label: "Project Type",
			description: "Select the type of project",
			defaultValue: "",
			options: ["", "api", "cli", "library", "website", "webapp", "mobile", "desktop"].map(
				(status) => {
					return {label: capitalizeWords(status), value: status};
				}
			),
		}),
		status: fields.select({
			label: "Status",
			description: "Select the current status of the project.",
			defaultValue: "",
			options: [
				"",
				"production",
				"development",
				"completed",
				"cancelled",
				"planning",
				"onhold",
			].map((status) => {
				return {label: capitalizeWords(status), value: status};
			}),
		}),
		created: dateField("Project Created", "The date when the project was created."),
		updated: dateField("Article Updated", "The date when the project was last updated."),
		github: fields.url({
			label: "Github Repository",
			description: "URL of the Github repository for this project.",
		}),
		live: fields.url({
			label: "Live Preview",
			description: "URL of the live preview for this project.",
		}),
		title: slugField("Title"),
		description: fields.text({
			label: "Description",
			description: "A brief description of the project.",
			multiline: true,
			validation: {
				isRequired: true,
			},
		}),

		tags: tagsField,
		categories: categoriesField,

		members: fields.array(
			fields.relationship({
				label: "Team Member",
				collection: "users",
				validation: {
					isRequired: true,
				},
			}),
			{
				label: "Team Members",
				itemLabel: (props) => `${props.value}`,
			}
		),

		// ignored
		cssclasses: fields.ignored(),
	},
});

export default projects;
