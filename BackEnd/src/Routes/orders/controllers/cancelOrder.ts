import {Request} from "Express";
import {db} from "../../../db";
import {ordersTable} from "../../../db/orderSchema";
import {eq} from "drizzle-orm";


export default async function (req: Request<any>, res: any) {

    try {


        const [order] = await db.update(ordersTable)
            .set({status: 'Cancelled'})
            .where(eq(ordersTable.id, req.params.id))
            .returning();

        if (!order) {
            return res.status(404).json({message: 'Order not found'});
        }

        return res.status(200).json({message: 'Order cancelled successfully', data: order});

    } catch (_) {
        res.status(500).json({message: 'Something went wrong'});
    }
}
