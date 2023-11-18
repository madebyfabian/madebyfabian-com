# Nuxt3 WordPress Headless Starter

## Setup

1. Make sure to install the dependencies

```bash
pnpm i
```

2. Create a `.env` file in the root of your project, add the variables from `.env.example`

## Hosting

1. Create a vercel project with the following build command:

```bash
npm run build:prod
```

2. Add the env variables from the `.env` file to the vercel project.
3. Configure a domain, should be the same as `NUXT_PUBLIC_SITE_URL`. You eventually have to redeploy the project after changing the domain.
