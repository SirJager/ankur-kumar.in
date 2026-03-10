import {zodBlogSchema} from "@keystatic/collections/blog";
import {zodCategoriesSchema} from "@keystatic/collections/categories";
import {zodFooterSchema} from "@keystatic/collections/footer";
import {zodLinkSchema} from "@keystatic/collections/links";
import {zodNavbarSchema} from "@keystatic/collections/navbar";
import {zodPostsSchema} from "@keystatic/collections/posts";
import {zodSiteSchema} from "@keystatic/collections/site";
import {zodTagSchema} from "@keystatic/collections/tags";
import {zodUsersSchema} from "@keystatic/collections/users";
import {defineCollection} from "astro:content";

const site = defineCollection({schema: zodSiteSchema, type: "data"});
const blog = defineCollection({schema: zodBlogSchema, type: "data"});

const posts = defineCollection({type: "content", schema: zodPostsSchema});

const links = defineCollection({schema: zodLinkSchema, type: "data"});

const tags = defineCollection({schema: zodTagSchema, type: "data"});
const categories = defineCollection({
	schema: zodCategoriesSchema,
	type: "data",
});
const users = defineCollection({schema: zodUsersSchema, type: "content"});

const navbar = defineCollection({schema: zodNavbarSchema, type: "data"});
const footer = defineCollection({schema: zodFooterSchema, type: "data"});

export const collections = {
	categories,
	//
	links,
	posts,
	//
	site,
	blog,
	//
	tags,
	users,
	//
	navbar,
	footer,
};
