var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
var config = require('./config/database.js');

mongoose.connect(config.url);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log("App listening at " + port);

require('./app/routes.js')(app);