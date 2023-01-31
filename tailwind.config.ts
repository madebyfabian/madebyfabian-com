import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

const borderColorDefault = 'rgb(31 41 55 / 0.1)' // border-gray-800/10

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
				gray: {
					body: colors.gray[700],
				},
			},
			borderColor: {
				DEFAULT: borderColorDefault,
			},
			borderRadius: {
				'box': '1rem',
			},
			boxShadow: {
				'border': `0 0 0 1px ${borderColorDefault}`,
				'border-2': `0 0 0 2px ${borderColorDefault}`,
				'border-and-inner': `0 0 0 1px ${borderColorDefault}, ${defaultTheme.boxShadow.inner}`,
				'border-2-and-shadow-lg': `0 0 0 2px ${borderColorDefault}, ${defaultTheme.boxShadow['lg']}`,
				'border-2-and-shadow-xl': `0 0 0 2px ${borderColorDefault}, ${defaultTheme.boxShadow['xl']}`,
			},
		},
	},
}
