import { getUrlWithLangPrefix, prepTaxonomy, wpapi } from "~/server/constants/constant";

export default defineEventHandler(async (event) => {
  const redisClient: any = event.context.redisClient

  const { taxonomy } = event.context.params as any;
  const query = getQuery(event);
  const axiosOptions = { params: query };
  const cacheKey = `${event.node.req.url}-${taxonomy}-${JSON.stringify(query)}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData && cachedData != 'null') {
    return JSON.parse(cachedData);
  }

  const taxonomyUrl = getUrlWithLangPrefix(`wp/v2/${taxonomy}`, axiosOptions);

  try {
    const response = await wpapi.get(taxonomyUrl, axiosOptions);
    const preparedData = prepTaxonomy(response.data);

    await redisClient.setEx(cacheKey, 600, JSON.stringify(preparedData));
    if (!preparedData) {
      event.res.statusCode = 404;
      return 'Not found';
    }
    return preparedData;
  } catch (error) {
    console.error("Error fetching taxonomy data:", error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});
