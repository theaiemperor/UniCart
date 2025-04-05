import {Request} from "express";
import {db} from "../../../db";
import {ordersItemsTable, ordersTable} from "../../../db/orderSchema";
import {eq} from "drizzle-orm";
import {productTable} from "../../../db/productSchema";


async function getAllProducts(orderItems: any[], orderId: number) {
    const result: any[] = [];

    for (const item of orderItems) {
        const [product] = await db.select().from(productTable).where(eq(productTable.id, item.product_id));

        if (product) {
            result.push({...item, price: product.price, order_id: orderId});
        }
    }
    return Promise.all(result);
}


export default async function (req: Request<any>, res: any) {


    try {


        const [order] = await db.insert(ordersTable).values({user_id: req.userInfo.id}).returning();

        const data = await getAllProducts(req.body, order.id);
        const result = await db.insert(ordersItemsTable).values(data).returning();

        return res.status(200).json({...order, items: result})

    } catch (_) {
        res.status(500).send('Internal Server Error');

    }
}
