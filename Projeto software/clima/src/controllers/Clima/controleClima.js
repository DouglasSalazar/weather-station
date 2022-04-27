const express = require ('express');

const leituraClima = require('../../models/Clima/leituraClima');
const historicoClima = require('../../models/Clima/historicoClima');

const router = express.Router();

function isEmptyObject(obj){
    for(undefined in obj){
      return false;
    }
    return true;
}


router.post('/cadastroClima', async(req, res)=>{
    try{
        
        const leituraclima = JSON.parse(req.body.name); 
        var data = new Date().toLocaleString('pt-BR', { timeZone: 'America/Campo_Grande' });
        
        leituraclima.data=data;
        aux=leituraclima.data.toString().split(' ');
        aux1=aux[0].split('-');
  //      dataAux = data.getDay().toString() + '-' + (data.getMonth()+1).toString() + '-' + data.getFullYear().toString(); 
        dataAux = aux1[2]+ '-' + aux1[1]+ '-'+aux1[0];
//        horaAux = data.getHours().toString() + ':' + data.getMinutes().toString() + ':' + data.getSeconds().toString();
        horaAux = aux[1];
        
        await leituraClima.create(leituraclima);
        const historicoclima = await historicoClima.find({data: dataAux});
        if(isEmptyObject(historicoclima)==true){ 
            var text = "{"
                +'"temperaturaMax" :' + '"'+leituraclima["temperatura"]+'"'+","
                +'"temperaturaMaxHora" :'+ '"'+horaAux+'"' + ","
                +'"temperaturaMin" :' + '"'+leituraclima["temperatura"]+'"'+","
                +'"temperaturaMinHora" :' + '"'+horaAux+'"'+","
                +'"umidadeMax" :' +'"'+leituraclima["umidade"]+'"'+","
                +'"umidadeMaxHora" :' +'"'+horaAux+'"'+","
                +'"umidadeMin" :' +'"'+leituraclima["umidade"]+'"'+","
                +'"umidadeMinHora" :' +'"'+horaAux+'"'+","
                +'"data" :' +'"'+dataAux+'"'+
            "}";
            var historico=JSON.parse(text);           
            await historicoClima.create(historico);
        }else{
            var text = "{";
            var aux = 0;
            if(historicoclima[0]["temperaturaMax"] < leituraclima["temperatura"]){
                aux=1;
                text = text +'"temperaturaMax" :' + '"'+leituraclima["temperatura"]+'"' + "," 
                +'"temperaturaMaxHora" :'+ '"'+horaAux+'"';
            }                    
            if(historicoclima[0]["temperaturaMin"] > leituraclima["temperatura"]){
                if(aux==1){
                    text = text +",";
                }
                aux=1;
                text = text + '"temperaturaMin" :' + '"'+leituraclima["temperatura"]+'"' + "," 
                +'"temperaturaMinHora" :'+ '"'+horaAux+'"';
            }
            if(historicoclima[0]["umidadeMax"] < leituraclima["umidade"]){
                if(aux==1){
                    text = text +",";
                }
                aux=1;
                text = text + '"umidadeMax" :' + '"'+leituraclima["umidade"]+'"' + "," 
                +'"umidadeMaxHora" :'+ '"'+horaAux+'"';
            }
            if(historicoclima[0]["umidadeMin"] > leituraclima["umidade"]){                
                if(aux==1){
                    text = text +",";
                }
                aux=1;
                text = text + '"umidadeMin" :' + '"'+leituraclima["umidade"]+'"' + "," 
                +'"umidadeMinHora" :'+ '"'+horaAux+'"';
            }
            if(text!="{"){
                text=text+ "}";

                var historico=JSON.parse(text);        
                await historicoClima.updateOne({_id : historicoclima[0]["_id"]}, historico ,function(err, result){ 
                    if(err) { throw err; }          
                });
            }
        }
        return res.send(req.body.name);
        //        return res.send({leituraClima});
    }catch (err){
        return res.status(400).send({error: 'Erro ao cadastrar o clima'})

    }
});

router.get('/consultaClima', async(req, res)=>{
    try{
        data = new Date();
        dataAux = data.getDate().toString() + '-' + (data.getMonth()+1).toString() + '-' + data.getFullYear().toString(); 

        const historicoclima = await historicoClima.find({data: dataAux});
       
        const leituraclima = await leituraClima.find({}).sort({"_id":-1}).limit(1);
        var hora= leituraclima[0].data.getHours() + ':' + leituraclima[0].data.getMinutes() + ':' +leituraclima[0].data.getSeconds(); 
        var hora1=leituraclima[0].data.getHours().toString();
        return res.send({historicoclima,leituraclima,hora,hora1});
        
    }catch (err){
        return res.status(400).send({error: 'Erro ao buscar Registro'})
    }
});


router.post('/consultaHistoricos', async(req, res)=>{
    try{
        var dataini = req.body.ini.split('-');
        var datafim = req.body.fim.split('-');
        var ini = dataini[2] + "/" + dataini[1]+ "/"+dataini[0];
        var fim = datafim[2] + "/" + datafim[1]+ "/"+datafim[0];
        var ini1 = dataini[0] + "-" + dataini[1]+ "-"+dataini[2];
        var fim1 = datafim[0] + "-" + datafim[1]+ "-"+datafim[2];
        const historicos = await leituraClima.find({"data":{"$gt":new Date(dataini[0],dataini[1]-1,dataini[2],00,00,00,00),"$lt":new Date(datafim[0],datafim[1]-1,datafim[2],23,59,59,00)}}); 
        var historicoData=[];
        for(i=0;i<historicos.length;i++){
            historicoData[i]= historicos[i].data.getDate().toString() + '-' + (historicos[i].data.getMonth()+1).toString() +'-'+ historicos[i].data.getFullYear().toString() + ' ' + historicos[i].data.getHours().toString() + ':' + historicos[i].data.getMinutes().toString() + ':' + historicos[i].data.getSeconds().toString(); 
        }        
        return res.send({historicos,historicoData,ini,fim,ini1,fim1}); 

    }catch (err){
        return res.status(400).send({error: 'Erro ao buscar Registro'})
    }
});

module.exports = app => app.use('/auth', router);