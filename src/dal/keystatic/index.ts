import keystaticConfig from "./config";
import {createReader} from "@keystatic/core/reader";

export const reader = createReader(process.cwd(), keystaticConfig);

export default reader;

export * from "./schema";
