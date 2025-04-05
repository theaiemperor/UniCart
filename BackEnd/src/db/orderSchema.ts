import {doublePrecision, integer, pgTable, timestamp, varchar} from "drizzle-orm/pg-core";
import {createInsertSchema} from "drizzle-zod";
import {userTable} from "./userSchema";
import {productTable} from "./productSchema";

export const ordersTable = pgTable("orders", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer().references(() => userTable.id),
    createdAt: timestamp().notNull().defaultNow(),
    status: varchar({length: 50}).notNull().default('New')
});


export const ordersItemsTable = pgTable("order_items", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    order_id: integer().references(() => ordersTable.id).notNull(),
    product_id: integer().references(() => productTable.id),
    quantity: integer().notNull(),
    price: doublePrecision().notNull(),
})


export const createOrderItemsSchema = createInsertSchema(ordersItemsTable).pick({
    product_id: true,
    quantity: true
}).array();
