import {config} from "@keystatic/core";
import {users, categories, blog, tags} from "./schema";
import {makeCollection} from "./types";

export default config({
	storage: {
		kind: "local",
	},
	collections: {
		tags: makeCollection(tags, {
			path: "src/content/tags/*",
			format: {data: "json"},
		}),
		users: makeCollection(users, {
			path: "src/content/users/*",
			format: {data: "json"},
		}),
		categories: makeCollection(categories, {
			path: "src/content/categories/*",
			format: {data: "json"},
		}),
		// blog: makeCollection(blog, {path: "src/content/blog/*"}),
	},
});
