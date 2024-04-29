// import { createClient } from 'redis';

// export default defineNuxtPlugin((nuxtApp) => {
//   const config = useRuntimeConfig();
//   const redisClient = createClient({
//     url: config.private.redisUrl
//   });

//   redisClient.on('error', (err) => console.error('Redis Client Error', err));
//   redisClient.connect().catch(console.error);

//   // Making Redis client available globally via Nuxt
//   nuxtApp.provide('redisClient', redisClient);
// });

import { createClient } from 'redis';

export default defineNitroPlugin((nitroApp) => {
  const config = useRuntimeConfig();
  
  const redisClient = createClient({
    url: config.private.redisUrl  // Use environment variable instead for production
  });

  redisClient.on('error', (err) => console.error('Redis Client Error', err));

  redisClient.connect();

  // Expose Redis client to use in your application
  nitroApp.hooks.hook('request', (event) => {
    event.context.redisClient = redisClient;
  });
});