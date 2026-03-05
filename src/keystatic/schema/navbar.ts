import {collection, fields} from "@keystatic/core";
import {z} from "zod";
import {keystaticLinkSchema, zodLinkSchema} from "./links";

export const zodNavbarSchema = z.object({
	title: z.string().min(1),
	links: z.array(zodLinkSchema),
	//
});

const navbar = collection({
	label: "Navbar",
	columns: ["title"],
	previewUrl: "/",
	slugField: "title",
	schema: {
		title: fields.slug({name: {label: "Title"}}),
		links: fields.array(
			fields.object(keystaticLinkSchema, {
				layout: [6, 6, 12, 12, 12, 12, 12, 12, 12, 12],
				label: "Create a new link entry",
			}),
			{
				slugField: "text",
				itemLabel: (s) => {
					const parts = [
						s.fields.href.value,
						"-->",
						s.fields.text.value,
						"-->",
						s.fields.label.value,
						"-->",
						s.fields.newtab.value ? "Opens in new tab" : "Opens in same tab",
						//
					];
					return parts.filter((v) => v && String(v).trim() !== "").join(" ");
				},
			}
		),
	},
});

export default navbar;
