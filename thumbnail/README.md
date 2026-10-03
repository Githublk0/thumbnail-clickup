# Thumbnail Intelligence, complete source package

## CodeSandbox preview

Upload this folder or ZIP to CodeSandbox and choose **HTML + CSS**. The root `index.html` is a self-contained preview. Use `npm start` if prompted. It has no external frontend dependencies, so the preview avoids the previous package parsing and dependency-fetch errors.

Preview mode supports navigation, template preview/create/use, project preview, editor text, mobile preview, score preview, and PNG download. Backend-only actions clearly identify that the API service is required.

## Complete API

The full Fastify/PostgreSQL backend is preserved under `apps/api`. It includes auth, project/template/assets APIs, private S3/MinIO storage, upload validation, AI providers/jobs, scoring, credits, YouTube OAuth, Stripe webhook handling, migrations, worker, and tests.

Run the full SaaS in Node 20+: `docker compose up --build`. Or manually run `npm --prefix apps/api install`, configure `.env`, `npm --prefix apps/api run migrate`, then `npm --prefix apps/api start`.

The root preview package intentionally has no dependencies. API dependencies are isolated in `apps/api/package.json` to prevent CodeSandbox HTML preview crashes.
