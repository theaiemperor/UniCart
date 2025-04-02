import {Request} from "express";
import {db} from "../../../db";
import {productTable} from "../../../db/productSchema";

export default async function (req: Request<any>, res: any) {
    try {
        const products = await db.select().from(productTable);
        res.json(products);
    } catch (error) {
        res.status(500).send(error);
    }
}
