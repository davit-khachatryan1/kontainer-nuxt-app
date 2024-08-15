import { getUrlWithLangPrefix, wpapi } from "../constants/constant";

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const contactUrl = getUrlWithLangPrefix('kustom/contactform', body);
  
    try {
      await wpapi.post(contactUrl, body);
      return { success: true };
    } catch (error) {
      event.res.statusCode = 400;
      return 'Something went wrong';
    }
  });
  