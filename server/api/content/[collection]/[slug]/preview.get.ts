import { envConfigs, getUrlWithLangPrefix, preparePage, wpapi } from "~/server/constants/constant";

const postTypes: any = envConfigs.env.postTypes;

export default defineEventHandler(async (event) => {
    const { collection, slug } = event.context.params as any;
    const query = getQuery(event);
    const { key } = query;
    const postType = postTypes[collection];
    const axiosOptions = {
      params: {
        ...query,
        preview: true,
        previewkey: key,
        slug,
      },
    };
  
    const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);
  
    try {
      const response = await wpapi.get(postTypeUrl, axiosOptions);
      if (response.data && response.data.length > 0) {
        return preparePage(response.data[0]);
      } else {
        throw new Error("No data found");
      }
    } catch (error) {
      console.error("Error fetching preview:", error);
      event.res.statusCode = 404;
      return 'Not found';
    }
  });