import {fields} from "@keystatic/core";
import {status as statuses} from "@/lib/constants";

const status = fields.select({
	label: "Status",
	options: statuses.map((status) => ({
		label: status.charAt(0).toUpperCase() + status.slice(1),
		value: status,
	})),
	defaultValue: "draft",
	description:
		"Draft is private. Published is live. Archived is hidden from readers.",
});

const date = (
	label: string,
	opts?: {
		description?: string;
		required?: boolean;
	}
) =>
	fields.date({
		label: label,
		validation: {isRequired: opts?.required ?? true},
		description: opts?.description,
	});

const datetime = (
	label: string,
	opts?: {
		description?: string;
		required?: boolean;
	}
) =>
	fields.datetime({
		label: label,
		validation: {isRequired: opts?.required ?? true},
		description: opts?.description,
	});

const shared = {
	status,
	date,
	datetime,
} as const;

export default shared;
