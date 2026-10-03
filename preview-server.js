import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp'};
function resolveFile(url){const clean=decodeURIComponent((url||'/').split('?')[0]);const rel=clean==='/'?'index.html':clean.replace(/^\/+/,''),file=path.resolve(root,rel);return file===root||file.startsWith(root+path.sep)?file:null}
const server=http.createServer((req,res)=>{const file=resolveFile(req.url);if(!file||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});res.end('Not found');return}res.writeHead(200,{'content-type':mime[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});fs.createReadStream(file).pipe(res)});
const port=Number(process.env.PORT||3000);server.listen(port,'0.0.0.0',()=>console.log(`Thumbnail Intelligence preview on ${port}`));
