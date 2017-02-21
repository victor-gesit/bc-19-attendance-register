var express= require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var indexController = require('./indexController');
// Midlewares
app.use(bodyParser());

app.use(express.static(path.join(__dirname, '/public')));
//Respond to get on homepage
app.get('/', indexController.get);

app.post('/', indexController.post);
app.listen(8082);