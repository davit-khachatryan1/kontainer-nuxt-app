import { envConfigs, getUrlWithLangPrefix, preparePage, wpapi } from "~/server/constants/constant";

const postTypes: any = envConfigs.env.postTypes;

export default defineEventHandler(async (event) => {
  const redisClient: any = event.context.redisClient

  const { collection, slug } = event.context.params as any;
  const postType = postTypes[collection];
  const query = getQuery(event);
  const axiosOptions = {
    params: {
      ...query,
      slug,
    },
  };
  const cacheKey = `${event.node.req.url}-${collection}-${slug}-${JSON.stringify(query)}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData && cachedData != 'null') {
    return JSON.parse(cachedData);
  }

  const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);

  try {
    const response = await wpapi.get(postTypeUrl, axiosOptions);
    if (response.data && response.data.length > 0) {
      const preparedData = preparePage(response.data[0]);

      await redisClient.setEx(cacheKey, 600, JSON.stringify(preparedData));
      if (!preparedData) {
        event.res.statusCode = 404;
        return 'Not found';
      }
      return preparedData;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});
