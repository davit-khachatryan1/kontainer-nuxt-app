import { envConfigs, getUrlWithLangPrefix, prepareCollection, preparePage, wpapi } from "~/server/constants/constant";

const postTypes: any = envConfigs.env.postTypes;

export default defineEventHandler(async (event) => {
    const { collection } = event.context.params as any;
    const postType = postTypes[collection];  // Define or import `postTypes` as necessary
    const query = getQuery(event)
    const { key } = query;
    const axiosOptions = { params: { ...query } };
    
    if (postType) {
      console.log('Getting collection archive', postType);
      const pagesUrl = getUrlWithLangPrefix(`wp/v2/pages`, axiosOptions);
      const postTypeUrl = getUrlWithLangPrefix(`wp/v2/${postType}`, axiosOptions);
  
      try {
        const [pageResponse, postsResponse] = await Promise.all([
          wpapi.get(pagesUrl, { params: { ...axiosOptions.params, slug: collection } }),
          wpapi.get(postTypeUrl, axiosOptions),
        ]);
  
        const pageData = preparePage(pageResponse.data[0]);
        pageData.posts = { [collection]: prepareCollection(postsResponse.data) };
        return pageData;
      } catch (error) {
        event.res.statusCode = 404;
        return 'Not found';
      }
    } else {
      const pageCollectionUrl = getUrlWithLangPrefix(`wp/v2/pages/${collection}/`, axiosOptions);
      try {
        const response = await wpapi.get(pageCollectionUrl, {
          params: {
            ...axiosOptions.params,
            preview: true,
            previewkey: key,
          }
        });
        return preparePage(response.data);
      } catch (error) {
        event.res.statusCode = 404;
        return 'Not found';
      }
    }
  });
  