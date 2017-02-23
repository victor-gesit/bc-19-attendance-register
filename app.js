const express= require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./controller');

app.set('view engine', 'ejs');
// Midlewaress
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
router(app);
app.listen(8082);