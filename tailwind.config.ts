import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

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
			'xl': '1280px',
			'2xl': '1536px',
		},

		extend: {
			fontFamily: {
				display: ['PlusJakartaSans', ...defaultTheme.fontFamily.sans],
			},
		},
	},
}
