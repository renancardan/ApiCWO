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
              var IdChat = ""
              var FaMsg = ""
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
                       })
    
                    // Existe  um Chat que foi enviado a Mensagem de Apresentação de Pedido de Nome
                       if(FaMsg === "Msg1B" ){
                      
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
                            var MsgButon =`*${Mensagem.body}${AutoMsg2}*`
                            //MsgButon = + "(Clique em Uma das Opções abaixo, Por favor!)"
                            console.log(TempMsg)
                            console.log(TempMsg2)
                            response.json({ Inf:[{Msg:`${Mensagem.body}${AutoMsg}`, Tempo: TempMsg, Type:"text"}, {Msg: `*${Mensagem.body}${AutoMsg2}*` , Botao:MsgEmp.Msg3A.Botao , Tempo:TempMsg2, Type:"butao"}] });
                  
                         }) 
              
                        //Aqui vou está enviando uma mensagem
    
                     
    
                        // setTimeout(() => {
                        //     axios.post(`${URL_WHATS}/send-text`, {
                        //         "phone": Mensagem.phone,
                        //         "message": MsgButon,
                        //         "buttonList": {
                        //             "buttons": [
                        //               {
                        //                 "id": "1",
                        //                 "label": "Fazer Pedido"
                        //               },
                        //               {
                        //                 "id": "2",
                        //                 "label": "Fazer Reclamções"
                        //               }
                        //             ]
                        //           }
                        //     }).then(function (response) {
                        
                        // })
                        
                        // }, TempMsg2.TempoSeg);
        
                     
                        
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
                        
                        console.log(MsgEmp.Msg1A.Msg)
                        console.log("Qmsg: "+QMsg)
            
                        console.log("Soteio: "+Sorteio)
                     
                        console.log("Msg: "+AutoMsg)
            
                        console.log(MsgEmp.Msg1B.Msg)
                        console.log("Qmsg: "+QMsg2)
            
                        console.log("Soteio: "+Sorteio2)
                     
                        console.log("Msg: "+AutoMsg2)
                     
                        //COntruindo Um Caht Entre a empresa e o CLiente
                        await db.collection("ChatCliente").add({
                            Id: IdClient,
                            DataInicio: new Date().getTime(),
                            Empresa:EMPRESA,
                            Foto:TelefonCli,
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
                        
                           await db.collection("ChatCliente").add({
                               Id: IdClient,
                               DataInicio: new Date().getTime(),
                               Empresa:EMPRESA,
                               Foto:TelefonCli,
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
               Tel:doc1.data().Tel,
               Type:doc1.data().Type
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
  
  
  exports.api = functions.https.onRequest(app);
