import { getUrlWithLangPrefix, preparePage, wpapi } from "../../constants/constant";

export default defineEventHandler(async (event) => {
  const redisClient: any = event.context.redisClient

  const query = getQuery(event);
  const cacheKey = `${event.node.req.url}-${JSON.stringify(query)}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData && cachedData != 'null') {
    return JSON.parse(cachedData);
  }

  const axiosOptions = { params: { ...query } };
  const frontpageUrl = getUrlWithLangPrefix('kustom/frontpage', axiosOptions);

  try {
    const frontpageResponse = await wpapi.get(frontpageUrl, axiosOptions);
    if (frontpageResponse.data) {
      const pagesUrl = getUrlWithLangPrefix(`wp/v2/pages/${frontpageResponse.data}`, axiosOptions);
      const pageResponse = await wpapi.get(pagesUrl, axiosOptions);
      const pageData = preparePage(pageResponse.data);

      await redisClient.setEx(cacheKey, 600, JSON.stringify(pageData));
      if (!pageData) {
        event.res.statusCode = 404;
        return 'Not found';
      }
      return pageData;
    }
  } catch (error) {
    console.warn('Error in fetching data:', error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});
