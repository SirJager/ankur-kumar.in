import {createGitHubReader} from "@keystatic/core/reader/github";
import keystaticConfig, {gitOwner, gitRepo} from "./config";

export const reader = createGitHubReader(keystaticConfig, {
	repo: `${gitOwner}/${gitRepo}`,
	token: import.meta.env.GITHUB_TOKEN,
});

export default reader;

export * from "./schema";
