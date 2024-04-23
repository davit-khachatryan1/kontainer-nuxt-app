let baseUrl = 'http://localhost:3000'; // http://localhost:3000
let siteUrl = 'http://kontainer-api.test'; // https://kontainer.dev.konform.com // no trailing slash
let apiUrl = 'http://kontainer-api.test/'; // 'https://kontainercms.dev.konform.com'
let appUrl = 'http://kontainer.test';
let sentryDSN = 'https://52449f0e189c4bdc9abcf7274853a78b@sentry.konform.com/24';

if (process.env.SERVER_NAME === 'production') {
	baseUrl = 'https://kontainer.com';
	siteUrl = 'https://kontainer.com';
	apiUrl = 'https://cms.kontainer.com';
	appUrl = 'https://app.kontainer.com';
	sentryDSN = 'https://ed48997570fa466fb0a3fd668ea387ea@sentry.konform.com/15';
} else if (process.env.SERVER_NAME === 'next') {
	baseUrl = 'https://kontainer.dev.konform.com';
	siteUrl = 'https://kontainer.dev.konform.com';
	apiUrl = 'https://kontainercms.dev.konform.com';
	appUrl = 'https://next.kontainer.com';
}

export default {
    baseUrl: baseUrl,
    siteUrl: siteUrl,
    apiUrl: apiUrl,
    appUrl: appUrl,
    sentryDSN: sentryDSN,
    postTypes: {
        news: 'news',
        blog: 'blog',
        prices: 'prices',
        prices_new: 'prices_new',
        cases: 'cases',
    },
}