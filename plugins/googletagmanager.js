// plugins/google-tag-manager.js
export default defineNuxtPlugin(nuxtApp => {
	if(process.server) return;

	const config = useRuntimeConfig();

	let ga_id = config.public.gtmId;
	if (ga_id === '') {
    	return;
	}

	(function(w, d, s, l, i) {
	  w[l] = w[l] || [];
	  w[l].push({
		'gtm.start': new Date().getTime(), event: 'gtm.js'
	  });
	  let f = d.getElementsByTagName(s)[0],
		  j = d.createElement(s), dl = l !== 'dataLayer' ? '&l=' + l : '';
	  j.async = true;
	  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
	  f.parentNode.insertBefore(j, f);
	})(window, document, 'script', 'dataLayer', ga_id);
  });
