export function sortJsonKeys<T>(input: T): T {
	if (Array.isArray(input)) {
		return input.map(sortJsonKeys) as T;
	}

	if (input !== null && typeof input === "object") {
		return Object.keys(input)
			.sort()
			.reduce((acc, key) => {
				const value = (input as Record<string, unknown>)[key];
				(acc as Record<string, unknown>)[key] = sortJsonKeys(value);
				return acc;
			}, {} as T);
	}

	return input;
}
