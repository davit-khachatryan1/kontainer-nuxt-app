export default defineEventHandler(async (event) => {
  const redisClient:any = event.context.redisClient
 
  try {
    const keys = await getAllRedisKeys(redisClient);
    await Promise.all(keys.map(key => redisClient.del(key)));

    return 'All caches cleared';
  } catch (error) {
    console.error("Error clearing caches:", error);
    event.res.statusCode = 500;
    return 'Failed to clear caches';
  }
});

async function getAllRedisKeys(redisClient: any) {
  return new Promise<string[]>((resolve, reject) => {
    redisClient.keys('*').then(resolve).catch(reject);
  });
}