import { createClient } from 'redis';

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig();
  
  const redisClient = createClient({
    url: config.private.redisUrl
  });

  redisClient.on('error', (err) => console.error('Redis Client Error', err));

  redisClient.connect();

  nitroApp.hooks.hook('request', (event) => {
    event.context.redisClient = redisClient;
  });
});