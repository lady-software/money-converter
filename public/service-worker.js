const cacheName = 'v2';
const cacheFiles = [
 
  './'
  //'/app.js'
]

this.addEventListener('install', event => {
     
     console.log("[serviceWorker] Install")

     event.waitUntil(         
           caches.open(cacheName).then(cache => {
           	  console.log("[serviceWorker] Caching cacheFiles");
           	  return cache.addAll(cacheFiles);
           })
     	)
});

this.addEventListener('activate', event => {

   console.log("[serviceWorker] Activate")

   event.waitUntil(
          
           caches.keys().then(cacheNames =>{

           	  return Promise.all(cacheNames.map(thisCacheName => {

           	  	 if(thisCacheName !== cacheName){
           	  	 	console.log("[serviceWorker] Removing Cached Files from", thisCacheName);
           	  	 	return caches.delete(thisCacheName);
           	  	 }
           	  }))
           })
     	)
});

this.addEventListener('fetch', event => {

  console.log("[serviceWorker] Fetching", event.request.url);

  /*event.respondWith(

  		caches.match(event.request)

  		.then(response => {

  			if (response) {
  				console.log("[serviceWorker] found in cache ", event.request.url);
  				return response;
  			}

  			var requestClone = event.request.clone();

  			fetch(requestClone)
  			.then(response => {
  				if (!response) {
  					console.log("[serviceWorker] no response from fetch");
  					return response;
  				}

  				var requestClone = response.clone();

  				caches.open(cacheName).then(cache => {
  					cache.put(event.request, requestClone);
  					return response;

  				});

  			}).catch(err => {
  				console.log("[serviceWorker] Error fetching and caching", err);
  			})
  		})
)	*/		
});