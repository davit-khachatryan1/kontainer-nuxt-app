export default defineEventHandler(async (event) => {
    const redisClient: any = event.context.redisClient

    try {
        const keys = await getAllRedisKeys(redisClient);
        for (const key of keys) {
            await deleteKeyFromCache(key, redisClient);
        }
        return 'Cache cleared';
    } catch (error) {
        console.error("Error clearing Redis cache:", error);
        event.res.statusCode = 500;
        return 'Failed to clear cache';
    }
});

async function getAllRedisKeys(redisClient: any) {
    return new Promise<string[]>((resolve, reject) => {
        redisClient.keys('*').then((keys: string[]) => {
            resolve(keys);
        }).catch((err: any) => {
            reject(err);
        });
    });
}


async function deleteKeyFromCache(key: string, redisClient: any) {
    return new Promise<void>((resolve, reject) => {
        redisClient.del(key).then(() => {
            resolve();
        }).catch((err: any) => {
            reject(err);
        });
    });
}