
import redisClient from '../config/redis';

export async function saveRefreshToken(userId: string, refreshToken: string, expiresInSeconds: number) {
  await redisClient.set(`refresh:${userId}`, refreshToken, {
    EX: expiresInSeconds, 
  });
}


export async function validateRefreshToken(userId: string, refreshToken: string): Promise<boolean> {
  const storedToken = await redisClient.get(`refresh:${userId}`);
  return storedToken === refreshToken;
}


export async function deleteRefreshToken(userId: string) {
  await redisClient.del(`refresh:${userId}`);
}
