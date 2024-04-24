import { getUrlWithLangPrefix, prepareAcf, prepareCategories, redisClient, wpapi } from "../constants/constant";

export default defineEventHandler(async (event) => {
    const cacheKey = 'globalData';
    const cachedData = await redisClient.get(cacheKey);
  
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  
    const query = event.context.query;
  
    const axiosOptions = { params: { ...query } };
    const optionsUrl = getUrlWithLangPrefix('kustom/options', axiosOptions);
    const menuPrimaryUrl = getUrlWithLangPrefix('kustom/menu/primary', axiosOptions);
    const categoriesUrl = getUrlWithLangPrefix('wp/v2/categories', axiosOptions);
  
    try {
      const [options, primary, categories] = await Promise.all([
        wpapi.get(optionsUrl, axiosOptions),
        wpapi.get(menuPrimaryUrl, axiosOptions),
        wpapi.get(categoriesUrl, axiosOptions),
      ]);
  
      const responseData = {
        options: prepareAcf(options.data),
        menus: {
          primary: primary.data,
        },
        categories: prepareCategories(categories.data),
      };
  
      // Cache data with Redis, setting expiration (e.g., 100 hours in seconds)
      await redisClient.setEx(cacheKey, 600, JSON.stringify(responseData));
      return responseData;
    } catch (error) {
      event.res.statusCode = 404;
      console.error(error);
      return 'Could not get global options';
    }
})