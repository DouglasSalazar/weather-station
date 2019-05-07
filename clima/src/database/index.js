const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/estacao',{ useNewUrlParser: true });

mongoose.Promise = global.Promise;


module.exports = mongoose;

