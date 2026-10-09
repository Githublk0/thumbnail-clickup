-- Thumbnail Intelligence rollback plan.
-- This is intentionally guarded and destructive. Never run against a live database
-- until a backup, restore test, and explicit approval have been recorded.
-- Usage: psql "$DATABASE_URL" -v ALLOW_DESTRUCTIVE_ROLLBACK=YES -f rollback.sql

\set ON_ERROR_STOP on
\if :{?ALLOW_DESTRUCTIVE_ROLLBACK}
\else
  \echo 'Refusing rollback: set ALLOW_DESTRUCTIVE_ROLLBACK=YES explicitly.'
  \quit 2
\endif
\if :ALLOW_DESTRUCTIVE_ROLLBACK = 'YES'
\else
  \echo 'Refusing rollback: ALLOW_DESTRUCTIVE_ROLLBACK must equal YES.'
  \quit 2
\endif

BEGIN;
SELECT pg_advisory_xact_lock(741923);

-- Record the operator intent before destructive work starts.
CREATE TABLE IF NOT EXISTS schema_rollback_audit (
  id bigserial PRIMARY KEY,
  executed_at timestamptz NOT NULL DEFAULT now(),
  note text NOT NULL
);
INSERT INTO schema_rollback_audit(note) VALUES ('Explicit destructive rollback requested by operator');

DROP TABLE IF EXISTS billing_events CASCADE;
DROP TABLE IF EXISTS oauth_states CASCADE;
DROP TABLE IF EXISTS connected_accounts CASCADE;
DROP TABLE IF EXISTS analytics_snapshots CASCADE;
DROP TABLE IF EXISTS experiment_variants CASCADE;
DROP TABLE IF EXISTS experiments CASCADE;
DROP TABLE IF EXISTS thumbnail_scores CASCADE;
DROP TABLE IF EXISTS ai_generations CASCADE;
DROP TABLE IF EXISTS ai_jobs CASCADE;
DROP TABLE IF EXISTS templates CASCADE;
DROP TABLE IF EXISTS brand_profiles CASCADE;
DROP TABLE IF EXISTS creator_memory CASCADE;
DROP TABLE IF EXISTS project_versions CASCADE;
DROP TABLE IF EXISTS project_assets CASCADE;
DROP TABLE IF EXISTS assets CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS entitlements CASCADE;
DROP TABLE IF EXISTS subscriptions CASCADE;
DROP TABLE IF EXISTS credit_ledger CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS audit_logs CASCADE;
DROP TABLE IF EXISTS workspace_members CASCADE;
DROP TABLE IF EXISTS workspaces CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS schema_migrations CASCADE;
DROP TABLE IF EXISTS schema_rollback_audit CASCADE;
DROP TYPE IF EXISTS subscription_status;
DROP TYPE IF EXISTS job_status;
COMMIT;
