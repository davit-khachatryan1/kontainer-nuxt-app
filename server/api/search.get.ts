import { getUrlWithLangPrefix, prepareCollection, wpapi } from "../constants/constant";

export default defineEventHandler(async (event) => {
    const q = event.context.params?.q;
    const query = getQuery(event)
    const axiosOptions = { params: { ...query } };
    const searchUrl = getUrlWithLangPrefix(`kustom/search/${q}`, axiosOptions);
  
    try {
      const response = await wpapi.get(searchUrl, axiosOptions);
      return prepareCollection(response.data);
    } catch (error) {
      event.res.statusCode = 404;
      return 'Not found';
    }
  });