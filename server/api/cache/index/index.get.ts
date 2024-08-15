import { redisClient } from "~/server/constants/constant";

export default defineEventHandler(async (event) => {
    try {
        const keys = await getAllRedisKeys();
        return keys;
    } catch (error) {
        console.error("Error retrieving Redis keys:", error);
        event.res.statusCode = 500;
        return 'Error fetching cache keys';
    }
});

async function getAllRedisKeys() {
    return new Promise((resolve, reject) => {
        redisClient.keys('*').then((keys: string[]) => {
            resolve(keys);
        })
            .catch(err => {
                reject(err);
            });
    });
}