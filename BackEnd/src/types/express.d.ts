import {IUser} from "../db/userSchema";

export {};

declare global {
    namespace Express {
        export interface Request {
            userInfo: IUser
        }
    }
}
