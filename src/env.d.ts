/// <reference path="../.astro/types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly REDIS_ACCESS_TOKEN: string;
	readonly REDIS_REST_ENDPOINT: string;
	readonly UMAMI_SCRIPT_URL: string;
	readonly UMAMI_WEBSITE_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	_applyTheme: (_theme?: string | null) => void;
}
