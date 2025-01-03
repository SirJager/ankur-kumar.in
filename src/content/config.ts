import {postSchema, usersSchema} from "@/dal/schema";
import {tagsSchema, categoriesSchema, linkSchema} from "@/dal/schema";
import {defineCollection} from "astro:content";

const links = defineCollection({type: "data", schema: linkSchema});
const users = defineCollection({type: "data", schema: usersSchema});
const tags = defineCollection({type: "data", schema: tagsSchema});
const categories = defineCollection({type: "data", schema: categoriesSchema});
const blog = defineCollection({type: "content", schema: postSchema});

export const collections = {
	blog,
	links,
	tags,
	users,
	categories,
};
