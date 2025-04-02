import {Request} from "express";
import {db} from "../../../db";
import {productTable} from "../../../db/productSchema";
import {eq} from "drizzle-orm";

export default async function (req: Request<any>, res: any) {

    try {
        const {id} = req.params;
        const updateFields = req.body;

        const [updatedProduct] = await db.update(productTable).set(updateFields).where(eq(productTable.id, +id)).returning();
        if (updatedProduct) {
            res.status(200).json({message: "Product updated successfully."});
        } else {
            res.status(404).json({message: "Product not found"});
        }
    } catch (error) {
        res.status(500).send(error);
    }
}
