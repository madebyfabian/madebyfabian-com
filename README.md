# Nuxt3 WordPress Headless Starter

## Setup

1. Create a `.env` file and add the following variables:

```bash
GQL_HOST="https://example.com/graphql"
GQL_TOKEN="Basic xxx"
SITE_URL="https://example.com"
NUXT_PUBLIC_SITE_URL_PREVIEW="https://example-preview.com"
```

## Hosting

1. Create a vercel project with the following build command:

```bash
npm run build:prod
```

2. Add the env variables from the `.env` file to the vercel project.
3. Configure 2 domains
    1. Should be the same as `SITE_URL`
    2. Should be the same as `NUXT_PUBLIC_SITE_URL_PREVIEW`
