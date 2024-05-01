module.exports = {
	apps: [
		{
			name: 'kontainersite',
			script: 'npm',
			args: 'start',
			watch: true,
			env_production: {
				NODE_ENV: 'production',
				SERVER_NAME: 'production',
				HOST: '127.0.0.1',
				PORT: 3001,
				REDIS_DB: 11,
			},
			env_next: {
				NODE_ENV: 'next',
				SERVER_NAME: 'next',
				HOST: '127.0.0.1',
				PORT: 3001,
				REDIS_DB: 11,
			},
		},
	],
};
