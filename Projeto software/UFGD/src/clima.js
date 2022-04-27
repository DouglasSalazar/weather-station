var express = require('express');

var router = express.Router();
const http = require('http');
const request = require('request');


router.get('/Clima', function(req,res){

    http.get("http://localhost:3000/auth/consultaClima", (resp) => {
        let dados = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          dados += chunk;
        });
      
        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            dados = JSON.parse(dados);
            

          res.render('views/Clima/index',{ dados: dados});
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
})

router.get('/historicoClima', function(req,res){
  var data=new Date();
  dataAux = data.getFullYear().toString() + '-' + (data.getMonth()+1).toString() + '-' + data.getDate().toString() ; 

  var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
  }

  var options = {
    url: 'http://localhost:3000/auth/consultaHistoricos',
    method: 'POST',
    headers: headers,
    form: {'ini': dataAux, 'fim': dataAux}
  }

  request(options, function (err, resp, body){
    let dados = resp.body;
          dados = JSON.parse(dados);
          
          
      
        res.render('views/Clima/historico',{ dados: dados});
      });
})

router.post('/historicoClima', function(req,res){
  var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
  }

  var options = {
    url: 'http://localhost:3000/auth/consultaHistoricos',
    method: 'POST',
    headers: headers,
    form: {'ini': req.body.ini, 'fim': req.body.fim}
  }

  request(options, function (err, resp, body){
    let dados = resp.body;
          dados = JSON.parse(dados);
          
          
      
        res.render('views/Clima/historico',{ dados: dados});
      });
})

module.exports = router;