import {config} from "@keystatic/core";
import {override} from "@keystatic/helper";
import categories from "@keystatic/schema/categories";
import links from "@keystatic/schema/links";
import navbar from "@keystatic/schema/navbar";
import pages from "@keystatic/schema/pages";
import posts from "@keystatic/schema/posts";
import site from "@keystatic/schema/site";
import tags from "@keystatic/schema/tags";
import users from "@keystatic/schema/users";
import blog from "@/keystatic/schema/blog";
import footer from "@/keystatic/schema/footer";

const format = {data: "json"} as const;

export default config({
	storage: {kind: "local"},
	ui: {
		brand: {name: "Content Portal"},
		navigation: {
			Content: ["posts", "pages"],
			Taxonomies: ["tags", "categories"],
			Users: ["users"],
			Global: ["site", "blog", "navbar", "footer"],
			Components: ["links"],
		},
	},
	singletons: {
		site: override(site, {format, path: "src/content/site/", previewUrl: "/"}),
		blog: override(blog, {format, path: "src/content/blog/", previewUrl: "/blog"}),
	},
	collections: {
		posts: override(posts, {path: "src/content/posts/*"}),
		pages: override(pages, {format, path: "src/content/pages/*"}),
		//
		tags: override(tags, {format, path: "src/content/tags/*"}),
		categories: override(categories, {format, path: "src/content/categories/*"}),
		//
		users: override(users, {path: "src/content/users/*"}),
		//
		links: override(links, {format, path: "src/content/links/*"}),
		navbar: override(navbar, {format, path: "src/content/navbar/*"}),
		footer: override(footer, {format, path: "src/content/footer/*"}),
	},
});
