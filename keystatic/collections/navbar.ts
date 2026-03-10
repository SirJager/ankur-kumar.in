import {collection, fields} from "@keystatic/core";
import {z} from "zod";

export const zodNavbarSchema = z.object({
	title: z.string().min(1),
	links: z.array(z.string().min(1)), // its a relationship
});

export interface Navbar extends z.infer<typeof zodNavbarSchema> {
	slug: string;
}

const navbar = collection({
	label: "Navbar",
	columns: ["title"],
	previewUrl: "/",
	slugField: "title",
	schema: {
		title: fields.slug({name: {label: "Title"}}),
		links: fields.multiRelationship({
			label: "Links",
			collection: "links",
		}),
	},
});

export default navbar;
