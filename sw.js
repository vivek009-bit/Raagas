// Raga Atlas offline cache. Bump VERSION whenever you upload a new index.html.
const VERSION="raga-atlas-v1";
const CORE=["./","./index.html","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png","./icons/icon-maskable-512.png","./icons/apple-touch-icon.png","./icons/favicon.png"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{
  const req=e.request;if(req.method!=="GET")return;
  const url=new URL(req.url);
  // pages: try the network first so updates arrive, fall back to the saved copy offline
  if(req.mode==="navigate"){
    e.respondWith(fetch(req).then(r=>{const c=r.clone();caches.open(VERSION).then(x=>x.put("./index.html",c));return r}).catch(()=>caches.match("./index.html")));
    return;
  }
  // app files and Google Fonts: serve from cache, fill the cache on first use
  if(url.origin===location.origin||/fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)){
    e.respondWith(caches.match(req).then(hit=>hit||fetch(req).then(r=>{if(r.ok||r.type==="opaque"){const c=r.clone();caches.open(VERSION).then(x=>x.put(req,c))}return r})));
  }
});
