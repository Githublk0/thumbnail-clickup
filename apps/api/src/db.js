import pg from 'pg'; import { config } from './config.js';
export const pool=new pg.Pool({connectionString:config.DATABASE_URL,max:10,ssl:config.NODE_ENV==='production'?{rejectUnauthorized:true}:false});
export async function q(text,params=[]){return pool.query(text,params)}
export async function tx(fn){const c=await pool.connect();try{await c.query('BEGIN');const out=await fn(c);await c.query('COMMIT');return out}catch(e){await c.query('ROLLBACK');throw e}finally{c.release()}}
export async function assertWorkspace(c,userId,workspaceId){const r=await c.query('SELECT w.id FROM workspaces w JOIN workspace_members m ON m.workspace_id=w.id WHERE w.id=$1 AND m.user_id=$2 AND w.deleted_at IS NULL',[workspaceId,userId]);if(!r.rowCount){const e=new Error('FORBIDDEN');e.statusCode=403;throw e}return workspaceId}
