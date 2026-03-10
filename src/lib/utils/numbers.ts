export function parseToNumber<T>(value: T): number | undefined {
	const num = Number(value);
	return Number.isNaN(num) ? undefined : num;
}

export function isNumber<T>(i: T): boolean {
	if (typeof i === "string") {
		return !Number.isNaN(Number(i)) && Number.isFinite(Number.parseFloat(i));
	}
	return typeof i === "number" && !Number.isNaN(i) && Number.isFinite(i);
}

export function getRandomNumber(min: number, max: number): number {
	return Math.random() * (max - min) + min;
}
