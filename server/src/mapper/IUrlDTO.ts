

export interface UrlDTO {
  _id: string;
  originalUrl: string;
  shortCode: string;
  visits: number;
  createdAt: Date;
  expiresAt: Date | null;
};
