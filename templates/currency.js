function convertCurrency(amount, fromCurrency, toCurrency, cb) {

    fromCurrency = encodeURIComponent(fromCurrency);
    toCurrency = encodeURIComponent(toCurrency);
    let query = fromCurrency + '_' + toCurrency;

    console.log("" + query);

    let url = 'https://free.currencyconverterapi.com/api/v5/convert?q=' + query + '&compact=ultra';

    https.get(url, response => {
        let body = '';

        response.on('data', function (chunk) {
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
            } catch (e) {
                console.log("Parse error: ", e);
                cb(e);
            }
        });
    }).on('error', e => {
        console.log("Got an error: ", e);
        cb(e);
    });
}