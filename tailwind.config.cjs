const iOSHeight = require('@rvxlab/tailwind-plugin-ios-full-height');

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				dark: '#222222'
			},
			fontFamily: {
				branding: ['Fredoka', 'sans-serif']
			}
		}
	},
	plugins: [iOSHeight]
};
