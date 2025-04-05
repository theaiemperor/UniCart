import {Request} from "express";
import {db} from "../../../db";
import {and, eq} from "drizzle-orm";
import {ordersItemsTable, ordersTable} from "../../../db/orderSchema";
import orders from "../index";


export default async function (req: Request<any>, res: any) {
    try {

        // Get order details
        const condition = and(eq(ordersTable.id, req.params.id), eq(ordersTable.user_id, req.userInfo.id))
        const [order] = await db.select().from(ordersTable).where(condition);
        if (!order) {
            return res.status(404).send("Order not found");
        }


        // get Items
        const items = await db.select().from(ordersItemsTable).where(eq(ordersItemsTable.order_id, order.id));

        return res.status(200).send({...order, items});

    } catch (_) {
        res.status(500).send('Something went wrong');
    }
}
