// Import necessary helpers and constants
import { getUrlWithLangPrefix, myCache, prepareAcf, prepareCategories, wpapi } from "../constants/constant";

// Create a cache instance with a standard TTL

export default defineEventHandler(async (event) => {
    const cacheKey = 'globalData';
    const cachedData = myCache.get(cacheKey) as string;
  
    if (cachedData) {
      return JSON.parse(cachedData);
    }
  
    const query = getQuery(event); // Assuming getQuery is a function you have defined to extract the query parameters
  
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
  
      // Cache the data with node-cache, set the TTL explicitly if different from default
      myCache.set(cacheKey, JSON.stringify(responseData), 600); // Optionally specify TTL here
  
      return responseData;
    } catch (error) {
      event.res.statusCode = 404;
      console.error(error);
      return 'Could not get global options';
    }
});
