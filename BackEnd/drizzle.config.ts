import {defineConfig} from 'drizzle-kit';

export default defineConfig({
    out: './drizzle',
    schema: [
        './src/db/productSchema.ts',
        './src/db/userSchema.ts',
        './src/db/orderSchema.ts',
    ],
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    strict: true,
    verbose: true
});
