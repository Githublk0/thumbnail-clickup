DO $$ BEGIN
  ALTER TABLE templates ADD COLUMN IF NOT EXISTS created_by uuid REFERENCES users(id);
  ALTER TABLE templates ADD COLUMN IF NOT EXISTS description text NOT NULL DEFAULT '';
  ALTER TABLE templates ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft';
  ALTER TABLE templates ADD COLUMN IF NOT EXISTS deleted_at timestamptz;
EXCEPTION WHEN undefined_table THEN NULL; END $$;
CREATE INDEX IF NOT EXISTS templates_workspace_updated_idx ON templates(workspace_id, updated_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS ai_jobs_idempotency_idx ON ai_jobs(workspace_id, created_at DESC);
