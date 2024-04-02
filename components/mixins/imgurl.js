export default {
	methods: {
		imgUrl(obj, size) {
			if (size === 'url') {
				return obj.url;
			}
			if (obj.sizes[size]) {
				return obj.sizes[size];
			}
			return obj.url; // fallback if size is not generated, i.e. image uploaded too small
		},
		/* SIZES */
		/*
		url = actual uploaded image
		('full_width', 2400, 800, true); //cropped
		('full_width_placeholder', 800, 267, true); //cropped
		('sidekick', 1200);
		('sidekick_inline', 800);
		('placeholder', 600);
		('resource_thumbnail', 650, 369, true); //cropped
		*/
	},
};
