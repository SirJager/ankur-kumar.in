import {linkSchema} from "@/dal/keystatic";
import {postSchema} from "@/dal/schema";
import {defineCollection} from "astro:content";

const posts = defineCollection({
	type: "content",
	schema: postSchema,
});

const links = defineCollection({
	type: "data",
	schema: linkSchema,
});

export const collections = {
	posts,
	links,
};
