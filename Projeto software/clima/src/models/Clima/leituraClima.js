const mongoose = require('../../database');

const leituraClimaSchema = new mongoose.Schema({
    ID: {
        type: String,
        require: true,
    },
    temperatura: {
        type: String,
        require: true,
    },
    umidade: {
        type: String,
        require: true,
    },
    umidadeSolo: {
        type: String,
        require: true,
    },
    pressaoReal: {
        type: String,
        require: true,
    },
    pressao:{
        type: String,
        require: true,
    },
    sensacaoTermica: {
        type: String,
        require: true,
    },
    sensacao: {
        type: String,
        required: true,
    },
    chuva: {
        type: String,
        required: true,
    },
    altitude: {
        type: String,
        require: true,
    },
    altitudeMar: {
        type: String,
        require: true,
    },
    latitude: { 
        type: String,
        require: true,
    },
    longitude: {
        type: String,
        require: true,
    },
    data: {
        type: Date,
        require: true,    
    },

});

const leituraClima = mongoose.model('leituraClima', leituraClimaSchema);

module.exports = leituraClima;