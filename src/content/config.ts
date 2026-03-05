import {defineCollection} from "astro:content";
import {categoriesSchema} from "@/dal/schema/categories";
import {postSchema} from "@/dal/schema/posts";
import {tagsSchema} from "@/dal/schema/tags";
import {usersSchema} from "@/dal/schema/users";
import {zodBlogSchema} from "@/keystatic/schema/blog";
import {zodFooterSchema} from "@/keystatic/schema/footer";
import {zodLinkSchema} from "@/keystatic/schema/links";
import {zodNavbarSchema} from "@/keystatic/schema/navbar";
import {zodSiteSchema} from "@/keystatic/schema/site";

const site = defineCollection({schema: zodSiteSchema, type: "data"});
const blog = defineCollection({schema: zodBlogSchema, type: "data"});

const posts = defineCollection({type: "content", schema: postSchema});

const links = defineCollection({schema: zodLinkSchema, type: "data"});

const tags = defineCollection({schema: tagsSchema, type: "data"});
const categories = defineCollection({schema: categoriesSchema, type: "data"});
const users = defineCollection({schema: usersSchema, type: "content"});

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
