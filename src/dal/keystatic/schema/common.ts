import {fields} from "@keystatic/core";
import {wrapper} from "@keystatic/core/content-components";
import type {ContentComponent} from "@keystatic/core/content-components";

export const dateField = (name: string, description?: string) => {
	return fields.datetime({
		label: name,
		description: description,
		validation: {
			isRequired: true,
		},
		defaultValue: {
			kind: "now",
		},
	});
};

export const components: Record<string, ContentComponent> = {
	Card: wrapper({
		label: "Card",
		schema: {
			title: fields.text({label: "Title"}),
			href: fields.text({label: "Link"}),
		},
	}),
};
