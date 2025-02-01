export type OGBuilderProps = {
	title: string;
	date: Date;
	tags?: string[];
	categories?: string[];
	author: string;
	avatar: string;
	logo: string;
	theme?: string | null;
	footer?: string | null;
	length?: number;
	textColor?: string;
	borderColor?: string;
	backgroundColor?: string;
	backgroundImage: string;
};
