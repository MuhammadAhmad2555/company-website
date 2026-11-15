# ArcX9

The ArcX9 company website, built with Next.js, TypeScript, and Tailwind CSS.

## Run

```sh
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run build` for a production check.

## Deploy to Cloudflare Workers

The site uses the OpenNext Cloudflare adapter. `npm run deploy` builds and deploys the Worker; `npm run preview` runs it locally in the Workers runtime. The Worker configuration attaches the production custom domain `arcx9.com`.

The contact link opens the visitor’s email app at `hello@arcx9.com`. A Firebase project has not been connected yet.
