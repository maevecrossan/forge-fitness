import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
	schema: 'prisma/schema.prisma',
	migrations: {
		path: 'prisma/migrations',
	},
	engine: 'classic',
	datasource: {
		// Use the helper so Prisma loads/validates the env var properly
		url: env<{ DATABASE_URL: string }>('DATABASE_URL'),
	},
});