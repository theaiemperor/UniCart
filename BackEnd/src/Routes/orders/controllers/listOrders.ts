import {Request} from "express";
import {db} from "../../../db";
import {eq} from "drizzle-orm";
import {ordersItemsTable, ordersTable} from "../../../db/orderSchema";


async function getOrderItems(orders: any[]) {
    const result = orders.map(async (order: any) => {
        const items = await db.select().from(ordersItemsTable).where(eq(order.id, ordersItemsTable.order_id));
        return {...order, items}
    });
    return Promise.all(result);
}


export default async function (req: Request<any>, res: any) {
    try {


        // list orders by user
        const orders = await db.select().from(ordersTable).where(eq(ordersTable.user_id, req.userInfo.id))

        // Add items and return order
        const result = await getOrderItems(orders).then(res => res)
        return res.status(200).json(result);

    } catch (_) {
        res.status(500).send('Internal Server Error');
    }
}
