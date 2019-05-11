const mongoose = require('../../database');

const historicoClimaSchema = new mongoose.Schema({
    temperaturaMax: {
        type: String,
        require: true,
    },
    temperaturaMaxHora:{
        type: String,
        require: true,
    },
    temperaturaMin: {
        type: String,
        require: true,
    },
    temperaturaMinHora: {
        type: String,
        require: true,
    },
    umidadeMax: {
        type: String,
        require: true,
    },
    umidadeMaxHora: {
        type: String,
        require: true,
    },
    umidadeMin:{
        type: String,
        require: true,
    },
    umidadeMinHora:{
        type: String,
        require: true,
    },
    data: {
        type: String,
        require: true,
    },
});

const historicoClima = mongoose.model('historicoClima', historicoClimaSchema);

module.exports = historicoClima;