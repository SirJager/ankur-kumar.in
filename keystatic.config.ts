import {config} from "@keystatic/core";
import {build} from "keystatic/helper";
import navbar from "keystatic/schema/navbar";
import site from "keystatic/schema/site";
import posts from "keystatic/schema/posts";
import pages from "keystatic/schema/pages";
import users from "keystatic/schema/users";
import tags from "keystatic/schema/tags";
import links from "keystatic/schema/links";
import categories from "keystatic/schema/categories";

export default config({
	storage: {
		kind: "local",
	},
	ui: {
		brand: {
			name: "Content Portal",
		},
		// navigation: ["tags", "categories", "---", "users"],
		navigation: {
			Content: ["pages", "posts"],
			Taxonomies: ["tags", "categories", "links"],
			Users: ["users"],
			Settings: ["site", "navbar"],
		},
	},
	singletons: {
		site: build(site, {
			path: "src/content/site/",
			format: {data: "json"},
		}),
		navbar: build(navbar, {
			path: "src/content/navbar/",
			format: {data: "json"},
		}),
	},
	collections: {
		posts: build(posts, {
			path: "src/content/posts/*",
		}),
		pages: build(pages, {
			path: "src/content/pages/*",
		}),
		users: build(users, {
			path: "src/content/users/*",
		}),
		tags: build(tags, {
			path: "src/content/tags/*",
			format: {data: "json"},
		}),
		categories: build(categories, {
			path: "src/content/categories/*",
			format: {data: "json"},
		}),
		links: build(links, {
			path: "src/content/links/*",
			format: {data: "json"},
		}),
	},
});
