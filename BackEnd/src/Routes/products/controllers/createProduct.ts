import {type Request} from "express";
import {db} from "../../../db";
import {productTable} from "../../../db/productSchema";

export default async function (req: Request<any>, res: any) {
    try {
        const [product] = await db.insert(productTable).values(req.body).returning();
        res.status(201).json(product);

    } catch (error) {
        res.status(500).send(error);
    }
}
