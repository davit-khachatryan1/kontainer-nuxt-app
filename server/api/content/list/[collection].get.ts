import { envConfigs, getUrlWithLangPrefix, myCache, prepareCollectionFromArray, wpapi } from "~/server/constants/constant";

const postTypes: any = envConfigs.env.postTypes;

export default defineEventHandler(async (event) => {
  const { collection } = event.context.params as any;
  const postType = postTypes[collection]; // Ensure 'postTypes' is defined or imported
  const query = getQuery(event); // Ensure getQuery is a function that extracts query parameters properly
  const axiosOptions = { params: query };
  const cacheKey = `content-list-${collection}`;
  const cachedData = myCache.get(cacheKey) as string;

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);

  try {
    const response = await wpapi.get(postTypeUrl, axiosOptions);
    const result = prepareCollectionFromArray(response.data);

    // Cache the result with node-cache
    myCache.set(cacheKey, JSON.stringify(result));

    return result;
  } catch (error) {
    console.error("Error fetching content:", error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});
