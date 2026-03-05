import {links} from "@/lib/constants";

export interface Item {
	event?: string;
	id?: string;
	name: string;
	target?: string;
	url: string;
}

export interface Section {
	items: Item[];
	name: string;
}

export const footerSection: Section[] = [
	{
		items: [
			{name: "Home", url: "/"},
			{name: "Blog", url: "/blog"},
			// {name: "Projects", url: "/projects"},
			// {name: "About", url: "/about"},
			// {name: "Contact", url: "/contact"},
		],
		name: "General",
	},
	{
		items: [
			// {name: "Sponsors", url: "/sponsors"},
			// {name: "My Journey", url: "/blog/my-journey"},
			// {name: "Hire Me", url: "/hire-me"},
			{
				event: links.resume.event,
				id: "footer-resume",
				name: links.resume.name,
				target: "_blank",
				url: links.resume.href,
			},
			{
				event: links.dotfiles.event,
				id: "footer-dotfiles",
				name: links.dotfiles.name,
				target: "_blank",
				url: links.dotfiles.href,
			},
		],
		name: "Specifics",
	},
	{
		items: [
			{
				event: links.rss.event,
				id: "footer-rss",
				name: links.rss.name,
				target: "_blank",
				url: links.rss.href,
			},
			{
				event: links.sitemap.event,
				id: "footer-sitemap",
				name: links.sitemap.name,
				target: "_blank",
				url: links.sitemap.href,
			},
			// {name: "Newsletter", url: "/newsletter"},
			// {name: "Privacy Policy", url: "/privacy-policy"},
			// {name: "Terms of Service", url: "/terms-of-service"},
		],
		name: "Extras",
	},
] as const;
