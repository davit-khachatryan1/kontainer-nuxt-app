// plugins/linkedin-insight.js
export default defineNuxtPlugin(nuxtApp => {
	// Check if we're running in the browser and in production mode
	if (process.client && process.env.NODE_ENV === 'production') {
	  // Asynchronously load the LinkedIn Insight Tag
	  const loadLinkedInInsight = () => {
		const scriptElement = document.createElement('script');
		scriptElement.type = 'text/javascript';
		scriptElement.async = true;
		scriptElement.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
		document.head.appendChild(scriptElement);
  
		window._linkedin_partner_id = "YOUR_LINKEDIN_PARTNER_ID"; // Replace with your LinkedIn partner ID
		window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
		window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
	  };
  
	  // Ensure the page is fully loaded before trying to load the LinkedIn Insight script
	  if (window.onNuxtReady) window.onNuxtReady(loadLinkedInInsight);
	  else window.onload = loadLinkedInInsight;
	}
  });
  