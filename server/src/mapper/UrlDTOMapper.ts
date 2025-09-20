

import mongoose from "mongoose";
import { IUrl } from "../model/url/IUrlModel";
import { UrlDTO } from "./IUrlDTO";

export function mapToDTO(url: IUrl): UrlDTO {
  return {
    _id: (url._id as mongoose.Types.ObjectId).toString(),
    originalUrl: url.originalUrl,
    shortCode: url.shortCode,
    visits: url.visits,
    createdAt: url.createdAt,
    expiresAt: url.expiresAt || null,
  };
}
