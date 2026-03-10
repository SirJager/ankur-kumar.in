import {zodBlogSchema} from "./collections/blog";
import {zodCategoriesSchema} from "./collections/categories";
import {zodFooterSchema} from "./collections/footer";
import {zodLinkSchema} from "./collections/links";
import {zodNavbarSchema} from "./collections/navbar";
import {zodPostsSchema} from "./collections/posts";
import {zodSiteSchema} from "./collections/site";
import {zodTagSchema} from "./collections/tags";
import {zodUsersSchema} from "./collections/users";
import type {CollectionKey} from "astro:content";
import {z} from "zod";

const schemas: Record<CollectionKey, z.ZodTypeAny> = {
	site: zodSiteSchema,
	blog: zodBlogSchema,
	//
	posts: zodPostsSchema,
	pages: zodPostsSchema,
	users: zodUsersSchema,
	//
	tags: zodTagSchema,
	categories: zodCategoriesSchema,
	//
	navbar: zodNavbarSchema,
	footer: zodFooterSchema,
	links: zodLinkSchema,
} as const;

export default schemas;
