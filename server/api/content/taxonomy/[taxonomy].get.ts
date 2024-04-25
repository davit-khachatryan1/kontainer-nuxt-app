import { getUrlWithLangPrefix, myCache, prepTaxonomy, wpapi } from "~/server/constants/constant";

// Create a cache instance

export default defineEventHandler(async (event) => {
  const { taxonomy } = event.context.params as any;
  const query = getQuery(event); // Ensure getQuery is properly defined
  const axiosOptions = { params: query };
  const cacheKey = `taxonomyData-${taxonomy}-${JSON.stringify(query)}`;
  const cachedData = myCache.get(cacheKey) as string;

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const taxonomyUrl = getUrlWithLangPrefix(`wp/v2/${taxonomy}`, axiosOptions);

  try {
    const response = await wpapi.get(taxonomyUrl, axiosOptions);
    const preparedData = prepTaxonomy(response.data);

    // Cache the processed data with node-cache
    myCache.set(cacheKey, JSON.stringify(preparedData));

    return preparedData;
  } catch (error) {
    console.error("Error fetching taxonomy data:", error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});
