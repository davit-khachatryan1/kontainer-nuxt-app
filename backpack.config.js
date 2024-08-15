export default {
	webpack: (config, options, webpack) => {
		config.entry.main = './server/index.js';
		return config;
	}
};
