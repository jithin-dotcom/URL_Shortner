

import { UrlDTO } from "../../mapper/IUrlDTO";

export default interface IUrlService {
  createShortUrl(ownerId: string, originalUrl: string, expiresAt?: Date | null): Promise<UrlDTO>;
  getByShortCode(code: string): Promise<UrlDTO | null>;
  listByOwner(ownerId: string): Promise<UrlDTO[]>;
  incrementVisits(urlId: string): Promise<void>;
}
