const dotenv = require('dotenv')
const fs = require('fs/promises')
dotenv.config()

const generateVercelJson = () => {
	const wpHost = process.env.NUXT_PUBLIC_WP_HOST

	const json = {
		rewrites: [
			{
				source: '/_mtmo/t',
				destination: `https://${wpHost}/wp-content/plugins/matomo/app/matomo.php`,
			},
			{
				source: '/_mtmo/s',
				destination: `https://${wpHost}/wp-content/uploads/matomo/matomo.js`,
			},
		],
	}

	fs.writeFile('vercel.json', JSON.stringify(json, null, 2))
}

generateVercelJson()
