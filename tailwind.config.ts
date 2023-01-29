import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

export default <Partial<Config>>{
	future: {
		hoverOnlyWhenSupported: true,
	},

	theme: {
		container: {
			center: true,
			padding: '1.5rem',
		},

		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
		},

		extend: {
			fontFamily: {
				display: ['PlusJakartaSans', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				accent: {
					700: '#2A5ACB',
				},
			},
		},
	},
}
