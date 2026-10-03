import fs from 'node:fs/promises';
import {pool} from './db.js';

const files = ['001_init.sql', '002_production.sql', '003_p1_hardening.sql'];
const client = await pool.connect();
try {
  await client.query('BEGIN');
  await client.query('SELECT pg_advisory_xact_lock(741923)');
  await client.query('CREATE TABLE IF NOT EXISTS schema_migrations (version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())');
  for (const file of files) {
    const exists = await client.query('SELECT 1 FROM schema_migrations WHERE version=$1', [file]);
    if (exists.rowCount) continue;
    await client.query(await fs.readFile(new URL(`../migrations/${file}`, import.meta.url), 'utf8'));
    await client.query('INSERT INTO schema_migrations(version) VALUES($1)', [file]);
    console.log(`migrated ${file}`);
  }
  await client.query('COMMIT');
} catch (error) {
  await client.query('ROLLBACK');
  throw error;
} finally {
  client.release();
  await pool.end();
}
