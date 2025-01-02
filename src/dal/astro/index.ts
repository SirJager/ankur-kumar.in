import type {InferEntrySchema, Render} from "astro:content";
import type {Post} from "@/dal/schema";

export type Entry = {
	id: string;
	slug: string;
	body: string;
	collection: "posts";
	data: InferEntrySchema<"posts">;
} & {
	render(): Render[".md"];
};

type AstroGloPattern = Record<string, any>[];
type ImportGlobPattern = Record<string, unknown>;
type Entries = AstroGloPattern | ImportGlobPattern | Entry[];

/**
 *  Common function to parse post frontmatter into Post Type
 *
 * With getCollection()
 * const posts:Post[] = resolvePosts(await getCollection("posts"));
 *
 * With Astro.glob()
 * const posts:Post[] = resolvePosts(await Astro.glob("../../content/posts/'*'/index.md?(x)"))
 *
 * With import.meta.glob()
 * const posts:Post[] = resolvePosts(import.meta.glob("../content/blog/*.md?(x)", {eager: true});)
 *
 * @returns - an array of type Post
 */
export const getMatters = (_entries: Entries) => {
	const isArray = Array.isArray(_entries); // if array then Astro.glob or getCollection else import.meta.glob
	const entries: AstroGloPattern = isArray ? _entries : (Object.values(_entries) as any);
	const posts = entries.map((entry) => {
		// if has data key then getCollection('') is used, else Astro.glob() or import.meta.glob()
		const method = Object.hasOwn(entry, "data")
			? "getCollection"
			: isArray
				? "Astro.glob"
				: "import.meta.glob";
		const frontmatter = method === "getCollection" ? entry.data : entry.frontmatter;
		const slug = entry.slug as string;
		if (!slug || slug.length === 0) throw new Error(`No slug for entry ${frontmatter.title}`);
		const post: Post = {...frontmatter, slug};
		return post;
	});
	return posts;
};
