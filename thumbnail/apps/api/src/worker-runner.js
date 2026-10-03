import {q} from './db.js';import {processAIJob} from './worker.js';
setInterval(async()=>{const r=await q("SELECT id FROM ai_jobs WHERE status='queued' ORDER BY created_at LIMIT 5");for(const row of r.rows)await processAIJob(row.id).catch(()=>{})},1000);
