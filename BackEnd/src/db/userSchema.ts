import {integer, pgTable, PgTableWithColumns, text, varchar} from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";


export interface IUser {
    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
    address: string,
}


export const userTable = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),

    name: varchar({length: 255}),
    email: varchar({length: 255}).notNull().unique(),
    password: varchar({length: 255}).notNull(),

    role: varchar({length: 255}).notNull().default('user'),
    address: text()

});

export const registerSchema = createInsertSchema(userTable).omit({
    role: true
});


export const loginSchema = createInsertSchema(userTable).pick({
    email: true,
    password: true,
});


