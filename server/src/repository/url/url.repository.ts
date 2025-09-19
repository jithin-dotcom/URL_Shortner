

import { IUrlRepository } from './IUrlRepository';
import { IUrl } from '../../model/url/IUrlModel';
import { UrlModel } from '../../model/url/url.model';

export default class UrlRepository implements IUrlRepository {
  async create(url: Partial<IUrl>): Promise<IUrl> {
    return UrlModel.create(url);
  }
  async findByShortCode(code: string): Promise<IUrl | null> {
    return UrlModel.findOne({ shortCode: code }).exec();
  }
  async findById(id: string): Promise<IUrl | null> {
    return UrlModel.findById(id).exec();
  }
  async findByOwner(ownerId: string): Promise<IUrl[] | []> {
    return UrlModel.find({ owner: ownerId }).sort({ createdAt: -1 }).exec();
  }
  async incrementVisits(id: string): Promise<void> {
    await UrlModel.findByIdAndUpdate(id, { $inc: { visits: 1 } }).exec();
  }
}
