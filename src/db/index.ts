import type {DB} from "./schema";
import {DATABASE_URL} from "astro:env/server";
import {Kysely, PostgresDialect} from "kysely";
import {Pool} from "pg";

const dialect = new PostgresDialect({
	pool: new Pool({connectionString: DATABASE_URL, max: 10}),
});

export type Database = Kysely<DB>;
const db: Database = new Kysely<DB>({dialect});

export default db;
