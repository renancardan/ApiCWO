const functions = require("firebase-functions");
const app = require("express")();
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
var axios = require("axios");
const cors = require('cors')({origin: true});



app.post("/Msgpizzacia", async  function (request, response){
    cors(request, response, async () => {
    var EMPRESA = "YYnWzhySS3HwKzZgyVgN"
    var URL_WHATS = "https://api.z-api.io/instances/3A9D95BC49F730DF458B76215AA2744C/token/A2A3E65C2FE0E21916E8A2AE";


    let Mensagem = request.body
    var resposta = {};
    await db.collection("ClienteEmpre")
    .where("Empresa", "array-contains", EMPRESA)
    .where("Telefone", "==", Mensagem.phone)
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

    //Aqui vamos ver se existe algum chat ja iniciado, pega o id e a fase de mensagem
      var IdChat = ""
      var FaMsg = ""
        await db.collection("ChatCliente")
        .where("Empresa", "==", EMPRESA)
        .where("Telefone", "==", Mensagem.phone)
        .where("Ativo", "==", true)
        .where("DataInicio", ">=", Horario)
        .get().then(async (querySnapshot2) => {
            //Se Existe Um Chat Em Anadamento Entra Aqui 
            if(querySnapshot2.size  !== 0){

            await querySnapshot2.forEach((doc2) => {
                IdChat = doc2.id;
                FaMsg =doc2.data().FaseMsg;
               })
            // Existe  um Chat que foi enviado a Mensagem de Apresentação de Pedido de Nome
               if(FaMsg === "Msg2A" ){
               //montar a mensagem   
                var QMsg= MsgEmp.Msg3A.Msg.length;
                var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
                var Result =parseInt(Sorteio);
                var Num = Result-1;
                var AutoMsg = MsgEmp.Msg3A.Msg[Num];
                var TempMsg =  MsgEmp.Msg3A.TempoSeg;

                 //Aqui vou ta salvando  o Nome do Cliente
                 await db.collection("ClienteEmpre")
                 .doc(IdCli)
                 .update({
                 Nome: Mensagem.text.message,
                 })
                 .then(async() => {
          
                 }) 

                 //Mudando a Fase do Chat
                 await db.collection("ChatCliente")
                 .doc(IdChat)
                 .update({
                 FaseMsg: "Msg3A",
                 UltimaMsg:{
                    Autor:IdCli,
                    body:Mensagem.text.message,
                    date:Mensagem.momment,
                    Type:"text"
                },
                 Mensagem:admin.firestore.FieldValue.arrayUnion({
                    Autor:IdCli,
                    body:Mensagem.text.message,
                    date:Mensagem.momment,
                    Type:"text"
                })
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
                
                }, TempMsg.TempoSeg);

               
                
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
       console.log("Entrou 1° Sessão ")

        await db.collection("ClienteEmpre").add({
            Nome: "",
            Telefone: Mensagem.phone,
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
            var MsgEmp = {} 
            var MsgEmp2 = {}
            await db.collection("EmrpesaSite")
            .doc(EMPRESA)
            .get().then(async(doc) => {
                MsgEmp = doc.data().MsgAuto.Msg1;
                MsgEmp2 = doc.data().MsgAuto.Msg2A;
            });
            console.log(MsgEmp)
            var QMsg= MsgEmp.Msg.length;
            var QMsg2= MsgEmp2.Msg.length;
            var Sorteio = Math.floor(Math.random() * (QMsg - 1 + 1)) + 1;
            var Sorteio2 = Math.floor(Math.random() * (QMsg2 - 1 + 1)) + 1;

            var Result =parseInt(Sorteio);
            var Result2 =parseInt(Sorteio2);

            var Num = Result-1;
            var Num2 = Result2-1;
            var AutoMsg = MsgEmp.Msg[Num];
            var AutoMsg2= MsgEmp2.Msg[Num2];
            
            console.log(MsgEmp.Msg)
            console.log("Qmsg: "+QMsg)

            console.log("Soteio: "+Sorteio)
         
            console.log("Msg: "+AutoMsg)

            console.log(MsgEmp2.Msg)
            console.log("Qmsg: "+QMsg2)

            console.log("Soteio: "+Sorteio2)
         
            console.log("Msg: "+AutoMsg2)
         
            await db.collection("ChatCliente").add({
                Id: IdClient,
                DataInicio: new Date().getTime(),
                Empresa:EMPRESA,
                Foto:Mensagem.photo,
                Robotizado:true,
                Ativo:true,
                vizualEmp:0,
                VizualCli:1,
                DigiEmp:false,
                DigiCli:false,
                FaseMsg:"Msg2A",
                UltimaMsg:{
                    Autor:IdClient,
                    body:Mensagem.text.message,
                    date:Mensagem.momment,
                    Type:"text"
                },
                Mensagem:[{
                    Autor:IdClient,
                    body:Mensagem.text.message,
                    date:Mensagem.momment,
                    Type:"text"
                }, 
                {
                    Autor:EMPRESA,
                    body:AutoMsg,
                    date:Mensagem.momment+10,
                    Type:"text"
                },
                {
                    Autor:EMPRESA,
                    body:AutoMsg2,
                    date:Mensagem.momment+10,
                    Type:"text"
                },
               
                ]
             
            })
            .then((docRef2) => {
                console.log("Entrou 3° Sessão ")
                console.log("Document written with ID2: ", docRef2.id);

                setTimeout(() => {
                    axios.post(`${URL_WHATS}/send-text`, {
                        "phone": Mensagem.phone,
                        "message": AutoMsg,
                    }).then(function (response) {
                   
                })
                   
                  }, MsgEmp.TempoSeg);
                  

                  setTimeout(() => {
                    axios.post(`${URL_WHATS}/send-text`, {
                        "phone": Mensagem.phone,
                        "message": `*${AutoMsg2}*`,
                    }).then(function (response) {
                   
                })
                   
                  }, MsgEmp2.TempoSeg);
              


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




    response.json({resposta});
})
   
  });
  
  
  
  exports.api = functions.https.onRequest(app);
