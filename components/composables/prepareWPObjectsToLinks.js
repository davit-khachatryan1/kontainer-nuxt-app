export const prepareWPObjectsToLinks = (obj) => {
	if (!obj) {
		return { url: '#' };
	}

	if (Array.isArray(obj)) {
		return obj.map((currentObj) => {
			return {
				slug: currentObj.link.slug,
				title: currentObj.link.post_title,
				type: currentObj.link.post_type,
			};
		});
	}

	if (obj.slug || obj.post_title || obj.post_type || obj.type || obj.title) {
		return {
			slug: obj.slug,
			title: obj.post_title || obj.title,
			type: obj.post_type || obj.type,
		};
	}

	if (obj.url) {
		return obj;
	}

	return { url: '#' };
};
