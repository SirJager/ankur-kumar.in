import {ImageResponse} from "@vercel/og";
import type {APIRoute} from "astro";
import {extractOGProps} from "@/lib/og/helper";
import simpleOGBuilder from "@/lib/og/simple";

// static route doesn't support use of url.searchParams
export const prerender = false;

export const GET: APIRoute = ({url}) => {
	try {
		const {error, data} = extractOGProps(url);
		if (error || !data) {
			return Response.json({error}, {status: 400});
		}
		const html = simpleOGBuilder(data);
		return new ImageResponse(html, {height: 630, width: 1200});
	} catch (error) {
		return Response.json({error}, {status: 500});
	}
};
