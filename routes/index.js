const express = require("express");
const https = require("https");
const router = express.Router();

const currencies = require("../data/data.json");

//const url = 'https://free.currencyconverterapi.com/api/v5/currencies';


function convertCurrency(amount, fromCurrency, toCurrency,cb) {

		  fromCurrency = encodeURIComponent(fromCurrency);
		  toCurrency = encodeURIComponent(toCurrency);
		  let query = fromCurrency + '_' + toCurrency;

		  console.log("" +query);

		  let url = 'https://free.currencyconverterapi.com/api/v5/convert?q='+query+'&compact=ultra';

		  https.get(url, response => {
		      let body = '';

		      response.on('data', function(chunk){
		          body += chunk;
		      });

		      response.on('end', () => {
		          try {

		            let jsonObj = JSON.parse(body);

		            //var jsonObj1 = JSON.stringify(jsonObj);

		            //console.log("", jsonObj);

		            let val = jsonObj[query];

		            console.log("Valeur ", val);


		            if (val) {
		              let total = val * amount;
		              cb(null, Math.round(total * 100) / 100);

		              console.log("Total ", parseFloat(val * amount));
		              
		            } else {
		              let err = new Error("Value not found for " + query);
		              console.log(err);
		              cb(err);
		            }
		          } catch(e) {
		            console.log("Parse error: ", e);
		            cb(e);
		          }
		      });
		  }).on('error', e => {
		        console.log("Got an error: ", e);
		        cb(e);
		  });
}



router.get('/', (req,res, next) => {
	res.render("index",{

		      title: "Money Converter",
		      body:currencies,

    });
	
});



router.post('/result', (req, res, next) => {

	let amounts= req.body.amounts;
	let fromCurrency = req.body.fromCurrency;
	let toCurrency = req.body.toCurrency;

	convertCurrency(amounts, fromCurrency, toCurrency, (err, amount) => {

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