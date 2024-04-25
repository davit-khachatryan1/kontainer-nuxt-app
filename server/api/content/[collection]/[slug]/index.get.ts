import { envConfigs, getUrlWithLangPrefix, myCache, preparePage, wpapi } from "~/server/constants/constant";

const postTypes: any = envConfigs.env.postTypes;

// Create a cache instance with a standard TTL

export default defineEventHandler(async (event) => {
  const { collection, slug } = event.context.params as any;
  const postType = postTypes[collection]; // Ensure 'postTypes' is defined or imported
  const query = getQuery(event); // Ensure getQuery is properly implemented to extract query parameters
  const axiosOptions = {
    params: {
      ...query,
      slug,
    },
  };

  const cacheKey = `content-${collection}-${slug}`;
  const cachedData = myCache.get(cacheKey) as string;

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);

  try {
    const response = await wpapi.get(postTypeUrl, axiosOptions);
    if (response.data && response.data.length > 0) {
      const preparedData = preparePage(response.data[0]);

      // Cache the prepared data with node-cache
      myCache.set(cacheKey, JSON.stringify(preparedData));

      return preparedData;
    } else {
      throw new Error("No data found");
    }
  } catch (error) {
    console.error("Error fetching content:", error);
    event.res.statusCode = 404;
    return 'Not found';
  }
});
