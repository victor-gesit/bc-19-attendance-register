var express= require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var indexController = require('./indexController');
// Midlewares
app.use(bodyParser());


//Respond to get on homepage
app.get('/', indexController.get);
/*
app.get('/',  function(req,res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
});*/
app.post('/', indexController.post);
app.listen(8082);