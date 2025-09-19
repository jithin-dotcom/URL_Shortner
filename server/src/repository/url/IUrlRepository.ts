

import { IUrl } from "../../model/url/IUrlModel";

export interface IUrlRepository{
    create(url: Partial<IUrl>): Promise<IUrl>;
    findByShortCode(code: string): Promise<IUrl | null>;
    findById(id: string): Promise<IUrl | null>;
    findByOwner(ownerId: string): Promise<IUrl[] | []>;
    incrementVisits(id: string): Promise<void>;
}