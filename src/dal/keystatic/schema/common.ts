import {fields} from "@keystatic/core";
import type {ContentComponent} from "@keystatic/core/content-components";
import {inline} from "@keystatic/core/content-components";
import slugify from "slugify";

export const slugField = (label: string, max = 60) =>
	fields.slug({
		name: {
			label: label,
			validation: {
				isRequired: true,
				length: {
					min: 1,
				},
			},
		},
		slug: {
			validation: {
				length: {
					min: 1,
					max: max === 0 ? undefined : max,
				},
			},
			generate: (name) => {
				return slugify(name, {lower: true, trim: true});
			},
		},
	});

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
	ThemeSwitcher: inline({
		label: "ThemeSwitcher",
		schema: {},
	}),
	Logo: inline({
		label: "Logo",
		schema: {},
	}),
};

export const linksField = (name: string, description?: string) => {
	return fields.array(
		fields.object({
			text: fields.text({
				label: "Text",
				validation: {
					isRequired: true,
					length: {min: 1},
				},
			}),
			href: fields.url({
				label: "URL",
				validation: {
					isRequired: true,
				},
			}),
			label: fields.text({
				label: "Label",
				description: "for seo: aria-label",
			}),
			newtab: fields.checkbox({
				label: "Opens the link in a new tab or window",
				defaultValue: false,
			}),
		}),
		{
			label: name,
			description: description,
			itemLabel: (props) =>
				`${props.fields.text.value} (${props.fields.label.value}) | ${props.fields.href.value?.toLowerCase()} | ${props.fields.newtab.value ? "newtab" : "sametab"}`,
			validation: {
				length: {min: 1},
			},
		}
	);
};
