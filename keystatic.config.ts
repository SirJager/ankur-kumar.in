import blog from "@keystatic/collections/blog";
import categories from "@keystatic/collections/categories";
import footer from "@keystatic/collections/footer";
import keywords from "@keystatic/collections/keywords";
import links from "@keystatic/collections/links";
import navbar from "@keystatic/collections/navbar";
import pages from "@keystatic/collections/pages";
import posts from "@keystatic/collections/posts";
import site from "@keystatic/collections/site";
import tags from "@keystatic/collections/tags";
import updates from "@keystatic/collections/updates";
import users from "@keystatic/collections/users";
import {config} from "@keystatic/core";
import {override} from "@keystatic/helper";

const format = {data: "json"} as const;

export default config({
	storage: {kind: "local"},
	ui: {
		brand: {name: "Content Portal"},
		navigation: {
			Content: ["posts", "pages", "updates"],
			Taxonomies: ["tags", "categories", "keywords"],
			Users: ["users"],
			Global: ["site", "blog", "navbar", "footer"],
			Components: ["links"],
		},
	},

	singletons: {
		site: override(site, {format, path: "content/site/", previewUrl: "/"}),
		blog: override(blog, {format, path: "content/blog/", previewUrl: "/blog"}),
	},
	collections: {
		posts: override(posts, {path: "content/posts/**", previewUrl: "/blog"}),
		pages: override(pages, {format, path: "content/pages/**"}),
		updates: override(updates, {path: "content/updates/**"}),
		//
		tags: override(tags, {format, path: "content/tags/*"}),
		categories: override(categories, {format, path: "content/categories/*"}),
		keywords: override(keywords, {format, path: "content/keywords/**"}),
		//
		users: override(users, {path: "content/users/*"}),
		//
		links: override(links, {format, path: "content/links/*"}),
		navbar: override(navbar, {format, path: "content/navbar/*", previewUrl: "/#navbar-global"}),
		footer: override(footer, {format, path: "content/footer/*", previewUrl: "/#footer-global"}),
		//
	},
});
