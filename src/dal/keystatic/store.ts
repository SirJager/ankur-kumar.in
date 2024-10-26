import reader from ".";
import {parseMarkdown} from "./parser";
import {postSchema, type Post, type Status} from "./schema/posts";
import readingTime from "reading-time";

type getPostsOpts = {
	// only slugs
	slug?: string[];

	// include status | default: [published]
	status?: Status[];

	// exclude slugs
	exclude?: string[];

	content?: boolean;
};

export const getPost = async (slug: string) => {
	const entry = await reader.collections.posts.read(slug);
	if (!entry) return null;
};

export const getPosts = async (opts?: getPostsOpts): Promise<Post[]> => {
	const entries = await reader.collections.posts.all();
	const _status = opts?.status || ["published"];

	const filtered = entries.filter(({slug, entry}) => {
		if (opts?.slug && opts.slug.length > 0 && !opts.slug.includes(slug)) return false;
		if (!_status.includes(entry.status)) return false;
		if (opts?.exclude?.includes(slug)) return false;
		return true;
	});
	const promises = filtered.map(({entry, slug}) => entryToPost(entry, slug, opts?.content));
	return await Promise.all(promises);
};

const entryToPost = async (entry: any, slug: string, content?: boolean) => {
	let entryData: any = {...entry, slug, markdown: "", html: ""};
	if (content) {
		const markdown = await entry.markdown();
		const {html, headings} = await parseMarkdown(markdown);
		const readtime = readingTime(markdown);
		entryData = {...entryData, markdown, html, headings, readtime};
	}
	const data = postSchema.parse(entryData);
	return data;
};
