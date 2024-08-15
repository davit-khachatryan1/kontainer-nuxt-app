import { redisClient } from "~/server/constants/constant";

export default defineEventHandler(async (event) => {
    try {
        const keys = await getAllRedisKeys();
        for (const key of keys) {
            await deleteKeyFromCache(key);
        }
        return 'Cache cleared';
    } catch (error) {
        console.error("Error clearing Redis cache:", error);
        event.res.statusCode = 500;
        return 'Failed to clear cache';
    }
});

async function getAllRedisKeys() {
    return new Promise<string[]>((resolve, reject) => {
        redisClient.keys('*').then((keys: string[]) => {
            resolve(keys);
        }).catch(err => {
            reject(err);
        });
    });
}


async function deleteKeyFromCache(key: string) {
    return new Promise<void>((resolve, reject) => {
        redisClient.del(key).then(() => {
            resolve();
        }).catch(err => {
            reject(err);
        });
    });
}