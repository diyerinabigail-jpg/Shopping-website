const CACHE='kiraluz-v1';
self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(CACHE).then(c=>c.addAll([
            './',
            './index.html',
            './manifest.json'])));
            self.skipWaiting();
        });
        self.addEventListener('activate',e=>{
            e.waitUntil(
                caches.keys().then(k=>{
                    Promise.all(k=>k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))));
                    self.clients.claim();
        });
        self.addEventListener('fetch',e=>{
            if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
            e.respondWith(fetch(e.request).then(r=>{
                const copy=r.clone();
                caches.open(CACHE).then(c=>c.put(e.request,copy));
                return r;
            }).catch(()=>caches.match(e.request)));
        });