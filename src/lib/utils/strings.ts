import slugger from "slugify";

/**
 * Converts the first letter of each word in the given string to uppercase,
 * and the rest of the letters to lowercase.
 *
 * @param str - The input string (could be a paragraph, sentence, or word).
 * @returns - The modified string with each word capitalized.
 */
export function capitalizeWords(str: string) {
	return str
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
}

export const toNormalString = (content: string) => {
	if (!content) {
		return "";
	}
	return content
		.replaceAll("-", " ")
		.replace(/^[\s_]+|[\s_]+$/g, "")
		.replace(/[_\s]+/g, " ")
		.replace(/^[a-z]/, (m) => m.toUpperCase());
};

export const hashString = (str: string) => {
	let hash = 0;
	if (str.length === 0) {
		return hash;
	}
	for (let i = 0; i < str.length; i++) {
		const char = str.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash &= hash; // Convert to 32-bit integer
	}
	return hash;
};

export function generateRandomID(length: number): string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	let randomId = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		randomId += charset[randomIndex];
	}
	return randomId;
}

export function slugify(str: string): string {
	return slugger(str, {lower: true, trim: true});
}
