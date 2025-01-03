import { links } from "@/lib/constants";

export type Item = {
	id?: string;
	name: string;
	url: string;
	event?: string;
	target?: string;
};

export type Section = {
	name: string;
	items: Item[];
};

export const footerSection: Section[] = [
	{
		name: "General",
		items: [
			{ name: "Home", url: "/" },
			{ name: "Blog", url: "/blog" },
			// {name: "Projects", url: "/projects"},
			// {name: "About", url: "/about"},
			// {name: "Contact", url: "/contact"},
		],
	},
	{
		name: "Specifics",
		items: [
			// {name: "Sponsors", url: "/sponsors"},
			// {name: "My Journey", url: "/blog/my-journey"},
			// {name: "Hire Me", url: "/hire-me"},
			{
				target: "_blank",
				id: "footer-resume",
				name: links.resume.name,
				url: links.resume.href,
				event: links.resume.event,
			},
			{
				target: "_blank",
				id: "footer-dotfiles",
				name: links.dotfiles.name,
				url: links.dotfiles.href,
				event: links.dotfiles.event,
			},
		],
	},
	{
		name: "Extras",
		items: [
			{
				target: "_blank",
				id: "footer-rss",
				name: links.rss.name,
				url: links.rss.href,
				event: links.rss.event,
			},
			{
				target: "_blank",
				id: "footer-sitemap",
				name: links.sitemap.name,
				url: links.sitemap.href,
				event: links.sitemap.event,
			},
			// {name: "Newsletter", url: "/newsletter"},
			// {name: "Privacy Policy", url: "/privacy-policy"},
			// {name: "Terms of Service", url: "/terms-of-service"},
		],
	},
] as const;
