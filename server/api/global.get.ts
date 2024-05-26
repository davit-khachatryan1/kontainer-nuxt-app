// Import necessary helpers and constants
import { getUrlWithLangPrefix, prepareAcf, prepareCategories, wpapi } from "../constants/constant";

export default defineEventHandler(async (event) => {
  const redisClient: any = event.context.redisClient
  const query = getQuery(event); // Assuming getQuery is a function you have defined to extract the query parameters
  const cacheKey = `globalData-${JSON.stringify(query)}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData && cachedData != 'null') {
    return JSON.parse(cachedData);
  }


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

    await redisClient.setEx(cacheKey, 600, JSON.stringify(responseData));
    if (!responseData) {
      event.res.statusCode = 404;
      return 'Not found';
    }
    return responseData;
  } catch (error) {
    console.error('Error in fetching data:', error);
    event.res.statusCode = 404;
    return 'Could not get global options';
  }
});
