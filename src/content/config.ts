import {postSchema, usersSchema} from "@/dal/schema";
import {tagsSchema, categoriesSchema, linkSchema} from "@/dal/schema";
import {siteSchema} from "@/dal/schema/site";
import {defineCollection} from "astro:content";

const links = defineCollection({type: "data", schema: linkSchema});
const users = defineCollection({type: "content", schema: usersSchema});
const tags = defineCollection({type: "data", schema: tagsSchema});
const categories = defineCollection({type: "data", schema: categoriesSchema});
const site = defineCollection({type: "data", schema: siteSchema});
const posts = defineCollection({type: "content", schema: postSchema});

export const collections = {
	posts: posts,
	users: users,
	//
	links: links,
	tags: tags,
	categories: categories,
	//
	site: site,
};
