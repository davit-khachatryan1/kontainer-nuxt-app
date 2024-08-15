import { myCache, redisClient } from '~/server/constants/constant'; // Assumed import path for Redis client

export default defineEventHandler(async (event) => {
  try {
    // Clear all Redis keys
    const keys = await getAllRedisKeys();
    await Promise.all(keys.map(key => redisClient.del(key)));

    // Clear all node-cache data
    myCache.flushAll();

    return 'All caches cleared';
  } catch (error) {
    console.error("Error clearing caches:", error);
    event.res.statusCode = 500;
    return 'Failed to clear caches';
  }
});

async function getAllRedisKeys() {
    return new Promise<string[]>((resolve, reject) => {
        redisClient.keys('*').then(resolve).catch(reject);
    });
}