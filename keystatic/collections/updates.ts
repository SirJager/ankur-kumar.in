import {slugify} from "@/lib/utils";
import {collection, fields} from "@keystatic/core";
import shared, {STATUS_OPTS} from "@keystatic/shared";
import {z} from "zod";

export const zodUpdatesSchema = z.object({
	status: z.enum(STATUS_OPTS).default("draft"),
	//
	created: shared.zodDate,
	updated: shared.zodDate,
	publish: shared.zodDate,
	//
	title: z.string().min(1).max(100),
	thumbnail: z.string().optional(),
	summary: z.string().min(1),
	//
	tags: z.array(z.string()).optional().default([]),
	keywords: z.array(z.string()).optional().default([]),
	categories: z.array(z.string()).optional().default([]),
});

export type IUpdates = z.infer<typeof zodUpdatesSchema> & {slug: string};
export interface Updates extends z.infer<typeof zodUpdatesSchema> {
	slug: string;
}

const updates = collection({
	label: "Updates",
	slugField: "title",
	columns: ["status", "title", "created"],
	entryLayout: "content",
	format: {contentField: "summary"},
	schema: {
		status: shared.status,
		publish: shared.datetime("Date Published"),

		thumbnail: fields.image({
			label: "Thumbnail",
			directory: "public/images/thumbnail",
			publicPath: "/images/thumbnail/",
			transformFilename: (f) => slugify(f),
			validation: {isRequired: false},
		}),

		title: fields.slug({name: {label: "Title"}}),
		summary: fields.mdx({label: "Summary", extension: "md"}),

		tags: fields.multiRelationship({
			label: "Select a tag",
			collection: "tags",
		}),

		categories: fields.multiRelationship({
			label: "Select a category",
			collection: "categories",
		}),

		keywords: fields.array(
			fields.text({
				label: "Add a keyword",
				validation: {isRequired: true, length: {max: 30, min: 1}},
			}),
			{description: "Keywords for seo", itemLabel: (f) => `${f.value}`, label: "Keywords"}
		),

		created: shared.datetime("Date Created"),
		updated: shared.datetime("Date Updated"),
		type: fields.ignored(), // for frontmatter
	},
});

export default updates;
