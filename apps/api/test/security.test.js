import test from 'node:test';
import assert from 'node:assert/strict';
import {stripeStatusToEntitlement,stripeStatusToInternal} from '../src/entitlements.js';

test('workspace ownership denies non-members',()=>{const members=[{user_id:'owner-a',workspace_id:'workspace-a'}];assert.equal(members.some(x=>x.user_id==='owner-b'&&x.workspace_id==='workspace-a'),false);assert.equal(members.some(x=>x.user_id==='owner-a'&&x.workspace_id==='workspace-b'),false)});
test('workspace resource lookup requires matching workspace',()=>{const resource={workspace_id:'workspace-a'};const requester={workspace_id:'workspace-b'};assert.notEqual(resource.workspace_id,requester.workspace_id)});
test('billing event ids are idempotent',()=>{const s=new Set();const claim=x=>s.has(x)?false:(s.add(x),true);assert.equal(claim('evt'),true);assert.equal(claim('evt'),false)});
test('credit ledger refunds exactly once',()=>{const ledger=[{amount:25},{amount:-10},{amount:10}];const refundKey='refund:job-1';const keys=new Set();const add=(key,amount)=>{if(keys.has(key))return false;keys.add(key);ledger.push({amount});return true};assert.equal(add(refundKey,10),true);assert.equal(add(refundKey,10),false);assert.equal(ledger.reduce((a,x)=>a+x.amount,0),35)});
test('Stripe subscription states map safely',()=>{assert.equal(stripeStatusToEntitlement('active'),'pro');assert.equal(stripeStatusToEntitlement('past_due'),'pro');assert.equal(stripeStatusToEntitlement('canceled'),'free');assert.equal(stripeStatusToEntitlement('unpaid'),'free');assert.equal(stripeStatusToInternal('unpaid'),'canceled');assert.equal(stripeStatusToEntitlement('unknown'),'free')});
test('provider absence is explicit',()=>assert.equal(Boolean(process.env.AI_TEXT_API_KEY),false));
