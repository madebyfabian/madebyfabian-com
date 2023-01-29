import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
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
				accent: colors.sky,
			},
		},
	},
}
