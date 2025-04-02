import {Request} from "express";
import {db} from "../../../db";
import {productTable} from "../../../db/productSchema";
import {eq} from "drizzle-orm";

export default async function (req: Request<any>, res: any) {
    try {
        const {id} = req.params;
        const [product] = await db.select().from(productTable).where(eq(productTable.id, Number(id)))

        if (!product) {
            res.status(404).json({message: "Product not found"});

        } else {
            res.json(product);
        }

    } catch (error) {
        res.status(500).send(error);
    }
}
