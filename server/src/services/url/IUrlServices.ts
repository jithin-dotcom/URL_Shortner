

import { IUrl } from "../../model/url/IUrlModel";

export default interface IUrlService {
  createShortUrl(ownerId: string, originalUrl: string, expiresAt?: Date | null): Promise<IUrl>;
  getByShortCode(code: string): Promise<IUrl | null>;
  listByOwner(ownerId: string): Promise<IUrl[]>;
  incrementVisits(urlId: string): Promise<void>;
}
