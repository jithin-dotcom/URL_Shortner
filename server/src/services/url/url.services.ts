

import { IUrlRepository } from "../../repository/url/IUrlRepository";
import IUrlService from "./IUrlServices";
import generateShortCode from "../../utils/generateShotCode";
import { HttpError } from "../../utils/HttpError";
import { mapToDTO } from "../../mapper/UrlDTOMapper";
import { UrlDTO } from "../../mapper/IUrlDTO";


export class UrlService implements IUrlService{

    constructor( private _urlRepo: IUrlRepository){};


    async createShortUrl(ownerId: string, originalUrl: string, expiresAt?: Date | null): Promise<UrlDTO> {
        try {
            const valid = new URL(originalUrl);
            if(!valid){
                throw new HttpError("invalid url",400);
            }
            let code = generateShortCode();
            let retries = 0;
            while(await this._urlRepo.findByShortCode(code)){
                code = generateShortCode();
                retries++;
                if(retries > 5){
                    throw new HttpError("failed to generate short code", 500);
                }
            }
            const url = await this._urlRepo.create({ owner: ownerId  , originalUrl, shortCode: code, expiresAt: expiresAt || null } as any);
            return mapToDTO(url);
        } catch (error) {
            throw error;
        }
    }


    async getByShortCode(code: string): Promise<UrlDTO | null> {
      try {
        const url = await this._urlRepo.findByShortCode(code);

        if (!url) {
          throw new HttpError("URL not found", 404);
        }

        if (url.expiresAt && new Date() > new Date(url.expiresAt)) {
          throw new HttpError("URL has expired", 410);
        }

        return mapToDTO(url);
      } catch (error) {
        if (error instanceof HttpError) throw error;
        throw new HttpError(`Failed to fetch URL`, 500);
      }
    }



    async listByOwner(ownerId: string): Promise<UrlDTO[]> {
      try {
        const urls = await this._urlRepo.findByOwner(ownerId);
        return urls.map(mapToDTO); 
      } catch (error) {
        if (error instanceof HttpError) throw error;
        else{
            throw new HttpError(`Failed to fetch URLs for owner:`, 500);
        } 
      }
    }


    async incrementVisits(urlId: string): Promise<void> {
      try {
        await this._urlRepo.incrementVisits(urlId);
      } catch (err) {
        throw new HttpError('Failed to increment visits', 500);
      }
    }

}