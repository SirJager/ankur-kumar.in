import {fields} from "@keystatic/core";
import {status as statuses} from "@/lib/constants";

const status = fields.select({
	defaultValue: "draft",
	// description: "Draft is private. Published is live. Archived is hidden from readers.",
	label: "Status",
	options: statuses.map((status) => ({
		label: status.charAt(0).toUpperCase() + status.slice(1),
		value: status,
	})),
});

const date = (label: string, opts?: {description?: string; required?: boolean}) =>
	fields.date({
		description: opts?.description,
		label,
		validation: {isRequired: opts?.required ?? true},
	});

const datetime = (label: string, opts?: {description?: string; required?: boolean}) =>
	fields.datetime({
		description: opts?.description,
		label,
		defaultValue: {kind: "now"},
		validation: {isRequired: opts?.required ?? true},
	});

const required = {validation: {isRequired: true}} as const;
const shared = {date, datetime, status, required} as const;

export default shared;
