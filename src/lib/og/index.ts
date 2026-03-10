export interface OGBuilderProps {
	author: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	avatar: any;
	backgroundColor?: string;
	backgroundImage: string;
	borderColor?: string;
	categories?: string[];
	date: Date;
	footer?: string | null;
	length?: number;
	logo: string;
	tags?: string[];
	textColor?: string;
	theme?: string | null;
	title: string;
}
