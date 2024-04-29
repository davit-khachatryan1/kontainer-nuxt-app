import { envConfigs, getUrlWithLangPrefix, prepareCollectionFromArray, wpapi } from "~/server/constants/constant";

const postTypes: any = envConfigs.env.postTypes;

export default defineEventHandler(async (event) => {
  const redisClient:any = event.context.redisClient
 
  const { collection } = event.context.params as any;
  const postType = postTypes[collection]; // Ensure 'postTypes' is defined or imported
  const query = getQuery(event); // Ensure getQuery is a function that extracts query parameters properly
  const axiosOptions = { params: query };
  const cacheKey = `content-list-${collection}-${JSON.stringify(query)}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);

  try {
    const response = await wpapi.get(postTypeUrl, axiosOptions);
    const result = prepareCollectionFromArray(response.data);

    await redisClient.setEx(cacheKey, 600, JSON.stringify(result)); // Caches with a TTL of 600 seconds (10 minutes)

    return result;
  } catch (error) {
    console.error("Error fetching content:", error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});
