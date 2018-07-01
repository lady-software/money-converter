var express = require("express");
var https = require("https");
var router = express.Router();

//var navigator = require('web-midi-api');
var currences = require("../data/data.json");

var url = 'https://free.currencyconverterapi.com/api/v5/currencies';


function convertCurrency(amount, fromCurrency, toCurrency,cb) {

		  fromCurrency = encodeURIComponent(fromCurrency);
		  toCurrency = encodeURIComponent(toCurrency);
		  var query = fromCurrency + '_' + toCurrency;

		  console.log("" +query);

		  var url = 'https://free.currencyconverterapi.com/api/v5/convert?q='+query+'&compact=ultra';

		  https.get(url, function(response){
		      var body = '';

		      response.on('data', function(chunk){
		          body += chunk;
		      });

		      response.on('end', function(){
		          try {

		            var jsonObj = JSON.parse(body);

		            //var jsonObj1 = JSON.stringify(jsonObj);

		            //console.log("", jsonObj);

		            var val = jsonObj[query];

		            console.log("Valeur ", val);


		            if (val) {
		              var total = val * amount;
		              cb(null, Math.round(total * 100) / 100);

		              console.log("Total ", parseFloat(val * amount));
		              
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



router.get('/',function(req,res, next){

	/*return https.get(url, function(response){

		var body ='';

		response.on('data', function (chunk){

			body += chunk;
		});
		response.on('end', function() {

			var fbbody = JSON.parse(body);

			console.log("Got an error: ", fbbody);

			res.render("index",{

		      title: "Currency Convert",
		      body:JSON.stringify(fbbody)

		  });

		});

	}).on('error', function(e){

		console.log("Got an error: ", e);
	});*/

	res.render("index",{

		      title: "Currency Convert",
		      body:currences,
		      

		  });
	
});



router.post('/result', function(req, res, next){

	var amounts= req.body.amounts;
	var fromCurrency = req.body.fromCurrency;
	var toCurrency = req.body.toCurrency;

	convertCurrency(amounts, fromCurrency, toCurrency, function(err, amount) {

       console.log("Montant ", amount);

       res.render("result",{
              rs: amount,
		      am: amounts,
		      from: fromCurrency,
		      to: toCurrency,
		      
		  });
      });	

	


	//res.send(amount + ' ' + fromCurrency + ' ' + toCurrency + '' + convert)

      
});

module.exports = router;