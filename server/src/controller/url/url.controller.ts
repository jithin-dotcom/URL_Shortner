

import { Request, Response, NextFunction } from 'express';
import IUrlService from '../../services/url/IUrlServices';
import { IUrlController } from './IUrlController';

export class UrlController implements IUrlController{
  
  constructor(private _urlService: IUrlService) {};

 
  async create(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const ownerId = req.userId;
      if(!ownerId){
        res.status(400).json({message: "Bad request"});
        return;
      }
      const { originalUrl, expiresAt } = req.body;

      const url = await this._urlService.createShortUrl(
        ownerId,
        originalUrl,
        expiresAt ? new Date(expiresAt) : null
      );

      res.status(201).json({
        shortCode: url.shortCode,
        shortUrl: `${process.env.BASE_URL}/${url.shortCode}`,
      });
    } catch (err) {
      next(err); 
    }
  };


  async list(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const ownerId = req.userId;
      if(!ownerId){
        res.status(400).json({message: "Bad Request"});
        return;
      }
      const urls = await this._urlService.listByOwner(ownerId);

      res.json(urls);
    } catch (err) {
      next(err);
    }
  };

 
  async redirect(req: Request, res: Response, next: NextFunction): Promise<void>{
    try {
      const code = req.params.code;

      const url = await this._urlService.getByShortCode(code);

      if(!url){
         res.status(404).json({message: "url not found"});
         return;
      }

      await this._urlService.incrementVisits(url._id);

      return res.redirect(url.originalUrl);
    } catch (err) {
      next(err); 
    }
  };
}
