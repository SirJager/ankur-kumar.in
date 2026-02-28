export function makeCollection<T>(props: T, override?: Partial<T>): T {
	return {...props, ...(override ?? {})};
}
