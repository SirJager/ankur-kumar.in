import {unified} from "unified";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import {slug as slugify} from "github-slugger";
import * as cheerio from "cheerio";
import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";
import grayMatter from "gray-matter";

function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function parseMarkdown(markdown: string) {
	const {content, data: frontmatter} = grayMatter(markdown);
	const file = await unified()
		.use(remarkParse)
		.use(remarkRehype, {allowDangerousHtml: true})
		.use(rehypeStringify)
		.process(content);
	const htmlString = file.toString();
	const {headings, html} = parseHtml(htmlString);
	return {frontmatter, content, html, headings};
}

export function parseHtml(htmlString: string) {
	const $ = cheerio.load(htmlString);

	// INFO: Targeting all headings for table of content
	const allHeadings = $("h1, h2, h3, h4, h5, h6");
	const headings: any[] = [];

	allHeadings.each((_index, h) => {
		try {
			const text = $(h).text();
			const slug = slugify(text);
			const depth = Number(h.tagName.replace("h", ""));
			const heading = {text, slug, depth};
			headings.push(heading);

			// INFO: adding id to heading tag
			$(h).attr("id", slug);
			$(h).addClass("");
		} catch (error) {
			console.log({errors: error, method: "parser.parseHtml.headings"});
		}
	});

	// $("hr").addClass(cn("seperator"));

	const html = $.html();
	return {html, headings};
}
