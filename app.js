const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require('body-parser');

// urlencoded;
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/index');
//const idb = require('./public/idb');


//****************************************  Enregistre un worker




// jade views

app.set("views", "./views");
app.set('view engine', 'jade');


// to access directories we need to use

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));

app.use('/', routes);
//app.use('/', currences);

//app.use('/idb-test', idb);

app.listen(3000, () =>  console.log('Money Converter app listening on port 3000.') ); 

module.exports = app;