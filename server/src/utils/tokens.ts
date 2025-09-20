

import jwt, { SignOptions } from 'jsonwebtoken';

export function generateAccessToken(userId: string): string {
  return jwt.sign(
    { id: userId },
    process.env.JWT_ACCESS_SECRET || 'secret',
    {
      expiresIn: process.env.JWT_EXPIRES || '10s', 
    } as SignOptions
  );
}


export function generateRefreshToken(userId: string): string {
  return jwt.sign(
    { id: userId },
    process.env.JWT_REFRESH_SECRET || 'refresh_secret',
    {
      expiresIn: process.env.JWT_REFRESH_EXPIRES || '7d', 
    } as SignOptions
  );
}