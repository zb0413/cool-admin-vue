export const proxy = {
	"/dev/": {
		// target: "http://127.0.0.1:8001",
		target: "http://cool-admin-midway:8001",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/dev/, "")
	},
	"/dev/ws/": {
		target: 'ws://starlette-training:8000',
		ws: true,
		rewrite: (path: string) => path.replace(/^\/dev/, "")
	},

	"/prod/": {
		target: "https://show.cool-admin.com",
		changeOrigin: true,
		rewrite: (path: string) => path.replace(/^\/prod/, "/api")
	}
};
