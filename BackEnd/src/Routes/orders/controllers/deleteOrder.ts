import {Request} from "express";
import {db} from "../../../db";
import {ordersItemsTable, ordersTable} from "../../../db/orderSchema";
import {and, eq} from "drizzle-orm";


export default async function (req: Request<any>, res: any) {
    try {

        db.delete(ordersItemsTable).where(eq(ordersItemsTable.order_id, req.params.id)).then(async () => {

            const condition = and(eq(ordersTable.user_id, req.userInfo.id), eq(ordersTable.id, req.params.id))
            const [deleted] = await db.delete(ordersTable).where(condition).returning();
            if (!deleted) {
                return res.status(404).send({error: "Order not found"});
            }

        })


        return res.status(204).json('Order deleted successfully');
    } catch (_) {
        res.status(500).send('Internal Server Error');

    }
}
