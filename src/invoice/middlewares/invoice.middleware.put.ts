import { NestMiddleware } from "@nestjs/common"
import { NextFunction, Request, Response } from "express";

export class InvoiceMiddlewarePut implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log(req.body.id)
        next();
    }

}