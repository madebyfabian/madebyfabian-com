# Nuxt3 WordPress Headless Starter

## Setup

1. Create a `.env` file and add the following variables:

```bash
GQL_HOST="https://example.com/graphql"
GQL_TOKEN="Basic xxx"
SITE_URL="https://example.com"
```

## Preview Staging

To preview the staging environment, (after build) run the following command:

```bash
NUXT_PUBLIC_GQL_TOKEN=\"Basic xxx\" node .output/server/index.mjs
```

## Hosting

1. Create a vercel project with the following build command:

```bash
npm run build:prod
```

and these environment variables:

```bash
GQL_HOST="https://example.com/graphql"
GQL_TOKEN="Basic xxx"
SITE_URL="https://example.com"
```

2. Create a second vercel project with the following build command:

```bash
npm run build:staging
```

and these environment variables:

```bash
GQL_HOST="https://example.com/graphql"
GQL_TOKEN="Basic xxx"
SITE_URL="https://example.com"
NUXT_PUBLIC_GQL_TOKEN="Basic xxx"
```
