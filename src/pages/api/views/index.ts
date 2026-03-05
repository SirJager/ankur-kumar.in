import type {APIRoute} from "astro";
import {getMatters} from "@/dal/astro";
import {makeRequest, responseHeaders, toKey, toSlug} from "./[path]";

export const prerender = false;

const blog = import.meta.glob("../../../content/blog/*.md?(x)", {eager: true});
const posts = getMatters(blog);

export const GET: APIRoute = async () => {
	const date = Date.now();
	try {
		const keys = posts.map((post) => toKey(post.slug));
		const valuesURL = `/mget/${keys.join("/")}`;
		const res = await makeRequest(valuesURL);
		if (res.status !== 200) {
			const {error} = await res.json();
			return Response.json({date, error}, {status: 500});
		}
		const {result: values} = await res.json();
		const data = keys.map((key: string, i: number) => {
			const slug = toSlug(key);
			const views = Number.parseInt(values[i], 10) || 0;
			return {date, path: slug, views};
		});
		return Response.json({data, date}, {headers: responseHeaders, status: 200});
	} catch (error: any) {
		return Response.json({date, error: error?.message}, {status: 500});
	}
};
