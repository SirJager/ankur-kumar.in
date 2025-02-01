import type {APIRoute} from "astro";
import {ImageResponse} from "@vercel/og";
import simpleOGBuilder from "@/lib/og/simple";
import {extractOGProps} from "@/lib/og/helper";

// static route doesn't support use of url.searchParams
export const prerender = false;

export const GET: APIRoute = async ({url}) => {
	try {
		const {error, data} = extractOGProps(url);
		if (error || !data) {
			return Response.json({error: error}, {status: 400});
		}
		const html = simpleOGBuilder(data);
		return new ImageResponse(html, {width: 1200, height: 630});
	} catch (error) {
		return Response.json({error}, {status: 500});
	}
};
