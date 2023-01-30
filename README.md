# Nuxt3 WordPress Headless Starter

## Setup

1. Make sure to install the dependencies

```bash
npm i
```

2. Create a `.env` file in the root of your project, add the following variables:

```bash
GQL_HOST="https://example.com/graphql"
GQL_TOKEN="Basic xxx"
NUXT_PUBLIC_SITE_URL="https://example.vercel.app" # Where your Nuxt site is deployed to
NUXT_PUBLIC_SITE_URL_PROD="https://example.com"
NUXT_PUBLIC_SITE_URL_PREVIEW="https://example-preview.vercel.app"
NUXT_TURNSTILE_SECRET_KEY="xxx"
NUXT_PUBLIC_TURNSTILE_SITE_KEY="xxx"
NUXT_PUBLIC_WP_HOST="example.com" # WordPress Installation host, e.g. mywordpressbackend.com
NUXT_PUBLIC_CALENDLY_URL="https://calendly.com/xxx/30min"
```

3. Create a `vercel.json` file in the root of your project, with the following content:
   (of course you can change the `destination` to your liking)

```json
{
	"rewrites": [
		{
			"source": "/_mtmo/t",
			"destination": "https://example.com/wp-content/plugins/matomo/app/matomo.php"
		},
		{
			"source": "/_mtmo/s.js",
			"destination": "https://example.com/wp-content/uploads/matomo/matomo.js"
		}
	]
}
```

## Hosting

1. Create a vercel project with the following build command:

```bash
npm run build:prod
```

2. Add the env variables from the `.env` file to the vercel project.
3. Configure 2 domains
    1. Should be the same as `NUXT_PUBLIC_SITE_URL`
    2. Should be the same as `NUXT_PUBLIC_SITE_URL_PREVIEW`
