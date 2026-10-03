(function(global){'use strict';
  const origin=global.__TI_API_ORIGIN__||'';
  class ApiError extends Error{constructor(message,code,status,detail){super(message);this.name='ApiError';this.code=code;this.status=status;this.detail=detail}}
  async function request(path,{method='GET',json,form,signal,timeout=20000,headers={}}={}){
    const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),timeout);
    try{
      const opts={method,credentials:'include',headers:{...headers},signal:signal||controller.signal};
      if(form)opts.body=form;else if(json!==undefined){opts.headers['content-type']='application/json';opts.body=JSON.stringify(json)}
      let res;try{res=await fetch(origin+path,opts)}catch(e){throw new ApiError(e.name==='AbortError'?'Request timed out':'Network unavailable','NETWORK_ERROR',0,e)}
      const text=await res.text();let data={};try{data=text?JSON.parse(text):{}}catch{data={raw:text}}
      if(!res.ok){const er=data.error||{};throw new ApiError(er.message||'Request failed',er.code||'REQUEST_FAILED',res.status,data)}
      return data;
    }finally{clearTimeout(timer)}
  }
  const api={
    request,me:()=>request('/api/me'),signup:(body)=>request('/api/auth/signup',{method:'POST',json:body}),login:(body)=>request('/api/auth/login',{method:'POST',json:body}),logout:()=>request('/api/auth/logout',{method:'POST'}),
    workspaces:()=>request('/api/workspaces'),projects:(w)=>request(`/api/workspaces/${encodeURIComponent(w)}/projects`),templates:(w)=>request(`/api/workspaces/${encodeURIComponent(w)}/templates`),assets:(w)=>request(`/api/workspaces/${encodeURIComponent(w)}/assets`),project:(id)=>request(`/api/projects/${encodeURIComponent(id)}`),createProject:(w,body)=>request(`/api/workspaces/${encodeURIComponent(w)}/projects`,{method:'POST',json:body}),updateProject:(id,body)=>request(`/api/projects/${encodeURIComponent(id)}`,{method:'PATCH',json:body}),deleteProject:(id)=>request(`/api/projects/${encodeURIComponent(id)}`,{method:'DELETE'}),createTemplate:(w,body)=>request(`/api/workspaces/${encodeURIComponent(w)}/templates`,{method:'POST',json:body}),templates:(w)=>request(`/api/workspaces/${encodeURIComponent(w)}/templates`),template:(id)=>request(`/api/templates/${encodeURIComponent(id)}`),updateTemplate:(id,body)=>request(`/api/templates/${encodeURIComponent(id)}`,{method:'PATCH',json:body}),deleteTemplate:(id)=>request(`/api/templates/${encodeURIComponent(id)}`,{method:'DELETE'}),
    uploadAsset:(w,file)=>{const form=new FormData();form.append('file',file);return request(`/api/workspaces/${encodeURIComponent(w)}/assets`,{method:'POST',form,timeout:60000})},assetUrl:(id)=>request(`/api/assets/${encodeURIComponent(id)}/url`),deleteAsset:(id)=>request(`/api/assets/${encodeURIComponent(id)}`,{method:'DELETE'}),
    score:(id)=>request(`/api/projects/${encodeURIComponent(id)}/score`,{method:'POST'}),visionScore:(id,body)=>request(`/api/projects/${encodeURIComponent(id)}/vision-score`,{method:'POST',json:body}),
    createAiJob:(w,type,input,idempotency)=>request(`/api/workspaces/${encodeURIComponent(w)}/ai/jobs`,{method:'POST',json:{type,input},headers:{'Idempotency-Key':idempotency||crypto.randomUUID()}}),job:(id)=>request(`/api/ai/jobs/${encodeURIComponent(id)}`),retryJob:(id)=>request(`/api/ai/jobs/${encodeURIComponent(id)}/retry`,{method:'POST'}),credits:(w)=>request(`/api/workspaces/${encodeURIComponent(w)}/credits`),
    youtubeStart:()=>request('/api/integrations/youtube/start'),youtubeChannel:(w)=>request(`/api/workspaces/${encodeURIComponent(w)}/youtube/channel`),youtubeDisconnect:(w)=>request(`/api/workspaces/${encodeURIComponent(w)}/youtube`,{method:'DELETE'}),billingCheckout:(w)=>request(`/api/workspaces/${encodeURIComponent(w)}/billing/checkout`,{method:'POST'}),readiness:()=>request('/api/readiness')
  };global.TI_API=api;global.TI_ApiError=ApiError;
})(window);
