import type {Entry} from "@keystatic/core/reader";
import type keystaticConfig from "./keystatic/config";

export type ILink = Entry<typeof keystaticConfig.singletons.site>["navigation"][number];
export type SiteConf = Entry<typeof keystaticConfig.singletons.site>;

export type LinkCollection = Entry<typeof keystaticConfig.collections.links>;
