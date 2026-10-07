ALTER TABLE ai_jobs ADD COLUMN IF NOT EXISTS idempotency_key text;
CREATE UNIQUE INDEX IF NOT EXISTS ai_jobs_workspace_idempotency_idx ON ai_jobs(workspace_id,idempotency_key) WHERE idempotency_key IS NOT NULL;
