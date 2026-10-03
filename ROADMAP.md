# Thumbnail Intelligence source map

This ZIP contains the complete current source package, not a screenshot or partial snippet.

## Preview

- `index.html`: CodeSandbox-ready root preview entrypoint
- `app.js`: dependency-free preview interactions
- `styles.css`: preview stylesheet
- `preview-server.js`: local preview server
- `.codesandbox.json`: CodeSandbox start configuration

## Production application

- `apps/web/public/index.html`: preserved application UI
- `apps/web/public/api-client.js`: single browser API client
- `apps/web/public/integration.js`: frontend integration layer
- `apps/web/e2e/smoke.spec.js`: browser smoke test
- `apps/web/vercel.json`: frontend deployment placeholder

## Production API

- `apps/api/src/server.js`: Fastify API, auth, workspaces, projects, templates, assets, jobs, scoring, OAuth, billing, health, readiness
- `apps/api/src/providers.js`: text, vision, and image provider adapters
- `apps/api/src/storage.js`: S3-compatible storage abstraction
- `apps/api/src/upload.js`: file signature, dimensions, MIME, and size validation
- `apps/api/src/worker.js`: asynchronous AI job processor
- `apps/api/src/worker-runner.js`: worker polling process
- `apps/api/src/crypto.js`: encrypted token helper
- `apps/api/src/entitlements.js`: plan entitlement rules
- `apps/api/src/db.js`: PostgreSQL pool, transactions, membership checks
- `apps/api/migrations/001_init.sql`: base schema
- `apps/api/migrations/002_production.sql`: templates, entitlements, billing events, OAuth state
- `apps/api/test/security.test.js`: built-in security and ledger tests

## Run the preview

Upload this ZIP to CodeSandbox and choose **HTML + CSS**. If prompted for a command, use `npm start`. The root package intentionally has no dependencies, so the UI preview does not try to install the backend stack.

## Run the API

Use Node 20+, PostgreSQL, and the API package under `apps/api`. Copy `.env.example` to `.env`, install API dependencies with `npm --prefix apps/api install`, run `npm --prefix apps/api run migrate`, then `npm --prefix apps/api start`.

Provider credentials, database, storage, OAuth, billing, email, monitoring, and deployment values are intentionally not included.
