type AstroGloPattern = Record<string, any>[]
type ImportGlobPattern = Record<string, unknown>
type Glob = AstroGloPattern | ImportGlobPattern

type ResolvePostsOpts = {
	glob: Glob
}

export const resolvePosts = async ({ glob }: ResolvePostsOpts) => {
	const isAstroGlob = Array.isArray(glob);
	const entries: AstroGloPattern = isAstroGlob ? glob : Object.values(glob) as any;
	entries.map((p) => {
		const fm = p.frontmatter;
		const slug = p.file.split("/").pop().split(".").shift() as string;
	})
	return []
}
