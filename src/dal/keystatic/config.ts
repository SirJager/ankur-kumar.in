import {config as _config} from "@keystatic/core";

import users from "./schema/users";
import {posts, projects, categories, tags, links} from "./schema";
import {site, blog} from "./schema/singletons";

const keystaticConfig = _config({
	storage: {kind: "local"},
	ui: {
		brand: {
			name: "Ankur Kumar",
		},
		navigation: {
			Content: ["posts", "projects"],
			Members: ["users"],
			Taxonomies: ["tags", "categories", "links"],
			Configurations: ["site", "blog"],
		},
	},
	collections: {
		posts,
		projects,
		users,
		tags,
		categories,
		links,
	},
	singletons: {
		site,
		blog,
	},
});

export default keystaticConfig;
