import {type Request} from "express";
import {db} from "../../../db";
import {userTable} from "../../../db/userSchema";
import {eq} from "drizzle-orm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export default async function (req: Request<any>, res: any) {
    try {


        const [user] = await db.select().from(userTable).where(eq(userTable.email, req.body.email));

        // user not found
        if (!user) {
            return res.status(400).send({error: "Authentication failed"});
        }

        // password not matched
        const match = await bcrypt.compare(req.body.password, user.password);

        if (!match) {
            return res.status(400).send({error: "Authentication failed"});
        }


        // generate token
        const {password, ...tokenData} = user;
        const token = jwt.sign({tokenData}, process.env.JWT_SECRET!, {expiresIn: 60 * 60 * 24 * 7})


        res.status(200).json({token, ...tokenData});

    } catch (error) {
        res.status(500).send(error);
    }
}
