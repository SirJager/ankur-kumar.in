import {config} from "@keystatic/core";
import {users, categories, tags} from "./keystatic/schema";
import {makeCollection} from "./keystatic/types";

export default config({
	storage: {
		kind: "local",
	},
	ui: {
		navigation: {},
	},
	collections: {
		tags: makeCollection(tags, {
			path: "src/content/tags/*",
			format: {data: "json"},
		}),
	},
});
