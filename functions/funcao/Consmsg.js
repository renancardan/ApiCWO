

 module.exports = (Msg, ItensMenus, DadoEmp) =>{
    var PalNum1 = ["1", "um", "uma"]
    var PalNum2 = ["2", "duas", "dois"]
    var PalNum3 = ["3", "três", "tres", "trez"]
    
      var ListaItens = ItensMenus;
    var ItensPedido = []
   
    
    for (let z=0; z<4; z++) {//Procurando Itens Loop Inicio
                                 
                                 
        var QuantSessao = 1;
     
       var PrecoPre = false;

       
        var GrupSessao = [];
        var GrupTamanho = [];
        var GrupSabor = [];

        var DigiSessao = false;
        var DigiTamanho= false;
        var DigiSabor = false;
       


        var AtiSessao = false;
        var AtiTamanho = false;
        var AtiSabor = false;

        var ProdAtivo = false;
        var SessaoGuar = "";
        var TamanhoNome = "";
        var Borda = "com borda";
        var ItemComTam = false;
        var QuantSabor = 1;

        var MemFim = false;
       
        var Nota = {};
       
        var VerMen = {
          Date:0,
          Descont:NaN,
          Descricao:[],
          Foto:[],
          ItemEspeci:true,
          Nome:[],
          Preco:0,
          Quant:1,
          Sessao:"",
          SubSessao:"",
          ItemComTam:false
        };
        var VerSessao = []
        var SaborIndis = [];
        var  cardaVer = "";
       
          
              //esse  nota sessão server para pegar a primeira sessão que foi
              var NotSessao = "";
              //Digitou sessão 
              var TagMModi = ""
              var TagMtira = ""
              var PodeSessao = true;
                              for(let i in ItensMenus){
                                  for(let j in ItensMenus[i].TagsMenus){
                                    TagMModi =" "+ItensMenus[i].TagsMenus[j].toLowerCase()+" ";
                                     
                                      
                                      if(TagMModi !== "" && TagMModi !== " " && TagMModi !== "  " && TagMModi !== "   "){

                                      if(Msg.includes(TagMModi)){
                                          
                                      for(let g in ItensPedido){
                                          if(ItensPedido[g].Sessao === ItensMenus[i].Sessao){
                                              PodeSessao = false; 
                                          }
                                      }
                                         
                                         if(PodeSessao){

                                        
                                          if(NotSessao){
                                           
                                              if(NotSessao === ItensMenus[i].Sessao){
                                                  GrupSessao.push(ItensMenus[i])
                                                  DigiSessao = true;
                                                  SessaoGuar = ItensMenus[i].Sessao;
                                                  AtiSessao = ItensMenus[i].AtivoSessao;
                                                  ItemComTam = ItensMenus[i].ComTam; 
                                              }
                                          
                                          } else {
                                            for(let h in PalNum2){
                                              if(Msg.includes(PalNum2[h]+TagMModi)){
                                              QuantSessao = 2
                                              }
                                            }
                                            for(let h in PalNum3){
                                              if(Msg.includes(PalNum3[h]+TagMModi)){
                                              QuantSessao = 3
                                              }
                                            }
                                         //console.log(TagMModi)  
                                          TagMtira = TagMModi;
                                          NotSessao = ItensMenus[i].Sessao
                                          GrupSessao.push(ItensMenus[i])
                                          DigiSessao = true;
                                          SessaoGuar = ItensMenus[i].Sessao;
                                          AtiSessao = ItensMenus[i].AtivoSessao;
                                          ItemComTam = ItensMenus[i].ComTam;
                                          MemFim =ItensMenus[i].MemFim; 
                                          }
                                      } 
                                      }

                                  }
                                      

                                  }
                                  
                              }
                              //Tirando a sessão da Msg
                              Msg = Msg.replace(TagMtira, "  ")
                              // console.log(SessaoGuar)
                              // console.log(Msg)

                            //   if(DigiSessao){
                            //       if(ItemComTam){//se tiver tamanho
                            //           var NotTamanho = ""
                            //           //Digitou Tamanho 
                            //           var TagTModi = ""
                            //           var TagTTirar = ""
                            //           for(let i in GrupSessao){
                            //           for(let j in GrupSessao[i].TagsTamanhos){
                            //               TagTModi =" "+GrupSessao[i].TagsTamanhos[j].toLowerCase()+" "
                            //               // console.log("Conb: "+DivNome4[j])
                            //               // console.log("Sessao "+GrupSessao[i].body.toLowerCase())
                            //               if(TagTModi !== "" && TagTModi !== " " && TagTModi !== "  "){
                            //               if(Msg.includes(TagTModi)){
                                              
                            //                   // console.log("Nome "+GrupSessao[i].Nome)
                            //                   // console.log("AtivoSabor "+GrupSessao[i].AtivoSabor)
                            //                   // console.log("AtivoTam "+GrupSessao[i].AtivoTamanho)
                            //                   // console.log("AtivoSess "+GrupSessao[i].AtivoSessao)
                            //                   if(GrupSessao[i].AtivoTamanho) {
                                              
                            //                   if(Msg.toLowerCase().includes(Borda)){
                            //                       if(GrupSessao[i].Tamanho.toLowerCase().includes(Borda)){
                            //                           if(NotTamanho){
                            //                               if(NotTamanho === GrupSessao[i].Tamanho){
                            //                                   QuantSabor= GrupSessao[i].QuantSb
                            //                                   GrupTamanho.push(GrupSessao[i])
                            //                                   DigiTamanho = true;
                            //                                   AtiTamanho = GrupSessao[i].AtivoTamanho;
                            //                                   VerMen={
                            //                                       Nome:[],
                            //                                       Descricao:[],
                            //                                       Foto:[],
                            //                                       Preco:GrupSessao[i].Preco,
                            //                                       Descont:GrupSessao[i].Descont,
                            //                                       SubSessao:GrupSessao[i].Tamanho,
                            //                                       Quant:1,
                            //                                       Observacao:"",
                            //                                       ItemEspeci:false,
                            //                                       QuantGeral:1,
                            //                                       Sessao:GrupSessao[i].Sessao,
                            //                                       MemFim:GrupSessao[i].MemFim,
                            //                                       QuantSb:GrupSessao[i].QuantSb
                            //                                   }

                            //                               }

                            //                           } else {
                            //                               TagTTirar = TagTModi;
                            //                               QuantSabor= GrupSessao[i].QuantSb
                            //                               NotTamanho = GrupSessao[i].Tamanho
                            //                               GrupTamanho.push(GrupSessao[i])
                            //                               DigiTamanho = true;
                            //                               AtiTamanho = GrupSessao[i].AtivoTamanho;
                            //                               VerMen={
                            //                                   Nome:[],
                            //                                   Descricao:[],
                            //                                   Foto:[],
                            //                                   Preco:GrupSessao[i].Preco,
                            //                                   Descont:GrupSessao[i].Descont,
                            //                                   SubSessao:GrupSessao[i].Tamanho,
                            //                                   Quant:1,
                            //                                   Observacao:"",
                            //                                   ItemEspeci:false,
                            //                                   QuantGeral:1,
                            //                                   Sessao:GrupSessao[i].Sessao,
                            //                                   MemFim:GrupSessao[i].MemFim,
                            //                                   QuantSb:GrupSessao[i].QuantSb
                            //                               }

                            //                           }

                            //                       }
                            //                   } else {
                            //                       if(GrupSessao[i].Tamanho.toLowerCase().includes(Borda) === false){
                            //                           if(NotTamanho){
                            //                               if(NotTamanho === GrupSessao[i].Tamanho){
                            //                                   QuantSabor= GrupSessao[i].QuantSb
                            //                                   GrupTamanho.push(GrupSessao[i])
                            //                                   DigiTamanho = true;
                            //                                   AtiTamanho = GrupSessao[i].AtivoTamanho;
                            //                                   VerMen={
                            //                                       Nome:[],
                            //                                       Descricao:[],
                            //                                       Foto:[],
                            //                                       Preco:GrupSessao[i].Preco,
                            //                                       Descont:GrupSessao[i].Descont,
                            //                                       SubSessao:GrupSessao[i].Tamanho,
                            //                                       Quant:1,
                            //                                       Observacao:"",
                            //                                       ItemEspeci:false,
                            //                                       QuantGeral:1,
                            //                                       Sessao:GrupSessao[i].Sessao,
                            //                                       MemFim:GrupSessao[i].MemFim,
                            //                                       QuantSb:GrupSessao[i].QuantSb
                            //                                   }

                            //                               }

                            //                           } else {
                                                     
                            //                               TagTTirar = TagTModi;
                            //                              QuantSabor= GrupSessao[i].QuantSb
                            //                               NotTamanho = GrupSessao[i].Tamanho
                            //                               GrupTamanho.push(GrupSessao[i])
                            //                               DigiTamanho = true;
                            //                               AtiTamanho = GrupSessao[i].AtivoTamanho;
                            //                               VerMen={
                            //                                   Nome:[],
                            //                                   Descricao:[],
                            //                                   Foto:[],
                            //                                   Preco:GrupSessao[i].Preco,
                            //                                   Descont:GrupSessao[i].Descont,
                            //                                   SubSessao:GrupSessao[i].Tamanho,
                            //                                   Quant:1,
                            //                                   Observacao:"",
                            //                                   ItemEspeci:false,
                            //                                   QuantGeral:1,
                            //                                   Sessao:GrupSessao[i].Sessao,
                            //                                   MemFim:GrupSessao[i].MemFim,
                            //                                   QuantSb:GrupSessao[i].QuantSb
                            //                               }

                            //                           }
                            //                       }

                            //                       }
                                            
                            //               } else {
                            //                   TagTTirar = TagTModi;
                            //                   TamanhoNome = GrupSessao[i].Tamanho;
                            //                   DigiTamanho = true;
                            //                   AtiTamanho = false; 
                            //               }
                            //           }   
                            //               }

                                      
                                          

                                          
                                          

                            //           }
                                      
                            //       }
                            //       Msg = Msg.replace(TagTTirar, "  ")
                            //       // console.log(Msg)
                            //       // console.log(NotTamanho)

                               

                            //       if(DigiTamanho === false){ //digitou sessão e Sabor

                            //           var NotSabor = true;
                            //           var TagIMode = "";
                            //           var TagITirar = []
                                      
                            //           for(let i in GrupSessao){
                            //               for(let j in GrupSessao[i].TagsItens){
                            //                   TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                            //                   // console.log("Conb: "+TagIMode)
                            //                   // console.log("Sessao "+Msg)
                            //                   if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                            //                      // console.log("Achou uma 1")
                            //                      if(Msg.includes(TagIMode)){
                            //                       //console.log("Achou uma 2")
                            //                       if(GrupSessao[i].AtivoSabor){
                            //                       if(DigiSabor === false){
                            //                           if( GrupSessao[i].AtivoSabor){
                            //                               if(TagITirar.includes(TagIMode)=== false){
                            //                                   TagITirar.push(TagIMode)
                            //                               }

                            //                               GrupSabor.push(GrupSessao[i])
                            //                               DigiSabor = true;
                            //                               AtiSabor = GrupSessao[i].AtivoSabor;
                            //                               VerMen={
                            //                                   Nome:[GrupSessao[i].Nome],
                            //                                   Descricao:[GrupSessao[i].Descricao],
                            //                                   Foto:[GrupSessao[i].foto],
                            //                                   Preco:GrupSessao[i].Preco,
                            //                                   Descont:GrupSessao[i].Descont,
                            //                                   SubSessao:"",
                            //                                   Quant:1,
                            //                                   Observacao:"",
                            //                                   ItemEspeci:false,
                            //                                   QuantGeral:1,
                            //                                   Sessao:GrupSessao[i].Sessao,
                            //                                   MemFim:GrupSessao[i].MemFim,
                            //                                   QuantSb:GrupSessao[i].QuantSb
                            //                               }

                            //                           }
                                                  

                                                  

                            //                   } 
                            //                       } else {
                            //                           if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                            //                               SaborIndis.push(GrupSessao[i].Nome);
                            //                           }
                            //                       DigiSabor = true;
                            //                       AtiSabor = false;
                            //                       }
                                                      

                                                      
                                                  
                                              
                                              
                            //                   }
                            //               }

                                          
                                          

                                              
                                              

                            //               }
                                          
                            //           }
                            //           for(let d in TagITirar){
                            //           Msg = Msg.replace(TagITirar[d], "  ")
                            //           }
                            //           // console.log(TagITirar)
                            //           // console.log("Msg 3 "+Msg)

                            //       }

                            //       } else { //Se não tem tamanho, So tem sabor
                            //           var NotSabor = true;
                            //           var TagIMode = "";
                            //           var TagITirar = []
                                    
                            //           for(let i in GrupSessao){
                            //               for(let j in GrupSessao[i].TagsItens){
                            //                   TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                            //                   // console.log("Conb: "+TagIMode)
                            //                   // console.log("Sessao "+Msg)
                            //                   if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                            //                      // console.log("Achou uma 1")
                            //                      if(Msg.includes(TagIMode)){
                            //                       //console.log("Achou uma 2")
                            //                       if(GrupSessao[i].AtivoSabor){
                            //                       if(DigiSabor === false){
                            //                           if( GrupSessao[i].AtivoSabor){
                            //                               if(TagITirar.includes(TagIMode)=== false){
                            //                                   TagITirar.push(TagIMode)
                            //                               }

                            //                               GrupSabor.push(GrupSessao[i])
                            //                               DigiSabor = true;
                            //                               AtiSabor = GrupSessao[i].AtivoSabor;
                            //                               VerMen={
                            //                                   Nome:[GrupSessao[i].Nome],
                            //                                   Descricao:[GrupSessao[i].Descricao],
                            //                                   Foto:[GrupSessao[i].foto],
                            //                                   Preco:GrupSessao[i].Preco,
                            //                                   Descont:GrupSessao[i].Descont,
                            //                                   SubSessao:GrupSessao[i].Tamanho,
                            //                                   Quant:1,
                            //                                   Observacao:"",
                            //                                   ItemEspeci:false,
                            //                                   QuantGeral:1,
                            //                                   Sessao:GrupSessao[i].Sessao,
                            //                                   MemFim:GrupSessao[i].MemFim,
                            //                                   QuantSb:GrupSessao[i].QuantSb
                            //                               }

                            //                           }
                                                  

                                                  

                            //                   } 
                            //                       } else {
                            //                           if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                            //                               SaborIndis.push(GrupSessao[i].Nome);
                            //                           }
                            //                       DigiSabor = true;
                            //                       AtiSabor = false;
                            //                       }
                                                      

                                                      
                                                  
                                              
                                              
                            //                   }
                            //               }

                                          
                                          

                                              
                                              

                            //               }
                                          
                            //           }
                            //           for(let d in TagITirar){
                            //           Msg = Msg.replace(TagITirar[d], "  ")
                            //           } 

                                   

                            //            if(DigiSabor == false  ){//Aqui só entra se a sessão é o mesmo nome do sabor
                            //            //  console.log("Entrou Em MemFim 1")
                            //               for(let i in GrupSessao){
                            //                   for(let j in GrupSessao[i].TagsItens){
                            //                       TagIMode =GrupSessao[i].TagsItens[j].toLowerCase()
                            //                       // console.log("Conb: "+TagIMode)
                            //                       // console.log("Sessao "+Msg)
                            //                       if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                            //                          // console.log("Achou uma 1")
                            //                             // console.log("Conb: "+TagIMode)
                            //                             //   console.log("Sessao "+SessaoGuar)
                            //                          if(SessaoGuar.includes(TagIMode)){
                            //                           //console.log("Achou uma 2")
                            //                           if(GrupSessao[i].AtivoSabor){
                            //                           if(DigiSabor === false){
                            //                               if( GrupSessao[i].AtivoSabor){
                            //                                   if(TagITirar.includes(TagIMode)=== false){
                            //                                       TagITirar.push(TagIMode)
                            //                                   }

                            //                                   GrupSabor.push(GrupSessao[i])
                            //                                   DigiSabor = true;
                            //                                   AtiSabor = GrupSessao[i].AtivoSabor;
                            //                                   VerMen={
                            //                                       Nome:[GrupSessao[i].Nome],
                            //                                       Descricao:[GrupSessao[i].Descricao],
                            //                                       Foto:[GrupSessao[i].foto],
                            //                                       Preco:GrupSessao[i].Preco,
                            //                                       Descont:GrupSessao[i].Descont,
                            //                                       SubSessao:GrupSessao[i].Tamanho,
                            //                                       Quant:1,
                            //                                       Observacao:"",
                            //                                       ItemEspeci:false,
                            //                                       QuantGeral:1,
                            //                                       Sessao:GrupSessao[i].Sessao,
                            //                                       MemFim:GrupSessao[i].MemFim,
                            //                                       QuantSb:GrupSessao[i].QuantSb
                            //                                   }

                            //                               }
                                                      

                                                      

                            //                       } 
                            //                           } else {
                            //                               if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                            //                                   SaborIndis.push(GrupSessao[i].Nome);
                            //                               }
                            //                           DigiSabor = true;
                            //                           AtiSabor = false;
                            //                           }
                                                          

                                                          
                                                      
                                                  
                                                  
                            //                       }
                            //                   }

                                              
                                              

                                                  
                                                  

                            //                   }
                                              
                            //               }
                            //            }

                                      
                            //           // console.log(TagITirar)
                            //           // console.log("Msg 3 "+Msg)

                            //       }

                            //       if(DigiTamanho){//vendo se digitou o sabor
                            //           var ListSabor = [];
                            //           var ListDescr = [];
                            //           var ListFoto = []; 
                            //           var TagIMode = "";
                            //           var TagITirar = []
                            //           //console.log(GrupTamanho)
                                      
                            //               for(let i in GrupTamanho){
                            //                   for(let j in GrupTamanho[i].TagsItens){
                            //                     TagIMode =" "+ GrupTamanho[i].TagsItens[j].toLowerCase()+" "
                                                  
                            //                       if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                            //                     //   console.log("Conb: "+TagIMode)
                            //                     //   console.log("Sessao "+Msg)
                            //                           if(Msg.includes(TagIMode)){
                            //                       //    console.log("Passou: ")
                            //                          // console.log(" Quantidade de Sabor "+QuantSabor)
                                                     
                                                      
                            //                           if(ListSabor.length < QuantSabor){
                                                          
                                                  
                            //                               if(ListSabor.includes(GrupTamanho[i].Nome)=== false){
                            //                                   // console.log("Nome "+GrupTamanho[i].Nome)
                            //                                   // console.log("AtivoSabor "+GrupTamanho[i].AtivoSabor)
                            //                                   // console.log("AtivoTam "+GrupTamanho[i].AtivoTamanho)
                            //                                   // console.log("AtivoSess "+GrupTamanho[i].AtivoSessao)
                                                              
                            //                                   if( GrupTamanho[i].AtivoSabor){
                            //                                   ListSabor.push(GrupTamanho[i].Nome)
                            //                                   ListDescr.push(GrupTamanho[i].Descricao)
                            //                                   ListFoto.push(GrupTamanho[i].foto)

                            //                                   if(TagITirar.includes(TagIMode)=== false){
                            //                                       TagITirar.push(TagIMode)
                            //                                   }

                            //                                       GrupSabor.push(GrupTamanho[i])
                            //                                       DigiSabor = true;
                            //                                       AtiSabor = GrupTamanho[i].AtivoSabor;
                            //                                       VerMen={
                            //                                           Nome:ListSabor,
                            //                                           Descricao:ListDescr,
                            //                                           Foto:ListFoto,
                            //                                           Preco:GrupTamanho[i].Preco,
                            //                                           Descont:GrupTamanho[i].Descont,
                            //                                           SubSessao:GrupTamanho[i].Tamanho,
                            //                                           Quant:1,
                            //                                           Observacao:"",
                            //                                           ItemEspeci:false,
                            //                                           QuantGeral:1,
                            //                                           Sessao:GrupTamanho[i].Sessao,
                            //                                           MemFim:GrupTamanho[i].MemFim,
                            //                                           QuantSb:GrupTamanho[i].QuantSb
                            //                                       }
                            //                               } else{
                            //                                  // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                            //                                   if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                            //                                       SaborIndis.push(GrupTamanho[i].Nome);
                            //                                   }
                            //                               }
                                                              

                            //                                       }
                            //                           }
                                                          
                                                                  

                                                                  

                                                              

                                                          
                                                      
                                                  
                                                  
                            //                       }
                            //                   }

                                              
                                              

                                                  
                                                  

                            //                   }
                                              
                            //               }
                            //               for(let d in TagITirar){
                            //               Msg = Msg.replace(TagITirar[d], "  ")
                            //               }
                            //             //   console.log(TagITirar)
                            //             //   console.log("Msg 3 "+Msg)
                                          
                                      
                                      
                                  
                            //       }

                            //   } else {//se Digitou o tamanho e sabor
                                  

                            //       // console.log("Entrou Aqui no tamanho Agoras")   
                              
                            //       var NotTamanho = ""
                            //       var Desa25=false;
                            //       var TagTModi = ""
                            //       var TagTTirar = ""
                            //       //Digitou Tamanho 
                            //       for(let i in ItensMenus){
                            //           if(Desa25 === false){
                                          
                            //       for(let j in ItensMenus[i].TagsTamanhos){
                            //           TagTModi =" "+ItensMenus[i].TagsTamanhos[j].toLowerCase()+" ";
                            //           // console.log("Conb: "+DivNome4[j])
                            //           // console.log("Sessao "+ItensMenus[i].body.toLowerCase())
                            //           if(TagTModi !== "" && TagTModi !== " " && TagTModi !== "  "){
                            //               if(Msg.includes(TagTModi)){
                            //               Desa25 = true;
                            //               SessaoGuar = ItensMenus[i].Sessao;
                            //               if(Msg.toLowerCase().includes(Borda)){
                                          
                            //                   if(ItensMenus[i].Tamanho.toLowerCase().includes(Borda)){
                                                  
                            //                       if(NotTamanho){
                            //                           if(NotTamanho === ItensMenus[i].Tamanho){
                            //                               QuantSabor= ItensMenus[i].QuantSb
                            //                               GrupTamanho.push(ItensMenus[i])
                            //                               DigiTamanho = true;
                            //                               DigiSessao = true;
                            //                               AtiTamanho = ItensMenus[i].AtivoTamanho;
                                                        
                            //                               VerMen={
                            //                                   Nome:[],
                            //                                   Descricao:[],
                            //                                   Foto:[],
                            //                                   Preco:ItensMenus[i].Preco,
                            //                                   Descont:ItensMenus[i].Descont,
                            //                                   SubSessao:ItensMenus[i].AtivoTamanho?ItensMenus[i].Tamanho:"",
                            //                                   Quant:1,
                            //                                   Observacao:"",
                            //                                   ItemEspeci:false,
                            //                                   QuantGeral:1,
                            //                                   Sessao:ItensMenus[i].Sessao,
                            //                                   MemFim:ItensMenus[i].MemFim,
                            //                                   QuantSb:ItensMenus[i].QuantSb
                            //                               }
                                                      

                            //                           }

                            //                       } else {
                            //                           TamanhoNome = ItensMenus[i].Tamanho;
                            //                           AtiSessao = ItensMenus[i].AtivoSessao;
                            //                           TagTTirar = TagTModi;
                            //                           QuantSabor= ItensMenus[i].QuantSb
                            //                           NotTamanho = ItensMenus[i].Tamanho
                            //                           GrupTamanho.push(ItensMenus[i])
                            //                           DigiTamanho = true;
                            //                           DigiSessao = true;
                            //                           SessaoGuar =ItensMenus[i].Sessao;
                            //                           AtiTamanho = ItensMenus[i].AtivoTamanho;
                            //                           ItemComTam = ItensMenus[i].ComTam;
                                                    
                            //                           VerMen={
                            //                               Nome:[],
                            //                               Descricao:[],
                            //                               Foto:[],
                            //                               Preco:ItensMenus[i].Preco,
                            //                               Descont:ItensMenus[i].Descont,
                            //                               SubSessao:ItensMenus[i].AtivoTamanho?ItensMenus[i].Tamanho:"",
                            //                               Quant:1,
                            //                               Observacao:"",
                            //                               ItemEspeci:false,
                            //                               QuantGeral:1,
                            //                               Sessao:ItensMenus[i].Sessao,
                            //                               MemFim:ItensMenus[i].MemFim,
                            //                               QuantSb:ItensMenus[i].QuantSb
                            //                           }
                                                  

                            //                       }
                                              

                            //                   }
                                          
                            //               } else {
                                              
                                              
                            //                   if(ItensMenus[i].Tamanho.toLowerCase().includes(Borda) === false){
                                              
                            //                       if(NotTamanho){
                            //                           if(NotTamanho === ItensMenus[i].Tamanho){
                            //                               QuantSabor= ItensMenus[i].QuantSb
                            //                               GrupTamanho.push(ItensMenus[i])
                            //                               DigiTamanho = true;
                            //                               DigiSessao = true
                            //                               AtiTamanho = ItensMenus[i].AtivoTamanho;
                                                          
                            //                               VerMen={
                            //                                   Nome:[],
                            //                                   Descricao:[],
                            //                                   Foto:[],
                            //                                   Preco:ItensMenus[i].Preco,
                            //                                   Descont:ItensMenus[i].Descont,
                            //                                   SubSessao:ItensMenus[i].AtivoTamanho?ItensMenus[i].Tamanho:"",
                            //                                   Quant:1,
                            //                                   Observacao:"",
                            //                                   ItemEspeci:false,
                            //                                   QuantGeral:1,
                            //                                   Sessao:ItensMenus[i].Sessao,
                            //                                   MemFim:ItensMenus[i].MemFim,
                            //                                   QuantSb:ItensMenus[i].QuantSb
                            //                               }
                                                      

                            //                           }

                            //                       } else {
                            //                           TagTTirar = TagTModi;
                            //                           QuantSabor= ItensMenus[i].QuantSb
                            //                           NotTamanho = ItensMenus[i].Tamanho
                            //                           GrupTamanho.push(ItensMenus[i])
                            //                           DigiTamanho = true;
                            //                           DigiSessao = true;
                            //                           TamanhoNome = ItensMenus[i].Tamanho;
                            //                           AtiSessao=ItensMenus[i].AtivoSessao;
                            //                           AtiTamanho = ItensMenus[i].AtivoTamanho;
                            //                           SessaoGuar =ItensMenus[i].Sessao;
                            //                           ItemComTam = ItensMenus[i].ComTam;
                            //                           VerMen={
                            //                               Nome:[],
                            //                               Descricao:[],
                            //                               Foto:[],
                            //                               Preco:ItensMenus[i].Preco,
                            //                               Descont:ItensMenus[i].Descont,
                            //                               SubSessao:ItensMenus[i].AtivoTamanho?ItensMenus[i].Tamanho:"",
                            //                               Quant:1,
                            //                               Observacao:"",
                            //                               ItemEspeci:false,
                            //                               QuantGeral:1,
                            //                               Sessao:ItensMenus[i].Sessao,
                            //                               MemFim:ItensMenus[i].MemFim,
                            //                               QuantSb:ItensMenus[i].QuantSb
                            //                           }
                                                  

                            //                       }
                                              

                            //                   }
                                      
                            //               }
                            //               // if(Desa25){ 
                            //               //   if(ItensMenus[i].AtivoTamanho) { 
                            //               // } else{

                            //               // }
                            //               // }
                                          
                                          
                            //           } 
                            //       }

                                      
                                      

                                      
                                      

                            //       }
                            //       }
                            //       }
                            //       Msg = Msg.replace(TagTTirar, "  ")
                            //     //   console.log(Msg)
                            //     //   console.log(NotTamanho)

                             
                                  
                            //   if(DigiTamanho &&  AtiTamanho){
                            //       var ListSabor = [];
                            //       var ListDescr = [];
                            //       var ListFoto = []; 
                            //       var TagIMode = "";
                            //       var TagITirar = []
                                  
                            //       for(let i in GrupTamanho){
                            //           for(let j in GrupTamanho[i].TagsItens){
                            //               TagIMode =" "+ GrupTamanho[i].TagsItens[j].toLowerCase()+" "
                            //                   // console.log("Conb: "+DivNome4[j])
                            //                   // console.log("Sessao "+GrupTamanho[i].Nome.toLowerCase())
                            //                   if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                            //                   if(Msg.includes(TagIMode)){
                            //                       if(ListSabor.length < QuantSabor){
                            //                           if(ListSabor.includes(GrupTamanho[i].Nome)=== false){
                                                            
                            //                               if( GrupTamanho[i].AtivoSabor && GrupTamanho[i].AtivoTamanho){
                            //                                   if(TagITirar.includes(TagIMode)=== false){
                            //                                       TagITirar.push(TagIMode)
                            //                                   }
                            //                               ListSabor.push(GrupTamanho[i].Nome)
                            //                               ListDescr.push(GrupTamanho[i].Descricao)
                            //                               ListFoto.push(GrupTamanho[i].foto)

                            //                                   GrupSabor.push(GrupTamanho[i])
                            //                                   DigiSabor = true;
                            //                                   AtiSabor = GrupTamanho[i].AtivoSabor;
                            //                                   VerMen={
                            //                                       Nome:ListSabor,
                            //                                       Descricao:ListDescr,
                            //                                       Foto:ListFoto,
                            //                                       Preco:GrupTamanho[i].Preco,
                            //                                       Descont:GrupTamanho[i].Descont,
                            //                                       SubSessao:GrupTamanho[i].Tamanho,
                            //                                       Quant:1,
                            //                                       Observacao:"",
                            //                                       ItemEspeci:false,
                            //                                       QuantGeral:1,
                            //                                       Sessao:GrupTamanho[i].Sessao,
                            //                                       MemFim:GrupTamanho[i].MemFim,
                            //                                       QuantSb:GrupTamanho[i].QuantSb
                            //                                   }
                            //                               } else {
                            //                                   if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                            //                                       SaborIndis.push(GrupTamanho[i].Nome);
                            //                                   }
                            //                                   DigiSabor = true;
                            //                                   AtiSabor = false;
                            //                               } 
                                                          

                            //                                   }
                            //                       }
                                                      
                                                              

                                                              

                                                          
                            //                   }
                                                      
                                                  
                                              
                                              
                            //                   } 

                                          
                                          

                                              
                                              

                            //               }
                                          
                            //           }
                                  
                            //           for(let d in TagITirar){
                            //               Msg = Msg.replace(TagITirar[d], "  ")
                            //               }
                            //             //   console.log(TagITirar)
                            //             //   console.log("Msg 3 "+Msg)
                              
                            //   } else { //digitou sessão e Sabor
                            //      //  console.log("Entrou No Só Sabor 1")
                            //       var NotSabor = true;
                            //       var TagIMode = "";
                            //       var TagITirar = []
                                  
                            //       for(let i in ItensMenus){
                            //           for(let j in ItensMenus[i].TagsItens){
                            //               TagIMode =" "+ ItensMenus[i].TagsItens[j].toLowerCase()+" "
                            //               // console.log("Conb: "+TagIMode)
                            //               // console.log("Sessao "+Msg)
                            //               if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                            //                  // console.log("Achou uma 1")
                            //                  if(Msg.includes(TagIMode)){
                            //                   //console.log("Achou uma 2")
                            //                   if(ItensMenus[i].MemFim){

                            //                      // console.log("Entrou No Só Sabor 2")
                            //                   if(ItensMenus[i].AtivoSabor){
                            //                   if(DigiSabor === false){
                            //                       if( ItensMenus[i].AtivoSabor){
                            //                           if(TagITirar.includes(TagIMode)=== false){
                            //                               TagITirar.push(TagIMode)
                            //                           }
                                                      
                            //                           AtiSessao = ItensMenus[i].AtivoSessao;
                            //                           TagTTirar = TagTModi;
                            //                           QuantSabor= ItensMenus[i].QuantSb
                            //                           NotTamanho = ItensMenus[i].Tamanho
                            //                           GrupTamanho.push(ItensMenus[i])
                            //                           DigiSessao = true;
                            //                           SessaoGuar =ItensMenus[i].Sessao;
                            //                           ItemComTam = ItensMenus[i].ComTam;

                            //                           GrupSabor.push(ItensMenus[i])
                            //                           DigiSabor = true;
                            //                           AtiSabor = ItensMenus[i].AtivoSabor;
                            //                           VerMen={
                            //                               Nome:[ItensMenus[i].Nome],
                            //                               Descricao:[ItensMenus[i].Descricao],
                            //                               Foto:[ItensMenus[i].foto],
                            //                               Preco:ItensMenus[i].Preco,
                            //                               Descont:ItensMenus[i].Descont,
                            //                               SubSessao:"",
                            //                               Quant:1,
                            //                               Observacao:"",
                            //                               ItemEspeci:false,
                            //                               QuantGeral:1,
                            //                               Sessao:ItensMenus[i].Sessao,
                            //                               MemFim:ItensMenus[i].MemFim,
                            //                               QuantSb:ItensMenus[i].QuantSb
                            //                           }

                            //                       }
                                              

                                              

                            //               } 
                            //                   } else {
                            //                       if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                            //                           SaborIndis.push(GrupSessao[i].Nome);
                            //                       }
                            //                   DigiSabor = true;
                            //                   AtiSabor = false;
                            //                   }
                            //               }
                                                  

                                                  
                                              
                                          
                                          
                            //               }
                            //           }

                                      
                                      

                                          
                                          

                            //           }
                                      
                            //       }
                            //       for(let d in TagITirar){
                            //       Msg = Msg.replace(TagITirar[d], "  ")
                            //       }
                            //       // console.log(TagITirar)
                            //       // console.log("Msg 3 "+Msg)

                            //   }
                            //   SessaoGuar = VerMen.Sessao;
                            // //   console.log("Vendo Sessaõ")
                            // //   console.log( SessaoGuar ) 
                            // //   console.log("Vendo Tamanho")
                            // //   console.log(GrupTamanho) 

                            // //   console.log("Sabor Escolhido Sabor")
                            // //   console.log(VerMen) 

                          

                            //   } 

                            //console.log("Nome ver"+TagMModi)

                              if(DigiSessao === true ){
        
                              ItensPedido.push({
                                NomeDigi :TagMtira,
                                Sessao:SessaoGuar,
                                
                            })
                        }
             
          
         
            
          

         
       

       }//Fim Das Analises Loop
       
     
                  var DadosEnv = {
                   
                     ItensPedido, 
                     
                  }
    return DadosEnv;
    
 };