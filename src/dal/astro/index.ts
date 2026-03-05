import type {InferEntrySchema, Render} from "astro:content";
import {type Post, postSchema} from "@/dal/schema/posts";

export type Entry = {
	id: string;
	slug: string;
	body: string;
	collection: "blog";
	data: InferEntrySchema<"posts">;
} & {render(): Render[".md"]};

type AstroGlobEntry = Record<string, any>;
type AstroGloPattern = Record<string, any>[];
type ImportGlobPattern = Record<string, unknown>;
type Entries = AstroGloPattern | ImportGlobPattern | Entry[];

/**
 *  Common function to parse post frontmatter into Post Type
 *
 * With getCollection()
 * const posts:Post[] = getMatter(await getCollection("posts"));
 *
 * With Astro.glob()
 * const posts:Post[] = getMatter(await Astro.glob("../../content/posts/'*'/index.md?(x)"))
 *
 * With import.meta.glob()
 * const posts:Post[] = getMatter(import.meta.glob("../content/blog/*.md?(x)", {eager: true});)
 *
 * @returns - an array of type Post
 */
export const getMatters = (rawEntries: Entries): Post[] => {
	const entries = normalizeToArray(rawEntries);
	const posts: Post[] = [];

	for (const entry of entries) {
		const matter = extractFrontmatter(entry);
		const slug = extractSlug(entry, matter);

		const post = {...matter, slug};
		const {success, error} = postSchema.safeParse(post);
		if (!success) {
			throw new Error(error.message);
		}

		posts.push(post);
	}

	return posts;
};

function normalizeToArray(raw: Entries): AstroGlobEntry[] {
	if (Array.isArray(raw)) {
		return raw;
	}
	return Object.values(raw) as any;
}

function extractFrontmatter(entry: AstroGlobEntry) {
	// getCollection()
	if ("data" in entry && entry.data) {
		return entry.data;
	}

	// Astro.glob() or import.meta.glob()
	if ("frontmatter" in entry && entry.frontmatter) {
		return entry.frontmatter;
	}

	throw new Error("Unable to resolve frontmatter from entry.");
}

function extractSlug(entry: AstroGlobEntry, frontmatter: any): string {
	const title = frontmatter?.title ?? "unknown";

	// If slug already exists and is valid, use it
	if (typeof entry.slug === "string") {
		return entry.slug;
	}

	// Fallback to filename
	if (typeof entry.url !== "string") {
		throw new Error(`Missing slug and invalid url for entry "${title}"`);
	}

	const normalizedPath = entry.url.replace(/\\/g, "/");
	const fileName = normalizedPath.substring(normalizedPath.lastIndexOf("/") + 1);
	if (!fileName) {
		throw new Error(`Missing slug. Invalid file name for entry "${title}"`);
	}

	const lastDotIndex = fileName.lastIndexOf(".");
	if (lastDotIndex === -1) {
		return fileName;
	}

	return fileName.substring(0, lastDotIndex);
}
