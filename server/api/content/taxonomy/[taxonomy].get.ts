import { getUrlWithLangPrefix, prepTaxonomy, wpapi } from "~/server/constants/constant";

export default defineEventHandler(async (event) => {
  const redisClient:any = event.context.redisClient
  
  const { taxonomy } = event.context.params as any;
  const query = getQuery(event); // Ensure getQuery is properly defined
  const axiosOptions = { params: query };
  const cacheKey = `taxonomyData-${taxonomy}-${JSON.stringify(query)}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const taxonomyUrl = getUrlWithLangPrefix(`wp/v2/${taxonomy}`, axiosOptions);

  try {
    const response = await wpapi.get(taxonomyUrl, axiosOptions);
    const preparedData = prepTaxonomy(response.data);

    await redisClient.setEx(cacheKey, 600, JSON.stringify(preparedData)); // Using a TTL of 600 seconds (10 minutes)

    return preparedData;
  } catch (error) {
    console.error("Error fetching taxonomy data:", error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});
