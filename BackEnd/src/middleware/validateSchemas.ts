import {Request, Response, NextFunction} from 'express';
import {z, ZodError} from 'zod';
import _ from "lodash";

export default function (schema: z.ZodObject<any, any> | z.ZodArray<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {

            const validObject = schema instanceof z.ZodObject && typeof (req.body) === "object";
            const validArray = schema instanceof z.ZodArray && Array.isArray(req.body);


            if (validArray) {

                req.body.forEach((item: any) => {
                    schema.element.parse(item);
                });

            } else if (validObject) {
                schema.parse(req.body);
                req.body = _.pick(req.body, Object.keys(schema.shape));
            } else {
                res.status(400).send('Invalid request body');
            }

            return next();


        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue: any) => ({
                    message: `${issue.path.join('.') || 'payload'} is ${issue.message}`,
                }));
                res.status(400).json({error: 'Invalid data', details: errorMessages});
            } else {
                res.status(500).json({error: 'Internal Server Error'});
            }
        }
    };
}
