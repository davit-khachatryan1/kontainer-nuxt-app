import { envConfigs } from "~/server/constants/constant";

const postTypes: any = envConfigs.env.postTypes;

export default defineEventHandler(async (event) => {
  const redisClient:any = event.context.redisClient

  const { slug, type, lang } = getQuery(event);

  if (type === 'global') {
    await deleteKeyFromCache(`/api/global?lang=${lang}`, redisClient);
    return 'options cleared';
  }

  let redisKey = '/api/content/';
  if (type !== 'page') {
    redisKey += postTypes[type as any] ? postTypes[type as any] : type;
    if (postTypes[type as any]) {
      await deleteKeyFromCache(`/api/content/list/${postTypes[type as any]}?lang=${lang}`, redisClient);
      await deleteKeyFromCache(`/api/content/home?lang=${lang}`, redisClient);
      await deleteKeyFromCache(redisKey + `?lang=${lang}`, redisClient);
    }
    if (slug) redisKey += `/${slug}`;
  }

  await deleteKeyFromCache(redisKey + `?lang=${lang}`, redisClient);
  return redisKey;
});

async function deleteKeyFromCache(key: string, redisClient: any) {
  console.log('Deleting key:', key);
  return redisClient.del(key);
}