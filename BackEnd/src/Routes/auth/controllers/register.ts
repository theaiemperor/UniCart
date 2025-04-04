import {type Request} from "express";
import bcrypt from "bcryptjs";
import {db} from "../../../db";
import {userTable} from "../../../db/userSchema";


export default async function (req: Request<any>, res: any) {
    try {
        req.body.password = await bcrypt.hash(req.body.password, 12);

        const [user] = await db.insert(userTable).values(req.body).returning();
        res.status(201).json({...user, password: undefined})

    } catch (error) {
        res.status(500).send("Something went wrong");
    }
}
