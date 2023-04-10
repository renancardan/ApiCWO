const functions = require("firebase-functions");
const app = require("express")();
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
var axios = require("axios");
const cors = require('cors')({origin: true});



app.post("/Msgpizzacia", async  function (request, response){
    cors(request, response, async () => {
    var EMPRESA = request.body.Id
    //var URL_WHATS = "https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";
    
//Guardando Mensagens Que Chegou    
var Mensagem = request.body.Msg;
var NomeWhats = "";

    await db.collection("MensagensRobo").add({
        body: Mensagem,
        name: "Chegou Mensagem",
     
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });


   
   

 
      

   

    var resposta = {};
    if(Mensagem.body !== 'ATIVAR FUNIL BASICO'){
        var TelefonCli = Mensagem.from.replace("@c.us", "")
        console.log(TelefonCli)
            await db.collection("ClienteEmpre")
            .where("Empresa", "array-contains", EMPRESA)
            .where("Telefone", "==", TelefonCli)
            .get().then(async (querySnapshot1) => {
    
          //O Cliente já está cadastrado 
              if(querySnapshot1.size  !== 0){
                
           // Aqui vai pegar os dados da Empresas, Mensgens, e o Tempo Maximo de Chat
    
                var MsgEmp = {} 
                var TempChat
                await db.collection("EmrpesaSite")
                .doc(EMPRESA)
                .get().then(async(doc) => {
                    MsgEmp = doc.data().MsgAuto;
                    TempChat = doc.data().TempoChat;
                });
           
        
            
        
        
           //Pegando o Nome e o Id Do Cliente
             var NomeCli = "";
             var IdCli ="";
             await querySnapshot1.forEach((doc1) => {
                 NomeCli =  doc1.data().Nome;
                 IdCli = doc1.id;
                })
          
        
            //Montando o horario limite de chat
            var Horario = new Date().getTime() - (TempChat*3600000);
            console.log(Horario)
        
            //Aqui vamos ver se existe algum chat ja iniciado, pega o id e a fase de mensagem
              var IdChat = "";
              var FaMsg = "";
              var MemoriaSessao = [];
              var MemoriaPedido = {};
              var MemoriaProduto = [];
              var MemoriaSubSessao = [];
              var EstaNaRegra = true;
              var Robo = true;
              var PedidoCri ="";
              var SessaoEsta = "";
              var MemoriaSabores = 0;
              var SaboresEsco = 0;
              await db.collection("ChatCliente")
                .where("Empresa", "==", EMPRESA)
                .where("Id", "==", IdCli)
                .where("Ativo", "==", true)
                .where("DataInicio", ">=", Horario)
                .get().then(async (querySnapshot2) => {

                    //Se Existe Um Chat Em Anadamento Entra Aqui 
                    if(querySnapshot2.size  !== 0){


                console.log("Existe um Chat")
                    await querySnapshot2.forEach((doc2) => {
                        IdChat = doc2.id;
                        FaMsg =doc2.data().FaseMsg;
                        EstaNaRegra = doc2.data().DigiteNaRegra;
                        MemoriaSessao = doc2.data().MemSessao;
                        MemoriaPedido = doc2.data().MemPedido;
                        MemoriaProduto = doc2.data().MemProdutos?doc2.data().MemProdutos:[]; 
                        MemoriaSubSessao = doc2.data().MemSubSessao?doc2.data().MemSubSessao:[]; 
                        Robo = doc2.data().Robotizado;
                        PedidoCri = doc2.data().Pedido;
                        SessaoEsta = doc2.data().Sessao?doc2.data().Sessao:""; 
                        MemoriaSabores = doc2.data().MenSabor?doc2.data().MenSabor:0;
                       SaboresEsco = doc2.data().EscolhaSabor?doc2.data().EscolhaSabor:0;                        
                       })
    
                    // Existe  um Chat que foi enviado a Mensagem de Apresentação de Pedido de Nome
                       if(FaMsg === "Msg1B" ){// Recebendo o Nome do Cliente, Perguntando O que deseja realizar
                      
                       //montar a mensagem   
                        var QMsg= MsgEmp.Msg2A.Msg.length;
                        var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                        var Result =parseInt(Sorteio);
                        var Num = Result-1;
                        var AutoMsg = MsgEmp.Msg2A.Msg[Num];
                        var TempMsg =  MsgEmp.Msg2A.TempoSeg;
    
                        console.log(MsgEmp.Msg2A.Msg)
                        console.log("Qmsg: "+QMsg)       
                        console.log("Soteio: "+Sorteio)                 
                        console.log("Msg: "+AutoMsg)
    
    
                        var QMsg2= MsgEmp.Msg3A.Msg.length;
                        var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                        var Result2 =parseInt(Sorteio2);
                        var Num2 = Result2-1;
                        var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                        var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
    
                        console.log(MsgEmp.Msg3A.Msg)
                        console.log("Qmsg: "+QMsg2)       
                        console.log("Soteio: "+Sorteio2)                 
                        console.log("Msg: "+AutoMsg2)
    
                          //mensagens de estimulo para continuar o atendimento
                          var QMsg3= MsgEmp.Msg17A.Msg.length;
                          var QMsg4= MsgEmp.Msg17B.Msg.length;
                          var QMsg5= MsgEmp.Msg17C.Msg.length;
                          var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                          var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                          var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
              
                          var Result3 =parseInt(Sorteio3);
                          var Result4 =parseInt(Sorteio4);
                          var Result5 =parseInt(Sorteio5);
              
                          var Num3 = Result3-1;
                          var Num4 = Result4-1;
                          var Num5 = Result5-1;
                          var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                          var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                          var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                          var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                          var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                          var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
    
    
                         //Aqui vou ta salvando  o Nome do Cliente
                         await db.collection("ClienteEmpre")
                         .doc(IdCli)
                         .update({
                         Nome: Mensagem.body,
                         })
                         .then(async() => {
                  
                         }) 
        
                         //Mudando a Fase do Chat
                         await db.collection("ChatCliente")
                         .doc(IdChat)
                         .update({
                         FaseMsg: "Msg3A",
                         MsgFutura1:{
                            Ativo:true,
                            Msg:AutoMsg3,
                            Tempo:Tempo3,
                        },
                        MsgFutura2:{
                            Ativo:true,
                            Msg:AutoMsg4,
                            Tempo:Tempo4,
                        },
                        MsgFutura3:{
                            Ativo:true,
                            Msg:AutoMsg5,
                            Tempo:Tempo5,
                        },
                         UltimaMsg:{
                            Autor:EMPRESA,
                            body:`${Mensagem.body}${AutoMsg2}`,
                            date:new Date().getTime()+5000,
                            Type:"butao"
                        },
                         Mensagem:admin.firestore.FieldValue.arrayUnion({
                            Autor:IdCli,
                            body:Mensagem.body,
                            date:new Date().getTime(),
                            Type:"text"
                        },
                        {
                            Autor:EMPRESA,
                            body:`${Mensagem.body}${AutoMsg}`,
                            date:new Date().getTime()+5000,
                            Type:"text"
                        },
                        {
                            Autor:EMPRESA,
                            body:`${Mensagem.body}${AutoMsg2}`,
                            Botao:MsgEmp.Msg3A.Botao,
                            date:new Date().getTime()+10000,
                            Type:"butao"
                        }
                       
                        )
                         })
                         .then(async() => {
                            var MsgButon =`${Mensagem.body}${AutoMsg2}`
                             //Aqui vou está enviando uma mensagem
                            console.log(TempMsg)
                            console.log(TempMsg2)
                            response.json({ Inf:[{Msg:`${Mensagem.body}${AutoMsg}`, Tempo: TempMsg, Type:"text"}, {Msg: `*${MsgButon}*` , Botao:MsgEmp.Msg3A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                           
                         }) 
              

                     
                        
                        } else if(FaMsg === "Msg3A" ){//Recebendo o que Deseja realizar, Perguntando Qual Sessão
                              var NumIni = parseInt(Mensagem.body)
                            // Mensagem  que escolheu fazer o pedido
                            if(Mensagem.body === "1" || Mensagem.body === " 1" || Mensagem.body === "1 " || Mensagem.body === " 1 "){

                                var Menus = [{id:"0", body:"Voltar Para o Início"}]
                                await db.collection("MenusSite")
                                .where("Empresa", "==", EMPRESA)
                                .where("Ativo", "==", true)
                                .where("MemFim", "==", false)
                                .get().then(async (querySnapshot23) => {
                                    await querySnapshot23.forEach((doc23) => {

                                        Menus.push({
                                            id:doc23.id,
                                            body:doc23.data().nome,
                                            GrupTamanho:doc23.data().GrupTamanho,
                                            MemFim:doc23.data().MemFim,
                                            Tamanho:doc23.data().Tamanho,
                                        })
                                     
                                       })

                                });


                                  //montar a mensagem   
                             var QMsg= MsgEmp.Msg4A.Msg.length;
                             var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                             var Result =parseInt(Sorteio);
                             var Num = Result-1;
                             var AutoMsg = MsgEmp.Msg4A.Msg[Num];
                             var TempMsg =  MsgEmp.Msg4A.TempoSeg;
         
                            //  console.log(MsgEmp.Msg2A.Msg)
                            //  console.log("Qmsg: "+QMsg)       
                            //  console.log("Soteio: "+Sorteio)                 
                            //  console.log("Msg: "+AutoMsg)
         

                           //Mensagem parabenizando que ele acertou a digitação 
                             var QMsg2= MsgEmp.Msg16B.Msg.length;
                             var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                             var Result2 =parseInt(Sorteio2);
                             var Num2 = Result2-1;
                             var AutoMsg2 = MsgEmp.Msg16B.Msg[Num2];
                             var TempMsg2 =  MsgEmp.Msg16B.TempoSeg;
                            
                              //mensagens de estimulo para continuar o atendimento
                              var QMsg3= MsgEmp.Msg17A.Msg.length;
                              var QMsg4= MsgEmp.Msg17B.Msg.length;
                              var QMsg5= MsgEmp.Msg17C.Msg.length;
                              var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                              var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                              var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                  
                              var Result3 =parseInt(Sorteio3);
                              var Result4 =parseInt(Sorteio4);
                              var Result5 =parseInt(Sorteio5);
                  
                              var Num3 = Result3-1;
                              var Num4 = Result4-1;
                              var Num5 = Result5-1;
                              var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                              var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                              var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                              var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                              var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                              var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();

                            var  Letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Z"];
                            var SortLet = Math.floor(Math.random() * (Letras.length - 1 + 1)) + 1;
                            var NumAr=SortLet-1
                            await db.collection("MesaItem").add({
                                Ativo:true,
                                Cliente:IdCli,
                                Empresa:EMPRESA,
                                Codigo: Letras[NumAr]+new Date().getTime(),
                                Mesa:"Externo",
                                Itens:[],
                                ValorTotaL:0,
                                ValorEntrega:0,
                                ComissaaEntrega:0,
                                dataCriacao:new Date().getTime(),
                                Fechado:false,
                                IniciandoProducao:false,
                                IniciandoEntrega:false,
                                ConcluidoEntregado:false,
                                ConcluidoProducao:false,
                                ConfirmacaoPedido:false,
                            
                                }).then(async (dif) => {
                                    // Aqui ta entrando pos não esta no modo rocbo e ele não digitou errado
                                    if(Robo === true && EstaNaRegra === true){
                             await db.collection("ChatCliente")
                              .doc(IdChat)
                              .update({
                              FaseMsg: "Msg4A",
                              MsgFutura1:{
                                Ativo:true,
                                Msg:AutoMsg3,
                                Tempo:Tempo3,
                            },
                            MsgFutura2:{
                                Ativo:true,
                                Msg:AutoMsg4,
                                Tempo:Tempo4,
                            },
                            MsgFutura3:{
                                Ativo:true,
                                Msg:AutoMsg5,
                                Tempo:Tempo5,
                            },
                              Pedido:dif.id,
                              MemSessao:Menus,
                              Reclamaçoes:null,
                              Localização:null,
                              DigiteNaRegra:true,
                              Robotizado:true, 
                              UltimaMsg:{
                                 Autor:EMPRESA,
                                 body:`${NomeCli}${AutoMsg}`,
                                 date:new Date().getTime()+5000,
                                 Type:"butao"
                             },
                              Mensagem:admin.firestore.FieldValue.arrayUnion({
                                 Autor:IdCli,
                                 body:Mensagem.body,
                                 date:new Date().getTime(),
                                 Type:"text"
                             },
                             {
                                 Autor:EMPRESA,
                                 body:`${NomeCli}${AutoMsg}`,
                                 Botao:Menus,
                                 date:new Date().getTime()+5000,
                                 Type:"Botao"
                             },
                             
                             
                             )
                              })
                              .then(async() => {
                                 var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                 //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                 console.log(TempMsg)
                                 response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                       
                              }) 
                                //aqui vai entrar por que ele ele digitou errado e não está mais no modo robo 
                                }else {
                                    await db.collection("ChatCliente")
                                    .doc(IdChat)
                                    .update({
                                    FaseMsg: "Msg4A",
                                    MsgFutura1:{
                                        Ativo:true,
                                        Msg:AutoMsg3,
                                        Tempo:Tempo3,
                                    },
                                    MsgFutura2:{
                                        Ativo:true,
                                        Msg:AutoMsg4,
                                        Tempo:Tempo4,
                                    },
                                    MsgFutura3:{
                                        Ativo:true,
                                        Msg:AutoMsg5,
                                        Tempo:Tempo5,
                                    },
                                    Pedido:dif.id,
                                    MemSessao:Menus,
                                    Reclamaçoes:null,
                                    Localização:null,
                                    DigiteNaRegra:true,
                                    Robotizado:true, 
                                    UltimaMsg:{
                                       Autor:EMPRESA,
                                       body:`${NomeCli}${AutoMsg}`,
                                       date:new Date().getTime()+5000,
                                       Type:"butao"
                                   },
                                    Mensagem:admin.firestore.FieldValue.arrayUnion({
                                       Autor:IdCli,
                                       body:Mensagem.body,
                                       date:new Date().getTime(),
                                       Type:"text"
                                   },
                                   {
                                    Autor:EMPRESA,
                                    body:`${NomeCli}${AutoMsg2}`,
                                    date:new Date().getTime()+2000,
                                    Type:"text"
                                },
                                   {
                                       Autor:EMPRESA,
                                       body:`${NomeCli}${AutoMsg}`,
                                       Botao:Menus,
                                       date:new Date().getTime()+5000,
                                       Type:"Botao"
                                   },
                                   
                                   
                                   )
                                    })
                                    .then(async() => {
                                       var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                       //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                       console.log(TempMsg)
                
                                       response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg2}`, Tempo: TempMsg2, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                    }) 

                                }
                              //Mudando a Fase do Chat
                              
                              
                              
                                
                                   
                                })
             
                            
                   


                            } else if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){
                              // Cliente clicou em voltar 
                                //montar a mensagem   
                                 var QMsg= MsgEmp.Msg2A.Msg.length;
                                 var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                 var Result =parseInt(Sorteio);
                                 var Num = Result-1;
                                 var AutoMsg = MsgEmp.Msg2A.Msg[Num];
                                 var TempMsg =  MsgEmp.Msg2A.TempoSeg;
             
                                 console.log(MsgEmp.Msg2A.Msg)
                                 console.log("Qmsg: "+QMsg)       
                                 console.log("Soteio: "+Sorteio)                 
                                 console.log("Msg: "+AutoMsg)
             
             
                                 var QMsg2= MsgEmp.Msg3A.Msg.length;
                                 var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                 var Result2 =parseInt(Sorteio2);
                                 var Num2 = Result2-1;
                                 var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                                 var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
             
                                 console.log(MsgEmp.Msg3A.Msg)
                                 console.log("Qmsg: "+QMsg2)       
                                 console.log("Soteio: "+Sorteio2)                 
                                 console.log("Msg: "+AutoMsg2)

                                  //Mensagem parabenizando que ele acertou a digitação 
                             var QMsg9= MsgEmp.Msg16B.Msg.length;
                             var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                             var Result9 =parseInt(Sorteio9);
                             var Num9 = Result9-1;
                             var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                             var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
             
                                //mensagens de estimulo para continuar o atendimento
                                var QMsg3= MsgEmp.Msg17A.Msg.length;
                                var QMsg4= MsgEmp.Msg17B.Msg.length;
                                var QMsg5= MsgEmp.Msg17C.Msg.length;
                                var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                    
                                var Result3 =parseInt(Sorteio3);
                                var Result4 =parseInt(Sorteio4);
                                var Result5 =parseInt(Sorteio5);
                    
                                var Num3 = Result3-1;
                                var Num4 = Result4-1;
                                var Num5 = Result5-1;
                                var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
             
             
                                  //Aqui vou ta salvando  o Nome do Cliente
                               
                                  if(Robo === true && EstaNaRegra === true){
                 
                                  //Mudando a Fase do Chat
                                  await db.collection("ChatCliente")
                                  .doc(IdChat)
                                  .update({
                                  FaseMsg: "Msg3A",
                                  DigiteNaRegra:true,
                                  Robotizado:true, 
                                  MsgFutura1:{
                                    Ativo:true,
                                    Msg:AutoMsg3,
                                    Tempo:Tempo3,
                                },
                                MsgFutura2:{
                                    Ativo:true,
                                    Msg:AutoMsg4,
                                    Tempo:Tempo4,
                                },
                                MsgFutura3:{
                                    Ativo:true,
                                    Msg:AutoMsg5,
                                    Tempo:Tempo5,
                                },
                                  UltimaMsg:{
                                     Autor:EMPRESA,
                                     body:`${NomeCli}${AutoMsg2}`,
                                     date:new Date().getTime()+5000,
                                     Type:"butao"
                                 },
                                  Mensagem:admin.firestore.FieldValue.arrayUnion({
                                     Autor:IdCli,
                                     body:Mensagem.body,
                                     date:new Date().getTime(),
                                     Type:"text"
                                 },
                                 {
                                     Autor:EMPRESA,
                                     body:`${NomeCli}${AutoMsg}`,
                                     date:new Date().getTime()+5000,
                                     Type:"text"
                                 },
                                 {
                                     Autor:EMPRESA,
                                     body:`${NomeCli}${AutoMsg2}`,
                                     Botao:MsgEmp.Msg3A.Botao,
                                     date:new Date().getTime()+10000,
                                     Type:"butao"
                                 }
                                
                                 )
                                  })
                                  .then(async() => {
                                     var MsgButon =`${NomeCli}${AutoMsg2}`
                                     
                                     console.log(TempMsg)
                                     console.log(TempMsg2)
                                     response.json({ Inf:[{Msg: `*${MsgButon}*` , Botao:MsgEmp.Msg3A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                    
                                  }) 

                                } else {

                                    await db.collection("ChatCliente")
                                    .doc(IdChat)
                                    .update({
                                    FaseMsg: "Msg3A",
                                    DigiteNaRegra:true,
                                    Robotizado:true, 
                                    MsgFutura1:{
                                      Ativo:true,
                                      Msg:AutoMsg3,
                                      Tempo:Tempo3,
                                  },
                                  MsgFutura2:{
                                      Ativo:true,
                                      Msg:AutoMsg4,
                                      Tempo:Tempo4,
                                  },
                                  MsgFutura3:{
                                      Ativo:true,
                                      Msg:AutoMsg5,
                                      Tempo:Tempo5,
                                  },
                                    UltimaMsg:{
                                       Autor:EMPRESA,
                                       body:`${NomeCli}${AutoMsg2}`,
                                       date:new Date().getTime()+5000,
                                       Type:"butao"
                                   },
                                    Mensagem:admin.firestore.FieldValue.arrayUnion({
                                       Autor:IdCli,
                                       body:Mensagem.body,
                                       date:new Date().getTime(),
                                       Type:"text"
                                   },
                                   {
                                    Autor:EMPRESA,
                                    body:`${NomeCli}${AutoMsg9}`,
                                    date:new Date().getTime()+2000,
                                    Type:"text"
                                },
                                   {
                                       Autor:EMPRESA,
                                       body:`${NomeCli}${AutoMsg}`,
                                       date:new Date().getTime()+5000,
                                       Type:"text"
                                   },
                                   {
                                       Autor:EMPRESA,
                                       body:`${NomeCli}${AutoMsg2}`,
                                       Botao:MsgEmp.Msg3A.Botao,
                                       date:new Date().getTime()+10000,
                                       Type:"butao"
                                   }
                                  
                                   )
                                    })
                                    .then(async() => {
                                       var MsgButon =`${NomeCli}${AutoMsg2}`
                                       
                                       console.log(TempMsg)
                                       console.log(TempMsg2)
                                       response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `*${MsgButon}*` , Botao:MsgEmp.Msg3A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                      
                                    }) 

                                }
                       
                                 //Aqui vou está enviando uma mensagem
             
                              
             
                              
                 
                              
                                 
                                 } else if(Mensagem.body === "2" || Mensagem.body === " 2" || Mensagem.body === "2 " || Mensagem.body === " 2 "){

                                 } else if(Mensagem.body === "3" || Mensagem.body === " 3" || Mensagem.body === "3 " || Mensagem.body === " 3 "){
                                    
                                 } else if(Mensagem.body === "4" || Mensagem.body === " 4" || Mensagem.body === "4 " || Mensagem.body === " 4 "){
                                    
                                 } else {
              
                                    if(EstaNaRegra === true && Robo === true){

                                        var QMsg= MsgEmp.Msg16A.Msg.length;
                                        var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                        var Result =parseInt(Sorteio);
                                        var Num = Result-1;
                                        var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                        var TempMsg =  MsgEmp.Msg16A.TempoSeg;

                                          //mensagens de estimulo para continuar o atendimento
                                          var QMsg3= MsgEmp.Msg17A.Msg.length;
                                          var QMsg4= MsgEmp.Msg17B.Msg.length;
                                          var QMsg5= MsgEmp.Msg17C.Msg.length;
                                          var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                          var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                          var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                              
                                          var Result3 =parseInt(Sorteio3);
                                          var Result4 =parseInt(Sorteio4);
                                          var Result5 =parseInt(Sorteio5);
                              
                                          var Num3 = Result3-1;
                                          var Num4 = Result4-1;
                                          var Num5 = Result5-1;
                                          var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                          var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                          var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                          var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                          var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                          var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                         //Mudando a Fase do Chat
                                        
                                         await db.collection("ChatCliente")
                                         .doc(IdChat)
                                         .update({
                                        DigiteNaRegra:false, 
                                        MsgFutura1:{
                                            Ativo:true,
                                            Msg:AutoMsg3,
                                            Tempo:Tempo3,
                                        },
                                        MsgFutura2:{
                                            Ativo:true,
                                            Msg:AutoMsg4,
                                            Tempo:Tempo4,
                                        },
                                        MsgFutura3:{
                                            Ativo:true,
                                            Msg:AutoMsg5,
                                            Tempo:Tempo5,
                                        },
                                         UltimaMsg:{
                                            Autor:EMPRESA,
                                            body:`${NomeCli}${AutoMsg}`,
                                            date:new Date().getTime()+5000,
                                            Type:"text"
                                        },
                                         Mensagem:admin.firestore.FieldValue.arrayUnion({
                                            Autor:IdCli,
                                            body:Mensagem.body,
                                            date:new Date().getTime(),
                                            Type:"text"
                                        },
                                        {
                                            Autor:EMPRESA,
                                            body:`${NomeCli}${AutoMsg}`,
                                            date:new Date().getTime()+5000,
                                            Type:"text"
                                        },
                                        
                                        
                                        )
                                         })
                                         .then(async() => {
                                            var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                            console.log(TempMsg)
                                            response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                  
                                         }) 
                                    } else  if(EstaNaRegra === false && Robo === true){

                                          //mensagens de estimulo para continuar o atendimento
                                          var QMsg3= MsgEmp.Msg17A.Msg.length;
                                          var QMsg4= MsgEmp.Msg17B.Msg.length;
                                          var QMsg5= MsgEmp.Msg17C.Msg.length;
                                          var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                          var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                          var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                              
                                          var Result3 =parseInt(Sorteio3);
                                          var Result4 =parseInt(Sorteio4);
                                          var Result5 =parseInt(Sorteio5);
                              
                                          var Num3 = Result3-1;
                                          var Num4 = Result4-1;
                                          var Num5 = Result5-1;
                                          var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                          var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                          var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                          var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                          var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                          var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                    
                                      
                                    
                                      
                                         //Mudando a Fase do Chat
                                        
                                         await db.collection("ChatCliente")
                                         .doc(IdChat)
                                         .update({
                                        Robotizado:false, 
                                        MsgFutura1:{
                                            Ativo:true,
                                            Msg:AutoMsg3,
                                            Tempo:Tempo3,
                                        },
                                        MsgFutura2:{
                                            Ativo:true,
                                            Msg:AutoMsg4,
                                            Tempo:Tempo4,
                                        },
                                        MsgFutura3:{
                                            Ativo:true,
                                            Msg:AutoMsg5,
                                            Tempo:Tempo5,
                                        },
                                         })
                                         .then(async() => {
                                            var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                            console.log(TempMsg)
                                            response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                  
                                         }) 
                                    }
                                 }
                      
                        
                            
                          
         
             
                          
                             
                             } else if(FaMsg === "Msg4A" ){//Recebendo a Sessão, Perguntando Qual SubSessão ou Item
                                var NumIni = parseInt(Mensagem.body)  
                                var QuantMen = MemoriaSessao.length;
                                console.log("Entrada "+NumIni)
                                console.log("Quantidade "+QuantMen)
                                  if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){
                                    // Cliente clicou em voltar 
                                      //montar a mensagem   
                                       var QMsg= MsgEmp.Msg2A.Msg.length;
                                       var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                       var Result =parseInt(Sorteio);
                                       var Num = Result-1;
                                       var AutoMsg = MsgEmp.Msg2A.Msg[Num];
                                       var TempMsg =  MsgEmp.Msg2A.TempoSeg;
                   
                                       console.log(MsgEmp.Msg2A.Msg)
                                       console.log("Qmsg: "+QMsg)       
                                       console.log("Soteio: "+Sorteio)                 
                                       console.log("Msg: "+AutoMsg)
                   
                   
                                       var QMsg2= MsgEmp.Msg3A.Msg.length;
                                       var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                       var Result2 =parseInt(Sorteio2);
                                       var Num2 = Result2-1;
                                       var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                                       var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
                   
                                       console.log(MsgEmp.Msg3A.Msg)
                                       console.log("Qmsg: "+QMsg2)       
                                       console.log("Soteio: "+Sorteio2)                 
                                       console.log("Msg: "+AutoMsg2)
                                            //Mensagem parabenizando que ele acertou a digitação 
                                    var QMsg9= MsgEmp.Msg16B.Msg.length;
                                    var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                    var Result9 =parseInt(Sorteio9);
                                    var Num9 = Result9-1;
                                    var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                    var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                   
                   
                   
                                        //Aqui Desativa o Pedido Criado 
                                        await db.collection("MesaItem")
                                        .doc(PedidoCri)
                                        .delete()
                                        .then(async() => {
                                
                                        })
                                        //Mensagens de estimulo 
                                        var QMsg3= MsgEmp.Msg17A.Msg.length;
                                        var QMsg4= MsgEmp.Msg17B.Msg.length;
                                        var QMsg5= MsgEmp.Msg17C.Msg.length;
                                        var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                        var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                        var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                            
                                        var Result3 =parseInt(Sorteio3);
                                        var Result4 =parseInt(Sorteio4);
                                        var Result5 =parseInt(Sorteio5);
                            
                                        var Num3 = Result3-1;
                                        var Num4 = Result4-1;
                                        var Num5 = Result5-1;
                                        var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                        var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                        var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                        var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                        var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                        var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                     
                                        if(Robo === true && EstaNaRegra === true){
                                        //Mudando a Fase do Chat
                                        await db.collection("ChatCliente")
                                        .doc(IdChat)
                                        .update({
                                        FaseMsg: "Msg3A",
                                        DigiteNaRegra:true,
                                        Robotizado:true, 
                                        MsgFutura1:{
                                            Ativo:true,
                                            Msg:AutoMsg3,
                                            Tempo:Tempo3,
                                        },
                                        MsgFutura2:{
                                            Ativo:true,
                                            Msg:AutoMsg4,
                                            Tempo:Tempo4,
                                        },
                                        MsgFutura3:{
                                            Ativo:true,
                                            Msg:AutoMsg5,
                                            Tempo:Tempo5,
                                        },
                                        Pedido:null,
                                        UltimaMsg:{
                                           Autor:EMPRESA,
                                           body:`${NomeCli}${AutoMsg2}`,
                                           date:new Date().getTime()+5000,
                                           Type:"butao"
                                       },
                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                           Autor:IdCli,
                                           body:Mensagem.body,
                                           date:new Date().getTime(),
                                           Type:"text"
                                       },
                                       {
                                           Autor:EMPRESA,
                                           body:`${NomeCli}${AutoMsg}`,
                                           date:new Date().getTime()+5000,
                                           Type:"text"
                                       },
                                       {
                                           Autor:EMPRESA,
                                           body:`${NomeCli}${AutoMsg2}`,
                                           Botao:MsgEmp.Msg3A.Botao,
                                           date:new Date().getTime()+10000,
                                           Type:"butao"
                                       }
                                      
                                       )
                                        })
                                        .then(async() => {
                                           var MsgButon =`${NomeCli}${AutoMsg2}`
                                           
                                           console.log(TempMsg)
                                           console.log(TempMsg2)
                                           response.json({ Inf:[{Msg: `*${MsgButon}*` , Botao:MsgEmp.Msg3A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                          
                                        }) 
                                    } else {
                                           //Mudando a Fase do Chat
                                           await db.collection("ChatCliente")
                                           .doc(IdChat)
                                           .update({
                                           FaseMsg: "Msg3A",
                                           DigiteNaRegra:true,
                                           Robotizado:true, 
                                           MsgFutura1:{
                                               Ativo:true,
                                               Msg:AutoMsg3,
                                               Tempo:Tempo3,
                                           },
                                           MsgFutura2:{
                                               Ativo:true,
                                               Msg:AutoMsg4,
                                               Tempo:Tempo4,
                                           },
                                           MsgFutura3:{
                                               Ativo:true,
                                               Msg:AutoMsg5,
                                               Tempo:Tempo5,
                                           },
                                           Pedido:null,
                                           UltimaMsg:{
                                              Autor:EMPRESA,
                                              body:`${NomeCli}${AutoMsg2}`,
                                              date:new Date().getTime()+5000,
                                              Type:"butao"
                                          },
                                           Mensagem:admin.firestore.FieldValue.arrayUnion({
                                              Autor:IdCli,
                                              body:Mensagem.body,
                                              date:new Date().getTime(),
                                              Type:"text"
                                          },
                                          {
                                            Autor:EMPRESA,
                                            body:`${NomeCli}${AutoMsg9}`,
                                            date:new Date().getTime()+2000,
                                            Type:"text"
                                        },
                                          {
                                              Autor:EMPRESA,
                                              body:`${NomeCli}${AutoMsg}`,
                                              date:new Date().getTime()+5000,
                                              Type:"text"
                                          },
                                          {
                                              Autor:EMPRESA,
                                              body:`${NomeCli}${AutoMsg2}`,
                                              Botao:MsgEmp.Msg3A.Botao,
                                              date:new Date().getTime()+10000,
                                              Type:"butao"
                                          }
                                         
                                          )
                                           })
                                           .then(async() => {
                                              var MsgButon =`${NomeCli}${AutoMsg2}`
                                              
                                              console.log(TempMsg)
                                              console.log(TempMsg2)
                                              response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `*${MsgButon}*` , Botao:MsgEmp.Msg3A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                             
                                           }) 

                                    }
                             
                                       //Aqui vou está enviando uma mensagem
                   
                                    
                   
                                    
                       
                                    
                                       
                                       }else  if(NumIni > 0 && NumIni < QuantMen) {
                                        
                                        console.log(MemoriaSessao[NumIni].body)
                                            //Escolhendo os itens da sessão escolhida
                                            var Menus = []
                                          
                                           if(MemoriaSessao[NumIni].Tamanho){
                                            Menus.push(
                                                {id:"3", body:"Volar Para Sessões\n===================\n"}  
                                            )
                                            for(let i in MemoriaSessao[NumIni].GrupTamanho){
                                                    Menus.push({
                                                        Descont:MemoriaSessao[NumIni].GrupTamanho[i].DescontReal,
                                                        Nome: MemoriaSessao[NumIni].GrupTamanho[i].Tamanho,
                                                        Preco: MemoriaSessao[NumIni].GrupTamanho[i].PrecoReal,
                                                        QuantSb:MemoriaSessao[NumIni].GrupTamanho[i].Qsabor,
                                                        body: MemoriaSessao[NumIni].GrupTamanho[i].DescontReal?MemoriaSessao[NumIni].GrupTamanho[i].Tamanho+"\n"+"❤️ De: "+"~"+MemoriaSessao[NumIni].GrupTamanho[i].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSessao[NumIni].GrupTamanho[i].DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :    MemoriaSessao[NumIni].GrupTamanho[i].Tamanho+"\n"+"💰 "+MemoriaSessao[NumIni].GrupTamanho[i].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n" ,
                                                       
                                                    })

                                                
                                               
                                           
                                            }

                                                //montar a mensagem   
                                        //  var QMsg= MsgEmp.Msg4B.Msg.length;
                                        //  var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                        //  var Result =parseInt(Sorteio);
                                        //  var Num = Result-1;
                                         var AutoMsg = MsgEmp.Msg4H.Msg[NumIni-1];
                                         var TempMsg =  MsgEmp.Msg4H.TempoSeg;
                                  
                                         console.log(MsgEmp.Msg4B.Msg)
                                         console.log("Qmsg: "+QMsg)       
                                         console.log("Soteio: "+Sorteio)                 
                                         console.log("Msg: "+AutoMsg)

                                             //Mensagem parabenizando que ele acertou a digitação 
                                        var QMsg9= MsgEmp.Msg16B.Msg.length;
                                        var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                        var Result9 =parseInt(Sorteio9);
                                        var Num9 = Result9-1;
                                        var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                        var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                     
                       
                                        //  var QMsg2= MsgEmp.Msg3A.Msg.length;
                                        //  var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                        //  var Result2 =parseInt(Sorteio2);
                                        //  var Num2 = Result2-1;
                                        //  var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                                        //  var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
                     
                                        //  console.log(MsgEmp.Msg3A.Msg)
                                        //  console.log("Qmsg: "+QMsg2)       
                                        //  console.log("Soteio: "+Sorteio2)                 
                                        //  console.log("Msg: "+AutoMsg2)
                                        

                                          //Mensagens de estimulo 
                                          var QMsg3= MsgEmp.Msg17A.Msg.length;
                                          var QMsg4= MsgEmp.Msg17B.Msg.length;
                                          var QMsg5= MsgEmp.Msg17C.Msg.length;
                                          var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                          var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                          var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                              
                                          var Result3 =parseInt(Sorteio3);
                                          var Result4 =parseInt(Sorteio4);
                                          var Result5 =parseInt(Sorteio5);
                              
                                          var Num3 = Result3-1;
                                          var Num4 = Result4-1;
                                          var Num5 = Result5-1;
                                          var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                          var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                          var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                          var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                          var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                          var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                          
                                          if(Robo === true && EstaNaRegra === true){
                                            //Mudando a Fase do Chat
                                            await db.collection("ChatCliente")
                                            .doc(IdChat)
                                            .update({
                                            Sessao:MemoriaSessao[NumIni].body,
                                            FaseMsg: "Msg4H",
                                            MemSubSessao:Menus,
                                            DigiteNaRegra:true,
                                            Robotizado:true, 
                                            MsgFutura1:{
                                                Ativo:true,
                                                Msg:AutoMsg3,
                                                Tempo:Tempo3,
                                            },
                                            MsgFutura2:{
                                                Ativo:true,
                                                Msg:AutoMsg4,
                                                Tempo:Tempo4,
                                            },
                                            MsgFutura3:{
                                                Ativo:true,
                                                Msg:AutoMsg5,
                                                Tempo:Tempo5,
                                            },
                                            UltimaMsg:{
                                               Autor:EMPRESA,
                                               body:`${NomeCli}${AutoMsg}`,
                                               date:new Date().getTime()+5000,
                                               Type:"botao"
                                           },
                                            Mensagem:admin.firestore.FieldValue.arrayUnion({
                                               Autor:IdCli,
                                               body:Mensagem.body,
                                               date:new Date().getTime(),
                                               Type:"text"
                                           },
                                           {
                                            Autor:EMPRESA,
                                            body: `${NomeCli}, Você Escolheu ${MemoriaSessao[NumIni].body}` ,
                                            date:new Date().getTime()+5000,
                                            Type:"text"
                                        },
                                           {
                                               Autor:EMPRESA,
                                               body:`${NomeCli}${AutoMsg}`,
                                               Botao:Menus,
                                               date:new Date().getTime()+7000,
                                               Type:"botao"
                                           },
                                           
                                           
                                           )
                                            })
                                            .then(async() => {
                                               
                                               //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                               console.log(TempMsg)
                                               response.json({ Inf:[{Msg: `${NomeCli}, Você Escolheu ${MemoriaSessao[NumIni].body}`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                            }) 
                                          } else {
                                                //Mudando a Fase do Chat
                                            await db.collection("ChatCliente")
                                            .doc(IdChat)
                                            .update({
                                            Sessao:MemoriaSessao[NumIni].body,
                                            FaseMsg: "Msg4H",
                                            MemSubSessao:Menus,
                                            DigiteNaRegra:true,
                                            Robotizado:true, 
                                            MsgFutura1:{
                                                Ativo:true,
                                                Msg:AutoMsg3,
                                                Tempo:Tempo3,
                                            },
                                            MsgFutura2:{
                                                Ativo:true,
                                                Msg:AutoMsg4,
                                                Tempo:Tempo4,
                                            },
                                            MsgFutura3:{
                                                Ativo:true,
                                                Msg:AutoMsg5,
                                                Tempo:Tempo5,
                                            },
                                            UltimaMsg:{
                                               Autor:EMPRESA,
                                               body:`${NomeCli}${AutoMsg}`,
                                               date:new Date().getTime()+5000,
                                               Type:"botao"
                                           },
                                            Mensagem:admin.firestore.FieldValue.arrayUnion({
                                               Autor:IdCli,
                                               body:Mensagem.body,
                                               date:new Date().getTime(),
                                               Type:"text"
                                           },
                                           {
                                              Autor:EMPRESA,
                                              body:`${NomeCli}${AutoMsg9}`,
                                              date:new Date().getTime()+2000,
                                              Type:"text"
                                          },
                                          {
                                            Autor:EMPRESA,
                                            body: `${NomeCli}, Você Escolheu ${MemoriaSessao[NumIni].body}` ,
                                            date:new Date().getTime()+5000,
                                            Type:"text"
                                        },
                                           {
                                               Autor:EMPRESA,
                                               body:`${NomeCli}${AutoMsg}`,
                                               Botao:Menus,
                                               date:new Date().getTime()+7000,
                                               Type:"botao"
                                           },
                                           
                                           
                                           )
                                            })
                                            .then(async() => {
                                               
                                               //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                               console.log(TempMsg)
                                               response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `${NomeCli}, Você Escolheu ${MemoriaSessao[NumIni].body}`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                            }) 
  
                                          }

                                            


                                           }else {

                                           
                                            await db.collection("ItensDaEmpresa")
                                            .where("Empresa", "==", EMPRESA)
                                            .where("Menu", "==", MemoriaSessao[NumIni].body)
                                            .where("Ativo", "==", true)
                                            .get().then(async (querySnapshot23) => {
                                                Menus.push(
                                                    {id:"3", body:"Volar Para Sessões\n===================\n"}  
                                                )
                                                await querySnapshot23.forEach((doc23) => {
            
                                                    Menus.push({
                                                        Descont:doc23.data().DescontReal,
                                                        Descricao:doc23.data().Descricao,
                                                        Nome: doc23.data().nome,
                                                        Preco: doc23.data().PrecoReal,
                                                        Quant: doc23.data().Quant,
                                                        Ilimitado:doc23.data().Ilimitado,
                                                        foto: doc23.data().foto,
                                                        id: doc23.id,
                                                        Observacao: "",
                                                        body:doc23.data().Descricao ?  doc23.data().DescontReal?doc23.data().nome+"\n"+"📝"+doc23.data().Descricao+"\n"+"❤️ De: "+"~"+doc23.data().PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+doc23.data().DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :    doc23.data().nome+"\n"+"📝"+doc23.data().Descricao+"\n"+"💰 "+doc23.data().PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n":doc23.data().DescontReal?doc23.data().nome+"\n"+"❤️ De: "+"~"+doc23.data().PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+doc23.data().DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :    doc23.data().nome+"\n"+"💰 "+doc23.data().PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n" ,
                                                        SubSessao:"",
                                                        ItemEspeci:false,
                                                    })
                                                 
                                                   })
            
                                            });
                                            console.log(Menus)
            
            
                                              //montar a mensagem   
                                         var QMsg= MsgEmp.Msg4B.Msg.length;
                                         var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                         var Result =parseInt(Sorteio);
                                         var Num = Result-1;
                                         var AutoMsg = MsgEmp.Msg4B.Msg[Num];
                                         var TempMsg =  MsgEmp.Msg4B.TempoSeg;
                                  
                                         console.log(MsgEmp.Msg4B.Msg)
                                         console.log("Qmsg: "+QMsg)       
                                         console.log("Soteio: "+Sorteio)                 
                                         console.log("Msg: "+AutoMsg)

                                             //Mensagem parabenizando que ele acertou a digitação 
                                        var QMsg9= MsgEmp.Msg16B.Msg.length;
                                        var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                        var Result9 =parseInt(Sorteio9);
                                        var Num9 = Result9-1;
                                        var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                        var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                     
                       
                                        //  var QMsg2= MsgEmp.Msg3A.Msg.length;
                                        //  var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                        //  var Result2 =parseInt(Sorteio2);
                                        //  var Num2 = Result2-1;
                                        //  var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                                        //  var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
                     
                                        //  console.log(MsgEmp.Msg3A.Msg)
                                        //  console.log("Qmsg: "+QMsg2)       
                                        //  console.log("Soteio: "+Sorteio2)                 
                                        //  console.log("Msg: "+AutoMsg2)
                                        

                                          //Mensagens de estimulo 
                                          var QMsg3= MsgEmp.Msg17A.Msg.length;
                                          var QMsg4= MsgEmp.Msg17B.Msg.length;
                                          var QMsg5= MsgEmp.Msg17C.Msg.length;
                                          var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                          var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                          var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                              
                                          var Result3 =parseInt(Sorteio3);
                                          var Result4 =parseInt(Sorteio4);
                                          var Result5 =parseInt(Sorteio5);
                              
                                          var Num3 = Result3-1;
                                          var Num4 = Result4-1;
                                          var Num5 = Result5-1;
                                          var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                          var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                          var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                          var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                          var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                          var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                    
                                          if(Robo === true && EstaNaRegra === true){
                                          //Mudando a Fase do Chat
                                          await db.collection("ChatCliente")
                                          .doc(IdChat)
                                          .update({
                                          Sessao:MemoriaSessao[NumIni].body,
                                          FaseMsg: "Msg4B",
                                          MemProdutos:Menus,
                                          DigiteNaRegra:true,
                                          Robotizado:true, 
                                          MsgFutura1:{
                                              Ativo:true,
                                              Msg:AutoMsg3,
                                              Tempo:Tempo3,
                                          },
                                          MsgFutura2:{
                                              Ativo:true,
                                              Msg:AutoMsg4,
                                              Tempo:Tempo4,
                                          },
                                          MsgFutura3:{
                                              Ativo:true,
                                              Msg:AutoMsg5,
                                              Tempo:Tempo5,
                                          },
                                          UltimaMsg:{
                                             Autor:EMPRESA,
                                             body:`${NomeCli}${AutoMsg}`,
                                             date:new Date().getTime()+5000,
                                             Type:"botao"
                                         },
                                          Mensagem:admin.firestore.FieldValue.arrayUnion({
                                             Autor:IdCli,
                                             body:Mensagem.body,
                                             date:new Date().getTime(),
                                             Type:"text"
                                         },
                                         {
                                            Autor:EMPRESA,
                                            body: `${NomeCli}, Você Escolheu ${MemoriaSessao[NumIni].body}` ,
                                            date:new Date().getTime()+5000,
                                            Type:"text"
                                        },
                                         {
                                             Autor:EMPRESA,
                                             body:`${NomeCli}${AutoMsg}`,
                                             Botao:Menus,
                                             date:new Date().getTime()+7000,
                                             Type:"botao"
                                         },
                                         
                                         
                                         )
                                          })
                                          .then(async() => {
                                             
                                             //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                             console.log(TempMsg)
                                             response.json({ Inf:[{Msg: `*${NomeCli}, Você Escolheu ${MemoriaSessao[NumIni].body}*`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                          }) 
                                        } else {
                                              //Mudando a Fase do Chat
                                          await db.collection("ChatCliente")
                                          .doc(IdChat)
                                          .update({
                                          Sessao:MemoriaSessao[NumIni].body,
                                          FaseMsg: "Msg4B",
                                          MemProdutos:Menus,
                                          DigiteNaRegra:true,
                                          Robotizado:true, 
                                          MsgFutura1:{
                                              Ativo:true,
                                              Msg:AutoMsg3,
                                              Tempo:Tempo3,
                                          },
                                          MsgFutura2:{
                                              Ativo:true,
                                              Msg:AutoMsg4,
                                              Tempo:Tempo4,
                                          },
                                          MsgFutura3:{
                                              Ativo:true,
                                              Msg:AutoMsg5,
                                              Tempo:Tempo5,
                                          },
                                          UltimaMsg:{
                                             Autor:EMPRESA,
                                             body:`${NomeCli}${AutoMsg}`,
                                             date:new Date().getTime()+5000,
                                             Type:"butao"
                                         },
                                          Mensagem:admin.firestore.FieldValue.arrayUnion({
                                             Autor:IdCli,
                                             body:Mensagem.body,
                                             date:new Date().getTime(),
                                             Type:"text"
                                         },
                                         {
                                            Autor:EMPRESA,
                                            body:`${NomeCli}${AutoMsg9}`,
                                            Botao:Menus,
                                            date:new Date().getTime()+2000,
                                            Type:"text"
                                        },
                                        {
                                            Autor:EMPRESA,
                                            body: `${NomeCli}, Você Escolheu ${MemoriaSessao[NumIni].body}` ,
                                            date:new Date().getTime()+5000,
                                            Type:"text"
                                        },
                                         {
                                             Autor:EMPRESA,
                                             body:`${NomeCli}${AutoMsg}`,
                                             Botao:Menus,
                                             date:new Date().getTime()+5000,
                                             Type:"butao"
                                         },
                                         
                                         
                                         )
                                          })
                                          .then(async() => {
                                             
                                             //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                             console.log(TempMsg)
                                             response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `*${NomeCli}, Você Escolheu ${MemoriaSessao[NumIni].body}*`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                          }) 

                                        }
            
                                    }
                                        
                                  
                                    
                                        
                                      
                                        } else {
              
                                            if(EstaNaRegra === true && Robo === true){
        
                                                var QMsg= MsgEmp.Msg16A.Msg.length;
                                                var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                var Result =parseInt(Sorteio);
                                                var Num = Result-1;
                                                var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                                var TempMsg =  MsgEmp.Msg16A.TempoSeg;
        
                                                  //mensagens de estimulo para continuar o atendimento
                                                  var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                  var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                  var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                  var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                  var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                  var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                      
                                                  var Result3 =parseInt(Sorteio3);
                                                  var Result4 =parseInt(Sorteio4);
                                                  var Result5 =parseInt(Sorteio5);
                                      
                                                  var Num3 = Result3-1;
                                                  var Num4 = Result4-1;
                                                  var Num5 = Result5-1;
                                                  var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                  var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                  var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                  var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                  var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                  var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                 //Mudando a Fase do Chat
                                                
                                                 await db.collection("ChatCliente")
                                                 .doc(IdChat)
                                                 .update({
                                                DigiteNaRegra:false, 
                                                MsgFutura1:{
                                                    Ativo:true,
                                                    Msg:AutoMsg3,
                                                    Tempo:Tempo3,
                                                },
                                                MsgFutura2:{
                                                    Ativo:true,
                                                    Msg:AutoMsg4,
                                                    Tempo:Tempo4,
                                                },
                                                MsgFutura3:{
                                                    Ativo:true,
                                                    Msg:AutoMsg5,
                                                    Tempo:Tempo5,
                                                },
                                                 UltimaMsg:{
                                                    Autor:EMPRESA,
                                                    body:`${NomeCli}${AutoMsg}`,
                                                    date:new Date().getTime()+5000,
                                                    Type:"text"
                                                },
                                                 Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                    Autor:IdCli,
                                                    body:Mensagem.body,
                                                    date:new Date().getTime(),
                                                    Type:"text"
                                                },
                                                {
                                                    Autor:EMPRESA,
                                                    body:`${NomeCli}${AutoMsg}`,
                                                    date:new Date().getTime()+5000,
                                                    Type:"text"
                                                },
                                                
                                                
                                                )
                                                 })
                                                 .then(async() => {
                                                    var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                    //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                    console.log(TempMsg)
                                                    response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                          
                                                 }) 
                                            } else  if(EstaNaRegra === false && Robo === true){
        
                                                  //mensagens de estimulo para continuar o atendimento
                                                  var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                  var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                  var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                  var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                  var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                  var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                      
                                                  var Result3 =parseInt(Sorteio3);
                                                  var Result4 =parseInt(Sorteio4);
                                                  var Result5 =parseInt(Sorteio5);
                                      
                                                  var Num3 = Result3-1;
                                                  var Num4 = Result4-1;
                                                  var Num5 = Result5-1;
                                                  var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                  var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                  var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                  var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                  var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                  var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                            
                                              
                                            
                                              
                                                 //Mudando a Fase do Chat
                                                
                                                 await db.collection("ChatCliente")
                                                 .doc(IdChat)
                                                 .update({
                                                Robotizado:false, 
                                                MsgFutura1:{
                                                    Ativo:true,
                                                    Msg:AutoMsg3,
                                                    Tempo:Tempo3,
                                                },
                                                MsgFutura2:{
                                                    Ativo:true,
                                                    Msg:AutoMsg4,
                                                    Tempo:Tempo4,
                                                },
                                                MsgFutura3:{
                                                    Ativo:true,
                                                    Msg:AutoMsg5,
                                                    Tempo:Tempo5,
                                                },
                                                 })
                                                 .then(async() => {
                                                    var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                    //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                    console.log(TempMsg)
                                                    response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                          
                                                 }) 
                                            }
                                         }
                 
                              
                                 
                                 } else if(FaMsg === "Msg4B" ){//Recebendo o Item, Perguntando A Quantidade
                                    var NumIni = parseInt(Mensagem.body)  
                                    var QuantMen = MemoriaSessao.length;
                                    console.log("Entrada "+NumIni)
                                    console.log("Quantidade "+QuantMen)
                                      if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){

                                        var Menus = [{id:"0", body:"Voltar Para o Início"}]
                                        await db.collection("MenusSite")
                                        .where("Empresa", "==", EMPRESA)
                                        .where("Ativo", "==", true)
                                        .where("MemFim", "==", false)
                                        .get().then(async (querySnapshot23) => {
                                            await querySnapshot23.forEach((doc23) => {
        
                                                Menus.push({
                                                     id:doc23.id,
                                                    body:doc23.data().nome,
                                                    GrupTamanho:doc23.data().GrupTamanho,
                                                    MemFim:doc23.data().MemFim,
                                                    Tamanho:doc23.data().Tamanho,
                                                })
                                             
                                               })
        
                                        });
        
                                    console.log(Menus)
                                          //montar a mensagem   
                                     var QMsg= MsgEmp.Msg4A.Msg.length;
                                     var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                     var Result =parseInt(Sorteio);
                                     var Num = Result-1;
                                     var AutoMsg = MsgEmp.Msg4A.Msg[Num];
                                     var TempMsg =  MsgEmp.Msg4A.TempoSeg;
                 
                                    //  console.log(MsgEmp.Msg2A.Msg)
                                    //  console.log("Qmsg: "+QMsg)       
                                    //  console.log("Soteio: "+Sorteio)                 
                                    //  console.log("Msg: "+AutoMsg)
                 
        
                                   //Mensagem parabenizando que ele acertou a digitação 
                                     var QMsg2= MsgEmp.Msg16B.Msg.length;
                                     var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                     var Result2 =parseInt(Sorteio2);
                                     var Num2 = Result2-1;
                                     var AutoMsg2 = MsgEmp.Msg16B.Msg[Num2];
                                     var TempMsg2 =  MsgEmp.Msg16B.TempoSeg;
                                    
                                      //mensagens de estimulo para continuar o atendimento
                                      var QMsg3= MsgEmp.Msg17A.Msg.length;
                                      var QMsg4= MsgEmp.Msg17B.Msg.length;
                                      var QMsg5= MsgEmp.Msg17C.Msg.length;
                                      var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                      var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                      var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                          
                                      var Result3 =parseInt(Sorteio3);
                                      var Result4 =parseInt(Sorteio4);
                                      var Result5 =parseInt(Sorteio5);
                          
                                      var Num3 = Result3-1;
                                      var Num4 = Result4-1;
                                      var Num5 = Result5-1;
                                      var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                      var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                      var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                      var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                      var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                      var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
        
                                
                                            // Robo sendo true, ele 
                                            if(Robo === true && EstaNaRegra === true){
                                                console.log("Entreou A  QUI ")
                                     await db.collection("ChatCliente")
                                      .doc(IdChat)
                                      .update({
                                      FaseMsg: "Msg4A",
                                      MsgFutura1:{
                                        Ativo:true,
                                        Msg:AutoMsg3,
                                        Tempo:Tempo3,
                                    },
                                    MsgFutura2:{
                                        Ativo:true,
                                        Msg:AutoMsg4,
                                        Tempo:Tempo4,
                                    },
                                    MsgFutura3:{
                                        Ativo:true,
                                        Msg:AutoMsg5,
                                        Tempo:Tempo5,
                                    },
                                      MemSessao:Menus,
                                      Reclamaçoes:null,
                                      Localização:null,
                                      DigiteNaRegra:true,
                                      Robotizado:true, 
                                      UltimaMsg:{
                                         Autor:EMPRESA,
                                         body:`${NomeCli}${AutoMsg}`,
                                         date:new Date().getTime()+5000,
                                         Type:"butao"
                                     },
                                      Mensagem:admin.firestore.FieldValue.arrayUnion({
                                         Autor:IdCli,
                                         body:Mensagem.body,
                                         date:new Date().getTime(),
                                         Type:"text"
                                     },
                                     {
                                         Autor:EMPRESA,
                                         body:`${NomeCli}${AutoMsg}`,
                                         Botao:Menus,
                                         date:new Date().getTime()+5000,
                                         Type:"Botao"
                                     },
                                     
                                     
                                     )
                                      })
                                      .then(async() => {
                                         //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                         console.log("Entreou A  QUI ")
                                         console.log(TempMsg)
                                         response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                               
                                      }) 
                                        
                                        }else {
                                            await db.collection("ChatCliente")
                                            .doc(IdChat)
                                            .update({
                                            FaseMsg: "Msg4A",
                                            MsgFutura1:{
                                                Ativo:true,
                                                Msg:AutoMsg3,
                                                Tempo:Tempo3,
                                            },
                                            MsgFutura2:{
                                                Ativo:true,
                                                Msg:AutoMsg4,
                                                Tempo:Tempo4,
                                            },
                                            MsgFutura3:{
                                                Ativo:true,
                                                Msg:AutoMsg5,
                                                Tempo:Tempo5,
                                            },
                                            MemSessao:Menus,
                                            Reclamaçoes:null,
                                            Localização:null,
                                            DigiteNaRegra:true,
                                            Robotizado:true, 
                                            UltimaMsg:{
                                               Autor:EMPRESA,
                                               body:`${NomeCli}${AutoMsg}`,
                                               date:new Date().getTime()+5000,
                                               Type:"butao"
                                           },
                                            Mensagem:admin.firestore.FieldValue.arrayUnion({
                                               Autor:IdCli,
                                               body:Mensagem.body,
                                               date:new Date().getTime(),
                                               Type:"text"
                                           },
                                           {
                                            Autor:EMPRESA,
                                            body:`${NomeCli}${AutoMsg2}`,
                                            date:new Date().getTime()+2000,
                                            Type:"text"
                                        },
                                           {
                                               Autor:EMPRESA,
                                               body:`${NomeCli}${AutoMsg}`,
                                               Botao:Menus,
                                               date:new Date().getTime()+5000,
                                               Type:"Botao"
                                           },
                                           
                                           
                                           )
                                            })
                                            .then(async() => {
                                           
                                               //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                               console.log(TempMsg)
                        
                                               response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg2}`, Tempo: TempMsg2, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                            }) 
        
                                        }
                                      //Mudando a Fase do Chat
                                      
                                      
                                      
                                        
                                           
                                      
                     
                                    
                           
        
        
                                    }else  if(NumIni > 0 && NumIni < QuantMen) {
                                        
                                            console.log(MemoriaProduto[NumIni].id)
                                                //Escolhendo os itens da sessão escolhida
                                                var Menus = []
                                                var Quant = [{id:"0", body:"Voltar Para os Itens"}]; 

                                                console.log("Id :"+MemoriaProduto[NumIni].id)
                                               
                                                if(MemoriaProduto[NumIni].Ilimitado){
                                                    for(var i = 1; i < 11; i++){
                                                        Quant.push({
                                                           id:i,
                                                           body:i+" Quantidade"
                                                        })
                                                       }

                                                }else {
                                                    if(MemoriaProduto[NumIni].Quant < 11){
                                                        for(var i = 1; i <= MemoriaProduto[NumIni].Quant; i++){
                                                         Quant.push({
                                                            id:i,
                                                            body:i+" Quantidade"
                                                         })
                                                        }
    
                                                    } else {
                                                        for(var i = 1; i < 11; i++){
                                                            Quant.push({
                                                               id:i,
                                                               body:i+" Quantidade"
                                                            })
                                                           }
                                                    }

                                                }
                                              
                                                 
                                              
                                               
                                           console.log(Quant)
                
                                                  //montar a mensagem   
                                             var QMsg= MsgEmp.Msg4C.Msg.length;
                                             var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                             var Result =parseInt(Sorteio);
                                             var Num = Result-1;
                                             var AutoMsg = MsgEmp.Msg4C.Msg[Num];
                                             var TempMsg =  MsgEmp.Msg4C.TempoSeg;
                                      
                                             console.log(MsgEmp.Msg4B.Msg)
                                             console.log("Qmsg: "+QMsg)       
                                             console.log("Soteio: "+Sorteio)                 
                                             console.log("Msg: "+AutoMsg)
    
                                              
                         
                           
                                             var QMsg2= MsgEmp.Msg4D.Msg.length;
                                             var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                             var Result2 =parseInt(Sorteio2);
                                             var Num2 = Result2-1;
                                             var AutoMsg2 = MsgEmp.Msg4D.Msg[Num2];
                                             var TempMsg2 =  MsgEmp.Msg4D.TempoSeg;
                         
                                            //  console.log(MsgEmp.Msg3A.Msg)
                                            //  console.log("Qmsg: "+QMsg2)       
                                            //  console.log("Soteio: "+Sorteio2)                 
                                            //  console.log("Msg: "+AutoMsg2)
                                            

                                               //Mensagem parabenizando que ele acertou a digitação 
                                               var QMsg9= MsgEmp.Msg16B.Msg.length;
                                               var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                               var Result9 =parseInt(Sorteio9);
                                               var Num9 = Result9-1;
                                               var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                               var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
    
                                              //Mensagens de estimulo 
                                              var QMsg3= MsgEmp.Msg17A.Msg.length;
                                              var QMsg4= MsgEmp.Msg17B.Msg.length;
                                              var QMsg5= MsgEmp.Msg17C.Msg.length;
                                              var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                              var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                              var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                  
                                              var Result3 =parseInt(Sorteio3);
                                              var Result4 =parseInt(Sorteio4);
                                              var Result5 =parseInt(Sorteio5);
                                  
                                              var Num3 = Result3-1;
                                              var Num4 = Result4-1;
                                              var Num5 = Result5-1;
                                              var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                              var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                              var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                              var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                              var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                              var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                        
                                              if(Robo === true && EstaNaRegra === true){
                                              //Mudando a Fase do Chat
                                              await db.collection("ChatCliente")
                                              .doc(IdChat)
                                              .update({
                                              FaseMsg: "Msg4D",
                                              MemPedido:{
                                                Nome: [MemoriaProduto[NumIni].Nome] ,
                                                Descricao:[MemoriaProduto[NumIni].Descricao],
                                                Foto:[MemoriaProduto[NumIni].foto],
                                                Preco:MemoriaProduto[NumIni].Preco,
                                                Descont:MemoriaProduto[NumIni].Descont,
                                                Sessao:SessaoEsta,
                                                SubSessao:MemoriaProduto[NumIni].SubSessao?MemoriaProduto[NumIni].SubSessao:"",
                                                Quant:0,
                                                Observacao:"",
                                                ItemEspeci:MemoriaProduto[NumIni].ItemEspeci?MemoriaProduto[NumIni].ItemEspeci:false,
                                                QuantGeral:Quant.length,
                                            
                                            },
                                              DigiteNaRegra:true,
                                              Robotizado:true, 
                                              MsgFutura1:{
                                                  Ativo:true,
                                                  Msg:AutoMsg3,
                                                  Tempo:Tempo3,
                                              },
                                              MsgFutura2:{
                                                  Ativo:true,
                                                  Msg:AutoMsg4,
                                                  Tempo:Tempo4,
                                              },
                                              MsgFutura3:{
                                                  Ativo:true,
                                                  Msg:AutoMsg5,
                                                  Tempo:Tempo5,
                                              },
                                              UltimaMsg:{
                                                 Autor:EMPRESA,
                                                 body:`${NomeCli}${AutoMsg2}`,
                                                 Botao:Quant,
                                                 date:new Date().getTime()+5000,
                                                 Type:"Botao"
                                             },
                                              Mensagem:admin.firestore.FieldValue.arrayUnion(
                                                {
                                                 Autor:IdCli,
                                                 body:Mensagem.body,
                                                 date:new Date().getTime(),
                                                 Type:"text"
                                             },
                                             {
                                                 Autor:EMPRESA,
                                                 body:`${NomeCli}, ${AutoMsg}: ${MemoriaProduto[NumIni].Nome}`,
                                                 Botao:[],
                                                 date:new Date().getTime()+3000,
                                                 Type:"text"
                                             },
                                             {
                                                Autor:EMPRESA,
                                                body:`${NomeCli}${AutoMsg2}`,
                                                Botao:Menus,
                                                date:new Date().getTime()+5000,
                                                Type:"Botao"
                                            },
                                             
                                             
                                             )
                                              })
                                              .then(async() => {
                                                var MsgPedido = NomeCli+AutoMsg;
                                                 MsgPedido = MsgPedido + "\n===================\n"
                                                 MsgPedido = MsgPedido + "🛍️ "+SessaoEsta+"\n"
                                                 MsgPedido = MsgPedido + "📦"+MemoriaProduto[NumIni].Nome+"\n"
                                                 if(MemoriaProduto[NumIni].Descricao){
                                                    MsgPedido = MsgPedido + "📝"+MemoriaProduto[NumIni].Descricao+"\n"
                                                 }
                                                 if(MemoriaProduto[NumIni].ItemEspeci){
                                                    MsgPedido = MsgPedido + "🏷️"+MemoriaProduto[NumIni].SubSessao+"\n"
                                                 }
                                                
                                                
                                                 if(MemoriaProduto[NumIni].Descont){
                                                    MsgPedido = MsgPedido + "💰 De:"+MemoriaProduto[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                    MsgPedido = MsgPedido + "❤️ Por:"+MemoriaProduto[NumIni].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                 } else {
                                                    MsgPedido = MsgPedido + "💰"+MemoriaProduto[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                 }
                                                    
                                                  
                                                    
                                                 
                                               
                                                // MemoriaSessao[NumIni].Descricao ?  MemoriaSessao[NumIni].DescontReal?MemoriaSessao[NumIni].nome+"\n"+"📝"+MemoriaSessao[NumIni].Descricao+"\n"+"❤️ De: "+"~"+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSessao[NumIni].DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :   MemoriaSessao[NumIni].nome+"\n"+"📝"+MemoriaSessao[NumIni].Descricao+"\n"+"💰 "+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n":MemoriaSessao[NumIni].DescontReal?MemoriaSessao[NumIni].nome+"\n"+"❤️ De: "+"~"+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSessao[NumIni].DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :    MemoriaSessao[NumIni].nome+"\n"+"💰 "+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n" ,
                                               
                                                 response.json({ Inf:[{Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:Quant , Tempo:TempMsg2, Type:"butao"}] });
                                              }) 
                                            } else {
                                                  //Mudando a Fase do Chat
                                              await db.collection("ChatCliente")
                                              .doc(IdChat)
                                              .update({
                                            FaseMsg: "Msg4D",
                                            MemPedido:{
                                                Nome: [MemoriaProduto[NumIni].Nome] ,
                                                Descricao:[MemoriaProduto[NumIni].Descricao],
                                                Foto:[MemoriaProduto[NumIni].foto],
                                                Preco:MemoriaProduto[NumIni].Preco,
                                                Descont:MemoriaProduto[NumIni].Descont,
                                                Sessao:SessaoEsta,
                                                SubSessao:MemoriaProduto[NumIni].SubSessao,
                                                Quant:0,
                                                Observacao:"",
                                                ItemEspeci:MemoriaProduto[NumIni].ItemEspeci?MemoriaProduto[NumIni].ItemEspeci:false,
                                                QuantGeral:Quant.length,
                                            
                                            },
                                            DigiteNaRegra:true,
                                            Robotizado:true, 
                                              MsgFutura1:{
                                                  Ativo:true,
                                                  Msg:AutoMsg3,
                                                  Tempo:Tempo3,
                                              },
                                              MsgFutura2:{
                                                  Ativo:true,
                                                  Msg:AutoMsg4,
                                                  Tempo:Tempo4,
                                              },
                                              MsgFutura3:{
                                                  Ativo:true,
                                                  Msg:AutoMsg5,
                                                  Tempo:Tempo5,
                                              },
                                              UltimaMsg:{
                                                 Autor:EMPRESA,
                                                 body:`${NomeCli} ${AutoMsg2}`,
                                                 Botao:Quant,
                                                 date:new Date().getTime()+5000,
                                                 Type:"Botao"
                                             },
                                              Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                 Autor:IdCli,
                                                 body:Mensagem.body,
                                                 date:new Date().getTime(),
                                                 Type:"text"
                                             },
                                             {
                                                Autor:EMPRESA,
                                                body:`${NomeCli}${AutoMsg9}`,
                                                Botao:[],
                                                date:new Date().getTime()+1000,
                                                Type:"text"
                                            },
                                             {
                                                Autor:EMPRESA,
                                                body:`${NomeCli}, ${AutoMsg}: ${MemoriaSessao[NumIni].Nome}`,
                                                Botao:[],
                                                date:new Date().getTime()+3000,
                                                Type:"text"
                                            },
                                            {
                                               Autor:EMPRESA,
                                               body:`${NomeCli} ${AutoMsg2}`,
                                               Botao:Menus,
                                               date:new Date().getTime()+5000,
                                               Type:"Botao"
                                           },
                                             
                                             
                                             )
                                              })
                                              .then(async() => {
                                                var MsgPedido = NomeCli+AutoMsg;
                                                 MsgPedido = MsgPedido + "\n===================\n"
                                                 MsgPedido = MsgPedido + "🛍️"+SessaoEsta+"\n"
                                                 MsgPedido = MsgPedido + "📦"+MemoriaProduto[NumIni].Nome+"\n"
                                                 if(MemoriaProduto[NumIni].Descricao){
                                                    MsgPedido = MsgPedido + "📝"+MemoriaProduto[NumIni].Descricao+"\n"
                                                 }
                                                 if(MemoriaProduto[NumIni].ItemEspeci){
                                                    MsgPedido = MsgPedido + "🏷️"+MemoriaProduto[NumIni].SubSessao+"\n"
                                                 }
                                                 if(MemoriaProduto[NumIni].Descont){
                                                    MsgPedido = MsgPedido + "💰 De:"+MemoriaProduto[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                    MsgPedido = MsgPedido + "❤️ Por:"+MemoriaProduto[NumIni].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                 } else {
                                                    MsgPedido = MsgPedido + "💰"+MemoriaProduto[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                 }
                                                   
                                                 
                                                 
                                                 //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                 console.log(TempMsg)
                                                 response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:Quant , Tempo:TempMsg2, Type:"butao"}] });
                                               
                                                }) 
    
                                            }
                
                
                                            
                                      
                                        
                                            
                                          
                                            } else {
                  
                                                if(EstaNaRegra === true && Robo === true){
            
                                                    var QMsg= MsgEmp.Msg16A.Msg.length;
                                                    var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                    var Result =parseInt(Sorteio);
                                                    var Num = Result-1;
                                                    var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                                    var TempMsg =  MsgEmp.Msg16A.TempoSeg;
            
                                                      //mensagens de estimulo para continuar o atendimento
                                                      var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                      var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                      var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                      var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                      var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                      var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                          
                                                      var Result3 =parseInt(Sorteio3);
                                                      var Result4 =parseInt(Sorteio4);
                                                      var Result5 =parseInt(Sorteio5);
                                          
                                                      var Num3 = Result3-1;
                                                      var Num4 = Result4-1;
                                                      var Num5 = Result5-1;
                                                      var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                      var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                      var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                      var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                      var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                      var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                     //Mudando a Fase do Chat
                                                    
                                                     await db.collection("ChatCliente")
                                                     .doc(IdChat)
                                                     .update({
                                                    DigiteNaRegra:false, 
                                                    MsgFutura1:{
                                                        Ativo:true,
                                                        Msg:AutoMsg3,
                                                        Tempo:Tempo3,
                                                    },
                                                    MsgFutura2:{
                                                        Ativo:true,
                                                        Msg:AutoMsg4,
                                                        Tempo:Tempo4,
                                                    },
                                                    MsgFutura3:{
                                                        Ativo:true,
                                                        Msg:AutoMsg5,
                                                        Tempo:Tempo5,
                                                    },
                                                     UltimaMsg:{
                                                        Autor:EMPRESA,
                                                        body:`${NomeCli}${AutoMsg}`,
                                                        date:new Date().getTime()+5000,
                                                        Type:"text"
                                                    },
                                                     Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                        Autor:IdCli,
                                                        body:Mensagem.body,
                                                        date:new Date().getTime(),
                                                        Type:"text"
                                                    },
                                                    {
                                                        Autor:EMPRESA,
                                                        body:`${NomeCli}${AutoMsg}`,
                                                        date:new Date().getTime()+5000,
                                                        Type:"text"
                                                    },
                                                    
                                                    
                                                    )
                                                     })
                                                     .then(async() => {
                                                        var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                        //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                        console.log(TempMsg)
                                                        response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                              
                                                     }) 
                                                } else  if(EstaNaRegra === false && Robo === true){
            
                                                      //mensagens de estimulo para continuar o atendimento
                                                      var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                      var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                      var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                      var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                      var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                      var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                          
                                                      var Result3 =parseInt(Sorteio3);
                                                      var Result4 =parseInt(Sorteio4);
                                                      var Result5 =parseInt(Sorteio5);
                                          
                                                      var Num3 = Result3-1;
                                                      var Num4 = Result4-1;
                                                      var Num5 = Result5-1;
                                                      var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                      var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                      var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                      var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                      var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                      var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                
                                                  
                                                
                                                  
                                                     //Mudando a Fase do Chat
                                                    
                                                     await db.collection("ChatCliente")
                                                     .doc(IdChat)
                                                     .update({
                                                    Robotizado:false, 
                                                    MsgFutura1:{
                                                        Ativo:true,
                                                        Msg:AutoMsg3,
                                                        Tempo:Tempo3,
                                                    },
                                                    MsgFutura2:{
                                                        Ativo:true,
                                                        Msg:AutoMsg4,
                                                        Tempo:Tempo4,
                                                    },
                                                    MsgFutura3:{
                                                        Ativo:true,
                                                        Msg:AutoMsg5,
                                                        Tempo:Tempo5,
                                                    },
                                                     })
                                                     .then(async() => {
                                                        var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                        //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                        console.log(TempMsg)
                                                        response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                              
                                                     }) 
                                                }
                                             }
                     
                                  
                                     
                                     }else if(FaMsg === "Msg4D" ){//Recebendo A Quantidade, Peguntando Se Quer Retirar um Ingrediente
                                        var NumIni = parseInt(Mensagem.body)  
                                        var QuantMen = MemoriaSessao.length;
                                        console.log("Entrada "+NumIni)
                                        console.log("Quantidade "+QuantMen)
                                          if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){
                                        
                                            console.log(MemoriaSessao[NumIni].body)
                                                //Escolhendo os itens da sessão escolhida
                                                var Menus = MemoriaProduto;
                                              
                                             
    
                                               
                                              
                                                console.log(Menus)
                
                
                                                  //montar a mensagem   
                                             var QMsg= MsgEmp.Msg4B.Msg.length;
                                             var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                             var Result =parseInt(Sorteio);
                                             var Num = Result-1;
                                             var AutoMsg = MsgEmp.Msg4B.Msg[Num];
                                             var TempMsg =  MsgEmp.Msg4B.TempoSeg;
                                      
                                             console.log(MsgEmp.Msg4B.Msg)
                                             console.log("Qmsg: "+QMsg)       
                                             console.log("Soteio: "+Sorteio)                 
                                             console.log("Msg: "+AutoMsg)
    
                                                 //Mensagem parabenizando que ele acertou a digitação 
                                            var QMsg9= MsgEmp.Msg16B.Msg.length;
                                            var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                            var Result9 =parseInt(Sorteio9);
                                            var Num9 = Result9-1;
                                            var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                            var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                         
                           
                                            //  var QMsg2= MsgEmp.Msg3A.Msg.length;
                                            //  var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                            //  var Result2 =parseInt(Sorteio2);
                                            //  var Num2 = Result2-1;
                                            //  var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                                            //  var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
                         
                                            //  console.log(MsgEmp.Msg3A.Msg)
                                            //  console.log("Qmsg: "+QMsg2)       
                                            //  console.log("Soteio: "+Sorteio2)                 
                                            //  console.log("Msg: "+AutoMsg2)
                                            
    
                                              //Mensagens de estimulo 
                                              var QMsg3= MsgEmp.Msg17A.Msg.length;
                                              var QMsg4= MsgEmp.Msg17B.Msg.length;
                                              var QMsg5= MsgEmp.Msg17C.Msg.length;
                                              var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                              var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                              var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                  
                                              var Result3 =parseInt(Sorteio3);
                                              var Result4 =parseInt(Sorteio4);
                                              var Result5 =parseInt(Sorteio5);
                                  
                                              var Num3 = Result3-1;
                                              var Num4 = Result4-1;
                                              var Num5 = Result5-1;
                                              var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                              var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                              var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                              var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                              var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                              var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                        
                                              if(Robo === true && EstaNaRegra === true){
                                              //Mudando a Fase do Chat
                                              await db.collection("ChatCliente")
                                              .doc(IdChat)
                                              .update({
                                             
                                              FaseMsg: "Msg4B",
                                              MemProdutos:Menus,
                                              DigiteNaRegra:true,
                                              Robotizado:true, 
                                              MsgFutura1:{
                                                  Ativo:true,
                                                  Msg:AutoMsg3,
                                                  Tempo:Tempo3,
                                              },
                                              MsgFutura2:{
                                                  Ativo:true,
                                                  Msg:AutoMsg4,
                                                  Tempo:Tempo4,
                                              },
                                              MsgFutura3:{
                                                  Ativo:true,
                                                  Msg:AutoMsg5,
                                                  Tempo:Tempo5,
                                              },
                                              UltimaMsg:{
                                                 Autor:EMPRESA,
                                                 body:`${NomeCli}${AutoMsg}`,
                                                 date:new Date().getTime()+5000,
                                                 Type:"botao"
                                             },
                                              Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                 Autor:IdCli,
                                                 body:Mensagem.body,
                                                 date:new Date().getTime(),
                                                 Type:"text"
                                             },
                                            
                                             {
                                                 Autor:EMPRESA,
                                                 body:`${NomeCli}${AutoMsg}`,
                                                 Botao:Menus,
                                                 date:new Date().getTime()+7000,
                                                 Type:"botao"
                                             },
                                             
                                             
                                             )
                                              })
                                              .then(async() => {
                                                 
                                                 //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                 console.log(TempMsg)
                                                 response.json({ Inf:[ {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                              }) 
                                            } else {
                                                  //Mudando a Fase do Chat
                                              await db.collection("ChatCliente")
                                              .doc(IdChat)
                                              .update({
                                              FaseMsg: "Msg4B",
                                              MemProdutos:Menus,
                                              DigiteNaRegra:true,
                                              Robotizado:true, 
                                              MsgFutura1:{
                                                  Ativo:true,
                                                  Msg:AutoMsg3,
                                                  Tempo:Tempo3,
                                              },
                                              MsgFutura2:{
                                                  Ativo:true,
                                                  Msg:AutoMsg4,
                                                  Tempo:Tempo4,
                                              },
                                              MsgFutura3:{
                                                  Ativo:true,
                                                  Msg:AutoMsg5,
                                                  Tempo:Tempo5,
                                              },
                                              UltimaMsg:{
                                                 Autor:EMPRESA,
                                                 body:`${NomeCli}${AutoMsg}`,
                                                 date:new Date().getTime()+5000,
                                                 Type:"butao"
                                             },
                                              Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                 Autor:IdCli,
                                                 body:Mensagem.body,
                                                 date:new Date().getTime(),
                                                 Type:"text"
                                             },
                                             {
                                                Autor:EMPRESA,
                                                body:`${NomeCli}${AutoMsg9}`,
                                                Botao:Menus,
                                                date:new Date().getTime()+2000,
                                                Type:"text"
                                            },
                                             {
                                                 Autor:EMPRESA,
                                                 body:`${NomeCli}${AutoMsg}`,
                                                 Botao:Menus,
                                                 date:new Date().getTime()+5000,
                                                 Type:"butao"
                                             },
                                             
                                             
                                             )
                                              })
                                              .then(async() => {
                                                 
                                                 //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                 console.log(TempMsg)
                                                 response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                              }) 
    
                                            
                
                                        }
                                            
                                      
                                        
                                            
                                          
                                            } else  if(NumIni > 0 && NumIni <= MemoriaPedido.QuantGeral) {
                                            
                                             
                    
                                                      //montar a mensagem   
                                                 var QMsg= MsgEmp.Msg4E.Msg.length;
                                                 var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                 var Result =parseInt(Sorteio);
                                                 var Num = Result-1;
                                                 var AutoMsg = MsgEmp.Msg4E.Msg[Num];
                                                 var TempMsg =  MsgEmp.Msg4E.TempoSeg;
                                          
                                                //  console.log(MsgEmp.Msg4B.Msg)
                                                //  console.log("Qmsg: "+QMsg)       
                                                //  console.log("Soteio: "+Sorteio)                 
                                                //  console.log("Msg: "+AutoMsg)
        
                                                  
                             
                               
                                                //  var QMsg2= MsgEmp.Msg4D.Msg.length;
                                                //  var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                //  var Result2 =parseInt(Sorteio2);
                                                //  var Num2 = Result2-1;
                                                //  var AutoMsg2 = MsgEmp.Msg4D.Msg[Num2];
                                                //  var TempMsg2 =  MsgEmp.Msg4D.TempoSeg;
                             
                                                //  console.log(MsgEmp.Msg3A.Msg)
                                                //  console.log("Qmsg: "+QMsg2)       
                                                //  console.log("Soteio: "+Sorteio2)                 
                                                //  console.log("Msg: "+AutoMsg2)
                                                
    
                                                   //Mensagem parabenizando que ele acertou a digitação 
                                                   var QMsg9= MsgEmp.Msg16B.Msg.length;
                                                   var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                                   var Result9 =parseInt(Sorteio9);
                                                   var Num9 = Result9-1;
                                                   var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                                   var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
        
                                                  //Mensagens de estimulo 
                                                  var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                  var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                  var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                  var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                  var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                  var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                      
                                                  var Result3 =parseInt(Sorteio3);
                                                  var Result4 =parseInt(Sorteio4);
                                                  var Result5 =parseInt(Sorteio5);
                                      
                                                  var Num3 = Result3-1;
                                                  var Num4 = Result4-1;
                                                  var Num5 = Result5-1;
                                                  var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                  var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                  var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                  var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                  var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                  var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                            
                                                  if(Robo === true && EstaNaRegra === true){
                                                  //Mudando a Fase do Chat
                                                  await db.collection("ChatCliente")
                                                  .doc(IdChat)
                                                  .update({
                                                  FaseMsg: "Msg4E",
                                                  MemPedido:{
                                                    Nome:MemoriaPedido.Nome,
                                                    Descricao:MemoriaPedido.Descricao,
                                                    Foto:MemoriaPedido.Foto,
                                                    Preco:MemoriaPedido.Preco,
                                                    Descont:MemoriaPedido.Descont,
                                                    Quant:NumIni,
                                                    Observacao:"",
                                                    ItemEspeci:MemoriaPedido.ItemEspeci,
                                                    Sessao:MemoriaPedido.Sessao,
                                                    SubSessao:MemoriaPedido.SubSessao,
                                                    
                                                },
                                                  DigiteNaRegra:true,
                                                  Robotizado:true, 
                                                  MsgFutura1:{
                                                      Ativo:true,
                                                      Msg:AutoMsg3,
                                                      Tempo:Tempo3,
                                                  },
                                                  MsgFutura2:{
                                                      Ativo:true,
                                                      Msg:AutoMsg4,
                                                      Tempo:Tempo4,
                                                  },
                                                  MsgFutura3:{
                                                      Ativo:true,
                                                      Msg:AutoMsg5,
                                                      Tempo:Tempo5,
                                                  },
                                                  UltimaMsg:{
                                                     Autor:EMPRESA,
                                                     body:`${NomeCli}${AutoMsg}`,
                                                     date:new Date().getTime()+5000,
                                                     Type:"Botao"
                                                 },
                                                  Mensagem:admin.firestore.FieldValue.arrayUnion(
                                                    {
                                                     Autor:IdCli,
                                                     body:Mensagem.body,
                                                     date:new Date().getTime(),
                                                     Type:"text"
                                                 },
                                                 {
                                                     Autor:EMPRESA,
                                                     body:`${NomeCli}, Sua quantidade foi preenchida no item ${MemoriaPedido.Nome}`,
                                                     Botao:[],
                                                     date:new Date().getTime()+3000,
                                                     Type:"text"
                                                 },
                                                 {
                                                    Autor:EMPRESA,
                                                    body:`${NomeCli}${AutoMsg}`,
                                                    Botao:MsgEmp.Msg4E.Botao,
                                                    date:new Date().getTime()+5000,
                                                    Type:"Botao"
                                                },
                                                 
                                                 
                                                 )
                                                  })
                                                  .then(async() => {
                                                    var MsgPedido = NomeCli+", a Quantidade foi Escolhida e adicionada no pedido";
                                                     MsgPedido = MsgPedido + "\n===================\n"
                                                     MsgPedido = MsgPedido + "🛍️ "+MemoriaPedido.Sessao+"\n"
                                                     MsgPedido = MsgPedido + "📦"+MemoriaPedido.Nome+"\n"
                                                     if(MemoriaPedido.Descricao){
                                                        MsgPedido = MsgPedido + "📝"+MemoriaPedido.Descricao+"\n"
                                                     }
                                                     if(MemoriaPedido.ItemEspeci){
                                                        MsgPedido = MsgPedido + "🏷️"+MemoriaPedido.SubSessao+"\n"
                                                     }
                                                    
                                                     if(MemoriaPedido.Descont){
                                                        MsgPedido = MsgPedido + "💰 De:"+MemoriaPedido.Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                        MsgPedido = MsgPedido + "❤️ Por:"+MemoriaPedido.Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                        MsgPedido = MsgPedido + "🗳️ Quantidade: "+Mensagem.body
                                                     } else {
                                                        MsgPedido = MsgPedido + "💰"+MemoriaPedido.Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                        MsgPedido = MsgPedido + "🗳️ Quantidade: "+Mensagem.body
                                                     }
                                                        
                                                      
                                                        
                                                     
                                                   
                                                    // MemoriaSessao[NumIni].Descricao ?  MemoriaSessao[NumIni].DescontReal?MemoriaSessao[NumIni].nome+"\n"+"📝"+MemoriaSessao[NumIni].Descricao+"\n"+"❤️ De: "+"~"+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSessao[NumIni].DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :   MemoriaSessao[NumIni].nome+"\n"+"📝"+MemoriaSessao[NumIni].Descricao+"\n"+"💰 "+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n":MemoriaSessao[NumIni].DescontReal?MemoriaSessao[NumIni].nome+"\n"+"❤️ De: "+"~"+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSessao[NumIni].DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :    MemoriaSessao[NumIni].nome+"\n"+"💰 "+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n" ,
                                                   
                                                     response.json({ Inf:[{Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:MsgEmp.Msg4E.Botao , Tempo:TempMsg, Type:"butao"}] });
                                                  }) 
                                                } else {
                                                      //Mudando a Fase do Chat
                                                  await db.collection("ChatCliente")
                                                  .doc(IdChat)
                                                  .update({
                                                    FaseMsg: "Msg4E",
                                                    MemPedido:{
                                                    Nome:MemoriaPedido.Nome,
                                                    Descricao:MemoriaPedido.Descricao,
                                                    Foto:MemoriaPedido.Foto,
                                                    Preco:MemoriaPedido.Preco,
                                                    Descont:MemoriaPedido.Descont,
                                                    Quant:NumIni,
                                                    Observacao:"",
                                                    ItemEspeci:MemoriaPedido.ItemEspeci,
                                                    Sessao:MemoriaPedido.Sessao,
                                                    SubSessao:MemoriaPedido.SubSessao,
                                                },
                                                  DigiteNaRegra:true,
                                                  Robotizado:true, 
                                                  MsgFutura1:{
                                                      Ativo:true,
                                                      Msg:AutoMsg3,
                                                      Tempo:Tempo3,
                                                  },
                                                  MsgFutura2:{
                                                      Ativo:true,
                                                      Msg:AutoMsg4,
                                                      Tempo:Tempo4,
                                                  },
                                                  MsgFutura3:{
                                                      Ativo:true,
                                                      Msg:AutoMsg5,
                                                      Tempo:Tempo5,
                                                  },
                                                  UltimaMsg:{
                                                     Autor:EMPRESA,
                                                     body:`${NomeCli} ${AutoMsg}`,
                                                     date:new Date().getTime()+5000,
                                                     Type:"Botao"
                                                 },
                                                  Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                     Autor:IdCli,
                                                     body:Mensagem.body,
                                                     date:new Date().getTime(),
                                                     Type:"text"
                                                 },
                                                 {
                                                    Autor:EMPRESA,
                                                    body:`${NomeCli}, Quantidade adicionada no item: ${MemoriaPedido.Nome}`,
                                                    Botao:[],
                                                    date:new Date().getTime()+3000,
                                                    Type:"text"
                                                },
                                                {
                                                   Autor:EMPRESA,
                                                   body:`${NomeCli} ${AutoMsg}`,
                                                   Botao:MsgEmp.Msg4E.Botao,
                                                   date:new Date().getTime()+5000,
                                                   Type:"Botao"
                                               },
                                                 
                                                 
                                                 )
                                                  })
                                                  .then(async() => {
                                                    var MsgPedido = NomeCli+", a Quantidade foi Escolhida e adicionada no pedido";
                                                    MsgPedido = MsgPedido + "\n===================\n"
                                                    MsgPedido = MsgPedido + "🛍️ "+MemoriaPedido.Sessao+"\n"
                                                    MsgPedido = MsgPedido + "📦"+MemoriaPedido.Nome+"\n"
                                                    if(MemoriaPedido.Descricao){
                                                        MsgPedido = MsgPedido + "📝"+MemoriaPedido.Descricao+"\n"
                                                     }
                                                    if(MemoriaPedido.ItemEspeci){
                                                        MsgPedido = MsgPedido + "🏷️"+MemoriaPedido.SubSessao+"\n"
                                                     }
                                                   
                                                    if(MemoriaPedido.Descont){
                                                       MsgPedido = MsgPedido + "💰 De:"+MemoriaPedido.Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                       MsgPedido = MsgPedido + "❤️ Por:"+MemoriaPedido.Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                       MsgPedido = MsgPedido + "🗳️ Quantidade: "+Mensagem.body
                                                    } else {
                                                       MsgPedido = MsgPedido + "💰"+MemoriaPedido.Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                       MsgPedido = MsgPedido + "🗳️ Quantidade: "+Mensagem.body
                                                    }
                                                       
                                                     
                                                     
                                                     //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                     console.log(TempMsg)
                                                     response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:MsgEmp.Msg4E.Botao , Tempo:TempMsg, Type:"butao"}] });
                                                   
                                                    }) 
        
                                                }
                    
                    
                                                
                                          
                                            
                                                
                                              
                                                } else {
                      
                                                    if(EstaNaRegra === true && Robo === true){
                
                                                        var QMsg= MsgEmp.Msg16A.Msg.length;
                                                        var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                        var Result =parseInt(Sorteio);
                                                        var Num = Result-1;
                                                        var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                                        var TempMsg =  MsgEmp.Msg16A.TempoSeg;
                
                                                          //mensagens de estimulo para continuar o atendimento
                                                          var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                          var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                          var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                          var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                          var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                          var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                              
                                                          var Result3 =parseInt(Sorteio3);
                                                          var Result4 =parseInt(Sorteio4);
                                                          var Result5 =parseInt(Sorteio5);
                                              
                                                          var Num3 = Result3-1;
                                                          var Num4 = Result4-1;
                                                          var Num5 = Result5-1;
                                                          var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                          var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                          var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                          var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                          var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                          var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                         //Mudando a Fase do Chat
                                                        
                                                         await db.collection("ChatCliente")
                                                         .doc(IdChat)
                                                         .update({
                                                        DigiteNaRegra:false, 
                                                        MsgFutura1:{
                                                            Ativo:true,
                                                            Msg:AutoMsg3,
                                                            Tempo:Tempo3,
                                                        },
                                                        MsgFutura2:{
                                                            Ativo:true,
                                                            Msg:AutoMsg4,
                                                            Tempo:Tempo4,
                                                        },
                                                        MsgFutura3:{
                                                            Ativo:true,
                                                            Msg:AutoMsg5,
                                                            Tempo:Tempo5,
                                                        },
                                                         UltimaMsg:{
                                                            Autor:EMPRESA,
                                                            body:`${NomeCli}${AutoMsg}`,
                                                            date:new Date().getTime()+5000,
                                                            Type:"text"
                                                        },
                                                         Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                            Autor:IdCli,
                                                            body:Mensagem.body,
                                                            date:new Date().getTime(),
                                                            Type:"text"
                                                        },
                                                        {
                                                            Autor:EMPRESA,
                                                            body:`${NomeCli}${AutoMsg}`,
                                                            date:new Date().getTime()+5000,
                                                            Type:"text"
                                                        },
                                                        
                                                        
                                                        )
                                                         })
                                                         .then(async() => {
                                                            var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                            console.log(TempMsg)
                                                            response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                                  
                                                         }) 
                                                    } else  if(EstaNaRegra === false && Robo === true){
                
                                                          //mensagens de estimulo para continuar o atendimento
                                                          var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                          var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                          var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                          var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                          var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                          var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                              
                                                          var Result3 =parseInt(Sorteio3);
                                                          var Result4 =parseInt(Sorteio4);
                                                          var Result5 =parseInt(Sorteio5);
                                              
                                                          var Num3 = Result3-1;
                                                          var Num4 = Result4-1;
                                                          var Num5 = Result5-1;
                                                          var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                          var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                          var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                          var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                          var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                          var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                    
                                                      
                                                    
                                                      
                                                         //Mudando a Fase do Chat
                                                        
                                                         await db.collection("ChatCliente")
                                                         .doc(IdChat)
                                                         .update({
                                                        Robotizado:false, 
                                                        MsgFutura1:{
                                                            Ativo:true,
                                                            Msg:AutoMsg3,
                                                            Tempo:Tempo3,
                                                        },
                                                        MsgFutura2:{
                                                            Ativo:true,
                                                            Msg:AutoMsg4,
                                                            Tempo:Tempo4,
                                                        },
                                                        MsgFutura3:{
                                                            Ativo:true,
                                                            Msg:AutoMsg5,
                                                            Tempo:Tempo5,
                                                        },
                                                         })
                                                         .then(async() => {
                                                            var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                            console.log(TempMsg)
                                                            response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                  
                                                         }) 
                                                    }
                                                 }
                         
                                      
                                         
                                         } else if(FaMsg === "Msg4E" ){//Recebendo Sim ou Não de Retirar, (Não)Enviando a Nota Com A pergunta do que quer realizar ou (Sim)Perguntar o que quer retirar
                                            var NumIni = parseInt(Mensagem.body)  
                                            var QuantMen = MemoriaSessao.length;
                                            console.log("Entrada "+NumIni)
                                            console.log("Quantidade "+QuantMen)
                                              if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){
                                            
                                                    //Escolhendo os itens da sessão escolhida
                                                    var Menus = MemoriaPedido;
                                                    var PedidosItens = []
                                                  
                                                    console.log(Menus)
                    
                    
                                                      //montar a mensagem   
                                                 var QMsg= MsgEmp.Msg4G.Msg.length;
                                                 var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                 var Result =parseInt(Sorteio);
                                                 var Num = Result-1;
                                                 var AutoMsg = MsgEmp.Msg4G.Msg[Num];
                                                 var TempMsg =  MsgEmp.Msg4G.TempoSeg;
                                          
                                                 console.log(MsgEmp.Msg4B.Msg)
                                                 console.log("Qmsg: "+QMsg)       
                                                 console.log("Soteio: "+Sorteio)                 
                                                 console.log("Msg: "+AutoMsg)
        
                                                     //Mensagem parabenizando que ele acertou a digitação 
                                                var QMsg9= MsgEmp.Msg16B.Msg.length;
                                                var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                                var Result9 =parseInt(Sorteio9);
                                                var Num9 = Result9-1;
                                                var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                                var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                             
                               
                                                 var QMsg2= MsgEmp.Msg6A.Msg.length;
                                                 var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                 var Result2 =parseInt(Sorteio2);
                                                 var Num2 = Result2-1;
                                                 var AutoMsg2 = MsgEmp.Msg6A.Msg[Num2];
                                                 var TempMsg2 =  MsgEmp.Msg6A.TempoSeg;
                             
                                                //  console.log(MsgEmp.Msg3A.Msg)
                                                //  console.log("Qmsg: "+QMsg2)       
                                                //  console.log("Soteio: "+Sorteio2)                 
                                                //  console.log("Msg: "+AutoMsg2)
                                                
        
                                                  //Mensagens de estimulo 
                                                  var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                  var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                  var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                  var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                  var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                  var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                      
                                                  var Result3 =parseInt(Sorteio3);
                                                  var Result4 =parseInt(Sorteio4);
                                                  var Result5 =parseInt(Sorteio5);
                                      
                                                  var Num3 = Result3-1;
                                                  var Num4 = Result4-1;
                                                  var Num5 = Result5-1;
                                                  var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                  var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                  var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                  var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                  var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                  var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                 console.log("id : "+PedidoCri)

                                                  await db.collection("MesaItem")
                                                  .doc(PedidoCri)
                                                  .update({
                                                    Itens:admin.firestore.FieldValue.arrayUnion(MemoriaPedido) 
                                                  }).then((doc)=>{
                                                    //PedidosItens = doc.data().Itens;
                                                  })

                                                  await db.collection("MesaItem")
                                                  .doc(PedidoCri)
                                                  .get().then((doc)=>{
                                                    PedidosItens = doc.data().Itens;
                                                  })
                                                  console.log(PedidosItens)
                            
                                                  if(Robo === true && EstaNaRegra === true){
                                                  //Mudando a Fase do Chat
                                                  await db.collection("ChatCliente")
                                                  .doc(IdChat)
                                                  .update({
                                                    MemSessao:[],
                                                    MemPedido:[],
                                                    MemProdutos:[],
                                                    MemSubSessao:[],
                                                    MenSabor:0,
                                                    EscolhaSabor:0, 
                                                    Sessao:"",
                                                  FaseMsg: "Msg6A",
                                                  DigiteNaRegra:true,
                                                  Robotizado:true, 
                                                  MsgFutura1:{
                                                      Ativo:true,
                                                      Msg:AutoMsg3,
                                                      Tempo:Tempo3,
                                                  },
                                                  MsgFutura2:{
                                                      Ativo:true,
                                                      Msg:AutoMsg4,
                                                      Tempo:Tempo4,
                                                  },
                                                  MsgFutura3:{
                                                      Ativo:true,
                                                      Msg:AutoMsg5,
                                                      Tempo:Tempo5,
                                                  },
                                                  UltimaMsg:{
                                                     Autor:EMPRESA,
                                                     body:`${NomeCli}${AutoMsg2}`,
                                                     date:new Date().getTime()+5000,
                                                     Type:"botao"
                                                 },
                                                  Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                     Autor:IdCli,
                                                     body:Mensagem.body,
                                                     date:new Date().getTime(),
                                                     Type:"text"
                                                 },
                                                
                                                 {
                                                     Autor:EMPRESA,
                                                     body:`${NomeCli}${AutoMsg}`,
                                                     date:new Date().getTime()+7000,
                                                     Type:"text"
                                                 },
                                                 {
                                                    Autor:EMPRESA,
                                                    body:`${NomeCli}${AutoMsg2}`,
                                                    Botao:MsgEmp.Msg6A.Botao,
                                                    date:new Date().getTime()+8000,
                                                    Type:"botao"
                                                },
                                                 
                                                 
                                                 )
                                                  })
                                                  .then(async() => {
                                                     
                                                    var MsgPedido = NomeCli+", "+ AutoMsg;
                                                    var TotalValor = 0
                                                    for(let i in PedidosItens){
                                                        
                                                    
                                                        MsgPedido = MsgPedido + "\n===================\n"
                                                        MsgPedido = MsgPedido + "🛍️ "+PedidosItens[i].Sessao+"\n"
                                                        
                                                            MsgPedido = MsgPedido + "📦"+PedidosItens[i].Nome+"\n"
                                                            if(PedidosItens[i].Descricao){
                                                                MsgPedido = MsgPedido + "📝"+PedidosItens[i].Descricao+"\n"
                                                             }
                                                       
                                                        if(PedidosItens[i].ItemEspeci){
                                                            MsgPedido = MsgPedido + "🏷️"+PedidosItens[i].SubSessao+"\n"
                                                         }
                                                       
                                                        if(PedidosItens[i].Descont){
                                                            TotalValor = TotalValor + (PedidosItens[i].Descont*PedidosItens[i].Quant)
                                                           MsgPedido = MsgPedido + "💰 De:"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                           MsgPedido = MsgPedido + "❤️ Por:"+PedidosItens[i].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                           MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant+"\n"
                                                           if(PedidosItens[i].Observacao){
                                                            MsgPedido = MsgPedido + "⚠️ Obs.: "+PedidosItens[i].Observacao+"\n"
                                                           }
                                                        } else {
                                                            TotalValor = TotalValor + (PedidosItens[i].Preco*PedidosItens[i].Quant)
                                                           MsgPedido = MsgPedido + "💰"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                           MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant+"\n"
                                                           if(PedidosItens[i].Observacao){
                                                            MsgPedido = MsgPedido + "⚠️ Obs.: "+PedidosItens[i].Observacao+"\n"
                                                           }
                                                        }

                                                    }
                                                    MsgPedido = MsgPedido + "\n===================\n"
                                                    MsgPedido = MsgPedido + "Total : "+TotalValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                                                 
                                                       
                                                     
                                                  
                                                    response.json({ Inf:[{Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:MsgEmp.Msg6A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                                  }) 
                                                } else {
                                                      //Mudando a Fase do Chat
                                                  await db.collection("ChatCliente")
                                                  .doc(IdChat)
                                                  .update({
                                                    MemSessao:[],
                                                    MemPedido:[],
                                                    MemProdutos:[],
                                                    MemSubSessao:[],
                                                    MenSabor:0,
                                                    EscolhaSabor:0, 
                                                  FaseMsg: "Msg6A",
                                                  DigiteNaRegra:true,
                                                  Robotizado:true, 
                                                  MsgFutura1:{
                                                      Ativo:true,
                                                      Msg:AutoMsg3,
                                                      Tempo:Tempo3,
                                                  },
                                                  MsgFutura2:{
                                                      Ativo:true,
                                                      Msg:AutoMsg4,
                                                      Tempo:Tempo4,
                                                  },
                                                  MsgFutura3:{
                                                      Ativo:true,
                                                      Msg:AutoMsg5,
                                                      Tempo:Tempo5,
                                                  },
                                                  UltimaMsg:{
                                                     Autor:EMPRESA,
                                                     body:`${NomeCli}${AutoMsg}`,
                                                     date:new Date().getTime()+5000,
                                                     Type:"butao"
                                                 },
                                                  Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                     Autor:IdCli,
                                                     body:Mensagem.body,
                                                     date:new Date().getTime(),
                                                     Type:"text"
                                                 },
                                                 {
                                                    Autor:EMPRESA,
                                                    body:`${NomeCli}${AutoMsg9}`,
                                                    Botao:Menus,
                                                    date:new Date().getTime()+2000,
                                                    Type:"text"
                                                },
                                                 {
                                                     Autor:EMPRESA,
                                                     body:`${NomeCli}${AutoMsg}`,
                                                     Botao:Menus,
                                                     date:new Date().getTime()+5000,
                                                     Type:"butao"
                                                 },
                                                 {
                                                    Autor:EMPRESA,
                                                    body:`${NomeCli}${AutoMsg2}`,
                                                    Botao:MsgEmp.Msg6A.Botao,
                                                    date:new Date().getTime()+8000,
                                                    Type:"botao"
                                                },
                                                 
                                                 
                                                 )
                                                  })
                                                  .then(async() => {
                                                    var MsgPedido = NomeCli+", "+ AutoMsg;
                                                    var TotalValor = 0
                                                    for(let i in PedidosItens){
                                                        
                                                    
                                                        MsgPedido = MsgPedido + "\n===================\n"
                                                        MsgPedido = MsgPedido + "🛍️ "+PedidosItens[i].Sessao+"\n"
                                                        
                                                            MsgPedido = MsgPedido + "📦"+PedidosItens[i].Nome+"\n"
                                                            if(PedidosItens[i].Descricao){
                                                                MsgPedido = MsgPedido + "📝"+PedidosItens[i].Descricao+"\n"
                                                             }
                                                        
                                                        if(PedidosItens[i].ItemEspeci){
                                                            MsgPedido = MsgPedido + "🏷️"+PedidosItens[i].SubSessao+"\n"
                                                         }
                                                      
                                                        if(PedidosItens[i].Descont){
                                                            TotalValor = TotalValor + (PedidosItens[i].Descont*PedidosItens[i].Quant)
                                                           MsgPedido = MsgPedido + "💰 De:"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                           MsgPedido = MsgPedido + "❤️ Por:"+PedidosItens[i].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                           MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant+"\n"
                                                           if(PedidosItens[i].Observacao){
                                                            MsgPedido = MsgPedido + "⚠️ Obs.: "+PedidosItens[i].Observacao+"\n"
                                                           }
                                                        } else {
                                                            TotalValor = TotalValor + (PedidosItens[i].Preco*PedidosItens[i].Quant)
                                                           MsgPedido = MsgPedido + "💰"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                           MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant+"\n"
                                                           if(PedidosItens[i].Observacao){
                                                            MsgPedido = MsgPedido + "⚠️ Obs.: "+PedidosItens[i].Observacao+"\n"
                                                           }
                                                        }

                                                    }
                                                    MsgPedido = MsgPedido + "\n===================\n"
                                                    MsgPedido = MsgPedido + "Total : "+TotalValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                                                       
                                                     
                                                  
                                                    response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:MsgEmp.Msg6A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                                     
                                                     //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                    
                                                   
                                                  }) 
        
                                                
                    
                                            }
                                                
                                          
                                            
                                                
                                              
                                                } else  if(Mensagem.body === "1" || Mensagem.body === " 1" || Mensagem.body === "1 " || Mensagem.body === " 1 ") {
                                                
                                                 
                        
                                                          //montar a mensagem   
                                                     var QMsg= MsgEmp.Msg4F.Msg.length;
                                                     var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                     var Result =parseInt(Sorteio);
                                                     var Num = Result-1;
                                                     var AutoMsg = MsgEmp.Msg4F.Msg[Num];
                                                     var TempMsg =  MsgEmp.Msg4F.TempoSeg;
                                              
                                                    //  console.log(MsgEmp.Msg4B.Msg)
                                                    //  console.log("Qmsg: "+QMsg)       
                                                    //  console.log("Soteio: "+Sorteio)                 
                                                    //  console.log("Msg: "+AutoMsg)
            
                                                      
                                 
                                   
                                                    //  var QMsg2= MsgEmp.Msg4D.Msg.length;
                                                    //  var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                    //  var Result2 =parseInt(Sorteio2);
                                                    //  var Num2 = Result2-1;
                                                    //  var AutoMsg2 = MsgEmp.Msg4D.Msg[Num2];
                                                    //  var TempMsg2 =  MsgEmp.Msg4D.TempoSeg;
                                 
                                                    //  console.log(MsgEmp.Msg3A.Msg)
                                                    //  console.log("Qmsg: "+QMsg2)       
                                                    //  console.log("Soteio: "+Sorteio2)                 
                                                    //  console.log("Msg: "+AutoMsg2)
                                                    
        
                                                       //Mensagem parabenizando que ele acertou a digitação 
                                                       var QMsg9= MsgEmp.Msg16B.Msg.length;
                                                       var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                                       var Result9 =parseInt(Sorteio9);
                                                       var Num9 = Result9-1;
                                                       var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                                       var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
            
                                                      //Mensagens de estimulo 
                                                      var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                      var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                      var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                      var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                      var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                      var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                          
                                                      var Result3 =parseInt(Sorteio3);
                                                      var Result4 =parseInt(Sorteio4);
                                                      var Result5 =parseInt(Sorteio5);
                                          
                                                      var Num3 = Result3-1;
                                                      var Num4 = Result4-1;
                                                      var Num5 = Result5-1;
                                                      var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                      var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                      var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                      var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                      var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                      var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                
                                                      if(Robo === true && EstaNaRegra === true){
                                                      //Mudando a Fase do Chat
                                                      await db.collection("ChatCliente")
                                                      .doc(IdChat)
                                                      .update({
                                                      FaseMsg: "Msg4F",
                                                      DigiteNaRegra:true,
                                                      Robotizado:true, 
                                                      MsgFutura1:{
                                                          Ativo:true,
                                                          Msg:AutoMsg3,
                                                          Tempo:Tempo3,
                                                      },
                                                      MsgFutura2:{
                                                          Ativo:true,
                                                          Msg:AutoMsg4,
                                                          Tempo:Tempo4,
                                                      },
                                                      MsgFutura3:{
                                                          Ativo:true,
                                                          Msg:AutoMsg5,
                                                          Tempo:Tempo5,
                                                      },
                                                      UltimaMsg:{
                                                         Autor:EMPRESA,
                                                         body:`${NomeCli}${AutoMsg}`,
                                                         date:new Date().getTime()+3000,
                                                         Type:"text"
                                                     },
                                                      Mensagem:admin.firestore.FieldValue.arrayUnion(
                                                        {
                                                         Autor:IdCli,
                                                         body:Mensagem.body,
                                                         date:new Date().getTime(),
                                                         Type:"text"
                                                     },
                                                     {
                                                         Autor:EMPRESA,
                                                         body:`${NomeCli}, ${AutoMsg}`,
                                                         date:new Date().getTime()+3000,
                                                         Type:"text"
                                                     },
                                                    
                                                     
                                                     
                                                     )
                                                      })
                                                      .then(async() => {
                                                      
                                                            
                                                          
                                                            
                                                         
                                                       
                                                        // MemoriaSessao[NumIni].Descricao ?  MemoriaSessao[NumIni].DescontReal?MemoriaSessao[NumIni].nome+"\n"+"📝"+MemoriaSessao[NumIni].Descricao+"\n"+"❤️ De: "+"~"+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSessao[NumIni].DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :   MemoriaSessao[NumIni].nome+"\n"+"📝"+MemoriaSessao[NumIni].Descricao+"\n"+"💰 "+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n":MemoriaSessao[NumIni].DescontReal?MemoriaSessao[NumIni].nome+"\n"+"❤️ De: "+"~"+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSessao[NumIni].DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :    MemoriaSessao[NumIni].nome+"\n"+"💰 "+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n" ,
                                                       
                                                         response.json({ Inf:[ {Msg: `*${NomeCli}, ${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                                      }) 
                                                    } else {
                                                          //Mudando a Fase do Chat
                                                      await db.collection("ChatCliente")
                                                      .doc(IdChat)
                                                      .update({
                                                        FaseMsg: "Msg4F",
                                                      DigiteNaRegra:true,
                                                      Robotizado:true, 
                                                      MsgFutura1:{
                                                          Ativo:true,
                                                          Msg:AutoMsg3,
                                                          Tempo:Tempo3,
                                                      },
                                                      MsgFutura2:{
                                                          Ativo:true,
                                                          Msg:AutoMsg4,
                                                          Tempo:Tempo4,
                                                      },
                                                      MsgFutura3:{
                                                          Ativo:true,
                                                          Msg:AutoMsg5,
                                                          Tempo:Tempo5,
                                                      },
                                                      UltimaMsg:{
                                                         Autor:EMPRESA,
                                                         body:`${NomeCli},  ${AutoMsg}`,
                                                         date:new Date().getTime()+5000,
                                                         Type:"text"
                                                     },
                                                      Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                         Autor:IdCli,
                                                         body:Mensagem.body,
                                                         date:new Date().getTime(),
                                                         Type:"text"
                                                     },
                                                    {
                                                       Autor:EMPRESA,
                                                       body:`${NomeCli}, ${AutoMsg}`,
                                                       date:new Date().getTime()+5000,
                                                       Type:"text"
                                                   },
                                                     
                                                     
                                                     )
                                                      })
                                                      .then(async() => {
                                                     
                                                         
                                                         
                                                         //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                        
                                                         response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"},  {Msg: `*${NomeCli}, ${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                                       
                                                        }) 
            
                                                    }
                        
                        
                                                    
                                              
                                                
                                                    
                                                  
                                                    } else {
                          
                                                        if(EstaNaRegra === true && Robo === true){
                    
                                                            var QMsg= MsgEmp.Msg16A.Msg.length;
                                                            var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                            var Result =parseInt(Sorteio);
                                                            var Num = Result-1;
                                                            var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                                            var TempMsg =  MsgEmp.Msg16A.TempoSeg;
                    
                                                              //mensagens de estimulo para continuar o atendimento
                                                              var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                              var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                              var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                              var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                              var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                              var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                  
                                                              var Result3 =parseInt(Sorteio3);
                                                              var Result4 =parseInt(Sorteio4);
                                                              var Result5 =parseInt(Sorteio5);
                                                  
                                                              var Num3 = Result3-1;
                                                              var Num4 = Result4-1;
                                                              var Num5 = Result5-1;
                                                              var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                              var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                              var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                              var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                              var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                              var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                             //Mudando a Fase do Chat
                                                            
                                                             await db.collection("ChatCliente")
                                                             .doc(IdChat)
                                                             .update({
                                                            DigiteNaRegra:false, 
                                                            MsgFutura1:{
                                                                Ativo:true,
                                                                Msg:AutoMsg3,
                                                                Tempo:Tempo3,
                                                            },
                                                            MsgFutura2:{
                                                                Ativo:true,
                                                                Msg:AutoMsg4,
                                                                Tempo:Tempo4,
                                                            },
                                                            MsgFutura3:{
                                                                Ativo:true,
                                                                Msg:AutoMsg5,
                                                                Tempo:Tempo5,
                                                            },
                                                             UltimaMsg:{
                                                                Autor:EMPRESA,
                                                                body:`${NomeCli}${AutoMsg}`,
                                                                date:new Date().getTime()+5000,
                                                                Type:"text"
                                                            },
                                                             Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                Autor:IdCli,
                                                                body:Mensagem.body,
                                                                date:new Date().getTime(),
                                                                Type:"text"
                                                            },
                                                            {
                                                                Autor:EMPRESA,
                                                                body:`${NomeCli}${AutoMsg}`,
                                                                date:new Date().getTime()+5000,
                                                                Type:"text"
                                                            },
                                                            
                                                            
                                                            )
                                                             })
                                                             .then(async() => {
                                                                var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                console.log(TempMsg)
                                                                response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                                      
                                                             }) 
                                                        } else  if(EstaNaRegra === false && Robo === true){
                    
                                                              //mensagens de estimulo para continuar o atendimento
                                                              var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                              var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                              var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                              var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                              var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                              var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                  
                                                              var Result3 =parseInt(Sorteio3);
                                                              var Result4 =parseInt(Sorteio4);
                                                              var Result5 =parseInt(Sorteio5);
                                                  
                                                              var Num3 = Result3-1;
                                                              var Num4 = Result4-1;
                                                              var Num5 = Result5-1;
                                                              var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                              var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                              var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                              var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                              var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                              var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                        
                                                          
                                                        
                                                          
                                                             //Mudando a Fase do Chat
                                                            
                                                             await db.collection("ChatCliente")
                                                             .doc(IdChat)
                                                             .update({
                                                            Robotizado:false, 
                                                            MsgFutura1:{
                                                                Ativo:true,
                                                                Msg:AutoMsg3,
                                                                Tempo:Tempo3,
                                                            },
                                                            MsgFutura2:{
                                                                Ativo:true,
                                                                Msg:AutoMsg4,
                                                                Tempo:Tempo4,
                                                            },
                                                            MsgFutura3:{
                                                                Ativo:true,
                                                                Msg:AutoMsg5,
                                                                Tempo:Tempo5,
                                                            },
                                                             })
                                                             .then(async() => {
                                                                var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                console.log(TempMsg)
                                                                response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                      
                                                             }) 
                                                        }
                                                     }
                             
                                          
                                             
                                             } else if(FaMsg === "Msg4F" ){//Recebendo o Que Quer retirar, Enviando a Nota Com A pergunta do que quer realizar
                                               
                                                var QuantMen = MemoriaSessao.length;
                                                console.log("Entrada "+NumIni)
                                                console.log("Quantidade "+QuantMen)
                                                
                                                        //Escolhendo os itens da sessão escolhida
                                                        var Menus = MemoriaPedido;
                                                        var PedidosItens = []
                                                      
                                                        console.log(Menus)
                        
                        
                                                          //montar a mensagem   
                                                     var QMsg= MsgEmp.Msg4G.Msg.length;
                                                     var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                     var Result =parseInt(Sorteio);
                                                     var Num = Result-1;
                                                     var AutoMsg = MsgEmp.Msg4G.Msg[Num];
                                                     var TempMsg =  MsgEmp.Msg4G.TempoSeg;
                                              
                                                     console.log(MsgEmp.Msg4B.Msg)
                                                     console.log("Qmsg: "+QMsg)       
                                                     console.log("Soteio: "+Sorteio)                 
                                                     console.log("Msg: "+AutoMsg)
            
                                                         //Mensagem parabenizando que ele acertou a digitação 
                                                    var QMsg9= MsgEmp.Msg16B.Msg.length;
                                                    var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                                    var Result9 =parseInt(Sorteio9);
                                                    var Num9 = Result9-1;
                                                    var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                                    var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                                 
                                   
                                                     var QMsg2= MsgEmp.Msg6A.Msg.length;
                                                     var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                     var Result2 =parseInt(Sorteio2);
                                                     var Num2 = Result2-1;
                                                     var AutoMsg2 = MsgEmp.Msg6A.Msg[Num2];
                                                     var TempMsg2 =  MsgEmp.Msg6A.TempoSeg;
                                 
                                                    //  console.log(MsgEmp.Msg3A.Msg)
                                                    //  console.log("Qmsg: "+QMsg2)       
                                                    //  console.log("Soteio: "+Sorteio2)                 
                                                    //  console.log("Msg: "+AutoMsg2)
                                                    
            
                                                      //Mensagens de estimulo 
                                                      var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                      var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                      var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                      var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                      var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                      var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                          
                                                      var Result3 =parseInt(Sorteio3);
                                                      var Result4 =parseInt(Sorteio4);
                                                      var Result5 =parseInt(Sorteio5);
                                          
                                                      var Num3 = Result3-1;
                                                      var Num4 = Result4-1;
                                                      var Num5 = Result5-1;
                                                      var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                      var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                      var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                      var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                      var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                      var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                     console.log("id : "+PedidoCri)
    
                                                      await db.collection("MesaItem")
                                                      .doc(PedidoCri)
                                                      .update({
                                                        Itens:admin.firestore.FieldValue.arrayUnion({
                                                            Descont: MemoriaPedido.Descont,
                                                            Descricao:MemoriaPedido.Descricao,
                                                            Foto:MemoriaPedido.Foto,
                                                            ItemEspeci:MemoriaPedido.ItemEspeci,
                                                            Nome:MemoriaPedido.Nome,
                                                            Observacao:Mensagem.body,
                                                            Preco:MemoriaPedido.Preco,
                                                            Quant:MemoriaPedido.Quant,
                                                            ItemEspeci:MemoriaPedido.ItemEspeci,
                                                            SubSessao:MemoriaPedido.SubSessao,
                                                            Sessao:MemoriaPedido.Sessao,
                                                        }) 
                                                      }).then((doc)=>{
                                                        //PedidosItens = doc.data().Itens;
                                                      })
    
                                                      await db.collection("MesaItem")
                                                      .doc(PedidoCri)
                                                      .get().then((doc)=>{
                                                        PedidosItens = doc.data().Itens;
                                                      })
                                                      console.log(PedidosItens)
                                
                                                      if(Robo === true && EstaNaRegra === true){
                                                      //Mudando a Fase do Chat
                                                      await db.collection("ChatCliente")
                                                      .doc(IdChat)
                                                      .update({
                                                        MemSessao:[],
                                                        MemPedido:[],
                                                        MemProdutos:[],
                                                        MemSubSessao:[],
                                                        MenSabor:0,
                                                        EscolhaSabor:0, 
                                                      FaseMsg: "Msg6A",
                                                      DigiteNaRegra:true,
                                                      Robotizado:true, 
                                                      MsgFutura1:{
                                                          Ativo:true,
                                                          Msg:AutoMsg3,
                                                          Tempo:Tempo3,
                                                      },
                                                      MsgFutura2:{
                                                          Ativo:true,
                                                          Msg:AutoMsg4,
                                                          Tempo:Tempo4,
                                                      },
                                                      MsgFutura3:{
                                                          Ativo:true,
                                                          Msg:AutoMsg5,
                                                          Tempo:Tempo5,
                                                      },
                                                      UltimaMsg:{
                                                         Autor:EMPRESA,
                                                         body:`${NomeCli}${AutoMsg2}`,
                                                         date:new Date().getTime()+5000,
                                                         Type:"botao"
                                                     },
                                                      Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                         Autor:IdCli,
                                                         body:Mensagem.body,
                                                         date:new Date().getTime(),
                                                         Type:"text"
                                                     },
                                                    
                                                     {
                                                         Autor:EMPRESA,
                                                         body:`${NomeCli}${AutoMsg}`,
                                                         date:new Date().getTime()+7000,
                                                         Type:"text"
                                                     },
                                                     {
                                                        Autor:EMPRESA,
                                                        body:`${NomeCli}${AutoMsg2}`,
                                                        Botao:MsgEmp.Msg6A.Botao,
                                                        date:new Date().getTime()+8000,
                                                        Type:"botao"
                                                    },
                                                     
                                                     
                                                     )
                                                      })
                                                      .then(async() => {
                                                         
                                                        var MsgPedido = NomeCli+", "+ AutoMsg;
                                                        var TotalValor = 0
                                                        for(let i in PedidosItens){
                                                            
                                                        
                                                            MsgPedido = MsgPedido + "\n===================\n"
                                                            MsgPedido = MsgPedido + "🛍️ "+PedidosItens[i].Sessao+"\n"
                                                            
                                                                MsgPedido = MsgPedido + "📦"+PedidosItens[i].Nome+"\n"
                                                                if(PedidosItens[i].Descricao){
                                                                    MsgPedido = MsgPedido + "📝"+PedidosItens[i].Descricao+"\n"
                                                                 }
                                                            


                                                            if(PedidosItens[i].ItemEspeci){
                                                                MsgPedido = MsgPedido + "🏷️"+PedidosItens[i].SubSessao+"\n"
                                                             }
                                                            if(PedidosItens[i].Descont){
                                                                TotalValor = TotalValor + (PedidosItens[i].Descont*PedidosItens[i].Quant)
                                                               MsgPedido = MsgPedido + "💰 De:"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                               MsgPedido = MsgPedido + "❤️ Por:"+PedidosItens[i].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                               MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant+"\n"
                                                             
                                                            } else {
                                                                TotalValor = TotalValor + (PedidosItens[i].Preco*PedidosItens[i].Quant)
                                                               MsgPedido = MsgPedido + "💰"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                               MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant+"\n"
                                                            
                                                            }

                                                            if(PedidosItens[i].Observacao){
                                                                MsgPedido = MsgPedido + "⚠️ Ingredientes Tirados: "+PedidosItens[i].Observacao+"\n"
                                                               }
    
                                                        }
                                                        MsgPedido = MsgPedido + "\n===================\n"
                                                        MsgPedido = MsgPedido + "Total : "+TotalValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                                                     
                                                           
                                                         
                                                      
                                                        response.json({ Inf:[{Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:MsgEmp.Msg6A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                                      }) 
                                                    } else {
                                                          //Mudando a Fase do Chat
                                                      await db.collection("ChatCliente")
                                                      .doc(IdChat)
                                                      .update({
                                                        MemSessao:[],
                                                        MemPedido:[],
                                                        MemProdutos:[],
                                                        MemSubSessao:[],
                                                        Sessao:"",
                                                      FaseMsg: "Msg6A",
                                                      DigiteNaRegra:true,
                                                      Robotizado:true, 
                                                      MsgFutura1:{
                                                          Ativo:true,
                                                          Msg:AutoMsg3,
                                                          Tempo:Tempo3,
                                                      },
                                                      MsgFutura2:{
                                                          Ativo:true,
                                                          Msg:AutoMsg4,
                                                          Tempo:Tempo4,
                                                      },
                                                      MsgFutura3:{
                                                          Ativo:true,
                                                          Msg:AutoMsg5,
                                                          Tempo:Tempo5,
                                                      },
                                                      UltimaMsg:{
                                                         Autor:EMPRESA,
                                                         body:`${NomeCli}${AutoMsg}`,
                                                         date:new Date().getTime()+5000,
                                                         Type:"butao"
                                                     },
                                                      Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                         Autor:IdCli,
                                                         body:Mensagem.body,
                                                         date:new Date().getTime(),
                                                         Type:"text"
                                                     },
                                                     {
                                                        Autor:EMPRESA,
                                                        body:`${NomeCli}${AutoMsg9}`,
                                                        Botao:Menus,
                                                        date:new Date().getTime()+2000,
                                                        Type:"text"
                                                    },
                                                     {
                                                         Autor:EMPRESA,
                                                         body:`${NomeCli}${AutoMsg}`,
                                                         Botao:Menus,
                                                         date:new Date().getTime()+5000,
                                                         Type:"butao"
                                                     },
                                                     {
                                                        Autor:EMPRESA,
                                                        body:`${NomeCli}${AutoMsg2}`,
                                                        Botao:MsgEmp.Msg6A.Botao,
                                                        date:new Date().getTime()+8000,
                                                        Type:"botao"
                                                    },
                                                     
                                                     
                                                     )
                                                      })
                                                      .then(async() => {
                                                        var MsgPedido = NomeCli+", "+ AutoMsg;
                                                        var TotalValor = 0
                                                        for(let i in PedidosItens){
                                                            
                                                        
                                                            MsgPedido = MsgPedido + "\n===================\n"
                                                            MsgPedido = MsgPedido + "🛍️ "+PedidosItens[i].Sessao+"\n"
                                                         
                                                                MsgPedido = MsgPedido + "📦"+PedidosItens[i].Nome+"\n"
                                                                if(PedidosItens[i].Descricao){
                                                                    MsgPedido = MsgPedido + "📝"+PedidosItens[i].Descricao+"\n"
                                                                 }
                                                            
                                                            if(PedidosItens[i].ItemEspeci){
                                                                MsgPedido = MsgPedido + "🏷️"+PedidosItens[i].SubSessao+"\n"
                                                             }
                                                            if(PedidosItens[i].Descont){
                                                                TotalValor = TotalValor + (PedidosItens[i].Descont*PedidosItens[i].Quant)
                                                               MsgPedido = MsgPedido + "💰 De:"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                               MsgPedido = MsgPedido + "❤️ Por:"+PedidosItens[i].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                               MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant+"\n"
                                                               if(PedidosItens[i].Observacao){
                                                                MsgPedido = MsgPedido + "⚠️ Obs.: "+PedidosItens[i].Observacao+"\n"
                                                               }
                                                            } else {
                                                                TotalValor = TotalValor + (PedidosItens[i].Preco*PedidosItens[i].Quant)
                                                               MsgPedido = MsgPedido + "💰"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                               MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant+"\n"
                                                               if(PedidosItens[i].Observacao){
                                                                MsgPedido = MsgPedido + "⚠️ Obs.: "+PedidosItens[i].Observacao+"\n"
                                                               }
                                                            }
    
                                                        }
                                                        MsgPedido = MsgPedido + "\n===================\n"
                                                        MsgPedido = MsgPedido + "Total : "+TotalValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                                                           
                                                         
                                                      
                                                        response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:MsgEmp.Msg6A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                                         
                                                         //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                        
                                                       
                                                      }) 
            
                                                    
                        
                                                }
                                                    
                                              
                                                
                                                    
                                                  
                                                   
                                 
                                              
                                                 
                                                 } else if(FaMsg === "Msg6A" ){//Recebendo o Que Quer Realizar após a nota do Pedido, Enviando para Sessão ou Retirada de Item ou Envio de Endereço ou Adicionado Sessão
                                                    var NumIni = parseInt(Mensagem.body)  
                                                    var QuantMen = MemoriaSessao.length;
                                                    console.log("Entrada "+NumIni)
                                                    console.log("Quantidade "+QuantMen)
                                                      if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){
                                                    
                                                            //Escolhendo os itens da sessão escolhida
                                                            var Menus = MemoriaPedido;
                                                            var PedidosItens = []
                                                          
                                                            console.log(Menus)
                            
                            
                                                              //montar a mensagem   
                                                         var QMsg= MsgEmp.Msg4G.Msg.length;
                                                         var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                         var Result =parseInt(Sorteio);
                                                         var Num = Result-1;
                                                         var AutoMsg = MsgEmp.Msg4G.Msg[Num];
                                                         var TempMsg =  MsgEmp.Msg4G.TempoSeg;
                                                  
                                                         console.log(MsgEmp.Msg4B.Msg)
                                                         console.log("Qmsg: "+QMsg)       
                                                         console.log("Soteio: "+Sorteio)                 
                                                         console.log("Msg: "+AutoMsg)
                
                                                             //Mensagem parabenizando que ele acertou a digitação 
                                                        var QMsg9= MsgEmp.Msg16B.Msg.length;
                                                        var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                                        var Result9 =parseInt(Sorteio9);
                                                        var Num9 = Result9-1;
                                                        var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                                        var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                                     
                                       
                                                         var QMsg2= MsgEmp.Msg6A.Msg.length;
                                                         var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                         var Result2 =parseInt(Sorteio2);
                                                         var Num2 = Result2-1;
                                                         var AutoMsg2 = MsgEmp.Msg6A.Msg[Num2];
                                                         var TempMsg2 =  MsgEmp.Msg6A.TempoSeg;
                                     
                                                        //  console.log(MsgEmp.Msg3A.Msg)
                                                        //  console.log("Qmsg: "+QMsg2)       
                                                        //  console.log("Soteio: "+Sorteio2)                 
                                                        //  console.log("Msg: "+AutoMsg2)
                                                        
                
                                                          //Mensagens de estimulo 
                                                          var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                          var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                          var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                          var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                          var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                          var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                              
                                                          var Result3 =parseInt(Sorteio3);
                                                          var Result4 =parseInt(Sorteio4);
                                                          var Result5 =parseInt(Sorteio5);
                                              
                                                          var Num3 = Result3-1;
                                                          var Num4 = Result4-1;
                                                          var Num5 = Result5-1;
                                                          var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                          var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                          var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                          var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                          var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                          var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                         console.log("id : "+PedidoCri)
        
                                                          await db.collection("MesaItem")
                                                          .doc(PedidoCri)
                                                          .update({
                                                            Itens:admin.firestore.FieldValue.arrayUnion(MemoriaPedido) 
                                                          }).then((doc)=>{
                                                            //PedidosItens = doc.data().Itens;
                                                          })
        
                                                          await db.collection("MesaItem")
                                                          .doc(PedidoCri)
                                                          .get().then((doc)=>{
                                                            PedidosItens = doc.data().Itens;
                                                          })
                                                          console.log(PedidosItens)
                                    
                                                          if(Robo === true && EstaNaRegra === true){
                                                          //Mudando a Fase do Chat
                                                          await db.collection("ChatCliente")
                                                          .doc(IdChat)
                                                          .update({
                                                            MemSessao:[],
                                                            MemPedido:[],
                                                            MemProdutos:[],
                                                            MemSubSessao:[],
                                                            Sessao:"",
                                                          FaseMsg: "Msg6A",
                                                          DigiteNaRegra:true,
                                                          Robotizado:true, 
                                                          MsgFutura1:{
                                                              Ativo:true,
                                                              Msg:AutoMsg3,
                                                              Tempo:Tempo3,
                                                          },
                                                          MsgFutura2:{
                                                              Ativo:true,
                                                              Msg:AutoMsg4,
                                                              Tempo:Tempo4,
                                                          },
                                                          MsgFutura3:{
                                                              Ativo:true,
                                                              Msg:AutoMsg5,
                                                              Tempo:Tempo5,
                                                          },
                                                          UltimaMsg:{
                                                             Autor:EMPRESA,
                                                             body:`${NomeCli}${AutoMsg2}`,
                                                             date:new Date().getTime()+5000,
                                                             Type:"botao"
                                                         },
                                                          Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                             Autor:IdCli,
                                                             body:Mensagem.body,
                                                             date:new Date().getTime(),
                                                             Type:"text"
                                                         },
                                                        
                                                         {
                                                             Autor:EMPRESA,
                                                             body:`${NomeCli}${AutoMsg}`,
                                                             date:new Date().getTime()+7000,
                                                             Type:"text"
                                                         },
                                                         {
                                                            Autor:EMPRESA,
                                                            body:`${NomeCli}${AutoMsg2}`,
                                                            Botao:MsgEmp.Msg6A.Botao,
                                                            date:new Date().getTime()+8000,
                                                            Type:"botao"
                                                        },
                                                         
                                                         
                                                         )
                                                          })
                                                          .then(async() => {
                                                             
                                                            var MsgPedido = NomeCli+", "+ AutoMsg;
                                                            var TotalValor = 0
                                                            for(let i in PedidosItens){
                                                                
                                                            
                                                                MsgPedido = MsgPedido + "\n===================\n"
                                                                MsgPedido = MsgPedido + "📦"+PedidosItens[i].Nome+"\n"
                                                                if(PedidosItens[i].Descricao){
                                                                   MsgPedido = MsgPedido + "📝"+PedidosItens[i].Descricao+"\n"
                                                                }
                                                                if(PedidosItens[i].Descont){
                                                                    TotalValor = TotalValor + (PedidosItens[i].Descont*PedidosItens[i].Quant)
                                                                   MsgPedido = MsgPedido + "💰 De:"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                   MsgPedido = MsgPedido + "❤️ Por:"+PedidosItens[i].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                   MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant
                                                                } else {
                                                                    TotalValor = TotalValor + (PedidosItens[i].Preco*PedidosItens[i].Quant)
                                                                   MsgPedido = MsgPedido + "💰"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                   MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant
                                                                }
        
                                                            }
                                                            MsgPedido = MsgPedido + "\n===================\n"
                                                            MsgPedido = MsgPedido + "Total : "+TotalValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                                                         
                                                               
                                                             
                                                          
                                                            response.json({ Inf:[{Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:MsgEmp.Msg6A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                                          }) 
                                                        } else {
                                                              //Mudando a Fase do Chat
                                                          await db.collection("ChatCliente")
                                                          .doc(IdChat)
                                                          .update({
                                                            MemSessao:[],
                                                            MemPedido:[],
                                                            MemProdutos:[],
                                                            MemSubSessao:[],
                                                            Sessao:"",
                                                          FaseMsg: "Msg6A",
                                                          DigiteNaRegra:true,
                                                          Robotizado:true, 
                                                          MsgFutura1:{
                                                              Ativo:true,
                                                              Msg:AutoMsg3,
                                                              Tempo:Tempo3,
                                                          },
                                                          MsgFutura2:{
                                                              Ativo:true,
                                                              Msg:AutoMsg4,
                                                              Tempo:Tempo4,
                                                          },
                                                          MsgFutura3:{
                                                              Ativo:true,
                                                              Msg:AutoMsg5,
                                                              Tempo:Tempo5,
                                                          },
                                                          UltimaMsg:{
                                                             Autor:EMPRESA,
                                                             body:`${NomeCli}${AutoMsg}`,
                                                             date:new Date().getTime()+5000,
                                                             Type:"butao"
                                                         },
                                                          Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                             Autor:IdCli,
                                                             body:Mensagem.body,
                                                             date:new Date().getTime(),
                                                             Type:"text"
                                                         },
                                                         {
                                                            Autor:EMPRESA,
                                                            body:`${NomeCli}${AutoMsg9}`,
                                                            Botao:Menus,
                                                            date:new Date().getTime()+2000,
                                                            Type:"text"
                                                        },
                                                         {
                                                             Autor:EMPRESA,
                                                             body:`${NomeCli}${AutoMsg}`,
                                                             Botao:Menus,
                                                             date:new Date().getTime()+5000,
                                                             Type:"butao"
                                                         },
                                                         {
                                                            Autor:EMPRESA,
                                                            body:`${NomeCli}${AutoMsg2}`,
                                                            Botao:MsgEmp.Msg6A.Botao,
                                                            date:new Date().getTime()+8000,
                                                            Type:"botao"
                                                        },
                                                         
                                                         
                                                         )
                                                          })
                                                          .then(async() => {
                                                            var MsgPedido = NomeCli+", "+ AutoMsg;
                                                            var TotalValor = 0
                                                            for(let i in PedidosItens){
                                                                
                                                            
                                                                MsgPedido = MsgPedido + "\n===================\n"
                                                                MsgPedido = MsgPedido + "📦"+PedidosItens[i].Nome+"\n"
                                                                if(PedidosItens[i].Descricao){
                                                                   MsgPedido = MsgPedido + "📝"+PedidosItens[i].Descricao+"\n"
                                                                }
                                                                if(PedidosItens[i].Descont){
                                                                    TotalValor = TotalValor + (PedidosItens[i].Descont*PedidosItens[i].Quant)
                                                                   MsgPedido = MsgPedido + "💰 De:"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                   MsgPedido = MsgPedido + "❤️ Por:"+PedidosItens[i].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                   MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant
                                                                } else {
                                                                    TotalValor = TotalValor + (PedidosItens[i].Preco*PedidosItens[i].Quant)
                                                                   MsgPedido = MsgPedido + "💰"+PedidosItens[i].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                   MsgPedido = MsgPedido + "🗳️ Quantidade: "+PedidosItens[i].Quant
                                                                }
        
                                                            }
                                                            MsgPedido = MsgPedido + "\n===================\n"
                                                            MsgPedido = MsgPedido + "Total : "+TotalValor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
                                                               
                                                             
                                                          
                                                            response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:MsgEmp.Msg6A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                                                             
                                                             //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                            
                                                           
                                                          }) 
                
                                                        
                            
                                                    }
                                                        
                                                  
                                                    
                                                        
                                                      
                                                        } else  if(Mensagem.body === "1" || Mensagem.body === " 1" || Mensagem.body === "1 " || Mensagem.body === " 1 "){

                                                            var Menus = [{id:"0", body:"Voltar Para o Início"}]
                                                            await db.collection("MenusSite")
                                                            .where("Empresa", "==", EMPRESA)
                                                            .where("Ativo", "==", true)
                                                            .where("MemFim", "==", false)
                                                            .get().then(async (querySnapshot23) => {
                                                                await querySnapshot23.forEach((doc23) => {
                            
                                                                    Menus.push({
                                                                        id:doc23.id,
                                                                        body:doc23.data().nome,
                                                                        GrupTamanho:doc23.data().GrupTamanho,
                                                                        MemFim:doc23.data().MemFim,
                                                                        Tamanho:doc23.data().Tamanho,
                                                                    })
                                                                 
                                                                   })
                            
                                                            });
                            
                            
                                                              //montar a mensagem   
                                                         var QMsg= MsgEmp.Msg4A.Msg.length;
                                                         var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                         var Result =parseInt(Sorteio);
                                                         var Num = Result-1;
                                                         var AutoMsg = MsgEmp.Msg4A.Msg[Num];
                                                         var TempMsg =  MsgEmp.Msg4A.TempoSeg;
                                     
                                                        //  console.log(MsgEmp.Msg2A.Msg)
                                                        //  console.log("Qmsg: "+QMsg)       
                                                        //  console.log("Soteio: "+Sorteio)                 
                                                        //  console.log("Msg: "+AutoMsg)
                                     
                            
                                                       //Mensagem parabenizando que ele acertou a digitação 
                                                         var QMsg2= MsgEmp.Msg16B.Msg.length;
                                                         var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                         var Result2 =parseInt(Sorteio2);
                                                         var Num2 = Result2-1;
                                                         var AutoMsg2 = MsgEmp.Msg16B.Msg[Num2];
                                                         var TempMsg2 =  MsgEmp.Msg16B.TempoSeg;
                                                        
                                                          //mensagens de estimulo para continuar o atendimento
                                                          var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                          var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                          var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                          var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                          var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                          var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                              
                                                          var Result3 =parseInt(Sorteio3);
                                                          var Result4 =parseInt(Sorteio4);
                                                          var Result5 =parseInt(Sorteio5);
                                              
                                                          var Num3 = Result3-1;
                                                          var Num4 = Result4-1;
                                                          var Num5 = Result5-1;
                                                          var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                          var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                          var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                          var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                          var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                          var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                            
                                                   
                                                                // Aqui ta entrando pos não esta no modo rocbo e ele não digitou errado
                                                                if(Robo === true && EstaNaRegra === true){
                                                         await db.collection("ChatCliente")
                                                          .doc(IdChat)
                                                          .update({
                                                          FaseMsg: "Msg4A",
                                                          MsgFutura1:{
                                                            Ativo:true,
                                                            Msg:AutoMsg3,
                                                            Tempo:Tempo3,
                                                        },
                                                        MsgFutura2:{
                                                            Ativo:true,
                                                            Msg:AutoMsg4,
                                                            Tempo:Tempo4,
                                                        },
                                                        MsgFutura3:{
                                                            Ativo:true,
                                                            Msg:AutoMsg5,
                                                            Tempo:Tempo5,
                                                        },
                                                          MemSessao:Menus,
                                                          Reclamaçoes:null,
                                                          Localização:null,
                                                          DigiteNaRegra:true,
                                                          Robotizado:true, 
                                                          UltimaMsg:{
                                                             Autor:EMPRESA,
                                                             body:`${NomeCli}${AutoMsg}`,
                                                             date:new Date().getTime()+5000,
                                                             Type:"butao"
                                                         },
                                                          Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                             Autor:IdCli,
                                                             body:Mensagem.body,
                                                             date:new Date().getTime(),
                                                             Type:"text"
                                                         },
                                                         {
                                                             Autor:EMPRESA,
                                                             body:`${NomeCli}${AutoMsg}`,
                                                             Botao:Menus,
                                                             date:new Date().getTime()+5000,
                                                             Type:"Botao"
                                                         },
                                                         
                                                         
                                                         )
                                                          })
                                                          .then(async() => {
                                                             var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                             //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                             console.log(TempMsg)
                                                             response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                   
                                                          }) 
                                                            //aqui vai entrar por que ele ele digitou errado e não está mais no modo robo 
                                                            }else {
                                                                await db.collection("ChatCliente")
                                                                .doc(IdChat)
                                                                .update({
                                                                FaseMsg: "Msg4A",
                                                                MsgFutura1:{
                                                                    Ativo:true,
                                                                    Msg:AutoMsg3,
                                                                    Tempo:Tempo3,
                                                                },
                                                                MsgFutura2:{
                                                                    Ativo:true,
                                                                    Msg:AutoMsg4,
                                                                    Tempo:Tempo4,
                                                                },
                                                                MsgFutura3:{
                                                                    Ativo:true,
                                                                    Msg:AutoMsg5,
                                                                    Tempo:Tempo5,
                                                                },
                                                                MemSessao:Menus,
                                                                Reclamaçoes:null,
                                                                Localização:null,
                                                                DigiteNaRegra:true,
                                                                Robotizado:true, 
                                                                UltimaMsg:{
                                                                   Autor:EMPRESA,
                                                                   body:`${NomeCli}${AutoMsg}`,
                                                                   date:new Date().getTime()+5000,
                                                                   Type:"butao"
                                                               },
                                                                Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                   Autor:IdCli,
                                                                   body:Mensagem.body,
                                                                   date:new Date().getTime(),
                                                                   Type:"text"
                                                               },
                                                               {
                                                                Autor:EMPRESA,
                                                                body:`${NomeCli}${AutoMsg2}`,
                                                                date:new Date().getTime()+2000,
                                                                Type:"text"
                                                            },
                                                               {
                                                                   Autor:EMPRESA,
                                                                   body:`${NomeCli}${AutoMsg}`,
                                                                   Botao:Menus,
                                                                   date:new Date().getTime()+5000,
                                                                   Type:"Botao"
                                                               },
                                                               
                                                               
                                                               )
                                                                })
                                                                .then(async() => {
                                                                   var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                   //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                   console.log(TempMsg)
                                            
                                                                   response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg2}`, Tempo: TempMsg2, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                }) 
                            
                                                            }
                                                          //Mudando a Fase do Chat
                                                          
                                                          
                                                          
                                                            
                                                               
                                                            
                                         
                                                        
                                               
                            
                            
                                                        } else {
                                  
                                                                if(EstaNaRegra === true && Robo === true){
                            
                                                                    var QMsg= MsgEmp.Msg16A.Msg.length;
                                                                    var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                    var Result =parseInt(Sorteio);
                                                                    var Num = Result-1;
                                                                    var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                                                    var TempMsg =  MsgEmp.Msg16A.TempoSeg;
                            
                                                                      //mensagens de estimulo para continuar o atendimento
                                                                      var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                      var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                      var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                      var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                      var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                      var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                          
                                                                      var Result3 =parseInt(Sorteio3);
                                                                      var Result4 =parseInt(Sorteio4);
                                                                      var Result5 =parseInt(Sorteio5);
                                                          
                                                                      var Num3 = Result3-1;
                                                                      var Num4 = Result4-1;
                                                                      var Num5 = Result5-1;
                                                                      var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                      var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                      var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                      var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                      var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                      var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                     //Mudando a Fase do Chat
                                                                    
                                                                     await db.collection("ChatCliente")
                                                                     .doc(IdChat)
                                                                     .update({
                                                                    DigiteNaRegra:false, 
                                                                    MsgFutura1:{
                                                                        Ativo:true,
                                                                        Msg:AutoMsg3,
                                                                        Tempo:Tempo3,
                                                                    },
                                                                    MsgFutura2:{
                                                                        Ativo:true,
                                                                        Msg:AutoMsg4,
                                                                        Tempo:Tempo4,
                                                                    },
                                                                    MsgFutura3:{
                                                                        Ativo:true,
                                                                        Msg:AutoMsg5,
                                                                        Tempo:Tempo5,
                                                                    },
                                                                     UltimaMsg:{
                                                                        Autor:EMPRESA,
                                                                        body:`${NomeCli}${AutoMsg}`,
                                                                        date:new Date().getTime()+5000,
                                                                        Type:"text"
                                                                    },
                                                                     Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                        Autor:IdCli,
                                                                        body:Mensagem.body,
                                                                        date:new Date().getTime(),
                                                                        Type:"text"
                                                                    },
                                                                    {
                                                                        Autor:EMPRESA,
                                                                        body:`${NomeCli}${AutoMsg}`,
                                                                        date:new Date().getTime()+5000,
                                                                        Type:"text"
                                                                    },
                                                                    
                                                                    
                                                                    )
                                                                     })
                                                                     .then(async() => {
                                                                        var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                        //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                        console.log(TempMsg)
                                                                        response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                                              
                                                                     }) 
                                                                } else  if(EstaNaRegra === false && Robo === true){
                            
                                                                      //mensagens de estimulo para continuar o atendimento
                                                                      var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                      var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                      var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                      var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                      var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                      var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                          
                                                                      var Result3 =parseInt(Sorteio3);
                                                                      var Result4 =parseInt(Sorteio4);
                                                                      var Result5 =parseInt(Sorteio5);
                                                          
                                                                      var Num3 = Result3-1;
                                                                      var Num4 = Result4-1;
                                                                      var Num5 = Result5-1;
                                                                      var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                      var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                      var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                      var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                      var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                      var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                
                                                                  
                                                                
                                                                  
                                                                     //Mudando a Fase do Chat
                                                                    
                                                                     await db.collection("ChatCliente")
                                                                     .doc(IdChat)
                                                                     .update({
                                                                    Robotizado:false, 
                                                                    MsgFutura1:{
                                                                        Ativo:true,
                                                                        Msg:AutoMsg3,
                                                                        Tempo:Tempo3,
                                                                    },
                                                                    MsgFutura2:{
                                                                        Ativo:true,
                                                                        Msg:AutoMsg4,
                                                                        Tempo:Tempo4,
                                                                    },
                                                                    MsgFutura3:{
                                                                        Ativo:true,
                                                                        Msg:AutoMsg5,
                                                                        Tempo:Tempo5,
                                                                    },
                                                                     })
                                                                     .then(async() => {
                                                                        var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                        //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                        console.log(TempMsg)
                                                                        response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                              
                                                                     }) 
                                                                }
                                                             }
                                     
                                                  
                                                     
                                                     } else if(FaMsg === "Msg4H" ){//Recebendo A subSessão, Perguntando Quantos Sabor Ele deseja Adicionar, ou Caso a SubSessão só existe 1 Sabor Pergunta Qual Sabor Ele Escolhe
                                                        var NumIni = parseInt(Mensagem.body)  
                                                        var QuantMen = MemoriaSubSessao.length;
                                                        console.log("Entrada "+NumIni)
                                                        console.log("Quantidade "+QuantMen)
                                                         if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){

                                                            var Menus = [{id:"0", body:"Voltar Para o Início"}]
                                                            await db.collection("MenusSite")
                                                            .where("Empresa", "==", EMPRESA)
                                                            .where("Ativo", "==", true)
                                                            .where("MemFim", "==", false)
                                                            .get().then(async (querySnapshot23) => {
                                                                await querySnapshot23.forEach((doc23) => {
                            
                                                                    Menus.push({
                                                                        id:doc23.id,
                                                                        body:doc23.data().nome,
                                                                        GrupTamanho:doc23.data().GrupTamanho,
                                                                        MemFim:doc23.data().MemFim,
                                                                        Tamanho:doc23.data().Tamanho,
                                                                    })
                                                                 
                                                                   })
                            
                                                            });
                                                    console.log(Menus)
                                                            //montar a mensagem   
                                                        var QMsg= MsgEmp.Msg4A.Msg.length;
                                                        var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                        var Result =parseInt(Sorteio);
                                                        var Num = Result-1;
                                                        var AutoMsg = MsgEmp.Msg4A.Msg[Num];
                                                        var TempMsg =  MsgEmp.Msg4A.TempoSeg;
                                    
                                                    //  console.log(MsgEmp.Msg2A.Msg)
                                                    //  console.log("Qmsg: "+QMsg)       
                                                    //  console.log("Soteio: "+Sorteio)                 
                                                    //  console.log("Msg: "+AutoMsg)
                                    

                                                    //Mensagem parabenizando que ele acertou a digitação 
                                                        var QMsg2= MsgEmp.Msg16B.Msg.length;
                                                        var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                        var Result2 =parseInt(Sorteio2);
                                                        var Num2 = Result2-1;
                                                        var AutoMsg2 = MsgEmp.Msg16B.Msg[Num2];
                                                        var TempMsg2 =  MsgEmp.Msg16B.TempoSeg;
                                                    
                                                        //mensagens de estimulo para continuar o atendimento
                                                        var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                        var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                        var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                        var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                        var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                        var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                            
                                                        var Result3 =parseInt(Sorteio3);
                                                        var Result4 =parseInt(Sorteio4);
                                                        var Result5 =parseInt(Sorteio5);
                                            
                                                        var Num3 = Result3-1;
                                                        var Num4 = Result4-1;
                                                        var Num5 = Result5-1;
                                                        var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                        var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                        var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                        var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                        var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                        var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();

                                                
                                                            // Robo sendo true, ele 
                                                            if(Robo === true && EstaNaRegra === true){
                                                                console.log("Entreou A  QUI ")
                                                        await db.collection("ChatCliente")
                                                        .doc(IdChat)
                                                        .update({
                                                        FaseMsg: "Msg4A",
                                                        MsgFutura1:{
                                                        Ativo:true,
                                                        Msg:AutoMsg3,
                                                        Tempo:Tempo3,
                                                    },
                                                    MsgFutura2:{
                                                        Ativo:true,
                                                        Msg:AutoMsg4,
                                                        Tempo:Tempo4,
                                                    },
                                                    MsgFutura3:{
                                                        Ativo:true,
                                                        Msg:AutoMsg5,
                                                        Tempo:Tempo5,
                                                    },
                                                        MemSessao:Menus,
                                                        Reclamaçoes:null,
                                                        Localização:null,
                                                        DigiteNaRegra:true,
                                                        Robotizado:true, 
                                                        UltimaMsg:{
                                                            Autor:EMPRESA,
                                                            body:`${NomeCli}${AutoMsg}`,
                                                            date:new Date().getTime()+5000,
                                                            Type:"butao"
                                                        },
                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                            Autor:IdCli,
                                                            body:Mensagem.body,
                                                            date:new Date().getTime(),
                                                            Type:"text"
                                                        },
                                                        {
                                                            Autor:EMPRESA,
                                                            body:`${NomeCli}${AutoMsg}`,
                                                            Botao:Menus,
                                                            date:new Date().getTime()+5000,
                                                            Type:"Botao"
                                                        },
                                                        
                                                        
                                                        )
                                                        })
                                                        .then(async() => {
                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                            console.log("Entreou A  QUI ")
                                                            console.log(TempMsg)
                                                            response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                
                                                        }) 
                                                        
                                                        }else {
                                                            await db.collection("ChatCliente")
                                                            .doc(IdChat)
                                                            .update({
                                                            FaseMsg: "Msg4A",
                                                            MsgFutura1:{
                                                                Ativo:true,
                                                                Msg:AutoMsg3,
                                                                Tempo:Tempo3,
                                                            },
                                                            MsgFutura2:{
                                                                Ativo:true,
                                                                Msg:AutoMsg4,
                                                                Tempo:Tempo4,
                                                            },
                                                            MsgFutura3:{
                                                                Ativo:true,
                                                                Msg:AutoMsg5,
                                                                Tempo:Tempo5,
                                                            },
                                                            MemSessao:Menus,
                                                            Reclamaçoes:null,
                                                            Localização:null,
                                                            DigiteNaRegra:true,
                                                            Robotizado:true, 
                                                            UltimaMsg:{
                                                                Autor:EMPRESA,
                                                                body:`${NomeCli}${AutoMsg}`,
                                                                date:new Date().getTime()+5000,
                                                                Type:"butao"
                                                            },
                                                            Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                Autor:IdCli,
                                                                body:Mensagem.body,
                                                                date:new Date().getTime(),
                                                                Type:"text"
                                                            },
                                                            {
                                                            Autor:EMPRESA,
                                                            body:`${NomeCli}${AutoMsg2}`,
                                                            date:new Date().getTime()+2000,
                                                            Type:"text"
                                                        },
                                                            {
                                                                Autor:EMPRESA,
                                                                body:`${NomeCli}${AutoMsg}`,
                                                                Botao:Menus,
                                                                date:new Date().getTime()+5000,
                                                                Type:"Botao"
                                                            },
                                                            
                                                            
                                                            )
                                                            })
                                                            .then(async() => {
                                                            
                                                                //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                console.log(TempMsg)
                                        
                                                                response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg2}`, Tempo: TempMsg2, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                            }) 

                                                        }
                                                        //Mudando a Fase do Chat
                                                        
                                                        
                                                        
                                                        
                                                            
                                                        
                                        
                                                    
                                            
        
        
                                                    } else  if(NumIni > 0 && NumIni < QuantMen) {

                                                                                
                                                                                console.log(MemoriaSubSessao[NumIni].Nome)
                                                                                    //Escolhendo os itens da sessão escolhida
                                                                                    var Menus = []
                                                                                    var Sabor = [{id:"0", body:"Voltar para Tamanho"}]
                                                                                    for(var i = 0; i < MemoriaSubSessao[NumIni].QuantSb; i++){
                                                                                      Sabor.push({
                                                                                        id:i+1,
                                                                                        body:`${i+1} Sabor`
                                                                                      })
                                                                                    }
                            
                                                                                
                                                                                    await db.collection("ItensDaEmpresa")
                                                                                    .where("Empresa", "==", EMPRESA)
                                                                                    .where("Menu", "==", SessaoEsta)
                                                                                    .where("Ativo", "==", true)
                                                                                    .get().then(async (querySnapshot23) => {
                                                                                        Menus.push(
                                                                                            {id:"3", body:"Volar Para Sessões\n===================\n"}  
                                                                                        )
                                                                                        await querySnapshot23.forEach((doc23) => {
                                                                                        for(let i in doc23.data().GrupTamanho){
                                                                                            if(MemoriaSubSessao[NumIni].Nome === doc23.data().GrupTamanho[i].select ){
                                                                                                Menus.push({
                                                                                                    Descont:MemoriaSubSessao[NumIni].Descont,
                                                                                                    Descricao:doc23.data().Descricao,
                                                                                                    Nome: doc23.data().nome,
                                                                                                    Preco: MemoriaSubSessao[NumIni].Preco,
                                                                                                    SubSessao: MemoriaSubSessao[NumIni].Nome,
                                                                                                    Quant: doc23.data().GrupTamanho[i].Quantidade,
                                                                                                    Ilimitado: doc23.data().Ilimitado,
                                                                                                    foto: doc23.data().foto,
                                                                                                    id: doc23.id,
                                                                                                    Observacao: "",
                                                                                                    body:doc23.data().Descricao ?  MemoriaSubSessao[NumIni].Descont?doc23.data().nome+"\n"+"📝"+doc23.data().Descricao+"\n"+"❤️ De: "+"~"+MemoriaSubSessao[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSubSessao[NumIni].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :    doc23.data().nome+"\n"+"📝"+doc23.data().Descricao+"\n"+"💰 "+MemoriaSubSessao[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n":MemoriaSubSessao[NumIni].Descont?doc23.data().nome+"\n"+"❤️ De: "+"~"+MemoriaSubSessao[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSubSessao[NumIni].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :    doc23.data().nome+"\n"+"💰 "+MemoriaSubSessao[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n" ,
                                                                                                    ItemEspeci:true,
                                                                                                })
                    
                                                                                            }

                                                                                        }
                                                                                    
                                                                                        // MemPedido:{
                                                                                        //     Nome:MemoriaPedido.Nome,
                                                                                        //     Descricao:MemoriaPedido.Descricao,
                                                                                        //     Foto:MemoriaPedido.Foto,
                                                                                        //     Preco:MemoriaPedido.Preco,
                                                                                        //     Descont:MemoriaPedido.Descont,
                                                                                        //     Quant:NumIni,
                                                                                        //     Observacao:"",
                                                                                        //     ItemEspeci:false,
                                                                                            
                                                                                        // },
                                                                                        
                                                                                        })
                                                    
                                                                                    });
                                                                                    console.log(Menus)
                                                    
                                                    
                                                                                    //montar a mensagem   
                                                                                var QMsg= MsgEmp.Msg4J.Msg.length;
                                                                                var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                                var Result =parseInt(Sorteio);
                                                                                var Num = Result-1;
                                                                                var AutoMsg = MsgEmp.Msg4J.Msg[Num];
                                                                                var TempMsg =  MsgEmp.Msg4J.TempoSeg;

                                                                                 var QMsg2= MsgEmp.Msg4I.Msg.length;
                                                                                 var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                                                 var Result2 =parseInt(Sorteio2);
                                                                                 var Num2 = Result2-1;
                                                                                 var AutoMsg2 = MsgEmp.Msg4I.Msg[Num2];
                                                                                 var TempMsg2 =  MsgEmp.Msg4I.TempoSeg;
                                                                        
                                                                                console.log(MsgEmp.Msg4B.Msg)
                                                                                console.log("Qmsg: "+QMsg)       
                                                                                console.log("Soteio: "+Sorteio)                 
                                                                                console.log("Msg: "+AutoMsg)
                                        
                                                                                    //Mensagem parabenizando que ele acertou a digitação 
                                                                                var QMsg9= MsgEmp.Msg16B.Msg.length;
                                                                                var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                                                                var Result9 =parseInt(Sorteio9);
                                                                                var Num9 = Result9-1;
                                                                                var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                                                                var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                                                            
                                                            
                                                                                //  var QMsg2= MsgEmp.Msg3A.Msg.length;
                                                                                //  var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                                                //  var Result2 =parseInt(Sorteio2);
                                                                                //  var Num2 = Result2-1;
                                                                                //  var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                                                                                //  var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
                                                            
                                                                                //  console.log(MsgEmp.Msg3A.Msg)
                                                                                //  console.log("Qmsg: "+QMsg2)       
                                                                                //  console.log("Soteio: "+Sorteio2)                 
                                                                                //  console.log("Msg: "+AutoMsg2)
                                                                                
                                        
                                                                                //Mensagens de estimulo 
                                                                                var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                    
                                                                                var Result3 =parseInt(Sorteio3);
                                                                                var Result4 =parseInt(Sorteio4);
                                                                                var Result5 =parseInt(Sorteio5);
                                                                    
                                                                                var Num3 = Result3-1;
                                                                                var Num4 = Result4-1;
                                                                                var Num5 = Result5-1;
                                                                                var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                                //vendo se só tem um sabor 
                                                                                if(MemoriaSubSessao[NumIni].QuantSb > 1) {
                                                                                    if(Robo === true && EstaNaRegra === true){
                                                                                        //Mudando a Fase do Chat
                                                                                        await db.collection("ChatCliente")
                                                                                        .doc(IdChat)
                                                                                        .update({
                                                                                        FaseMsg: "Msg4J",
                                                                                        MemProdutos:Menus,
                                                                                        DigiteNaRegra:true,
                                                                                        Robotizado:true, 
                                                                                        MsgFutura1:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg3,
                                                                                            Tempo:Tempo3,
                                                                                        },
                                                                                        MsgFutura2:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg4,
                                                                                            Tempo:Tempo4,
                                                                                        },
                                                                                        MsgFutura3:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg5,
                                                                                            Tempo:Tempo5,
                                                                                        },
                                                                                        UltimaMsg:{
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"botao"
                                                                                        },
                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                            Autor:IdCli,
                                                                                            body:Mensagem.body,
                                                                                            date:new Date().getTime(),
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body: `${NomeCli}, Você Escolheu ${MemoriaSubSessao[NumIni].Nome}` ,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                            Botao:Sabor,
                                                                                            date:new Date().getTime()+7000,
                                                                                            Type:"botao"
                                                                                        },
                                                                                        
                                                                                        
                                                                                        )
                                                                                        })
                                                                                        .then(async() => {
                                                                                            
                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                            console.log(TempMsg)
                                                                                            response.json({ Inf:[{Msg: `*${NomeCli}, Você Escolheu ${MemoriaSubSessao[NumIni].Nome}, Nesse Tamanho Você Tem direito de Escolher Até ${MemoriaSubSessao[NumIni].QuantSb} Sabores*`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}, ${AutoMsg}*` , Botao:Sabor , Tempo:TempMsg, Type:"butao"}] });
                                                                                        }) 
                                                                                        } else {
                                                                                            //Mudando a Fase do Chat
                                                                                        await db.collection("ChatCliente")
                                                                                        .doc(IdChat)
                                                                                        .update({
                                                                                        FaseMsg: "Msg4J",
                                                                                        MemProdutos:Menus,
                                                                                        DigiteNaRegra:true,
                                                                                        Robotizado:true, 
                                                                                        MsgFutura1:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg3,
                                                                                            Tempo:Tempo3,
                                                                                        },
                                                                                        MsgFutura2:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg4,
                                                                                            Tempo:Tempo4,
                                                                                        },
                                                                                        MsgFutura3:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg5,
                                                                                            Tempo:Tempo5,
                                                                                        },
                                                                                        UltimaMsg:{
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"butao"
                                                                                        },
                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                            Autor:IdCli,
                                                                                            body:Mensagem.body,
                                                                                            date:new Date().getTime(),
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg9}`,
                                                                                            date:new Date().getTime()+2000,
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body: `${NomeCli}, Você Escolheu ${MemoriaSubSessao[NumIni].Nome}` ,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                            Botao:Sabor,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"butao"
                                                                                        },
                                                                                        
                                                                                        
                                                                                        )
                                                                                        })
                                                                                        .then(async() => {
                                                                                            
                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                            console.log(TempMsg)
                                                                                            response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `*${NomeCli}, Você Escolheu ${MemoriaSubSessao[NumIni].Nome}*`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}, ${AutoMsg}*` , Botao:Sabor , Tempo:TempMsg, Type:"butao"}] });
                                                                                        }) 
                                                
                                                                                        }

                                                                                } else {
                                                                                    if(Robo === true && EstaNaRegra === true){
                                                                                        //Mudando a Fase do Chat
                                                                                        await db.collection("ChatCliente")
                                                                                        .doc(IdChat)
                                                                                        .update({
                                                                                        FaseMsg: "Msg4I",
                                                                                        MemProdutos:Menus,
                                                                                        DigiteNaRegra:true,
                                                                                        Robotizado:true, 
                                                                                        MsgFutura1:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg3,
                                                                                            Tempo:Tempo3,
                                                                                        },
                                                                                        MsgFutura2:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg4,
                                                                                            Tempo:Tempo4,
                                                                                        },
                                                                                        MsgFutura3:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg5,
                                                                                            Tempo:Tempo5,
                                                                                        },
                                                                                        UltimaMsg:{
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg2}`,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"botao"
                                                                                        },
                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                            Autor:IdCli,
                                                                                            body:Mensagem.body,
                                                                                            date:new Date().getTime(),
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body: `${NomeCli}, Você Escolheu ${MemoriaSubSessao[NumIni].Nome}` ,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg2}`,
                                                                                            Botao:Menus,
                                                                                            date:new Date().getTime()+7000,
                                                                                            Type:"botao"
                                                                                        },
                                                                                        
                                                                                        
                                                                                        )
                                                                                        })
                                                                                        .then(async() => {
                                                                                            
                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                            console.log(TempMsg)
                                                                                            response.json({ Inf:[{Msg: `*${NomeCli}, Você Escolheu ${MemoriaSubSessao[NumIni].Nome}, Nesse Tamanho Você Tem direito de Escolher Até ${MemoriaSubSessao[NumIni].QuantSb} Sabor*`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}, Escolha o ${AutoMsg2}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                        }) 
                                                                                        } else {
                                                                                            //Mudando a Fase do Chat
                                                                                        await db.collection("ChatCliente")
                                                                                        .doc(IdChat)
                                                                                        .update({
                                                                                        FaseMsg: "Msg4I",
                                                                                        MemProdutos:Menus,
                                                                                        DigiteNaRegra:true,
                                                                                        Robotizado:true, 
                                                                                        MsgFutura1:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg3,
                                                                                            Tempo:Tempo3,
                                                                                        },
                                                                                        MsgFutura2:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg4,
                                                                                            Tempo:Tempo4,
                                                                                        },
                                                                                        MsgFutura3:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg5,
                                                                                            Tempo:Tempo5,
                                                                                        },
                                                                                        UltimaMsg:{
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"butao"
                                                                                        },
                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                            Autor:IdCli,
                                                                                            body:Mensagem.body,
                                                                                            date:new Date().getTime(),
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg9}`,
                                                                                            Botao:Menus,
                                                                                            date:new Date().getTime()+2000,
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body: `${NomeCli}, Você Escolheu ${MemoriaSubSessao[NumIni].Nome}` ,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                            Botao:Menus,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"butao"
                                                                                        },
                                                                                        
                                                                                        
                                                                                        )
                                                                                        })
                                                                                        .then(async() => {
                                                                                            
                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                            console.log(TempMsg)
                                                                                            response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `*${NomeCli}, Você Escolheu ${MemoriaSubSessao[NumIni].Nome}*`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}, Escolha o ${AutoMsg2}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                        }) 
                                                
                                                                                        }

                                                                                }


                                                                              
                                                    
                                                                            
                                                                                
                                                                        
                                                                            
                                                                                
                                                                            
                                                                                } else {
                                                    
                                                                                    if(EstaNaRegra === true && Robo === true){
                                                
                                                                                        var QMsg= MsgEmp.Msg16A.Msg.length;
                                                                                        var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                                        var Result =parseInt(Sorteio);
                                                                                        var Num = Result-1;
                                                                                        var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                                                                        var TempMsg =  MsgEmp.Msg16A.TempoSeg;
                                                
                                                                                        //mensagens de estimulo para continuar o atendimento
                                                                                        var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                        var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                        var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                        var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                        var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                        var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                            
                                                                                        var Result3 =parseInt(Sorteio3);
                                                                                        var Result4 =parseInt(Sorteio4);
                                                                                        var Result5 =parseInt(Sorteio5);
                                                                            
                                                                                        var Num3 = Result3-1;
                                                                                        var Num4 = Result4-1;
                                                                                        var Num5 = Result5-1;
                                                                                        var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                        var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                        var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                        var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                        var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                        var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                                        //Mudando a Fase do Chat
                                                                                        
                                                                                        await db.collection("ChatCliente")
                                                                                        .doc(IdChat)
                                                                                        .update({
                                                                                        DigiteNaRegra:false, 
                                                                                        MsgFutura1:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg3,
                                                                                            Tempo:Tempo3,
                                                                                        },
                                                                                        MsgFutura2:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg4,
                                                                                            Tempo:Tempo4,
                                                                                        },
                                                                                        MsgFutura3:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg5,
                                                                                            Tempo:Tempo5,
                                                                                        },
                                                                                        UltimaMsg:{
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"text"
                                                                                        },
                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                            Autor:IdCli,
                                                                                            body:Mensagem.body,
                                                                                            date:new Date().getTime(),
                                                                                            Type:"text"
                                                                                        },
                                                                                        {
                                                                                            Autor:EMPRESA,
                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                            date:new Date().getTime()+5000,
                                                                                            Type:"text"
                                                                                        },
                                                                                        
                                                                                        
                                                                                        )
                                                                                        })
                                                                                        .then(async() => {
                                                                                            var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                            console.log(TempMsg)
                                                                                            response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                                                                
                                                                                        }) 
                                                                                    } else  if(EstaNaRegra === false && Robo === true){
                                                
                                                                                        //mensagens de estimulo para continuar o atendimento
                                                                                        var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                        var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                        var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                        var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                        var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                        var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                            
                                                                                        var Result3 =parseInt(Sorteio3);
                                                                                        var Result4 =parseInt(Sorteio4);
                                                                                        var Result5 =parseInt(Sorteio5);
                                                                            
                                                                                        var Num3 = Result3-1;
                                                                                        var Num4 = Result4-1;
                                                                                        var Num5 = Result5-1;
                                                                                        var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                        var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                        var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                        var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                        var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                        var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                    
                                                                                    
                                                                                    
                                                                                    
                                                                                        //Mudando a Fase do Chat
                                                                                        
                                                                                        await db.collection("ChatCliente")
                                                                                        .doc(IdChat)
                                                                                        .update({
                                                                                        Robotizado:false, 
                                                                                        MsgFutura1:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg3,
                                                                                            Tempo:Tempo3,
                                                                                        },
                                                                                        MsgFutura2:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg4,
                                                                                            Tempo:Tempo4,
                                                                                        },
                                                                                        MsgFutura3:{
                                                                                            Ativo:true,
                                                                                            Msg:AutoMsg5,
                                                                                            Tempo:Tempo5,
                                                                                        },
                                                                                        })
                                                                                        .then(async() => {
                                                                                            var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                            console.log(TempMsg)
                                                                                            response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                
                                                                                        }) 
                                                                                    }
                                                                                }
                                                        
                                                                    
                                                                        
                                                        } else if(FaMsg === "Msg4J" ){//Recebendo a resposta de Quantos Sabores Ele Quer, Perguntando Qual o Sabor Que Ele Quer
                                                            var NumIni = parseInt(Mensagem.body)  
                                                            var QuantMen = MemoriaSubSessao.length;
                                                            console.log("Entrada "+NumIni)
                                                            console.log("Quantidade "+QuantMen)
                                                                if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){

                                                                var Menus = [{id:"0", body:"Voltar Para o Início"}]
                                                                await db.collection("MenusSite")
                                                                .where("Empresa", "==", EMPRESA)
                                                                .where("Ativo", "==", true)
                                                                .where("MemFim", "==", false)
                                                                .get().then(async (querySnapshot23) => {
                                                                    await querySnapshot23.forEach((doc23) => {
                                
                                                                        Menus.push({
                                                                            id:doc23.id,
                                                                            body:doc23.data().nome,
                                                                            GrupTamanho:doc23.data().GrupTamanho,
                                                                            MemFim:doc23.data().MemFim,
                                                                            Tamanho:doc23.data().Tamanho,
                                                                        })
                                                                        
                                                                        })
                                
                                                                });
                                                        console.log(Menus)
                                                                //montar a mensagem   
                                                            var QMsg= MsgEmp.Msg4A.Msg.length;
                                                            var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                            var Result =parseInt(Sorteio);
                                                            var Num = Result-1;
                                                            var AutoMsg = MsgEmp.Msg4A.Msg[Num];
                                                            var TempMsg =  MsgEmp.Msg4A.TempoSeg;
                                        
                                                        //  console.log(MsgEmp.Msg2A.Msg)
                                                        //  console.log("Qmsg: "+QMsg)       
                                                        //  console.log("Soteio: "+Sorteio)                 
                                                        //  console.log("Msg: "+AutoMsg)
                                        

                                                        //Mensagem parabenizando que ele acertou a digitação 
                                                            var QMsg2= MsgEmp.Msg16B.Msg.length;
                                                            var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                            var Result2 =parseInt(Sorteio2);
                                                            var Num2 = Result2-1;
                                                            var AutoMsg2 = MsgEmp.Msg16B.Msg[Num2];
                                                            var TempMsg2 =  MsgEmp.Msg16B.TempoSeg;
                                                        
                                                            //mensagens de estimulo para continuar o atendimento
                                                            var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                            var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                            var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                            var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                            var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                            var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                
                                                            var Result3 =parseInt(Sorteio3);
                                                            var Result4 =parseInt(Sorteio4);
                                                            var Result5 =parseInt(Sorteio5);
                                                
                                                            var Num3 = Result3-1;
                                                            var Num4 = Result4-1;
                                                            var Num5 = Result5-1;
                                                            var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                            var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                            var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                            var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                            var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                            var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();

                                                    
                                                                // Robo sendo true, ele 
                                                                if(Robo === true && EstaNaRegra === true){
                                                                    console.log("Entreou A  QUI ")
                                                            await db.collection("ChatCliente")
                                                            .doc(IdChat)
                                                            .update({
                                                            FaseMsg: "Msg4A",
                                                            MsgFutura1:{
                                                            Ativo:true,
                                                            Msg:AutoMsg3,
                                                            Tempo:Tempo3,
                                                        },
                                                        MsgFutura2:{
                                                            Ativo:true,
                                                            Msg:AutoMsg4,
                                                            Tempo:Tempo4,
                                                        },
                                                        MsgFutura3:{
                                                            Ativo:true,
                                                            Msg:AutoMsg5,
                                                            Tempo:Tempo5,
                                                        },
                                                            MemSessao:Menus,
                                                            Reclamaçoes:null,
                                                            Localização:null,
                                                            DigiteNaRegra:true,
                                                            Robotizado:true, 
                                                            UltimaMsg:{
                                                                Autor:EMPRESA,
                                                                body:`${NomeCli}${AutoMsg}`,
                                                                date:new Date().getTime()+5000,
                                                                Type:"butao"
                                                            },
                                                            Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                Autor:IdCli,
                                                                body:Mensagem.body,
                                                                date:new Date().getTime(),
                                                                Type:"text"
                                                            },
                                                            {
                                                                Autor:EMPRESA,
                                                                body:`${NomeCli}${AutoMsg}`,
                                                                Botao:Menus,
                                                                date:new Date().getTime()+5000,
                                                                Type:"Botao"
                                                            },
                                                            
                                                            
                                                            )
                                                            })
                                                            .then(async() => {
                                                                //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                console.log("Entreou A  QUI ")
                                                                console.log(TempMsg)
                                                                response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                    
                                                            }) 
                                                            
                                                            }else {
                                                                await db.collection("ChatCliente")
                                                                .doc(IdChat)
                                                                .update({
                                                                FaseMsg: "Msg4A",
                                                                MsgFutura1:{
                                                                    Ativo:true,
                                                                    Msg:AutoMsg3,
                                                                    Tempo:Tempo3,
                                                                },
                                                                MsgFutura2:{
                                                                    Ativo:true,
                                                                    Msg:AutoMsg4,
                                                                    Tempo:Tempo4,
                                                                },
                                                                MsgFutura3:{
                                                                    Ativo:true,
                                                                    Msg:AutoMsg5,
                                                                    Tempo:Tempo5,
                                                                },
                                                                MemSessao:Menus,
                                                                Reclamaçoes:null,
                                                                Localização:null,
                                                                DigiteNaRegra:true,
                                                                Robotizado:true, 
                                                                UltimaMsg:{
                                                                    Autor:EMPRESA,
                                                                    body:`${NomeCli}${AutoMsg}`,
                                                                    date:new Date().getTime()+5000,
                                                                    Type:"butao"
                                                                },
                                                                Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                    Autor:IdCli,
                                                                    body:Mensagem.body,
                                                                    date:new Date().getTime(),
                                                                    Type:"text"
                                                                },
                                                                {
                                                                Autor:EMPRESA,
                                                                body:`${NomeCli}${AutoMsg2}`,
                                                                date:new Date().getTime()+2000,
                                                                Type:"text"
                                                            },
                                                                {
                                                                    Autor:EMPRESA,
                                                                    body:`${NomeCli}${AutoMsg}`,
                                                                    Botao:Menus,
                                                                    date:new Date().getTime()+5000,
                                                                    Type:"Botao"
                                                                },
                                                                
                                                                
                                                                )
                                                                })
                                                                .then(async() => {
                                                                
                                                                    //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                    console.log(TempMsg)
                                            
                                                                    response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg2}`, Tempo: TempMsg2, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                }) 

                                                            }
                                                            //Mudando a Fase do Chat
                                                            
                                                            
                                                            
                                                            
                                                                
                                                            
                                            
                                                        
                                                
            
            
                                                        } else  if(NumIni > 0 && NumIni < QuantMen) {
                                                            
                                                                                  
                                                                                        //Escolhendo os itens da sessão escolhida
                                                                                        var Menus = MemoriaProduto
                                                                                        var Sabor = [{id:"0", body:"Voltar para Tamanho"}]
                                                                                     
                                                                                        
                                                        
                                                                                       
                                                                                        console.log(Menus)
                                                        
                                                        
                                                                                        //montar a mensagem   
                                                                                    var QMsg= MsgEmp.Msg4L.Msg.length;
                                                                                    var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                                    var Result =parseInt(Sorteio);
                                                                                    var Num = Result-1;
                                                                                    var AutoMsg = MsgEmp.Msg4L.Msg[Num];
                                                                                    var TempMsg =  MsgEmp.Msg4L.TempoSeg;

                                                                                    //  var QMsg2= MsgEmp.Msg3A.Msg.length;
                                                                                    //  var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                                                    //  var Result2 =parseInt(Sorteio2);
                                                                                    //  var Num2 = Result2-1;
                                                                                    //  var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                                                                                    //  var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
                                                                            
                                                                                   
                                            
                                                                                        //Mensagem parabenizando que ele acertou a digitação 
                                                                                    var QMsg9= MsgEmp.Msg16B.Msg.length;
                                                                                    var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                                                                    var Result9 =parseInt(Sorteio9);
                                                                                    var Num9 = Result9-1;
                                                                                    var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                                                                    var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                                                                
                                                                
                                                                                    //  var QMsg2= MsgEmp.Msg3A.Msg.length;
                                                                                    //  var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                                                    //  var Result2 =parseInt(Sorteio2);
                                                                                    //  var Num2 = Result2-1;
                                                                                    //  var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                                                                                    //  var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
                                                                
                                                                                    //  console.log(MsgEmp.Msg3A.Msg)
                                                                                    //  console.log("Qmsg: "+QMsg2)       
                                                                                    //  console.log("Soteio: "+Sorteio2)                 
                                                                                    //  console.log("Msg: "+AutoMsg2)
                                                                                    
                                            
                                                                                    //Mensagens de estimulo 
                                                                                    var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                    var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                    var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                    var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                    var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                    var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                        
                                                                                    var Result3 =parseInt(Sorteio3);
                                                                                    var Result4 =parseInt(Sorteio4);
                                                                                    var Result5 =parseInt(Sorteio5);
                                                                        
                                                                                    var Num3 = Result3-1;
                                                                                    var Num4 = Result4-1;
                                                                                    var Num5 = Result5-1;
                                                                                    var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                    var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                    var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                    var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                    var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                    var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                
                                                                                    if(Robo === true && EstaNaRegra === true){
                                                                                    //Mudando a Fase do Chat
                                                                                    await db.collection("ChatCliente")
                                                                                    .doc(IdChat)
                                                                                    .update({
                                                                                    FaseMsg: "Msg4L",
                                                                                    MenSabor: NumIni,
                                                                                    EscolhaSabor:0,   
                                                                                    DigiteNaRegra:true,
                                                                                    Robotizado:true, 
                                                                                    MsgFutura1:{
                                                                                        Ativo:true,
                                                                                        Msg:AutoMsg3,
                                                                                        Tempo:Tempo3,
                                                                                    },
                                                                                    MsgFutura2:{
                                                                                        Ativo:true,
                                                                                        Msg:AutoMsg4,
                                                                                        Tempo:Tempo4,
                                                                                    },
                                                                                    MsgFutura3:{
                                                                                        Ativo:true,
                                                                                        Msg:AutoMsg5,
                                                                                        Tempo:Tempo5,
                                                                                    },
                                                                                    UltimaMsg:{
                                                                                        Autor:EMPRESA,
                                                                                        body:`${NomeCli}${AutoMsg}`,
                                                                                        date:new Date().getTime()+5000,
                                                                                        Type:"botao"
                                                                                    },
                                                                                    Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                        Autor:IdCli,
                                                                                        body:Mensagem.body,
                                                                                        date:new Date().getTime(),
                                                                                        Type:"text"
                                                                                    },
                                                                                    {
                                                                                        Autor:EMPRESA,
                                                                                        body: `${NomeCli}, Você Escolheu ${NumIni}  Sabor${NumIni>1?"es":""}` ,
                                                                                        date:new Date().getTime()+5000,
                                                                                        Type:"text"
                                                                                    },
                                                                                    {
                                                                                        Autor:EMPRESA,
                                                                                        body: `${NomeCli}, Escolha o 1° ${AutoMsg}`,
                                                                                        Botao:Menus,
                                                                                        date:new Date().getTime()+7000,
                                                                                        Type:"botao"
                                                                                    },
                                                                                    
                                                                                    
                                                                                    )
                                                                                    })
                                                                                    .then(async() => {
                                                                                        
                                                                                        //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                        console.log(TempMsg)
                                                                                        response.json({ Inf:[{Msg: `${NomeCli}, Você Escolheu ${NumIni}  Sabor${NumIni>1?"es":""}`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}, Escolha o 1° ${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                    }) 
                                                                                    } else {
                                                                                        //Mudando a Fase do Chat
                                                                                    await db.collection("ChatCliente")
                                                                                    .doc(IdChat)
                                                                                    .update({
                                                                                    FaseMsg: "Msg4L",
                                                                                    MenSabor: NumIni,
                                                                                    EscolhaSabor:0, 
                                                                                    DigiteNaRegra:true,
                                                                                    Robotizado:true, 
                                                                                    MsgFutura1:{
                                                                                        Ativo:true,
                                                                                        Msg:AutoMsg3,
                                                                                        Tempo:Tempo3,
                                                                                    },
                                                                                    MsgFutura2:{
                                                                                        Ativo:true,
                                                                                        Msg:AutoMsg4,
                                                                                        Tempo:Tempo4,
                                                                                    },
                                                                                    MsgFutura3:{
                                                                                        Ativo:true,
                                                                                        Msg:AutoMsg5,
                                                                                        Tempo:Tempo5,
                                                                                    },
                                                                                    UltimaMsg:{
                                                                                        Autor:EMPRESA,
                                                                                        body:`${NomeCli}${AutoMsg}`,
                                                                                        date:new Date().getTime()+5000,
                                                                                        Type:"butao"
                                                                                    },
                                                                                    Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                        Autor:IdCli,
                                                                                        body:Mensagem.body,
                                                                                        date:new Date().getTime(),
                                                                                        Type:"text"
                                                                                    },
                                                                                    {
                                                                                        Autor:EMPRESA,
                                                                                        body:`${NomeCli}${AutoMsg9}`,
                                                                                        Botao:Menus,
                                                                                        date:new Date().getTime()+2000,
                                                                                        Type:"text"
                                                                                    },
                                                                                    {
                                                                                        Autor:EMPRESA,
                                                                                        body:`${NomeCli}, Você Escolheu ${NumIni}  Sabor${NumIni>1?"Es":""}` ,
                                                                                        date:new Date().getTime()+5000,
                                                                                        Type:"text"
                                                                                    },
                                                                                    {
                                                                                        Autor:EMPRESA,
                                                                                        body:`${NomeCli}, Escolha o 1° ${AutoMsg}`,
                                                                                        Botao:Menus,
                                                                                        date:new Date().getTime()+5000,
                                                                                        Type:"butao"
                                                                                    },
                                                                                    
                                                                                    
                                                                                    )
                                                                                    })
                                                                                    .then(async() => {
                                                                                        
                                                                                        //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                        console.log(TempMsg)
                                                                                        response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `${NomeCli}, Você Escolheu ${NumIni}  Sabor${NumIni>1?"Es":""}`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}, Escolha o 1° ${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                    }) 
                                            
                                                                                    }
                                                        
                                                                                
                                                                                    
                                                                            
                                                                                
                                                                                    
                                                                                
                                                                                    } else {
                                                        
                                                                                        if(EstaNaRegra === true && Robo === true){
                                                    
                                                                                            var QMsg= MsgEmp.Msg16A.Msg.length;
                                                                                            var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                                            var Result =parseInt(Sorteio);
                                                                                            var Num = Result-1;
                                                                                            var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                                                                            var TempMsg =  MsgEmp.Msg16A.TempoSeg;
                                                    
                                                                                            //mensagens de estimulo para continuar o atendimento
                                                                                            var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                            var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                            var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                            var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                            var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                            var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                                
                                                                                            var Result3 =parseInt(Sorteio3);
                                                                                            var Result4 =parseInt(Sorteio4);
                                                                                            var Result5 =parseInt(Sorteio5);
                                                                                
                                                                                            var Num3 = Result3-1;
                                                                                            var Num4 = Result4-1;
                                                                                            var Num5 = Result5-1;
                                                                                            var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                            var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                            var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                            var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                            var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                            var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                                            //Mudando a Fase do Chat
                                                                                            
                                                                                            await db.collection("ChatCliente")
                                                                                            .doc(IdChat)
                                                                                            .update({
                                                                                            DigiteNaRegra:false, 
                                                                                            MsgFutura1:{
                                                                                                Ativo:true,
                                                                                                Msg:AutoMsg3,
                                                                                                Tempo:Tempo3,
                                                                                            },
                                                                                            MsgFutura2:{
                                                                                                Ativo:true,
                                                                                                Msg:AutoMsg4,
                                                                                                Tempo:Tempo4,
                                                                                            },
                                                                                            MsgFutura3:{
                                                                                                Ativo:true,
                                                                                                Msg:AutoMsg5,
                                                                                                Tempo:Tempo5,
                                                                                            },
                                                                                            UltimaMsg:{
                                                                                                Autor:EMPRESA,
                                                                                                body:`${NomeCli}${AutoMsg}`,
                                                                                                date:new Date().getTime()+5000,
                                                                                                Type:"text"
                                                                                            },
                                                                                            Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                                Autor:IdCli,
                                                                                                body:Mensagem.body,
                                                                                                date:new Date().getTime(),
                                                                                                Type:"text"
                                                                                            },
                                                                                            {
                                                                                                Autor:EMPRESA,
                                                                                                body:`${NomeCli}${AutoMsg}`,
                                                                                                date:new Date().getTime()+5000,
                                                                                                Type:"text"
                                                                                            },
                                                                                            
                                                                                            
                                                                                            )
                                                                                            })
                                                                                            .then(async() => {
                                                                                                var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                                                //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                                console.log(TempMsg)
                                                                                                response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                                                                    
                                                                                            }) 
                                                                                        } else  if(EstaNaRegra === false && Robo === true){
                                                    
                                                                                            //mensagens de estimulo para continuar o atendimento
                                                                                            var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                            var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                            var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                            var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                            var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                            var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                                
                                                                                            var Result3 =parseInt(Sorteio3);
                                                                                            var Result4 =parseInt(Sorteio4);
                                                                                            var Result5 =parseInt(Sorteio5);
                                                                                
                                                                                            var Num3 = Result3-1;
                                                                                            var Num4 = Result4-1;
                                                                                            var Num5 = Result5-1;
                                                                                            var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                            var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                            var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                            var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                            var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                            var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                        
                                                                                        
                                                                                        
                                                                                        
                                                                                            //Mudando a Fase do Chat
                                                                                            
                                                                                            await db.collection("ChatCliente")
                                                                                            .doc(IdChat)
                                                                                            .update({
                                                                                            Robotizado:false, 
                                                                                            MsgFutura1:{
                                                                                                Ativo:true,
                                                                                                Msg:AutoMsg3,
                                                                                                Tempo:Tempo3,
                                                                                            },
                                                                                            MsgFutura2:{
                                                                                                Ativo:true,
                                                                                                Msg:AutoMsg4,
                                                                                                Tempo:Tempo4,
                                                                                            },
                                                                                            MsgFutura3:{
                                                                                                Ativo:true,
                                                                                                Msg:AutoMsg5,
                                                                                                Tempo:Tempo5,
                                                                                            },
                                                                                            })
                                                                                            .then(async() => {
                                                                                                var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                                                //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                                console.log(TempMsg)
                                                                                                response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                    
                                                                                            }) 
                                                                                        }
                                                                                    }
                                                            
                                                                        
                                                                            
                                                            } else if(FaMsg === "Msg4I" ){//Receber o Sabor da SubSessão que só tem Um sabor, e Perguntando a Quantidade
                                                                var NumIni = parseInt(Mensagem.body)  
                                                                var QuantMen = MemoriaSessao.length;
                                                                console.log("Entrada "+NumIni)
                                                                console.log("Quantidade "+QuantMen)
                                                                    if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){
                            
                                                                    var Menus = [{id:"0", body:"Voltar Para o Início"}]
                                                                    await db.collection("MenusSite")
                                                                    .where("Empresa", "==", EMPRESA)
                                                                    .where("Ativo", "==", true)
                                                                    .where("MemFim", "==", false)
                                                                    .get().then(async (querySnapshot23) => {
                                                                        await querySnapshot23.forEach((doc23) => {
                                    
                                                                            Menus.push({
                                                                                    id:doc23.id,
                                                                                body:doc23.data().nome,
                                                                                GrupTamanho:doc23.data().GrupTamanho,
                                                                                MemFim:doc23.data().MemFim,
                                                                                Tamanho:doc23.data().Tamanho,
                                                                            })
                                                                            
                                                                            })
                                    
                                                                    });
                                    
                                                                console.log(Menus)
                                                                        //montar a mensagem   
                                                                    var QMsg= MsgEmp.Msg4A.Msg.length;
                                                                    var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                    var Result =parseInt(Sorteio);
                                                                    var Num = Result-1;
                                                                    var AutoMsg = MsgEmp.Msg4A.Msg[Num];
                                                                    var TempMsg =  MsgEmp.Msg4A.TempoSeg;
                                                
                                                                //  console.log(MsgEmp.Msg2A.Msg)
                                                                //  console.log("Qmsg: "+QMsg)       
                                                                //  console.log("Soteio: "+Sorteio)                 
                                                                //  console.log("Msg: "+AutoMsg)
                                                
                                    
                                                                //Mensagem parabenizando que ele acertou a digitação 
                                                                    var QMsg2= MsgEmp.Msg16B.Msg.length;
                                                                    var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                                    var Result2 =parseInt(Sorteio2);
                                                                    var Num2 = Result2-1;
                                                                    var AutoMsg2 = MsgEmp.Msg16B.Msg[Num2];
                                                                    var TempMsg2 =  MsgEmp.Msg16B.TempoSeg;
                                                                
                                                                    //mensagens de estimulo para continuar o atendimento
                                                                    var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                    var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                    var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                    var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                    var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                    var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                        
                                                                    var Result3 =parseInt(Sorteio3);
                                                                    var Result4 =parseInt(Sorteio4);
                                                                    var Result5 =parseInt(Sorteio5);
                                                        
                                                                    var Num3 = Result3-1;
                                                                    var Num4 = Result4-1;
                                                                    var Num5 = Result5-1;
                                                                    var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                    var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                    var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                    var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                    var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                    var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                    
                                                            
                                                                        // Robo sendo true, ele 
                                                                        if(Robo === true && EstaNaRegra === true){
                                                                            console.log("Entreou A  QUI ")
                                                                    await db.collection("ChatCliente")
                                                                    .doc(IdChat)
                                                                    .update({
                                                                    FaseMsg: "Msg4A",
                                                                    MsgFutura1:{
                                                                    Ativo:true,
                                                                    Msg:AutoMsg3,
                                                                    Tempo:Tempo3,
                                                                },
                                                                MsgFutura2:{
                                                                    Ativo:true,
                                                                    Msg:AutoMsg4,
                                                                    Tempo:Tempo4,
                                                                },
                                                                MsgFutura3:{
                                                                    Ativo:true,
                                                                    Msg:AutoMsg5,
                                                                    Tempo:Tempo5,
                                                                },
                                                                    MemSessao:Menus,
                                                                    Reclamaçoes:null,
                                                                    Localização:null,
                                                                    DigiteNaRegra:true,
                                                                    Robotizado:true, 
                                                                    UltimaMsg:{
                                                                        Autor:EMPRESA,
                                                                        body:`${NomeCli}${AutoMsg}`,
                                                                        date:new Date().getTime()+5000,
                                                                        Type:"butao"
                                                                    },
                                                                    Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                        Autor:IdCli,
                                                                        body:Mensagem.body,
                                                                        date:new Date().getTime(),
                                                                        Type:"text"
                                                                    },
                                                                    {
                                                                        Autor:EMPRESA,
                                                                        body:`${NomeCli}${AutoMsg}`,
                                                                        Botao:Menus,
                                                                        date:new Date().getTime()+5000,
                                                                        Type:"Botao"
                                                                    },
                                                                    
                                                                    
                                                                    )
                                                                    })
                                                                    .then(async() => {
                                                                        //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                        console.log("Entreou A  QUI ")
                                                                        console.log(TempMsg)
                                                                        response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                            
                                                                    }) 
                                                                    
                                                                    }else {
                                                                        await db.collection("ChatCliente")
                                                                        .doc(IdChat)
                                                                        .update({
                                                                        FaseMsg: "Msg4A",
                                                                        MsgFutura1:{
                                                                            Ativo:true,
                                                                            Msg:AutoMsg3,
                                                                            Tempo:Tempo3,
                                                                        },
                                                                        MsgFutura2:{
                                                                            Ativo:true,
                                                                            Msg:AutoMsg4,
                                                                            Tempo:Tempo4,
                                                                        },
                                                                        MsgFutura3:{
                                                                            Ativo:true,
                                                                            Msg:AutoMsg5,
                                                                            Tempo:Tempo5,
                                                                        },
                                                                        MemSessao:Menus,
                                                                        Reclamaçoes:null,
                                                                        Localização:null,
                                                                        DigiteNaRegra:true,
                                                                        Robotizado:true, 
                                                                        UltimaMsg:{
                                                                            Autor:EMPRESA,
                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                            date:new Date().getTime()+5000,
                                                                            Type:"butao"
                                                                        },
                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                            Autor:IdCli,
                                                                            body:Mensagem.body,
                                                                            date:new Date().getTime(),
                                                                            Type:"text"
                                                                        },
                                                                        {
                                                                        Autor:EMPRESA,
                                                                        body:`${NomeCli}${AutoMsg2}`,
                                                                        date:new Date().getTime()+2000,
                                                                        Type:"text"
                                                                    },
                                                                        {
                                                                            Autor:EMPRESA,
                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                            Botao:Menus,
                                                                            date:new Date().getTime()+5000,
                                                                            Type:"Botao"
                                                                        },
                                                                        
                                                                        
                                                                        )
                                                                        })
                                                                        .then(async() => {
                                                                        
                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                            console.log(TempMsg)
                                                    
                                                                            response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg2}`, Tempo: TempMsg2, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                        }) 
                                    
                                                                    }
                                                                    //Mudando a Fase do Chat
                                                                    
                                                                    
                                                                    
                                                                    
                                                                        
                                                                    
                                                    
                                                                
                                                        
                                    
                                    
                                                                }else  if(NumIni > 0 && NumIni < QuantMen) {
                                                                    
                                                                        console.log(MemoriaProduto[NumIni].id)
                                                                            //Escolhendo os itens da sessão escolhida
                                                                            var Menus = []
                                                                            var Quant = [{id:"0", body:"Voltar Para os Itens"}]; 
                            
                                                                            console.log("Id :"+MemoriaProduto[NumIni].id)
                                                                            
                                                                            if(MemoriaProduto[NumIni].Ilimitado){
                                                                                for(var i = 1; i < 11; i++){
                                                                                    Quant.push({
                                                                                        id:i,
                                                                                        body:i+" Quantidade"
                                                                                    })
                                                                                    }
                            
                                                                            }else {
                                                                                if(MemoriaProduto[NumIni].Quant < 11){
                                                                                    for(var i = 1; i <= MemoriaProduto[NumIni].Quant; i++){
                                                                                        Quant.push({
                                                                                        id:i,
                                                                                        body:i+" Quantidade"
                                                                                        })
                                                                                    }
                                
                                                                                } else {
                                                                                    for(var i = 1; i < 11; i++){
                                                                                        Quant.push({
                                                                                            id:i,
                                                                                            body:i+" Quantidade"
                                                                                        })
                                                                                        }
                                                                                }
                            
                                                                            }
                                                                            
                                                                                
                                                                            
                                                                            
                                                                        console.log(Quant)
                                            
                                                                                //montar a mensagem   
                                                                            var QMsg= MsgEmp.Msg4C.Msg.length;
                                                                            var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                            var Result =parseInt(Sorteio);
                                                                            var Num = Result-1;
                                                                            var AutoMsg = MsgEmp.Msg4C.Msg[Num];
                                                                            var TempMsg =  MsgEmp.Msg4C.TempoSeg;
                                                                    
                                                                            console.log(MsgEmp.Msg4B.Msg)
                                                                            console.log("Qmsg: "+QMsg)       
                                                                            console.log("Soteio: "+Sorteio)                 
                                                                            console.log("Msg: "+AutoMsg)
                                
                                                                            
                                                        
                                                        
                                                                            var QMsg2= MsgEmp.Msg4D.Msg.length;
                                                                            var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                                            var Result2 =parseInt(Sorteio2);
                                                                            var Num2 = Result2-1;
                                                                            var AutoMsg2 = MsgEmp.Msg4D.Msg[Num2];
                                                                            var TempMsg2 =  MsgEmp.Msg4D.TempoSeg;
                                                        
                                                                        //  console.log(MsgEmp.Msg3A.Msg)
                                                                        //  console.log("Qmsg: "+QMsg2)       
                                                                        //  console.log("Soteio: "+Sorteio2)                 
                                                                        //  console.log("Msg: "+AutoMsg2)
                                                                        
                            
                                                                            //Mensagem parabenizando que ele acertou a digitação 
                                                                            var QMsg9= MsgEmp.Msg16B.Msg.length;
                                                                            var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                                                            var Result9 =parseInt(Sorteio9);
                                                                            var Num9 = Result9-1;
                                                                            var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                                                            var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                                
                                                                            //Mensagens de estimulo 
                                                                            var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                            var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                            var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                            var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                            var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                            var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                
                                                                            var Result3 =parseInt(Sorteio3);
                                                                            var Result4 =parseInt(Sorteio4);
                                                                            var Result5 =parseInt(Sorteio5);
                                                                
                                                                            var Num3 = Result3-1;
                                                                            var Num4 = Result4-1;
                                                                            var Num5 = Result5-1;
                                                                            var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                            var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                            var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                            var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                            var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                            var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                    
                                                                            if(Robo === true && EstaNaRegra === true){
                                                                            //Mudando a Fase do Chat
                                                                            await db.collection("ChatCliente")
                                                                            .doc(IdChat)
                                                                            .update({
                                                                            FaseMsg: "Msg4D",
                                                                            MemPedido:{
                                                                            Nome:[MemoriaProduto[NumIni].Nome],
                                                                            Descricao:[MemoriaProduto[NumIni].Descricao],
                                                                            Foto:[MemoriaProduto[NumIni].foto],
                                                                            Preco:MemoriaProduto[NumIni].Preco,
                                                                            Descont:MemoriaProduto[NumIni].Descont,
                                                                            SubSessao:MemoriaProduto[NumIni].SubSessao?MemoriaProduto[NumIni].SubSessao:"",
                                                                            Quant:0,
                                                                            Observacao:"",
                                                                            ItemEspeci:MemoriaProduto[NumIni].ItemEspeci?MemoriaProduto[NumIni].ItemEspeci:false,
                                                                            QuantGeral:Quant.length,
                                                                            Sessao:SessaoEsta,
                                                                        
                                                                        },
                                                                            DigiteNaRegra:true,
                                                                            Robotizado:true, 
                                                                            MsgFutura1:{
                                                                                Ativo:true,
                                                                                Msg:AutoMsg3,
                                                                                Tempo:Tempo3,
                                                                            },
                                                                            MsgFutura2:{
                                                                                Ativo:true,
                                                                                Msg:AutoMsg4,
                                                                                Tempo:Tempo4,
                                                                            },
                                                                            MsgFutura3:{
                                                                                Ativo:true,
                                                                                Msg:AutoMsg5,
                                                                                Tempo:Tempo5,
                                                                            },
                                                                            UltimaMsg:{
                                                                                Autor:EMPRESA,
                                                                                body:`${NomeCli}${AutoMsg2}`,
                                                                                Botao:Quant,
                                                                                date:new Date().getTime()+5000,
                                                                                Type:"Botao"
                                                                            },
                                                                            Mensagem:admin.firestore.FieldValue.arrayUnion(
                                                                            {
                                                                                Autor:IdCli,
                                                                                body:Mensagem.body,
                                                                                date:new Date().getTime(),
                                                                                Type:"text"
                                                                            },
                                                                            {
                                                                                Autor:EMPRESA,
                                                                                body:`${NomeCli}, ${AutoMsg}: ${MemoriaProduto[NumIni].Nome}`,
                                                                                Botao:[],
                                                                                date:new Date().getTime()+3000,
                                                                                Type:"text"
                                                                            },
                                                                            {
                                                                            Autor:EMPRESA,
                                                                            body:`${NomeCli}${AutoMsg2}`,
                                                                            Botao:Menus,
                                                                            date:new Date().getTime()+5000,
                                                                            Type:"Botao"
                                                                        },
                                                                            
                                                                            
                                                                            )
                                                                            })
                                                                            .then(async() => {
                                                                            var MsgPedido = NomeCli+AutoMsg;
                                                                                MsgPedido = MsgPedido + "\n===================\n"
                                                                                MsgPedido = MsgPedido + "🛍️ "+SessaoEsta+"\n"
                                                                                MsgPedido = MsgPedido + "📦"+MemoriaProduto[NumIni].Nome+"\n"                                                                              
                                                                                if(MemoriaProduto[NumIni].Descricao){
                                                                                    MsgPedido = MsgPedido + "📝"+MemoriaProduto[NumIni].Descricao+"\n"
                                                                                    }
                                                                                if(MemoriaProduto[NumIni].ItemEspeci){
                                                                                MsgPedido = MsgPedido + "🏷️"+MemoriaProduto[NumIni].SubSessao+"\n"
                                                                                }
                                                                              
                                                                            
                                                                                if(MemoriaProduto[NumIni].Descont){
                                                                                MsgPedido = MsgPedido + "💰 De:"+MemoriaProduto[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                                MsgPedido = MsgPedido + "❤️ Por:"+MemoriaProduto[NumIni].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                                } else {
                                                                                MsgPedido = MsgPedido + "💰"+MemoriaProduto[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                                }
                                                                                
                                                                                
                                                                                
                                                                                
                                                                            
                                                                            // MemoriaSessao[NumIni].Descricao ?  MemoriaSessao[NumIni].DescontReal?MemoriaSessao[NumIni].nome+"\n"+"📝"+MemoriaSessao[NumIni].Descricao+"\n"+"❤️ De: "+"~"+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSessao[NumIni].DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :   MemoriaSessao[NumIni].nome+"\n"+"📝"+MemoriaSessao[NumIni].Descricao+"\n"+"💰 "+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n":MemoriaSessao[NumIni].DescontReal?MemoriaSessao[NumIni].nome+"\n"+"❤️ De: "+"~"+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"~"+" Por "+MemoriaSessao[NumIni].DescontReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n"  :    MemoriaSessao[NumIni].nome+"\n"+"💰 "+MemoriaSessao[NumIni].PrecoReal.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"+"===================\n" ,
                                                                            
                                                                                response.json({ Inf:[{Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:Quant , Tempo:TempMsg2, Type:"butao"}] });
                                                                            }) 
                                                                        } else {
                                                                                //Mudando a Fase do Chat
                                                                            await db.collection("ChatCliente")
                                                                            .doc(IdChat)
                                                                            .update({
                                                                        FaseMsg: "Msg4D",
                                                                        MemPedido:{
                                                                            Nome:[MemoriaProduto[NumIni].Nome],
                                                                            Descricao:[MemoriaProduto[NumIni].Descricao],
                                                                            Foto:[MemoriaProduto[NumIni].foto],
                                                                            Preco:MemoriaProduto[NumIni].Preco,
                                                                            Descont:MemoriaProduto[NumIni].Descont,
                                                                            SubSessao:MemoriaProduto[NumIni].SubSessao,
                                                                            Quant:0,
                                                                            Observacao:"",
                                                                            ItemEspeci:MemoriaProduto[NumIni].ItemEspeci?MemoriaProduto[NumIni].ItemEspeci:false,
                                                                            QuantGeral:Quant.length,
                                                                            Sessao:SessaoEsta,
                                                                        },
                                                                        DigiteNaRegra:true,
                                                                        Robotizado:true, 
                                                                            MsgFutura1:{
                                                                                Ativo:true,
                                                                                Msg:AutoMsg3,
                                                                                Tempo:Tempo3,
                                                                            },
                                                                            MsgFutura2:{
                                                                                Ativo:true,
                                                                                Msg:AutoMsg4,
                                                                                Tempo:Tempo4,
                                                                            },
                                                                            MsgFutura3:{
                                                                                Ativo:true,
                                                                                Msg:AutoMsg5,
                                                                                Tempo:Tempo5,
                                                                            },
                                                                            UltimaMsg:{
                                                                                Autor:EMPRESA,
                                                                                body:`${NomeCli} ${AutoMsg2}`,
                                                                                Botao:Quant,
                                                                                date:new Date().getTime()+5000,
                                                                                Type:"Botao"
                                                                            },
                                                                            Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                Autor:IdCli,
                                                                                body:Mensagem.body,
                                                                                date:new Date().getTime(),
                                                                                Type:"text"
                                                                            },
                                                                            {
                                                                            Autor:EMPRESA,
                                                                            body:`${NomeCli}${AutoMsg9}`,
                                                                            Botao:[],
                                                                            date:new Date().getTime()+1000,
                                                                            Type:"text"
                                                                        },
                                                                            {
                                                                            Autor:EMPRESA,
                                                                            body:`${NomeCli}, ${AutoMsg}: ${MemoriaSessao[NumIni].Nome}`,
                                                                            Botao:[],
                                                                            date:new Date().getTime()+3000,
                                                                            Type:"text"
                                                                        },
                                                                        {
                                                                            Autor:EMPRESA,
                                                                            body:`${NomeCli} ${AutoMsg2}`,
                                                                            Botao:Menus,
                                                                            date:new Date().getTime()+5000,
                                                                            Type:"Botao"
                                                                        },
                                                                            
                                                                            
                                                                            )
                                                                            })
                                                                            .then(async() => {
                                                                            var MsgPedido = NomeCli+AutoMsg;
                                                                                MsgPedido = MsgPedido + "\n===================\n"
                                                                                MsgPedido = MsgPedido + "🛍️ "+SessaoEsta+"\n"
                                                                                MsgPedido = MsgPedido + "📦"+MemoriaProduto[NumIni].Nome+"\n"                                                                              
                                                                                if(MemoriaProduto[NumIni].Descricao){
                                                                                    MsgPedido = MsgPedido + "📝"+MemoriaProduto[NumIni].Descricao+"\n"
                                                                                    }
                                                                                if(MemoriaProduto[NumIni].ItemEspeci){
                                                                                MsgPedido = MsgPedido + "🏷️"+MemoriaProduto[NumIni].SubSessao+"\n"
                                                                                }
                                                                              
                                                                                if(MemoriaProduto[NumIni].Descont){
                                                                                MsgPedido = MsgPedido + "💰 De:"+MemoriaProduto[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                                MsgPedido = MsgPedido + "❤️ Por:"+MemoriaProduto[NumIni].Descont.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                                } else {
                                                                                MsgPedido = MsgPedido + "💰"+MemoriaProduto[NumIni].Preco.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+"\n"
                                                                                }
                                                                                
                                                                                
                                                                                
                                                                                //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                console.log(TempMsg)
                                                                                response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: MsgPedido  , Tempo:TempMsg, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg2}*` , Botao:Quant , Tempo:TempMsg2, Type:"butao"}] });
                                                                            
                                                                            }) 
                                
                                                                        }
                                            
                                            
                                                                        
                                                                    
                                                                    
                                                                        
                                                                        
                                                                        } else {
                                                
                                                                            if(EstaNaRegra === true && Robo === true){
                                        
                                                                                var QMsg= MsgEmp.Msg16A.Msg.length;
                                                                                var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                                var Result =parseInt(Sorteio);
                                                                                var Num = Result-1;
                                                                                var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                                                                var TempMsg =  MsgEmp.Msg16A.TempoSeg;
                                        
                                                                                    //mensagens de estimulo para continuar o atendimento
                                                                                    var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                    var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                    var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                    var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                    var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                    var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                        
                                                                                    var Result3 =parseInt(Sorteio3);
                                                                                    var Result4 =parseInt(Sorteio4);
                                                                                    var Result5 =parseInt(Sorteio5);
                                                                        
                                                                                    var Num3 = Result3-1;
                                                                                    var Num4 = Result4-1;
                                                                                    var Num5 = Result5-1;
                                                                                    var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                    var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                    var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                    var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                    var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                    var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                                    //Mudando a Fase do Chat
                                                                                
                                                                                    await db.collection("ChatCliente")
                                                                                    .doc(IdChat)
                                                                                    .update({
                                                                                DigiteNaRegra:false, 
                                                                                MsgFutura1:{
                                                                                    Ativo:true,
                                                                                    Msg:AutoMsg3,
                                                                                    Tempo:Tempo3,
                                                                                },
                                                                                MsgFutura2:{
                                                                                    Ativo:true,
                                                                                    Msg:AutoMsg4,
                                                                                    Tempo:Tempo4,
                                                                                },
                                                                                MsgFutura3:{
                                                                                    Ativo:true,
                                                                                    Msg:AutoMsg5,
                                                                                    Tempo:Tempo5,
                                                                                },
                                                                                    UltimaMsg:{
                                                                                    Autor:EMPRESA,
                                                                                    body:`${NomeCli}${AutoMsg}`,
                                                                                    date:new Date().getTime()+5000,
                                                                                    Type:"text"
                                                                                },
                                                                                    Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                    Autor:IdCli,
                                                                                    body:Mensagem.body,
                                                                                    date:new Date().getTime(),
                                                                                    Type:"text"
                                                                                },
                                                                                {
                                                                                    Autor:EMPRESA,
                                                                                    body:`${NomeCli}${AutoMsg}`,
                                                                                    date:new Date().getTime()+5000,
                                                                                    Type:"text"
                                                                                },
                                                                                
                                                                                
                                                                                )
                                                                                    })
                                                                                    .then(async() => {
                                                                                    var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                                    //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                    console.log(TempMsg)
                                                                                    response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                                                            
                                                                                    }) 
                                                                            } else  if(EstaNaRegra === false && Robo === true){
                                        
                                                                                    //mensagens de estimulo para continuar o atendimento
                                                                                    var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                    var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                    var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                    var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                    var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                    var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                        
                                                                                    var Result3 =parseInt(Sorteio3);
                                                                                    var Result4 =parseInt(Sorteio4);
                                                                                    var Result5 =parseInt(Sorteio5);
                                                                        
                                                                                    var Num3 = Result3-1;
                                                                                    var Num4 = Result4-1;
                                                                                    var Num5 = Result5-1;
                                                                                    var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                    var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                    var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                    var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                    var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                    var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                            
                                                                                
                                                                            
                                                                                
                                                                                    //Mudando a Fase do Chat
                                                                                
                                                                                    await db.collection("ChatCliente")
                                                                                    .doc(IdChat)
                                                                                    .update({
                                                                                Robotizado:false, 
                                                                                MsgFutura1:{
                                                                                    Ativo:true,
                                                                                    Msg:AutoMsg3,
                                                                                    Tempo:Tempo3,
                                                                                },
                                                                                MsgFutura2:{
                                                                                    Ativo:true,
                                                                                    Msg:AutoMsg4,
                                                                                    Tempo:Tempo4,
                                                                                },
                                                                                MsgFutura3:{
                                                                                    Ativo:true,
                                                                                    Msg:AutoMsg5,
                                                                                    Tempo:Tempo5,
                                                                                },
                                                                                    })
                                                                                    .then(async() => {
                                                                                    var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                                    //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                    console.log(TempMsg)
                                                                                    response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                            
                                                                                    }) 
                                                                            }
                                                                            }
                                                    
                                                                
                                                                    
                                                                    } else if(FaMsg === "Msg4L" ){//Recebendo o Sabor, Perguntando o Novo Sabor ou Enviando A Quantidade Qu Ele Quer Escolher
                                                                        var NumIni = parseInt(Mensagem.body)  
                                                                        var QuantMen = MemoriaSubSessao.length;
                                                                        console.log("Entrada "+NumIni)
                                                                        console.log("Quantidade "+QuantMen)
                                                                            if(Mensagem.body === "0" || Mensagem.body === " 0" || Mensagem.body === "0 " || Mensagem.body === " 0 "){
            
                                                                            var Menus = [{id:"0", body:"Voltar Para o Início"}]
                                                                            await db.collection("MenusSite")
                                                                            .where("Empresa", "==", EMPRESA)
                                                                            .where("Ativo", "==", true)
                                                                            .where("MemFim", "==", false)
                                                                            .get().then(async (querySnapshot23) => {
                                                                                await querySnapshot23.forEach((doc23) => {
                                            
                                                                                    Menus.push({
                                                                                        id:doc23.id,
                                                                                        body:doc23.data().nome,
                                                                                        GrupTamanho:doc23.data().GrupTamanho,
                                                                                        MemFim:doc23.data().MemFim,
                                                                                        Tamanho:doc23.data().Tamanho,
                                                                                    })
                                                                                    
                                                                                    })
                                            
                                                                            });
                                                                    console.log(Menus)
                                                                            //montar a mensagem   
                                                                        var QMsg= MsgEmp.Msg4A.Msg.length;
                                                                        var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                        var Result =parseInt(Sorteio);
                                                                        var Num = Result-1;
                                                                        var AutoMsg = MsgEmp.Msg4A.Msg[Num];
                                                                        var TempMsg =  MsgEmp.Msg4A.TempoSeg;
                                                    
                                                                    //  console.log(MsgEmp.Msg2A.Msg)
                                                                    //  console.log("Qmsg: "+QMsg)       
                                                                    //  console.log("Soteio: "+Sorteio)                 
                                                                    //  console.log("Msg: "+AutoMsg)
                                                    
            
                                                                    //Mensagem parabenizando que ele acertou a digitação 
                                                                        var QMsg2= MsgEmp.Msg16B.Msg.length;
                                                                        var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                                        var Result2 =parseInt(Sorteio2);
                                                                        var Num2 = Result2-1;
                                                                        var AutoMsg2 = MsgEmp.Msg16B.Msg[Num2];
                                                                        var TempMsg2 =  MsgEmp.Msg16B.TempoSeg;
                                                                    
                                                                        //mensagens de estimulo para continuar o atendimento
                                                                        var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                        var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                        var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                        var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                        var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                        var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                            
                                                                        var Result3 =parseInt(Sorteio3);
                                                                        var Result4 =parseInt(Sorteio4);
                                                                        var Result5 =parseInt(Sorteio5);
                                                            
                                                                        var Num3 = Result3-1;
                                                                        var Num4 = Result4-1;
                                                                        var Num5 = Result5-1;
                                                                        var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                        var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                        var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                        var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                        var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                        var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
            
                                                                
                                                                            // Robo sendo true, ele 
                                                                            if(Robo === true && EstaNaRegra === true){
                                                                                console.log("Entreou A  QUI ")
                                                                        await db.collection("ChatCliente")
                                                                        .doc(IdChat)
                                                                        .update({
                                                                        FaseMsg: "Msg4A",
                                                                        MsgFutura1:{
                                                                        Ativo:true,
                                                                        Msg:AutoMsg3,
                                                                        Tempo:Tempo3,
                                                                    },
                                                                    MsgFutura2:{
                                                                        Ativo:true,
                                                                        Msg:AutoMsg4,
                                                                        Tempo:Tempo4,
                                                                    },
                                                                    MsgFutura3:{
                                                                        Ativo:true,
                                                                        Msg:AutoMsg5,
                                                                        Tempo:Tempo5,
                                                                    },
                                                                        MemSessao:Menus,
                                                                        Reclamaçoes:null,
                                                                        Localização:null,
                                                                        DigiteNaRegra:true,
                                                                        Robotizado:true, 
                                                                        UltimaMsg:{
                                                                            Autor:EMPRESA,
                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                            date:new Date().getTime()+5000,
                                                                            Type:"butao"
                                                                        },
                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                            Autor:IdCli,
                                                                            body:Mensagem.body,
                                                                            date:new Date().getTime(),
                                                                            Type:"text"
                                                                        },
                                                                        {
                                                                            Autor:EMPRESA,
                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                            Botao:Menus,
                                                                            date:new Date().getTime()+5000,
                                                                            Type:"Botao"
                                                                        },
                                                                        
                                                                        
                                                                        )
                                                                        })
                                                                        .then(async() => {
                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                            console.log("Entreou A  QUI ")
                                                                            console.log(TempMsg)
                                                                            response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                
                                                                        }) 
                                                                        
                                                                        }else {
                                                                            await db.collection("ChatCliente")
                                                                            .doc(IdChat)
                                                                            .update({
                                                                            FaseMsg: "Msg4A",
                                                                            MsgFutura1:{
                                                                                Ativo:true,
                                                                                Msg:AutoMsg3,
                                                                                Tempo:Tempo3,
                                                                            },
                                                                            MsgFutura2:{
                                                                                Ativo:true,
                                                                                Msg:AutoMsg4,
                                                                                Tempo:Tempo4,
                                                                            },
                                                                            MsgFutura3:{
                                                                                Ativo:true,
                                                                                Msg:AutoMsg5,
                                                                                Tempo:Tempo5,
                                                                            },
                                                                            MemSessao:Menus,
                                                                            Reclamaçoes:null,
                                                                            Localização:null,
                                                                            DigiteNaRegra:true,
                                                                            Robotizado:true, 
                                                                            UltimaMsg:{
                                                                                Autor:EMPRESA,
                                                                                body:`${NomeCli}${AutoMsg}`,
                                                                                date:new Date().getTime()+5000,
                                                                                Type:"butao"
                                                                            },
                                                                            Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                Autor:IdCli,
                                                                                body:Mensagem.body,
                                                                                date:new Date().getTime(),
                                                                                Type:"text"
                                                                            },
                                                                            {
                                                                            Autor:EMPRESA,
                                                                            body:`${NomeCli}${AutoMsg2}`,
                                                                            date:new Date().getTime()+2000,
                                                                            Type:"text"
                                                                        },
                                                                            {
                                                                                Autor:EMPRESA,
                                                                                body:`${NomeCli}${AutoMsg}`,
                                                                                Botao:Menus,
                                                                                date:new Date().getTime()+5000,
                                                                                Type:"Botao"
                                                                            },
                                                                            
                                                                            
                                                                            )
                                                                            })
                                                                            .then(async() => {
                                                                            
                                                                                //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                console.log(TempMsg)
                                                        
                                                                                response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg2}`, Tempo: TempMsg2, Type:"text"}, {Msg: `*${NomeCli}${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                            }) 
            
                                                                        }
                                                                        //Mudando a Fase do Chat
                                                                        
                                                                        
                                                                        
                                                                        
                                                                            
                                                                        
                                                        
                                                                    
                                                            
                        
                        
                                                                    } else  if(NumIni > 0 && NumIni < QuantMen) {
                                                                      
                                                                                              
                                                                                                    //Escolhendo os itens da sessão escolhida
                                                                                                    var Menus = MemoriaProduto
                                                                                                    var Sabor = SaboresEsco+1
                                                                                                 
                                                                                                    
                                                                    
                                                                                                   
                                                                                                    console.log(Menus)
                                                                    
                                                                    
                                                                                                    //montar a mensagem   
                                                                                                var QMsg= MsgEmp.Msg4L.Msg.length;
                                                                                                var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                                                var Result =parseInt(Sorteio);
                                                                                                var Num = Result-1;
                                                                                                var AutoMsg = MsgEmp.Msg4L.Msg[Num];
                                                                                                var TempMsg =  MsgEmp.Msg4L.TempoSeg;
            
                                                                                                 var QMsg2= MsgEmp.Msg4D.Msg.length;
                                                                                                 var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                                                                 var Result2 = parseInt(Sorteio2);
                                                                                                 var Num2 = Result2-1;
                                                                                                 var AutoMsg2 = MsgEmp.Msg4D.Msg[Num2];
                                                                                                 var TempMsg2 =  MsgEmp.Msg4D.TempoSeg;
                                                                                        
                                                                                               
                                                        
                                                                                                    //Mensagem parabenizando que ele acertou a digitação 
                                                                                                var QMsg9= MsgEmp.Msg16B.Msg.length;
                                                                                                var Sorteio9 = Math.floor(Math.random() * (QMsg9 - 1 + 1)) + 1;
                                                                                                var Result9 =parseInt(Sorteio9);
                                                                                                var Num9 = Result9-1;
                                                                                                var AutoMsg9 = MsgEmp.Msg16B.Msg[Num9];
                                                                                                var TempMsg9 =  MsgEmp.Msg16B.TempoSeg;
                                                                            
                                                                            
                                                                                                //  var QMsg2= MsgEmp.Msg3A.Msg.length;
                                                                                                //  var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
                                                                                                //  var Result2 =parseInt(Sorteio2);
                                                                                                //  var Num2 = Result2-1;
                                                                                                //  var AutoMsg2 = MsgEmp.Msg3A.Msg[Num2];
                                                                                                //  var TempMsg2 =  MsgEmp.Msg3A.TempoSeg;
                                                                            
                                                                                                //  console.log(MsgEmp.Msg3A.Msg)
                                                                                                //  console.log("Qmsg: "+QMsg2)       
                                                                                                //  console.log("Soteio: "+Sorteio2)                 
                                                                                                //  console.log("Msg: "+AutoMsg2)
                                                                                                
                                                        
                                                                                                //Mensagens de estimulo 
                                                                                                var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                                var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                                var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                                var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                                var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                                var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                                    
                                                                                                var Result3 =parseInt(Sorteio3);
                                                                                                var Result4 =parseInt(Sorteio4);
                                                                                                var Result5 =parseInt(Sorteio5);
                                                                                    
                                                                                                var Num3 = Result3-1;
                                                                                                var Num4 = Result4-1;
                                                                                                var Num5 = Result5-1;
                                                                                                var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                                var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                                var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                                var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                                var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                                var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();




                                                                                                 if(Sabor == MemoriaSabores){



                                                                                                    var Menus = []
                                                                                                    var Quant = [{id:"0", body:"Voltar Para os Itens"}]; 
                                                    
                                                                                                    console.log("Id :"+MemoriaProduto[NumIni].id)
                                                                                                   
                                                                                                    if(MemoriaProduto[NumIni].Ilimitado){
                                                                                                        for(var i = 1; i < 11; i++){
                                                                                                            Quant.push({
                                                                                                               id:i,
                                                                                                               body:i+" Quantidade"
                                                                                                            })
                                                                                                           }
                                                    
                                                                                                    }else {
                                                                                                        if(MemoriaProduto[NumIni].Quant < 11){
                                                                                                            for(var i = 1; i <= MemoriaProduto[NumIni].Quant; i++){
                                                                                                             Quant.push({
                                                                                                                id:i,
                                                                                                                body:i+" Quantidade"
                                                                                                             })
                                                                                                            }
                                                        
                                                                                                        } else {
                                                                                                            for(var i = 1; i < 11; i++){
                                                                                                                Quant.push({
                                                                                                                   id:i,
                                                                                                                   body:i+" Quantidade"
                                                                                                                })
                                                                                                               }
                                                                                                        }
                                                    
                                                                                                    }
                                                                                                    if(Robo === true && EstaNaRegra === true){
                                                                                                        //Mudando a Fase do Chat
                                                                                                        await db.collection("ChatCliente")
                                                                                                        .doc(IdChat)
                                                                                                        .update({
                                                                                                            MemPedido:{
                                                                                                                Nome: MemoriaPedido.Nome? [...MemoriaPedido.Nome, MemoriaProduto[NumIni].Nome]: [MemoriaProduto[NumIni].Nome] ,
                                                                                                                Descricao:MemoriaPedido.Descricao ? [...MemoriaPedido.Descricao, MemoriaProduto[NumIni].Descricao]:[ MemoriaProduto[NumIni].Descricao],
                                                                                                                Foto:MemoriaPedido.Foto?[...MemoriaPedido.Foto, MemoriaProduto[NumIni].foto]:[MemoriaProduto[NumIni].foto],
                                                                                                                Preco:MemoriaProduto[NumIni].Preco,
                                                                                                                Descont:MemoriaProduto[NumIni].Descont,
                                                                                                                Sessao:SessaoEsta,
                                                                                                                SubSessao:MemoriaProduto[NumIni].SubSessao?MemoriaProduto[NumIni].SubSessao:"",
                                                                                                                Quant:0,
                                                                                                                Observacao:"",
                                                                                                                ItemEspeci:MemoriaProduto[NumIni].ItemEspeci?MemoriaProduto[NumIni].ItemEspeci:false,
                                                                                                                 QuantGeral:Quant.length,
                                                                                                            
                                                                                                            },
                                                                                                        FaseMsg: "Msg4D",
                                                                                                        EscolhaSabor:Sabor,   
                                                                                                        DigiteNaRegra:true,
                                                                                                        Robotizado:true, 
                                                                                                        MsgFutura1:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg3,
                                                                                                            Tempo:Tempo3,
                                                                                                        },
                                                                                                        MsgFutura2:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg4,
                                                                                                            Tempo:Tempo4,
                                                                                                        },
                                                                                                        MsgFutura3:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg5,
                                                                                                            Tempo:Tempo5,
                                                                                                        },
                                                                                                        UltimaMsg:{
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"botao"
                                                                                                        },
                                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                                            Autor:IdCli,
                                                                                                            body:Mensagem.body,
                                                                                                            date:new Date().getTime(),
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body: `${NomeCli}, Você Escolheu ${Sabor}  Sabor${NumIni>1?"es":""}` ,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body: `${NomeCli}, Escolha o ${Sabor+1}° ${AutoMsg}`,
                                                                                                            Botao:Menus,
                                                                                                            date:new Date().getTime()+7000,
                                                                                                            Type:"botao"
                                                                                                        },
                                                                                                        
                                                                                                        
                                                                                                        )
                                                                                                        })
                                                                                                        .then(async() => {

                                                                                                            var MsgPedido = NomeCli+AutoMsg;
                                                                                                            MsgPedido = MsgPedido + "\n===================\n"
                                                                                                            MsgPedido = MsgPedido + "🛍️ "+SessaoEsta+"\n"
                                                                                                            if(MemoriaPedido){
                    
                                                                                                            for(let j in MemoriaPedido.Nome){
                                                                                                                MsgPedido = MsgPedido + "📦"+MemoriaPedido.Nome[j]+"\n"
                                                                                                                if(MemoriaPedido.Descricao[j]){
                                                                                                                    MsgPedido = MsgPedido + "📝"+MemoriaPedido.Descricao[j]+"\n"
                                                                                                                    }
                                                                                                                }   
                                                                                                            }
                                                                                                            MsgPedido = MsgPedido + "📦"+MemoriaProduto[NumIni].Nome+"\n"
                                                                                                            if(MemoriaProduto[NumIni].Descricao){
                                                                                                               MsgPedido = MsgPedido + "📝"+MemoriaProduto[NumIni].Descricao+"\n"
                                                                                                            }
                                                                                                            if(MemoriaProduto[NumIni].ItemEspeci){
                                                                                                               MsgPedido = MsgPedido + "🏷️"+MemoriaProduto[NumIni].SubSessao+"\n"
                                                                                                            }
                                                                                                           
                                                                                                           
                                                                                                            


                                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                                            console.log(TempMsg)
                                                                                                            response.json({ Inf:[{Msg: `${NomeCli}, Você Escolheu ${Sabor}  Sabor${Sabor>1?"es":""} \n ${MsgPedido}`  , Tempo:2000, Type:"text"},  {Msg: `*${NomeCli}, ${AutoMsg2}*` , Botao:Quant , Tempo:TempMsg2, Type:"butao"}] });
                                                                                                        }) 
                                                                                                        } else {
                                                                                                            //Mudando a Fase do Chat
                                                                                                        await db.collection("ChatCliente")
                                                                                                        .doc(IdChat)
                                                                                                        .update({
                                                                                                            MemPedido:{
                                                                                                                Nome: MemoriaPedido.Nome? [...MemoriaPedido.Nome, MemoriaProduto[NumIni].Nome]: [MemoriaProduto[NumIni].Nome] ,
                                                                                                                Descricao:MemoriaPedido.Descricao ? [...MemoriaPedido.Descricao, MemoriaProduto[NumIni].Descricao]:[ MemoriaProduto[NumIni].Descricao],
                                                                                                                Foto:MemoriaPedido.Foto?[...MemoriaPedido.Foto, MemoriaProduto[NumIni].foto]:[MemoriaProduto[NumIni].foto],
                                                                                                                Preco:MemoriaProduto[NumIni].Preco,
                                                                                                                Descont:MemoriaProduto[NumIni].Descont,
                                                                                                                Sessao:SessaoEsta,
                                                                                                                SubSessao:MemoriaProduto[NumIni].SubSessao?MemoriaProduto[NumIni].SubSessao:"",
                                                                                                                Quant:0,
                                                                                                                Observacao:"",
                                                                                                                ItemEspeci:MemoriaProduto[NumIni].ItemEspeci?MemoriaProduto[NumIni].ItemEspeci:false,
                                                                                                                QuantGeral:0,
                                                                                                            
                                                                                                            },
                                                                                                        FaseMsg: "Msg4L",
                                                                                                        EscolhaSabor:Sabor, 
                                                                                                        DigiteNaRegra:true,
                                                                                                        Robotizado:true, 
                                                                                                        MsgFutura1:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg3,
                                                                                                            Tempo:Tempo3,
                                                                                                        },
                                                                                                        MsgFutura2:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg4,
                                                                                                            Tempo:Tempo4,
                                                                                                        },
                                                                                                        MsgFutura3:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg5,
                                                                                                            Tempo:Tempo5,
                                                                                                        },
                                                                                                        UltimaMsg:{
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"butao"
                                                                                                        },
                                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                                            Autor:IdCli,
                                                                                                            body:Mensagem.body,
                                                                                                            date:new Date().getTime(),
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}${AutoMsg9}`,
                                                                                                            Botao:Menus,
                                                                                                            date:new Date().getTime()+2000,
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}, Você Escolheu ${NumIni}  Sabor${NumIni>1?"Es":""}` ,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}, Escolha o ${Sabor+1}° ${AutoMsg}`,
                                                                                                            Botao:Menus,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"butao"
                                                                                                        },
                                                                                                        
                                                                                                        
                                                                                                        )
                                                                                                        })
                                                                                                        .then(async() => {
                                                                                                            var MsgPedido = NomeCli+AutoMsg;
                                                                                                            MsgPedido = MsgPedido + "\n===================\n"
                                                                                                            MsgPedido = MsgPedido + "🛍️ "+SessaoEsta+"\n"
                                                                                                            if(MemoriaPedido){
                    
                                                                                                            for(let j in MemoriaPedido.Nome){
                                                                                                                MsgPedido = MsgPedido + "📦"+MemoriaPedido.Nome[j]+"\n"
                                                                                                                if(MemoriaPedido.Descricao[j]){
                                                                                                                    MsgPedido = MsgPedido + "📝"+MemoriaPedido.Descricao[j]+"\n"
                                                                                                                    }
                                                                                                                }   
                                                                                                            }
                                                                                                            MsgPedido = MsgPedido + "📦"+MemoriaProduto[NumIni].Nome+"\n"
                                                                                                            if(MemoriaProduto[NumIni].Descricao){
                                                                                                               MsgPedido = MsgPedido + "📝"+MemoriaProduto[NumIni].Descricao+"\n"
                                                                                                            }
                                                                                                            if(MemoriaProduto[NumIni].ItemEspeci){
                                                                                                               MsgPedido = MsgPedido + "🏷️"+MemoriaProduto[NumIni].SubSessao+"\n"
                                                                                                            }
                                                                                                            
                                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                                            console.log(TempMsg)
                                                                                                            response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `${NomeCli}, Você Escolheu ${Sabor}  Sabor${Sabor>1?"es":""} \n ${MsgPedido}`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}, Escolha o ${Sabor+1}° ${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                                        }) 
                                                                
                                                                                                        }
                                                                                                 } else {
                                                                                                    if(Robo === true && EstaNaRegra === true){
                                                                                                        //Mudando a Fase do Chat
                                                                                                        await db.collection("ChatCliente")
                                                                                                        .doc(IdChat)
                                                                                                        .update({
                                                                                                            MemPedido:{
                                                                                                                Nome: MemoriaPedido.Nome? [...MemoriaPedido.Nome, MemoriaProduto[NumIni].Nome]: [MemoriaProduto[NumIni].Nome] ,
                                                                                                                Descricao:MemoriaPedido.Descricao ? [...MemoriaPedido.Descricao, MemoriaProduto[NumIni].Descricao]:[ MemoriaProduto[NumIni].Descricao],
                                                                                                                Foto:MemoriaPedido.Foto?[...MemoriaPedido.Foto, MemoriaProduto[NumIni].foto]:[MemoriaProduto[NumIni].foto],
                                                                                                                Preco:MemoriaProduto[NumIni].Preco,
                                                                                                                Descont:MemoriaProduto[NumIni].Descont,
                                                                                                                Sessao:SessaoEsta,
                                                                                                                SubSessao:MemoriaProduto[NumIni].SubSessao?MemoriaProduto[NumIni].SubSessao:"",
                                                                                                                Quant:0,
                                                                                                                Observacao:"",
                                                                                                                ItemEspeci:MemoriaProduto[NumIni].ItemEspeci?MemoriaProduto[NumIni].ItemEspeci:false,
                                                                                                                QuantGeral:0,
                                                                                                            
                                                                                                            },
                                                                                                        FaseMsg: "Msg4L",
                                                                                                        EscolhaSabor:Sabor,   
                                                                                                        DigiteNaRegra:true,
                                                                                                        Robotizado:true, 
                                                                                                        MsgFutura1:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg3,
                                                                                                            Tempo:Tempo3,
                                                                                                        },
                                                                                                        MsgFutura2:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg4,
                                                                                                            Tempo:Tempo4,
                                                                                                        },
                                                                                                        MsgFutura3:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg5,
                                                                                                            Tempo:Tempo5,
                                                                                                        },
                                                                                                        UltimaMsg:{
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"botao"
                                                                                                        },
                                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                                            Autor:IdCli,
                                                                                                            body:Mensagem.body,
                                                                                                            date:new Date().getTime(),
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body: `${NomeCli}, Você Escolheu ${Sabor}  Sabor${NumIni>1?"es":""}` ,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body: `${NomeCli}, Escolha o ${Sabor+1}° ${AutoMsg}`,
                                                                                                            Botao:Menus,
                                                                                                            date:new Date().getTime()+7000,
                                                                                                            Type:"botao"
                                                                                                        },
                                                                                                        
                                                                                                        
                                                                                                        )
                                                                                                        })
                                                                                                        .then(async() => {

                                                                                                            var MsgPedido = NomeCli+AutoMsg;
                                                                                                            MsgPedido = MsgPedido + "\n===================\n"
                                                                                                            MsgPedido = MsgPedido + "🛍️ "+SessaoEsta+"\n"
                                                                                                            if(MemoriaPedido){
                    
                                                                                                            for(let j in MemoriaPedido.Nome){
                                                                                                                MsgPedido = MsgPedido + "📦"+MemoriaPedido.Nome[j]+"\n"
                                                                                                                if(MemoriaPedido.Descricao[j]){
                                                                                                                    MsgPedido = MsgPedido + "📝"+MemoriaPedido.Descricao[j]+"\n"
                                                                                                                    }
                                                                                                                }   
                                                                                                            }
                                                                                                            MsgPedido = MsgPedido + "📦"+MemoriaProduto[NumIni].Nome+"\n"
                                                                                                            if(MemoriaProduto[NumIni].Descricao){
                                                                                                               MsgPedido = MsgPedido + "📝"+MemoriaProduto[NumIni].Descricao+"\n"
                                                                                                            }
                                                                                                            if(MemoriaProduto[NumIni].ItemEspeci){
                                                                                                               MsgPedido = MsgPedido + "🏷️"+MemoriaProduto[NumIni].SubSessao+"\n"
                                                                                                            }
                                                                                                           
                                                                                                           
                                                                                                            


                                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                                            console.log(TempMsg)
                                                                                                            response.json({ Inf:[{Msg: `${NomeCli}, Você Escolheu ${Sabor}  Sabor${Sabor>1?"es":""} \n ${MsgPedido}`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}, Escolha o ${Sabor+1}° ${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                                        }) 
                                                                                                        } else {
                                                                                                            //Mudando a Fase do Chat
                                                                                                        await db.collection("ChatCliente")
                                                                                                        .doc(IdChat)
                                                                                                        .update({
                                                                                                            MemPedido:{
                                                                                                                Nome: MemoriaPedido.Nome? [...MemoriaPedido.Nome, MemoriaProduto[NumIni].Nome]: [MemoriaProduto[NumIni].Nome] ,
                                                                                                                Descricao:MemoriaPedido.Descricao ? [...MemoriaPedido.Descricao, MemoriaProduto[NumIni].Descricao]:[ MemoriaProduto[NumIni].Descricao],
                                                                                                                Foto:MemoriaPedido.Foto?[...MemoriaPedido.Foto, MemoriaProduto[NumIni].foto]:[MemoriaProduto[NumIni].foto],
                                                                                                                Preco:MemoriaProduto[NumIni].Preco,
                                                                                                                Descont:MemoriaProduto[NumIni].Descont,
                                                                                                                Sessao:SessaoEsta,
                                                                                                                SubSessao:MemoriaProduto[NumIni].SubSessao?MemoriaProduto[NumIni].SubSessao:"",
                                                                                                                Quant:0,
                                                                                                                Observacao:"",
                                                                                                                ItemEspeci:MemoriaProduto[NumIni].ItemEspeci?MemoriaProduto[NumIni].ItemEspeci:false,
                                                                                                                QuantGeral:0,
                                                                                                            
                                                                                                            },
                                                                                                        FaseMsg: "Msg4L",
                                                                                                        EscolhaSabor:Sabor, 
                                                                                                        DigiteNaRegra:true,
                                                                                                        Robotizado:true, 
                                                                                                        MsgFutura1:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg3,
                                                                                                            Tempo:Tempo3,
                                                                                                        },
                                                                                                        MsgFutura2:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg4,
                                                                                                            Tempo:Tempo4,
                                                                                                        },
                                                                                                        MsgFutura3:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg5,
                                                                                                            Tempo:Tempo5,
                                                                                                        },
                                                                                                        UltimaMsg:{
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"butao"
                                                                                                        },
                                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                                            Autor:IdCli,
                                                                                                            body:Mensagem.body,
                                                                                                            date:new Date().getTime(),
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}${AutoMsg9}`,
                                                                                                            Botao:Menus,
                                                                                                            date:new Date().getTime()+2000,
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}, Você Escolheu ${NumIni}  Sabor${NumIni>1?"Es":""}` ,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}, Escolha o ${Sabor+1}° ${AutoMsg}`,
                                                                                                            Botao:Menus,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"butao"
                                                                                                        },
                                                                                                        
                                                                                                        
                                                                                                        )
                                                                                                        })
                                                                                                        .then(async() => {
                                                                                                            var MsgPedido = NomeCli+AutoMsg;
                                                                                                            MsgPedido = MsgPedido + "\n===================\n"
                                                                                                            MsgPedido = MsgPedido + "🛍️ "+SessaoEsta+"\n"
                                                                                                            if(MemoriaPedido){
                    
                                                                                                            for(let j in MemoriaPedido.Nome){
                                                                                                                MsgPedido = MsgPedido + "📦"+MemoriaPedido.Nome[j]+"\n"
                                                                                                                if(MemoriaPedido.Descricao[j]){
                                                                                                                    MsgPedido = MsgPedido + "📝"+MemoriaPedido.Descricao[j]+"\n"
                                                                                                                    }
                                                                                                                }   
                                                                                                            }
                                                                                                            MsgPedido = MsgPedido + "📦"+MemoriaProduto[NumIni].Nome+"\n"
                                                                                                            if(MemoriaProduto[NumIni].Descricao){
                                                                                                               MsgPedido = MsgPedido + "📝"+MemoriaProduto[NumIni].Descricao+"\n"
                                                                                                            }
                                                                                                            if(MemoriaProduto[NumIni].ItemEspeci){
                                                                                                               MsgPedido = MsgPedido + "🏷️"+MemoriaProduto[NumIni].SubSessao+"\n"
                                                                                                            }
                                                                                                            
                                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                                            console.log(TempMsg)
                                                                                                            response.json({ Inf:[{Msg:`${NomeCli}${AutoMsg9}`, Tempo: TempMsg9, Type:"text"}, {Msg: `${NomeCli}, Você Escolheu ${Sabor}  Sabor${Sabor>1?"es":""} \n ${MsgPedido}`  , Tempo:2000, Type:"text"}, {Msg: `*${NomeCli}, Escolha o ${Sabor+1}° ${AutoMsg}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                                        }) 
                                                                
                                                                                                        }

                                                                                                 }
                                                                                              
                                                                    
                                                                                            
                                                                                                
                                                                                        
                                                                                            
                                                                                                
                                                                                            
                                                                                                } else {
                                                                    
                                                                                                    if(EstaNaRegra === true && Robo === true){
                                                                
                                                                                                        var QMsg= MsgEmp.Msg16A.Msg.length;
                                                                                                        var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                                                                                                        var Result =parseInt(Sorteio);
                                                                                                        var Num = Result-1;
                                                                                                        var AutoMsg = MsgEmp.Msg16A.Msg[Num];
                                                                                                        var TempMsg =  MsgEmp.Msg16A.TempoSeg;
                                                                
                                                                                                        //mensagens de estimulo para continuar o atendimento
                                                                                                        var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                                        var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                                        var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                                        var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                                        var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                                        var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                                            
                                                                                                        var Result3 =parseInt(Sorteio3);
                                                                                                        var Result4 =parseInt(Sorteio4);
                                                                                                        var Result5 =parseInt(Sorteio5);
                                                                                            
                                                                                                        var Num3 = Result3-1;
                                                                                                        var Num4 = Result4-1;
                                                                                                        var Num5 = Result5-1;
                                                                                                        var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                                        var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                                        var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                                        var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                                        var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                                        var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                                                        //Mudando a Fase do Chat
                                                                                                        
                                                                                                        await db.collection("ChatCliente")
                                                                                                        .doc(IdChat)
                                                                                                        .update({
                                                                                                        DigiteNaRegra:false, 
                                                                                                        MsgFutura1:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg3,
                                                                                                            Tempo:Tempo3,
                                                                                                        },
                                                                                                        MsgFutura2:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg4,
                                                                                                            Tempo:Tempo4,
                                                                                                        },
                                                                                                        MsgFutura3:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg5,
                                                                                                            Tempo:Tempo5,
                                                                                                        },
                                                                                                        UltimaMsg:{
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        Mensagem:admin.firestore.FieldValue.arrayUnion({
                                                                                                            Autor:IdCli,
                                                                                                            body:Mensagem.body,
                                                                                                            date:new Date().getTime(),
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        {
                                                                                                            Autor:EMPRESA,
                                                                                                            body:`${NomeCli}${AutoMsg}`,
                                                                                                            date:new Date().getTime()+5000,
                                                                                                            Type:"text"
                                                                                                        },
                                                                                                        
                                                                                                        
                                                                                                        )
                                                                                                        })
                                                                                                        .then(async() => {
                                                                                                            var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                                            console.log(TempMsg)
                                                                                                            response.json({ Inf:[{Msg: `*${NomeCli}${AutoMsg}*` , Tempo:TempMsg, Type:"text"}] });
                                                                                                
                                                                                                        }) 
                                                                                                    } else  if(EstaNaRegra === false && Robo === true){
                                                                
                                                                                                        //mensagens de estimulo para continuar o atendimento
                                                                                                        var QMsg3= MsgEmp.Msg17A.Msg.length;
                                                                                                        var QMsg4= MsgEmp.Msg17B.Msg.length;
                                                                                                        var QMsg5= MsgEmp.Msg17C.Msg.length;
                                                                                                        var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                                                                                                        var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                                                                                                        var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
                                                                                            
                                                                                                        var Result3 =parseInt(Sorteio3);
                                                                                                        var Result4 =parseInt(Sorteio4);
                                                                                                        var Result5 =parseInt(Sorteio5);
                                                                                            
                                                                                                        var Num3 = Result3-1;
                                                                                                        var Num4 = Result4-1;
                                                                                                        var Num5 = Result5-1;
                                                                                                        var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                                                                                                        var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                                                                                                        var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                                                                                                        var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                                                                                                        var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                                                                                                        var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                                                                                    
                                                                                                    
                                                                                                    
                                                                                                    
                                                                                                        //Mudando a Fase do Chat
                                                                                                        
                                                                                                        await db.collection("ChatCliente")
                                                                                                        .doc(IdChat)
                                                                                                        .update({
                                                                                                        Robotizado:false, 
                                                                                                        MsgFutura1:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg3,
                                                                                                            Tempo:Tempo3,
                                                                                                        },
                                                                                                        MsgFutura2:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg4,
                                                                                                            Tempo:Tempo4,
                                                                                                        },
                                                                                                        MsgFutura3:{
                                                                                                            Ativo:true,
                                                                                                            Msg:AutoMsg5,
                                                                                                            Tempo:Tempo5,
                                                                                                        },
                                                                                                        })
                                                                                                        .then(async() => {
                                                                                                            var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                                                                                                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                                                                                                            console.log(TempMsg)
                                                                                                            response.json({ Inf:[{Msg: `*${NomeCli}*` , Botao:Menus , Tempo:TempMsg, Type:"butao"}] });
                                                                                                
                                                                                                        }) 
                                                                                                    }
                                                                                                }
                                                                        
                                                                                    
                                                                                        
                                                                        }
                    
                    
                    
                    
                    
                    
                    } else {
        
        
                        if(NomeCli === ""){
        
                         //Aqui vou ta salvando  o Nome do Cliente
                            await db.collection("ClienteEmpre")
                            .doc(IdCli)
                            .update({
                            Nome: Mensagem.text.message,
                            })
                            .then(async() => {
                              
                            
                            
                            }) 
                
                        //Aqui vou está enviando uma mensagem
                            setTimeout(() => {
                                axios.post(`${URL_WHATS}/send-text`, {
                                    "phone": Mensagem.phone,
                                    "message": `${AutoMsg}`,
                                }).then(function (response) {
                               
                            })
                               
                              }, MsgEmp.TempoSeg);
                           
                           
                        }
                    
                    
                    
                    
                    }
        
        
        
        
                })
        
        
              
        
        
        
        
        
        
        
            } else {
            //ver se o cliente está cadastrado na cwo 
            await db.collection("ClienteEmpre")
            .where("Telefone", "==", TelefonCli)
            .get().then(async (querySnapshot12) => {

            //Aqui é se o cliente já está cadastrado na CWO    
                if(querySnapshot12.size  !== 0){
                    var IdClient = "";

                    //Pego o id do cliente
                    await querySnapshot12.forEach((doc12) => {
                        IdClient = doc12.id;
                       })

                       //Atualizar o cliente colocando outra empresa
                    await db.collection("ClienteEmpre")
                       .doc(IdClient)
                       .update({
                        Empresa:admin.firestore.FieldValue.arrayUnion(EMPRESA)
                       })
                       .then(async() => {

                        var MsgEmp = {};

                         //Pesquiso as msgs  automatica pda emrpesa

                        await db.collection("EmrpesaSite")
                        .doc(EMPRESA)
                        .get().then(async(doc) => {
                            MsgEmp = doc.data().MsgAuto;
                        });
                     
                        console.log(MsgEmp)
                        console.log(MsgEmp.Msg1A)
                        console.log(MsgEmp.Msg1A.Msg)
                        console.log(MsgEmp.Msg1B)
                        console.log(MsgEmp.Msg1B.Msg)
                        
                        // Montando as mensagens 
                        var QMsg= MsgEmp.Msg1A.Msg.length;
                        var QMsg2= MsgEmp.Msg1B.Msg.length;
                        var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                        var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
            
                        var Result =parseInt(Sorteio);
                        var Result2 =parseInt(Sorteio2);
            
                        var Num = Result-1;
                        var Num2 = Result2-1;
                        var AutoMsg = MsgEmp.Msg1A.Msg[Num];
                        var AutoMsg2= MsgEmp.Msg1B.Msg[Num2];
                        //mensagens de estimulo para continuar o atendimento
                        var QMsg3= MsgEmp.Msg17A.Msg.length;
                        var QMsg4= MsgEmp.Msg17B.Msg.length;
                        var QMsg5= MsgEmp.Msg17C.Msg.length;
                        var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                        var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                        var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
            
                        var Result3 =parseInt(Sorteio3);
                        var Result4 =parseInt(Sorteio4);
                        var Result5 =parseInt(Sorteio5);
            
                        var Num3 = Result3-1;
                        var Num4 = Result4-1;
                        var Num5 = Result5-1;
                        var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                        var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                        var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                        var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                        var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                        var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                     
                        //COntruindo Um Caht Entre a empresa e o CLiente
                        await db.collection("ChatCliente").add({
                            Id: IdClient,
                            DigiteNaRegra:true,
                            MsgFutura1:{
                                Ativo:true,
                                Msg:AutoMsg3,
                                Tempo:Tempo3,
                            },
                            MsgFutura2:{
                                Ativo:true,
                                Msg:AutoMsg4,
                                Tempo:Tempo4,
                            },
                            MsgFutura3:{
                                Ativo:true,
                                Msg:AutoMsg5,
                                Tempo:Tempo5,
                            },
                            MemSessao:[],
                            MemPedido:{},
                            Reclamaçoes:null,
                            Localização:null,
                            Pedido:null,
                            DataInicio: new Date().getTime(),
                            Empresa:EMPRESA,
                            Telefone:TelefonCli,
                            Robotizado:true,
                            Ativo:true,
                            vizualEmp:0,
                            VizualCli:1,
                            DigiEmp:false,
                            DigiCli:false,
                            FaseMsg:"Msg1B",
                            UltimaMsg:{
                                Autor:IdClient,
                                body:AutoMsg2,
                                date:new Date().getTime()+7000,
                                Type:"text"
                            },
                            Mensagem:[{
                                Autor:IdClient,
                                body:Mensagem.body,
                                date:new Date().getTime(),
                                Type:"text"
                            }, 
                            {
                                Autor:EMPRESA,
                                body:AutoMsg,
                                date:new Date().getTime()+2000,
                                Type:"text"
                            },
                            {
                                Autor:EMPRESA,
                                body:AutoMsg2,
                                date:new Date().getTime()+7000,
                                Type:"text"
                            },
                           
                            ]
                         
                        })
                        .then((docRef2) => {
                            console.log("Entrou 3° Sessão ")
                              //Enviando A Msg
    
                            response.json({ Inf:[{Msg:AutoMsg, Tempo:MsgEmp.Msg1A.TempoSeg, Type:"text"}, {Msg:`*${AutoMsg2}*`, Tempo:MsgEmp.Msg1B.TempoSeg, Type:"text"}] });

                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                        });

               
                       }) 


                } else{

                    console.log("Entrou 1° Sessão ")
                    // Cadastrando o Cliente Na lista Da Empresas 
                       await db.collection("ClienteEmpre").add({
                           Nome: "",
                           Telefone: TelefonCli,
                           dataCadas:new Date().getTime(),
                           Loc:"",
                           End:"",
                           Bairro:"",
                           Empresa:admin.firestore.FieldValue.arrayUnion(EMPRESA)
                       })
                       .then(async (docRef) => {
                           console.log("Entrou 2° Sessão ")
                           console.log("Document written with ID1: ", docRef.id);
                          
                           var IdClient = docRef.id;
           
                           var MsgEmp = {};
                           
                           await db.collection("EmrpesaSite")
                           .doc(EMPRESA)
                           .get().then(async(doc) => {
                               MsgEmp = doc.data().MsgAuto;
                           });
                        
                           console.log(MsgEmp)
                           console.log(MsgEmp.Msg1A)
                           console.log(MsgEmp.Msg1A.Msg)
                           console.log(MsgEmp.Msg1B)
                           console.log(MsgEmp.Msg1B.Msg)
           
                           var QMsg= MsgEmp.Msg1A.Msg.length;
                           var QMsg2= MsgEmp.Msg1B.Msg.length;
                           var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                           var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;
               
                           var Result =parseInt(Sorteio);
                           var Result2 =parseInt(Sorteio2);
               
                           var Num = Result-1;
                           var Num2 = Result2-1;
                           var AutoMsg = MsgEmp.Msg1A.Msg[Num];
                           var AutoMsg2= MsgEmp.Msg1B.Msg[Num2];
                           
                           console.log(MsgEmp.Msg1A.Msg)
                           console.log("Qmsg: "+QMsg)
               
                           console.log("Soteio: "+Sorteio)
                        
                           console.log("Msg: "+AutoMsg)
               
                           console.log(MsgEmp.Msg1B.Msg)
                           console.log("Qmsg: "+QMsg2)
               
                           console.log("Soteio: "+Sorteio2)
                        
                           console.log("Msg: "+AutoMsg2)

                        //mensagens de estimulo para continuar o atendimento
                        var QMsg3= MsgEmp.Msg17A.Msg.length;
                        var QMsg4= MsgEmp.Msg17B.Msg.length;
                        var QMsg5= MsgEmp.Msg17C.Msg.length;
                        var Sorteio3 = Math.floor(Math.random() * (QMsg3 - 1 + 1)) + 1;
                        var Sorteio4 = Math.floor(Math.random() * (QMsg4 - 1 + 1)) + 1;
                        var Sorteio5 = Math.floor(Math.random() * (QMsg5 - 1 + 1)) + 1;
            
                        var Result3 =parseInt(Sorteio3);
                        var Result4 =parseInt(Sorteio4);
                        var Result5 =parseInt(Sorteio5);
            
                        var Num3 = Result3-1;
                        var Num4 = Result4-1;
                        var Num5 = Result5-1;
                        var AutoMsg3 = MsgEmp.Msg17A.Msg[Num3];
                        var AutoMsg4= MsgEmp.Msg17B.Msg[Num4];
                        var AutoMsg5= MsgEmp.Msg17C.Msg[Num5];
                        var Tempo3 = MsgEmp.Msg17A.TempoSeg + new Date().getTime();
                        var Tempo4 = MsgEmp.Msg17B.TempoSeg + new Date().getTime();
                        var Tempo5 = MsgEmp.Msg17C.TempoSeg + new Date().getTime();
                        
                           await db.collection("ChatCliente").add({
                               Id: IdClient,
                               DigiteNaRegra:true,
                               MsgFutura1:{
                                Ativo:true,
                                Msg:AutoMsg3,
                                Tempo:Tempo3,
                            },
                            MsgFutura2:{
                                Ativo:true,
                                Msg:AutoMsg4,
                                Tempo:Tempo4,
                            },
                            MsgFutura3:{
                                Ativo:true,
                                Msg:AutoMsg5,
                                Tempo:Tempo5,
                            },
                               MemSessao:[],
                               MemPedido:{},
                               Reclamaçoes:null,
                               Localização:null,
                               Pedido:null,
                               DataInicio: new Date().getTime(),
                               Empresa:EMPRESA,
                               Telefone:TelefonCli,
                               Robotizado:true,
                               Ativo:true,
                               vizualEmp:0,
                               VizualCli:1,
                               DigiEmp:false,
                               DigiCli:false,
                               FaseMsg:"Msg1B",
                               UltimaMsg:{
                                   Autor:IdClient,
                                   body:AutoMsg2,
                                   date:new Date().getTime()+7000,
                                   Type:"text"
                               },
                               Mensagem:[{
                                   Autor:IdClient,
                                   body:Mensagem.body,
                                   date:new Date().getTime(),
                                   Type:"text"
                               }, 
                               {
                                   Autor:EMPRESA,
                                   body:AutoMsg,
                                   date:new Date().getTime()+2000,
                                   Type:"text"
                               },
                               {
                                   Autor:EMPRESA,
                                   body:AutoMsg2,
                                   date:new Date().getTime()+7000,
                                   Type:"text"
                               },
                              
                               ]
                            
                           })
                           .then((docRef2) => {
                               console.log("Entrou 3° Sessão ")
                               console.log("Document written with ID2: ", docRef2.id);
       
                               response.json({ Inf:[{Msg:AutoMsg, Tempo:MsgEmp.Msg1A.TempoSeg, Type:"text"}, {Msg:`*${AutoMsg2}*`, Tempo:MsgEmp.Msg1B.TempoSeg, Type:"text"}] });

                           })
                           .catch((error) => {
                               console.error("Error adding document: ", error);
                           });
               
                       })
                       .catch((error) => {
                           console.error("Error adding document: ", error);
                       });
               

                }
            })


             
        
        
            }
            })
    

    }

    

    
  


    
    
})
   
  });

  app.post("/VerMsg", async  function (request, response){
    cors(request, response, async () => { 
         var Emp = request.body.Id;
         console.log(Emp)
        var MsgAtiv = []
        await db.collection("CorreioMSg")
        .where("Ativo", "==", true)
        .where("EMPRESA", "==", Emp)
        .get().then(async (querySnapshot1) => {

        await querySnapshot1.forEach((doc1) => {
             MsgAtiv.push({
               id:doc1.id,
               Msg:doc1.data().Msg,
               Botao:doc1.data().Botao,
               Tel:doc1.data().Tel,
               Type:doc1.data().Type,
               Agenda:doc1.data().Agendamento.seconds*1000,
             })
           })

        });

        console.log(MsgAtiv)

      for(let i in MsgAtiv){

        await db.collection("CorreioMSg")
        .doc(MsgAtiv[i].id)
        .update({
        Ativo: false,
        })
        .then(async() => {

        }) 

      }
      

        // await db.collection("CorreioMSg")
        // .doc("2BN4dNFjbIyTuXVP5kaN")
        // .get().then(async(doc) => {
        //     NomeWhats = doc.data();
        // });
       
        response.json({Inf:MsgAtiv});

    }); 
});  

app.post("/MsgEstimulo1", async  function (request, response){
    cors(request, response, async () => { 
         var Emp = request.body.Id;
         console.log(Emp)
         var DataAgora = new Date().getTime();
        var MsgAtiv = []
        await db.collection("ChatCliente")
        .where("MsgFutura1.Ativo", "==", true)
        .where("Empresa", "==", Emp)
        .where("MsgFutura1.Tempo", "<=", DataAgora)
        .get().then(async (querySnapshot1) => {

        await querySnapshot1.forEach((doc1) => {
             MsgAtiv.push({
               id:doc1.id,
               Msg:doc1.data().MsgFutura1.Msg,
               Tel:doc1.data().Telefone,
               Type:"text",
               Agenda:doc1.data().MsgFutura1.Tempo,
               Botao:"",
             })
           })

        });

      

      for(let i in MsgAtiv){

        await db.collection("ChatCliente")
        .doc(MsgAtiv[i].id)
        .update({
        "MsgFutura1.Ativo": false,
        UltimaMsg:{
            Autor:Emp,
            body:MsgAtiv[i].Msg,
            date:new Date().getTime(),
            Type:"text"
        },
        Mensagem:admin.firestore.FieldValue.arrayUnion({
            Autor:Emp,
            body:MsgAtiv[i].Msg,
            date:new Date().getTime(),
            Type:"text"
        })
        })
        .then(async() => {

        }) 

      }


      
      console.log(MsgAtiv)
      
       
        response.json({Inf:MsgAtiv});

    }); 
});  

app.post("/MsgEstimulo2", async  function (request, response){
    cors(request, response, async () => { 
         var Emp = request.body.Id;
         console.log(Emp)
         var DataAgora = new Date().getTime();
        var MsgAtiv = []
      

      await db.collection("ChatCliente")
        .where("MsgFutura2.Ativo", "==", true)
        .where("Empresa", "==", Emp)
        .where("MsgFutura2.Tempo", "<=", DataAgora)
        .get().then(async (querySnapshot1) => {

        await querySnapshot1.forEach((doc1) => {
             MsgAtiv.push({
               id:doc1.id,
               Msg:doc1.data().MsgFutura2.Msg,
               Tel:doc1.data().Telefone,
               Type:"text",
               Agenda:doc1.data().MsgFutura2.Tempo,
               Botao:"",
             })
           })

        });

      

      for(let i in MsgAtiv){

        await db.collection("ChatCliente")
        .doc(MsgAtiv[i].id)
        .update({
        "MsgFutura2.Ativo": false,
        UltimaMsg:{
            Autor:Emp,
            body:MsgAtiv[i].Msg,
            date:new Date().getTime(),
            Type:"text"
        },
        Mensagem:admin.firestore.FieldValue.arrayUnion({
            Autor:Emp,
            body:MsgAtiv[i].Msg,
            date:new Date().getTime(),
            Type:"text"
        })
        })
        .then(async() => {

        }) 

      }
      
      console.log(MsgAtiv)
      
       
        response.json({Inf:MsgAtiv});

    }); 
});  
app.post("/MsgEstimulo3", async  function (request, response){
    cors(request, response, async () => { 
         var Emp = request.body.Id;
         console.log(Emp)
         var DataAgora = new Date().getTime();
        var MsgAtiv = []
      

      await db.collection("ChatCliente")
        .where("MsgFutura3.Ativo", "==", true)
        .where("Empresa", "==", Emp)
        .where("MsgFutura3.Tempo", "<=", DataAgora)
        .get().then(async (querySnapshot1) => {

        await querySnapshot1.forEach((doc1) => {
             MsgAtiv.push({
               id:doc1.id,
               Msg:doc1.data().MsgFutura3.Msg,
               Tel:doc1.data().Telefone,
               Type:"text",
               Agenda:doc1.data().MsgFutura3.Tempo,
               Botao:"",
               Pedido:doc1.data().Pedido,
             })
           })

        });

      

      for(let i in MsgAtiv){

        await db.collection("ChatCliente")
        .doc(MsgAtiv[i].id)
        .update({
        Ativo:false,
        "MsgFutura3.Ativo": false,
        UltimaMsg:{
            Autor:Emp,
            body:MsgAtiv[i].Msg,
            date:new Date().getTime(),
            Type:"text"
        },
        Mensagem:admin.firestore.FieldValue.arrayUnion({
            Autor:Emp,
            body:MsgAtiv[i].Msg,
            date:new Date().getTime(),
            Type:"text"
        })
        })
        .then(async() => {

        })
       if(MsgAtiv[i].Pedido){
        await db.collection("MesaItem")
        .doc(MsgAtiv[i].Pedido)
        .delete()
        .then(async() => {

        })

       }
        


      }
      
      console.log(MsgAtiv)
      
       
        response.json({Inf:MsgAtiv});

    }); 
}); 
  
  
  exports.api = functions.https.onRequest(app);
