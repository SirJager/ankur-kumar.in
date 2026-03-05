import type {InferEntrySchema} from "astro:content";

export type ITag = InferEntrySchema<"tags">;
export type IUser = InferEntrySchema<"users">;
export type ILink = InferEntrySchema<"links">;
export type ICategory = InferEntrySchema<"categories">;
export type INavbar = InferEntrySchema<"navbar">;
