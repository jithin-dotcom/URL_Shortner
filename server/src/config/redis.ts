

import { createClient } from 'redis';


const redisClient = createClient({
   url: process.env.REDIS_URL,
 
});

redisClient.on('error', (err) => console.error(' Redis Client Error:', err));

(async () => {
  try {
    await redisClient.connect();
    console.log(' Connected to Redis Cloud');
  } catch (error) {
    console.error(' Failed to connect to Redis:', error);
  }
})();

export default redisClient;