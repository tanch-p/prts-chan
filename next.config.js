module.exports = {
	// i18n: {
	// 	locales: ["default", "en", "jp", "zh"],
	// 	defaultLocale: "default",
	// 	localeDetection: true,
	// },
	// trailingSlash: true,
	async redirects() {
		return [
			{
				source: "/404",
				destination: "/",
				permanent: true,
			},
		];
	},
};
