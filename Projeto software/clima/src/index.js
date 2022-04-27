const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname),'views');


require ('./controllers/Clima/controleClima')(app);

app.use('/public', express.static(__dirname + '/public'));

app.use(require('./clima'));


app.listen(80);
