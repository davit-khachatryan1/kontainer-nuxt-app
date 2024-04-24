import { getUrlWithLangPrefix,  preparePage,  redisClient, wpapi } from "../../constants/constant";

export default defineEventHandler(async (event) => {
  const cacheKey = 'frontpageData';
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const query = event.context.query;
  const axiosOptions = { params: { ...query } };
  const frontpageUrl = getUrlWithLangPrefix('kustom/frontpage', axiosOptions);

  try {
    const frontpageResponse = await wpapi.get(frontpageUrl, axiosOptions);
    if (frontpageResponse.data) {
      const pagesUrl = getUrlWithLangPrefix(`wp/v2/pages/${frontpageResponse.data}`, axiosOptions);
      const pageResponse = await wpapi.get(pagesUrl, axiosOptions);
      const pageData = preparePage(pageResponse.data);

      // Cache the page data with Redis
      await redisClient.setEx(cacheKey, 600, JSON.stringify(pageData)); // 100 hours in seconds
      return pageData;
    }
  } catch (error) {
    console.warn('Error in fetching data:', error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});