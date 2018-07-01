var cacheName = 'v2';
var cacheFiles = [
 
  './'
  //'/app.js'
]

this.addEventListener('install', function(event) {
     
     console.log("[serviceWorker] Install")

     event.waitUntil(
          
           caches.open(cacheName).then(function(cache){

           	  console.log("[serviceWorker] Caching cacheFiles");
           	  return cache.addAll(cacheFiles);
           })
     	)
});

this.addEventListener('activate', function(event) {

   console.log("[serviceWorker] Activate")

   event.waitUntil(
          
           caches.keys().then(function(cacheNames){

           	  return Promise.all(cacheNames.map(function(thisCacheName){

           	  	 if(thisCacheName !== cacheName){

           	  	 	console.log("[serviceWorker] Removing Cached Files from", thisCacheName);
           	  	 	return caches.delete(thisCacheName);
           	  	 }
           	  }))
           })
     	)
});

this.addEventListener('fetch', function(event) {

  console.log("[serviceWorker] Fetching", event.request.url);

  /*event.respondWith(

  		caches.match(event.request)

  		.then(function(response){

  			if (response) {
  				console.log("[serviceWorker] found in cache ", event.request.url);
  				return response;
  			}

  			var requestClone = event.request.clone();

  			fetch(requestClone)
  			.then(function(response){
  				if (!response) {
  					console.log("[serviceWorker] no response from fetch");
  					return response;
  				}

  				var requestClone = response.clone();

  				caches.open(cacheName).then(function(cache){
  					cache.put(event.request, requestClone);
  					return response;

  				});

  			}).catch(function(err){
  				console.log("[serviceWorker] Error fetching and caching", err);
  			})
  		})
)	*/		
});