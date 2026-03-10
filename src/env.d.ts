/// <reference types="astro/client" />
/// <reference types="astro-imagetools" />

declare module "astro-imagetools";
declare module "astro-imagetools/components";

interface ImportMetaEnv {
	readonly UMAMI_SCRIPT_URL: string;
	readonly UMAMI_WEBSITE_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

interface Window {
	_applyTheme: (_theme?: string | null) => void;
}
