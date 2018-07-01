var express = require("express");
var https = require("https");
var app = express();
var bodyParser = require('body-parser');
//var navigator = require('web-midi-api');

// urlencoded;
app.use(bodyParser.urlencoded({ extended: true }));

var routes = require('./routes/index');
//var currences = require('./data/data.json');

//****************************************  Enregistre un worker




// jade views

app.set("views", "./views");
app.set('view engine', 'jade');


// Pour acceder au repetoire 

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));

app.use('/', routes);
//app.use('/', currences);


app.listen(3000, function(){

	 console.log('Money converter app listening on port 3000.')
}); 

module.exports = app;