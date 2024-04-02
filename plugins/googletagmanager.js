// plugins/google-tag-manager.js
export default defineNuxtPlugin(nuxtApp => {
	if (process.env.NODE_ENV === 'development') return;
  
	let ga_id = 'GTM-MNHKD9J';
	if (window.location.hostname === 'kontainer.dev.konform.com') {
	  ga_id = 'GTM-53HBZK6';
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
  