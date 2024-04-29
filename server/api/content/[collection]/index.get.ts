import { envConfigs, getUrlWithLangPrefix, prepareCollection, preparePage, wpapi } from "~/server/constants/constant";

const postTypes: any = envConfigs.env.postTypes;

export default defineEventHandler(async (event) => {
  const redisClient:any = event.context.redisClient
   
  const { collection } = event.context.params as any;
  const postType = postTypes[collection];
  const query = getQuery(event); // Assuming getQuery is a function to extract query parameters
  const axiosOptions = { params: query };
  const cacheKey = `content-${collection}-${JSON.stringify(query)}`;
  const cachedData = await redisClient.get(cacheKey);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const pageUrl = getUrlWithLangPrefix('wp/v2/pages', axiosOptions);

  if (postType) {
    console.log('Getting collection archive', postType);
    const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);

    try {
      const [pageResponse, postsResponse] = await Promise.all([
        wpapi.get(pageUrl, { params: { ...axiosOptions.params, slug: collection } }),
        wpapi.get(postTypeUrl, axiosOptions)
      ]);

      const pageData = preparePage(pageResponse.data[0]);
      pageData.posts = { [collection]: prepareCollection(postsResponse.data) };

      await redisClient.setEx(cacheKey, 600, JSON.stringify(pageData));

      return pageData;
    } catch (error) {
      event.res.statusCode = 404;
      console.log('Error fetching data:', error);
      return 'Not found';
    }
  } else {
    try {
      const response = await wpapi.get(pageUrl, { params: { ...axiosOptions.params, slug: collection } });
      const pageData = preparePage(response.data[0]);

      await redisClient.setEx(cacheKey, 600, JSON.stringify(pageData));

      return pageData;
    } catch (error) {
      event.res.statusCode = 404;
      console.log('Error fetching data:', error);
      return 'Not found';
    }
  }
});
