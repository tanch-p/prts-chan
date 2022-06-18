const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Noto Sans", ...defaultTheme.fontFamily.sans],
				jp: ["Noto Sans JP", "sans-serif"],
			},
			colors: {
				"hallu-red": "#4b0505",
				"ph-bg": "#131313",
			},
		},
	},
	plugins: [],
};
