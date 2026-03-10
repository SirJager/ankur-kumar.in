import schemas from "@keystatic/schemas";
import {
	type CollectionKey,
	type InferEntrySchema,
	type Render,
	getCollection,
	getEntry,
} from "astro:content";
import {z} from "zod";

export type Entry = {
	id: string;
	slug: string;
	body: string;
	collection: CollectionKey;
	data: InferEntrySchema<CollectionKey>;
} & {
	render(): Render[".md"];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AstroGlobEntry = Record<string, any>;

interface Opts {
	schema?: z.ZodTypeAny;
}

export const findEntries = async <T>(c: CollectionKey, opts?: Opts): Promise<T[]> => {
	const entries = await getCollection(c);
	const items: T[] = [];
	for (const entry of entries) {
		const matter = extractMatter(entry);
		const slug = extractSlug(entry, matter);
		const item = {...matter, slug};

		// if schema provided then we will valdiate
		if (opts?.schema) {
			const {success, error} = opts.schema.safeParse(item);
			if (!success) {
				throw new Error(error.message);
			}
		} else {
			const {success, error} = schemas[c].safeParse(item);
			if (!success) {
				throw new Error(error.message);
			}
		}

		items.push(item);
	}
	return items;
};

export const findEntry = async <T>(c: CollectionKey, i: string, o?: Opts): Promise<T> => {
	const entry = await getEntry(c, i);
	if (!entry) {
		throw new Error(`Record "${i}" in collection "${c} not found"`);
	}
	const matter = extractMatter(entry);
	const slug = extractSlug(entry, matter);
	const item = {...matter, slug};
	if (o?.schema) {
		const {success, error} = o.schema.safeParse(item);
		if (!success) {
			throw new Error(error.message);
		}
	}
	return item;
};

function extractMatter(entry: AstroGlobEntry) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractSlug(entry: AstroGlobEntry, frontmatter: any): string {
	const title = frontmatter?.title ?? "unknown";

	// If slug already exists and is valid, use it
	if (typeof entry.slug === "string") {
		return entry.slug;
	}

	// if id is provided
	if (typeof entry.id === "string") {
		return entry.id;
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
