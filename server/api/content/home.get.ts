import { getUrlWithLangPrefix, myCache, preparePage, wpapi } from "../../constants/constant";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);  // Ensure you have a method to extract query parameters
  const cacheKey = `frontpageData-${JSON.stringify(query)}`;
  const cachedData = myCache.get(cacheKey) as string;

  if (cachedData) {
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

      // Cache the page data with node-cache
      myCache.set(cacheKey, JSON.stringify(pageData), 600); // Optionally specify TTL here

      return pageData;
    }
  } catch (error) {
    console.warn('Error in fetching data:', error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});
