function convertCurrency(amount, fromCurrency, toCurrency, cb) {

		  fromCurrency = encodeURIComponent(fromCurrency);
		  toCurrency = encodeURIComponent(toCurrency);
		  var query = fromCurrency + '_' + toCurrency;

		  var url = 'https://www.free.currencyconverterapi.com/api/v5/convert?q='
		            + query + '&compact=ultra';

		  https.get(url, function(response){
		      var body = '';

		      response.on('data', function(chunk){
		          body += chunk;
		      });

		      response.on('end', function(){
		          try {
		            var jsonObj = JSON.parse(body);

		            var val = jsonObj[query];
		            if (val) {
		              var total = val * amount;
		              cb(null, Math.round(total * 100) / 100);

		              console.log("Resultat" , cb);

		              
		            } else {
		              var err = new Error("Value not found for " + query);
		              console.log(err);
		              cb(err);
		            }
		          } catch(e) {
		            console.log("Parse error: ", e);
		            cb(e);
		          }
		      });
		  }).on('error', function(e){
		        console.log("Got an error: ", e);
		        cb(e);
		  });
		}