import {Request} from "express";
import {productTable} from "../../../db/productSchema";
import {eq} from "drizzle-orm";
import {db} from "../../../db";

export default async function (req: Request<any>, res: any) {

    try {
        const {id} = req.params;
        const [deletedProduct] = await db.delete(productTable).where(eq(productTable.id, +id)).returning();

        if (deletedProduct) {
            res.status(204).json({message: "Product deleted successfully."});

        } else {
            res.status(404).json({message: "Product not found"});
        }


    } catch (error) {
        res.status(500).send(error);
    }
}
