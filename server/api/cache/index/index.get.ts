export default defineEventHandler(async (event) => {
  const redisClient:any = event.context.redisClient
  try {
        const keys = await getAllRedisKeys(redisClient);
        return keys;
    } catch (error) {
        console.error("Error retrieving Redis keys:", error);
        event.res.statusCode = 500;
        return 'Error fetching cache keys';
    }
});

async function getAllRedisKeys(redisClient: any) {
    return new Promise((resolve, reject) => {
        redisClient.keys('*').then((keys: string[]) => {
            resolve(keys);
        })
            .catch((err: any) => {
                reject(err);
            });
    });
}