import { config as _config } from "@keystatic/core";

import users from "./schema/users";
import { posts, projects, categories, tags } from "./schema";

export const gitOwner = "sirjager";
export const gitRepo = "idealogs";


const keystaticConfig = _config({
	storage: { kind: "local" },
	ui: {
		brand: {
			name: "Ankur Kumar",
		},
		navigation: {
			Content: ["posts", "projects"],
			Members: ["users"],
			Meta: ["tags", "categories"],
		},
	},
	collections: {
		posts,
		projects,
		users,
		tags,
		categories,
	},
});

export default keystaticConfig;
