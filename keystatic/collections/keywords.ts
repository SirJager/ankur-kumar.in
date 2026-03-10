import {collection, fields} from "@keystatic/core";

const keywords = collection({
	label: "Keywords",
	slugField: "keyword",
	schema: {
		keyword: fields.slug({
			name: {label: "Keyword"},
			slug: {
				generate: (s) => {
					return s;
				},
			},
		}),
	},
});

export default keywords;
