type Opts = {path?: string; label?: string};
export function override<T extends Opts>(props: T, override?: Partial<T>): T {
	const opts = {...props, ...(override ?? {})};
	if (!opts.path) {
		throw new Error(`${opts.label ?? "Config"}: Path not provided`);
	}
	return opts;
}
