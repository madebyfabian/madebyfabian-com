import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import plugin from 'tailwindcss/plugin'

const borderColorDefault = 'rgb(31 41 55 / 0.1)' // border-gray-800/10
const accentColor700 = 'rgb(42, 90, 203)' // custom accent color

export const breakpoints = {
	'sm': 640,
	'md': 768,
	'lg': 1024,
}

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
			'sm': `${breakpoints.sm}px`,
			'md': `${breakpoints.md}px`,
			'lg': `${breakpoints.lg}px`,
		},

		extend: {
			fontFamily: {
				display: ['PlusJakartaSans', ...defaultTheme.fontFamily.sans],
			},
			colors: {
				accent: {
					700: accentColor700,
				},
				gray: {
					body: colors.gray[700],
				},
				frost: {
					DEFAULT: `rgb(255 255 255 / 0.25)`, // white/25
					200: `rgb(255 255 255 / 0.75)`, // white/75
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
				'border-accent-700': `0 0 0 1px ${accentColor700}`,
				'border-and-shadow-sm': `0 0 0 1px ${borderColorDefault}, ${defaultTheme.boxShadow['sm']}`,
				'border-and-shadow-lg': `0 0 0 1px ${borderColorDefault}, ${defaultTheme.boxShadow['lg']}`,
				'border-and-inner': `0 0 0 1px ${borderColorDefault}, ${defaultTheme.boxShadow.inner}`,
				'border-2': `0 0 0 2px ${borderColorDefault}`,
				'border-2-and-shadow-lg': `0 0 0 2px ${borderColorDefault}, ${defaultTheme.boxShadow['lg']}`,
				'border-2-and-shadow-xl': `0 0 0 2px ${borderColorDefault}, ${defaultTheme.boxShadow['xl']}`,
			},
		},
	},
}
