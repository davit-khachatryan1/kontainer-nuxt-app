import { envConfigs, redisClient } from "~/server/constants/constant";

const postTypes: any = envConfigs.env.postTypes;

export default defineEventHandler(async (event) => {
    const { slug, type, lang } = getQuery(event);
  
    if (type === 'global') {
      await deleteKeyFromCache(`/api/global?lang=${lang}`);
      return 'options cleared';
    }
  
    let redisKey = '/api/content/';
    if (type !== 'page') {
      redisKey += postTypes[type as any] ? postTypes[type as any] : type;
      if (postTypes[type as any]) {
        await deleteKeyFromCache(`/api/content/list/${postTypes[type as any]}?lang=${lang}`);
        await deleteKeyFromCache(`/api/content/home?lang=${lang}`);
        await deleteKeyFromCache(redisKey + `?lang=${lang}`);
      }
      if (slug) redisKey += `/${slug}`;
    }
  
    await deleteKeyFromCache(redisKey + `?lang=${lang}`);
    return redisKey;
  });
  
  async function deleteKeyFromCache(key: string) {
    console.log('Deleting key:', key);
    return redisClient.del(key);
  }