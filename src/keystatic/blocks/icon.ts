import {fields} from "@keystatic/core";

const iconBlock = fields.text({
	description:
		"Icon name (e.g., 'github', 'arrow-right', 'home'). Use names from Tabler Icons (tablericons.com) or Font Awesome (fontawesome.com/search).",
	label: "Icon Name",
});

export default iconBlock;
