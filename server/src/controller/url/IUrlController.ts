

import { Request, Response, NextFunction } from "express";

export interface IUrlController {
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    redirect(req: Request, res: Response, next: NextFunction): Promise<void>;

}