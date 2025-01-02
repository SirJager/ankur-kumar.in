import type {Post} from "@/dal/schema";

export function getTags(posts: Post[]): string[] {
	const tags = new Set<string>();
	posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
	return Array.from(tags);
}

export function getCategories(posts: Post[]): string[] {
	const categories = new Set<string>();
	posts.forEach((post) => post.categories.forEach((cat) => categories.add(cat)));
	return Array.from(categories);
}
