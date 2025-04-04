import {Request, NextFunction} from "express";
import jwt, {type JwtPayload} from "jsonwebtoken";

function verifyToken(token?: string): JwtPayload | undefined {
    try {

        if (!token) return;

        // verify token
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET!);

        if (typeof decoded === "object" && decoded.tokenData.email) {
            return decoded;
        }

    } catch (error) {
        return;
    }
}


export function verifyRoles(role?: string | string[]) {

    return (req: Request<any>, res: any, next: NextFunction) => {

        const token = req.headers.authorization;
        const decoded = verifyToken(token);

        // Token Validation
        if (!decoded) {
            return res.status(401).send('UnAuthorized Request');
        }
        req.userInfo = decoded.tokenData;


        // Role Validation
        if (decoded && !role) {
            return next()

        } else if (decoded && Array.isArray(role) && role.includes(decoded.tokenData.role)) {
            return next();

        } else if (decoded && typeof role === "string" && role === decoded.tokenData.role) {
            return next();
        }


        return res.status(401).send('UnAuthorized Request');


    }
}


export const verifiedUser = verifyRoles('user');
export const verifiedSeller = verifyRoles('seller');
export const verifiedAdmin = verifyRoles('admin');
