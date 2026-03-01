export function build<T>(props: T, override?: Partial<T>): T {
	const opts = {...props, ...(override ?? {})} as any;
	if (!opts.path) {
		console.log(opts)
		console.error(`${opts.Label ?? "Config"}: Path not provided`);
		throw new Error(`${opts.Label ?? "Config"}: Path not provided`);
	}
	return opts;
}
