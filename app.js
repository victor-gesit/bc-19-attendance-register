const express= require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./indexController');

app.set('view engine', 'ejs');
// Midlewaress
app.use(bodyParser());
app.use(express.static(path.join(__dirname, '/public')));

router(app);
/*
//Routes, GET
app.get('/', indexController.get);
app.get('/signin', indexController.getSignin);
app.get('/homepage', indexController.getHomepage);
app.get('/register', indexController.getRegister);
app.get('/dashboard', indexController.getDashboard);

// Routes, POST
app.post('/', indexController.post);
app.post('/signin', indexController.postSignin);
app.post('/register', indexController.postRegister);
app.post('/homepage', indexController.postHomepage);
app.post('/dashboard', indexController.postDashboard);
app.post('/search', indexController.postSearch);
*/
app.listen(8082);