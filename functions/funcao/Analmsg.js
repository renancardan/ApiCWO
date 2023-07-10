const ConsMsg =  require("./Consmsg");
const TamanhoMsg =  require("./Tamanhomsg");


 module.exports = (Msg, ItensMenus, DadoEmp, Msg1) =>{
    var TiraPalavra = [" traz ", " faz ", " caprichada ",  " boa noite ", "boa tarde ", " bom dia ", " oi ", " muito ",  " vai ", " demorar ", " ainda ", " meu " , " não  ", " cheque ", " fria ", " tamanho ", " com borda ", " sem borda ",  " com boda ", " um ", "uma ", " ne ", " quero ", " quero ", " uma ", " sabor ",  " eu ", " querer ", " quere", " vou ", " vou ", " pra ", " mim ", " meu ", " meu ", " bem ", " faz ", " por ", " por ", " favor ", " de ", " sabor ", " sabor ",  " mais ", " pedir ",  ]
    var PalCardapio = ["cardapio", "cardápio", "cadapio", "cadápio"]
    var PalPreco = ["preco", "preço", "quanto", "qnt", "valor" ];
    var PalEncerrou = ["encerrou", "funcionando"];
    var PalNegacao = ["não", "nao", "ñ ", " ñ ", "ñ" , "só isso", "so isso"];
    var PalPositivo = ["sim", "quais sao", "quais são", "que tem "];
    var PalNegEnd = ["não", "nao", "ñ ", " ñ ", "ñ" , "outro", ];
    var PalEntrega = [" buscar ",  " busca ", " comer ai ", " come ai ", " pegar ", " pega " , " eu vou ai ", " ja esta indo ", " ja ta indo ", " já pra ir " ];
    var PalDemora = ["demora", "tempo", "minutos", "minuto", "duração", "duracao" ]
    var PalNum1 = ["1", "um", "uma"]
    var PalNum2 = ["2", "duas", "dois"]
    var PalNum3 = ["3", "três", "tres", "trez"]
    var PalDiferencial = ["outra", "outro", "outra de", "outro de"]
    var PalPix = ["pix", "picsis", "piquis"]
    var PalDinheiro = ["dinheiro", "dinhero", "pagar aqui", "paga aqui", "pg aqui", "troco", "trocado", "em mãos", "em maos", "em mao",  "em mão", "em especie", "em espesie", "em espessie", "em espécie"]
    var PalCartao = ["maquininha", "cartao", "cartão", "maquina", "máquina", "credito", "crédito", "debito", "débito", "cedito", "cédito"]
    var PalEnd = [" numero ", " n° ", " n ", " rua ", " casa ", " ginásio ", " ginasio ", " muro ", " bar ", " em frente ", " enfrente ", " frente ", " lado ", " endereço ", " endereco ", " portao ", " portão ", " assentamento ", " porta ", " travessa ", " beco ", " aqui no ", " posto ", " pousada ", " hotel ", " motel ", " quarto ", " esquina ", " no fundo ", " placa ", " canto ", " lado ", " loja ", " bairro ", " creche ", " torre ", " caixa dagua ", " caixa de agua ", " escola ", " faculdade ", 
      " salão ", " salao ", " deposito ", " grade ", " perto da ", " prefeitura ", " proximo  ", " próximo ", " aqui no ", " quadra ", " ap ", " apartamento ", " sentados ", " avenida ", " restaurante ", " antigo ", " armarinho ", " armarínho ", " comecial ", " marcenaria ", " praça ", " br ", " casa ", " residencial ", " edificio ", " edifício ", " predio ", " prédio ", " balcão ", " palcão ", " malharia " ]
      var PalProximo = [" Ponto de Referência ", " Ponto de Referencia ", " casa ", " ginásio ", " ginasio ", " muro ", " bar ", " em frente ", " enfrente ", " frente ", " lado ",  " portao ", " portão ",  " porta ", " beco ",  " posto ", " pousada ", " hotel ", " motel ", " quarto ", " esquina ", " no fundo ", " placa ", " canto ", " lado ", " loja ",  " creche ", " torre ", " caixa dagua ", " caixa de agua ", " escola ", " faculdade ", 
      " salão ", " salao ", " deposito ", " grade ", " perto da ", " prefeitura ", " proximo  ", " próximo ",    " restaurante ", " antigo ", " armarinho ", " armarínho ", " comecial ", " marcenaria ", " praça ", " br ", " casa ", " residencial ", " edificio ", " edifício ", " predio ", " prédio ", " balcão ", " palcão ", " malharia " ]
    
    var ListaItens = ItensMenus;
    var ItensPedido = []
    var ItensFalta = []
    var Card25 = false;
    var Preco = false;
    var Encerrou = false;
    var Negacao = false;
    var Positiva = false;
    var Variaveis = [];
    var Pix =false;
    var Dinheiro = false;
    var Cartao = false;
    var Troco = null;
    var ExtPix = null;
    var End = "";
    var Entregar = false;
    var DigProximo = false;
    var BairroDigi = false;
    var BairroAti = false;
    var ValordaEntrega = 0
    var Desati = false;
    var AnaliEnd= true;
    var Buscar = false;

    console.log("Msg Chegou "+Msg1)
    
    for (let z=0; z<4; z++) {//Procurando Itens Loop Inicio
                                 
                                 
        var QuantSessao = 1;
     
       var PrecoPre = false;

       
        var GrupSessao = [];
        var GrupTamanho = [];
        var GrupSabor = [];

        var DigiSessao = false;
        var DigiTamanho= false;
        var DigiSabor = false;
        var DigiSabor2 = false;


        var AtiSessao = false;
        var AtiTamanho = false;
        var AtiSabor = false;
        var AtiSabor2 = false;

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
          ItemComTam:false,
          MemFim:false,
          QuantSb:1
        };
        var VerMen2 = {
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
            ItemComTam:false,
            MemFim:false,
            QuantSb:1
          };
          var VerMen3 = {
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
            ItemComTam:false,
            MemFim:false,
            QuantSb:1
          };
        var VerSessao = []
        var SaborIndis = [];
        var  cardaVer = "";
       

        var PrecoVer = "";
          for(let i in PalPreco){
              PrecoVer =" "+ PalPreco[i]+" ";
                  if(Msg.includes(PrecoVer)){
                  Msg = Msg.replace(PrecoVer, "  ")
                  Preco = true;
                  PrecoPre = true;
                  }
          

              }

  

       
       
     
       
          
              //esse  nota sessão server para pegar a primeira sessão que foi
              var NotSessao = "";
              //Digitou sessão 
              var TagMModi = ""
              var TagMtira = ""
              var PodeSessao = true;
              var QuantRepet = 0;
                              for(let i in ItensMenus){
                                  for(let j in ItensMenus[i].TagsMenus){
                                    TagMModi =" "+ItensMenus[i].TagsMenus[j].toLowerCase()+" ";
                                     
                                      
                                      if(TagMModi !== "" && TagMModi !== " " && TagMModi !== "  " && TagMModi !== "   "){
                                        
                                       

                                      if(Msg.includes(TagMModi)){
                                        //    console.log("Nomes "+ItensMenus[i].Sessao)
                                        //    console.log("TagSessao: "+TagMModi)
                                        //    console.log("Msg "+Msg)
                                        
                                        //tou casando na mesnagem enviada original  se tem nome repetido
                                    //     const regex = new RegExp(TagMModi, "g");
                                    //     QuantRepet = (Msg1.match(regex) || []).length
                                        
                                    //   if(QuantRepet > 1){
                                      for(let g in ItensPedido){
                                          if(ItensPedido[g].Sessao === ItensMenus[i].Sessao){
                                              PodeSessao = false; 
                                          }
                                      }
                                    // }   

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
                                            //Pegando o valor atrás da sessaõ 
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

                              //Essa funçção serve para o sabor não cair em uma sessão diferente
                              var DadoFuncao = ConsMsg(Msg, ItensMenus, DadoEmp) 
                             // console.log(DadoFuncao)
                              var MsgEdiPos = "";
                              for(let f in DadoFuncao.ItensPedido){
                                if(DadoFuncao.ItensPedido.length > 1){
                                if(f > 0){

                              
                                var Antes = Msg.indexOf(TagMtira)
                                var MsgEdiAntes = Msg.slice(Antes)
                                var Pos = MsgEdiAntes.indexOf(DadoFuncao.ItensPedido[f].NomeDigi)
                                 MsgEdiPos = MsgEdiAntes.slice(0, Pos)
                             
                                
                                 }
                                } else {

                                    var Antes = Msg.indexOf(TagMtira)
                                    MsgEdiPos =  Msg.slice(Antes)

                                }
                              }
                             //Mensagem pronta ´para anali
                              MsgEdiPos = " "+MsgEdiPos+" "
                             // console.log("Msg Edi"+MsgEdiPos)




                              //Tirando a sessão da Msg
                              Msg = Msg.replace(TagMtira, "  ")
                              

                              // console.log(SessaoGuar)
                              // console.log(Msg)

                              if(DigiSessao){
                                  if(ItemComTam){//se tiver tamanho
                                    var NotTamanho = ""
                                    var TagTModi = ""
                                    var TagTTirar   
                                 var FuncaoTamanho = TamanhoMsg(GrupSessao, MsgEdiPos, Msg,  QuantSessao, DadoEmp) 

                                 NotTamanho = FuncaoTamanho.NotTamanho ;
                                 TamanhoNome = FuncaoTamanho.TamanhoNome ;
                                 DigiTamanho = FuncaoTamanho.DigiTamanho ;
                                 TagTModi = FuncaoTamanho.TagTModi ;
                                 TagTTirar = FuncaoTamanho.TagTTirar ;
                                QuantSabor = FuncaoTamanho.QuantSabor ;
                                GrupTamanho = FuncaoTamanho.GrupTamanho ;
                                AtiTamanho = FuncaoTamanho.AtiTamanho ;
                                VerMen = FuncaoTamanho.VerMen ;
                                VerMen2 = FuncaoTamanho.VerMen2 ;
                                VerMen3 = FuncaoTamanho.VerMen3 ;
                                var NotTamanho2 =  FuncaoTamanho.NotTamanho2 ;
                                var TamanhoNome2 = FuncaoTamanho.TamanhoNome2 ;
                                var TagTModi2 =  FuncaoTamanho.TagTModi2 ;
                                var TagTTirar2 =  FuncaoTamanho.TagTTirar2 ;
                                var QuantSabor2 =  FuncaoTamanho.QuantSabor2 ;
                                var GrupTamanho2 =  FuncaoTamanho.GrupTamanho2 ;
                                var DigiTamanho2 =  FuncaoTamanho.DigiTamanho2 ;
                                var AtiTamanho2 =  FuncaoTamanho.AtiTamanho2;
                               var tanhanho2 = FuncaoTamanho.tanhanho2;
                               var Tam1Sabor2 = false;
                               MsgEdiPos = FuncaoTamanho.MsgEdiPos;
                                  Msg = Msg.replace(TagTTirar, "  ")
                                  Msg = Msg.replace(TagTTirar2, "  ")
                                  // console.log(Msg)
                                  // console.log(NotTamanho)
                            console.log("Msg Analmesg "+MsgEdiPos)
                               

                                //   if(DigiTamanho === false){ //digitou sessão e Sabor

                                //       var NotSabor = true;
                                //       var TagIMode = "";
                                //       var TagITirar = []
                                      
                                //       for(let i in GrupSessao){
                                //           for(let j in GrupSessao[i].TagsItens){
                                //               TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                                //               // console.log("Conb: "+TagIMode)
                                //               // console.log("Sessao "+Msg)
                                //               if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                //                  // console.log("Achou uma 1")
                                //                  if(MsgEdiPos.includes(TagIMode)){
                                //                   //console.log("Achou uma 2")
                                //                   if(GrupSessao[i].AtivoSabor){
                                //                   if(DigiSabor === false){
                                //                       if( GrupSessao[i].AtivoSabor){
                                //                           if(TagITirar.includes(TagIMode)=== false){
                                //                               TagITirar.push(TagIMode)
                                //                           }

                                //                           GrupSabor.push(GrupSessao[i])
                                //                           DigiSabor = true;
                                //                           AtiSabor = GrupSessao[i].AtivoSabor;
                                //                           VerMen={
                                //                               Nome:[GrupSessao[i].Nome],
                                //                               Descricao:[GrupSessao[i].Descricao],
                                //                               Foto:[GrupSessao[i].foto],
                                //                               Preco:0,
                                //                               Descont:0,
                                //                               SubSessao:"",
                                //                               Quant:1,
                                //                               Observacao:"",
                                //                               ItemEspeci:false,
                                //                               QuantGeral:1,
                                //                               Sessao:GrupSessao[i].Sessao,
                                //                               MemFim:GrupSessao[i].MemFim,
                                //                               QuantSb:GrupSessao[i].QuantSb,
                                //                               ItemComTam:GrupSessao[i].ComTam,

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
                                //           }

                                          
                                          

                                              
                                              

                                //           }
                                          
                                //       }
                                //       for(let d in TagITirar){
                                //       Msg = Msg.replace(TagITirar[d], "  ")
                                //       }
                                //       // console.log(TagITirar)
                                //       // console.log("Msg 3 "+Msg)

                                //   }
                                
                                if(DigiTamanho === false){
                                    if(QuantSessao === 1){//vendo se digitou o sabor com 1 item
                                      console.log("entrou por aqui nessa região")
                                      console.log("Texto "+MsgEdiPos)
                                            var ListSabor = [];
                                            var ListDescr = [];
                                            var ListFoto = []; 
                                            var TagIMode = "";
                                            var TagITirar = []
                                            //console.log(GrupTamanho)
                                            
                                                for(let i in GrupSessao){
                                                    for(let j in GrupSessao[i].TagsItens){
                                                      TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                                                        
                                                        if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                     
                                                            if(MsgEdiPos.includes(TagIMode)){
                                                          
                                                           
                                                            
                                                            if(ListSabor.length < 4){
                                                                
                                                        
                                                                if(ListSabor.includes(GrupSessao[i].Nome)=== false){
                                                                    // console.log("Nome "+GrupTamanho[i].Nome)
                                                                    // console.log("AtivoSabor "+GrupTamanho[i].AtivoSabor)
                                                                    // console.log("AtivoTam "+GrupTamanho[i].AtivoTamanho)
                                                                    // console.log("AtivoSess "+GrupTamanho[i].AtivoSessao)
                                                                    
                                                                    if( GrupSessao[i].AtivoSabor){
                                                                    ListSabor.push(GrupSessao[i].Nome)
                                                                    ListDescr.push(GrupSessao[i].Descricao)
                                                                    ListFoto.push(GrupSessao[i].foto)
      
                                                                    if(TagITirar.includes(TagIMode)=== false){
                                                                        TagITirar.push(TagIMode)
                                                                    }
      
                                                                        GrupSabor.push(GrupSessao[i])
                                                                        DigiSabor = true;
                                                                        AtiSabor = GrupSessao[i].AtivoSabor;
                                                                        VerMen={
                                                                            Nome:ListSabor,
                                                                            Descricao:ListDescr,
                                                                            Foto:ListFoto,
                                                                            Preco:0,
                                                                            Descont:0,
                                                                            SubSessao:"",
                                                                            Quant:1,
                                                                            Observacao:"",
                                                                            ItemEspeci:false,
                                                                            QuantGeral:1,
                                                                            Sessao:GrupSessao[i].Sessao,
                                                                            MemFim:GrupSessao[i].MemFim,
                                                                            QuantSb:GrupSessao[i].QuantSb,
                                                                            ItemComTam:GrupSessao[i].ComTam,
                                                                        }
                                                                } else{
                                                                   // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                    if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                                                                        SaborIndis.push(GrupSessao[i].Nome);
                                                                    }
                                                                }
                                                                    
      
                                                                        }
                                                            }
                                                                
                                                                        
      
                                                                        
      
                                                                    
      
                                                                
                                                            
                                                        
                                                        
                                                        }
                                                    }
      
                                                    
                                                    
      
                                                        
                                                        
      
                                                    }
                                                    
                                                }
                                                for(let d in TagITirar){
                                                Msg = Msg.replace(TagITirar[d], "  ")
                                                MsgEdiPos = MsgEdiPos.replace(TagITirar[d], "  ")
                                                }
                                             
                                                
                                            
                                            
                                        
                                        
                                      } else if(QuantSessao === 2){//vendo se digitou o sabor com 2 item
                                         var Outro = false;
                                         var NomeSabores1 = ""
                                         var NomeSabores2 = ""
                                         var Sabores = []
                                          for(let i in  PalDiferencial){  
                                              // console.log("MsgEdiPos "+MsgEdiPos)    
                                              // console.log("Diferencial "+PalDiferencial[i])                                                                         
                                              if(MsgEdiPos.includes(PalDiferencial[i])){    
                                                  Outro = true;
                                                  Sabores = MsgEdiPos.split(PalDiferencial[i])
                                                  NomeSabores1 = " "+Sabores[0]+" "
                                                  NomeSabores2 = " "+Sabores[1]+" "
                                              }
                                          }
                                          // console.log("Sabores 1 "+NomeSabores1)
                                          // console.log("Sabores 2 "+NomeSabores2)
                                          
                                       
                                              if(Outro){//vendo se ele separou os sabores com a palavra outro
                                                  //Aqui ativa o modo de colocar o sabor parara cada item repetido
                                                      Tam1Sabor2 = true;
                                                  
                                                      var ListSabor = [];
                                                      var ListDescr = [];
                                                      var ListFoto = []; 
                                                      var TagIMode = "";
                                                      var TagITirar = []
                                                      //console.log(GrupTamanho)
                                                      
                                                          for(let i in GrupSessao){
                                                              for(let j in GrupSessao[i].TagsItens){
                                                                TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                                                                  
                                                                  if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                                     
                                                                      if(NomeSabores1.includes(TagIMode)){
                                                                    
                                                                          console.log("Sabores 1 vendo "+NomeSabores1)
                                                                      
                                                                      if(ListSabor.length < 3){
                                                                          
                                                                  
                                                                          if(ListSabor.includes(GrupSessao[i].Nome)=== false){
                                                                            
                                                                              if( GrupSessao[i].AtivoSabor){
                                                                              ListSabor.push(GrupSessao[i].Nome)
                                                                              ListDescr.push(GrupSessao[i].Descricao)
                                                                              ListFoto.push(GrupSessao[i].foto)
                
                                                                              if(TagITirar.includes(TagIMode)=== false){
                                                                                  TagITirar.push(TagIMode)
                                                                              }
                
                                                                                  GrupSabor.push(GrupSessao[i])
                                                                                  DigiSabor = true;
                                                                                  AtiSabor = GrupSessao[i].AtivoSabor;
                                                                                
                                                                                  VerMen={
                                                                                      Nome:ListSabor,
                                                                                      Descricao:ListDescr,
                                                                                      Foto:ListFoto,
                                                                                      Preco:0,
                                                                                      Descont:0,
                                                                                      SubSessao:"",
                                                                                      Quant:1,
                                                                                      Observacao:"",
                                                                                      ItemEspeci:false,
                                                                                      QuantGeral:1,
                                                                                      Sessao:GrupSessao[i].Sessao,
                                                                                      MemFim:GrupSessao[i].MemFim,
                                                                                      QuantSb:GrupSessao[i].QuantSb,
                                                                                      ItemComTam:GrupSessao[i].ComTam,
                                                
                                                                                  }
                                                                                  
                                                                          } else{
                                                                             // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                              if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                                                                                  SaborIndis.push(GrupTamanho[i].Nome);
                                                                              }
                                                                          }
                                                                              
                
                                                                                  }
                                                                      }
                                                                  
                                                                  }
                                                              }
                
                                                              
                                                              
                
                                                                  
                                                                  
                
                                                              }
                                                              
                                                          }
                                                           ListSabor = [];
                                                           ListDescr = [];
                                                          ListFoto = []; 
                                                          TagIMode = "";
                                                          TagITirar = []
                                                          //console.log(GrupTamanho)
                                                          
                                                              for(let i in GrupSessao){
                                                                  for(let j in GrupSessao[i].TagsItens){
                                                                    TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                                                                      
                                                                      if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                                    
                                                                          if(NomeSabores2.includes(TagIMode)){
                                                                              console.log("Sabores 2 vendo "+NomeSabores2)
                                                                         
                                                                          
                                                                          if(ListSabor.length < 3){
                                                                              
                                                                      
                                                                              if(ListSabor.includes(GrupSessao[i].Nome)=== false){
                                                                                
                                                                                  if( GrupSessao[i].AtivoSabor){
                                                                                  ListSabor.push(GrupSessao[i].Nome)
                                                                                  ListDescr.push(GrupSessao[i].Descricao)
                                                                                  ListFoto.push(GrupSessao[i].foto)
                    
                                                                                  if(TagITirar.includes(TagIMode)=== false){
                                                                                      TagITirar.push(TagIMode)
                                                                                  }
                    
                                                                                      //GrupSabor.push(GrupTamanho[i])
                                                                                      DigiSabor2 = true;
                                                                                      AtiSabor2 = GrupSessao[i].AtivoSabor;
                                                                                    
                                                                                      VerMen2={
                                                                                          Nome:ListSabor,
                                                                                          Descricao:ListDescr,
                                                                                          Foto:ListFoto,
                                                                                          Preco:0,
                                                                                          Descont:0,
                                                                                          SubSessao:"",
                                                                                          Quant:1,
                                                                                          Observacao:"",
                                                                                          ItemEspeci:false,
                                                                                          QuantGeral:1,
                                                                                          Sessao:GrupSessao[i].Sessao,
                                                                                          MemFim:GrupSessao[i].MemFim,
                                                                                          QuantSb:GrupSessao[i].QuantSb,
                                                                                          ItemComTam:GrupSessao[i].ComTam,
                                                    
                                                                                      }
                                                                                      
                                                                              } else{
                                                                                 // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                                  if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                                                                                      SaborIndis.push(GrupTamanho[i].Nome);
                                                                                  }
                                                                              }
                                                                                  
                    
                                                                                      }
                                                                          }
                                                                      
                                                                      }
                                                                  }
                    
                                                                  
                                                                  
                    
                                                                      
                                                                      
                    
                                                                  }
                                                                  
                                                              }
                                                           console.log("Aqui ja chegou 2 sabores")
                                                          for(let d in TagITirar){
                                                          Msg = Msg.replace(TagITirar[d], "  ")
                                                          MsgEdiPos = MsgEdiPos.replace(TagITirar[d], "  ")
                                                          }
                                                      
                                                      
                                                  } else {//Aqui vai entra se os sabores digitados é o mesmo para os 2 itens
                                                    //  console.log("Entrou no sabores com 1 ")
                                              
                                              var ListSabor = [];
                                              var ListDescr = [];
                                              var ListFoto = []; 
                                              var TagIMode = "";
                                              var TagITirar = []
                                              //console.log(GrupTamanho)
                                              
                                                  for(let i in GrupSessao){
                                                      for(let j in GrupSessao[i].TagsItens){
                                                        TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                                                          
                                                          if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                       
                                                              if(MsgEdiPos.includes(TagIMode)){
                                                            
                                                             
                                                              
                                                              if(ListSabor.length < 3){
                                                                  
                                                          
                                                                  if(ListSabor.includes(GrupSessao[i].Nome)=== false){
                                                                    
                                                                      if( GrupSessao[i].AtivoSabor){
                                                                      ListSabor.push(GrupSessao[i].Nome)
                                                                      ListDescr.push(GrupSessao[i].Descricao)
                                                                      ListFoto.push(GrupSessao[i].foto)
        
                                                                      if(TagITirar.includes(TagIMode)=== false){
                                                                          TagITirar.push(TagIMode)
                                                                      }
        
                                                                          GrupSabor.push(GrupSessao[i])
                                                                          DigiSabor = true;
                                                                          AtiSabor = GrupSessao[i].AtivoSabor;
                                                                        
                                                                          VerMen={
                                                                              Nome:ListSabor,
                                                                              Descricao:ListDescr,
                                                                              Foto:ListFoto,
                                                                              Preco:0,
                                                                              Descont:0,
                                                                              SubSessao:"",
                                                                              Quant:1,
                                                                              Observacao:"",
                                                                              ItemEspeci:false,
                                                                              QuantGeral:1,
                                                                              Sessao:GrupSessao[i].Sessao,
                                                                              MemFim:GrupSessao[i].MemFim,
                                                                              QuantSb:GrupSessao[i].QuantSb,
                                                                              ItemComTam:GrupSessao[i].ComTam,
                                        
                                                                          }
                                                                          
                                                                  } else{
                                                                     // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                      if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                                                                          SaborIndis.push(GrupTamanho[i].Nome);
                                                                      }
                                                                  }
                                                                      
        
                                                                          }
                                                              }
                                                          
                                                          }
                                                      }
        
                                                      
                                                      
        
                                                          
                                                          
        
                                                      }
                                                      
                                                  }
                                                  
                                               
                                                  
                                              }
                                              
                                          
                                          
                                      }
                                }

                                  if(QuantSessao === 1){//vendo se digitou o sabor com 1 item
                                    if(DigiTamanho){//vendo se digitou o sabor
                                        var ListSabor = [];
                                        var ListDescr = [];
                                        var ListFoto = []; 
                                        var TagIMode = "";
                                        var TagITirar = []
                                        //console.log(GrupTamanho)
                                        
                                            for(let i in GrupTamanho){
                                                for(let j in GrupTamanho[i].TagsItens){
                                                  TagIMode =" "+ GrupTamanho[i].TagsItens[j].toLowerCase()+" "
                                                    
                                                    if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                 
                                                        if(MsgEdiPos.includes(TagIMode)){
                                                      
                                                       
                                                        
                                                        if(ListSabor.length < QuantSabor){
                                                            
                                                    
                                                            if(ListSabor.includes(GrupTamanho[i].Nome)=== false){
                                                                // console.log("Nome "+GrupTamanho[i].Nome)
                                                                // console.log("AtivoSabor "+GrupTamanho[i].AtivoSabor)
                                                                // console.log("AtivoTam "+GrupTamanho[i].AtivoTamanho)
                                                                // console.log("AtivoSess "+GrupTamanho[i].AtivoSessao)
                                                                
                                                                if( GrupTamanho[i].AtivoSabor){
                                                                ListSabor.push(GrupTamanho[i].Nome)
                                                                ListDescr.push(GrupTamanho[i].Descricao)
                                                                ListFoto.push(GrupTamanho[i].foto)
  
                                                                if(TagITirar.includes(TagIMode)=== false){
                                                                    TagITirar.push(TagIMode)
                                                                }
  
                                                                    GrupSabor.push(GrupTamanho[i])
                                                                    DigiSabor = true;
                                                                    AtiSabor = GrupTamanho[i].AtivoSabor;
                                                                    VerMen={
                                                                        Nome:ListSabor,
                                                                        Descricao:ListDescr,
                                                                        Foto:ListFoto,
                                                                        Preco:GrupTamanho[i].Preco,
                                                                        Descont:GrupTamanho[i].Descont,
                                                                        SubSessao:GrupTamanho[i].Tamanho,
                                                                        Quant:1,
                                                                        Observacao:"",
                                                                        ItemEspeci:false,
                                                                        QuantGeral:1,
                                                                        Sessao:GrupTamanho[i].Sessao,
                                                                        MemFim:GrupTamanho[i].MemFim,
                                                                        QuantSb:GrupTamanho[i].QuantSb,
                                                                        ItemComTam:GrupTamanho[i].ComTam,
                                                                    }
                                                            } else{
                                                               // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                                                                    SaborIndis.push(GrupTamanho[i].Nome);
                                                                }
                                                            }
                                                                
  
                                                                    }
                                                        }
                                                            
                                                                    
  
                                                                    
  
                                                                
  
                                                            
                                                        
                                                    
                                                    
                                                    }
                                                }
  
                                                
                                                
  
                                                    
                                                    
  
                                                }
                                                
                                            }
                                            for(let d in TagITirar){
                                            Msg = Msg.replace(TagITirar[d], "  ")
                                            MsgEdiPos = MsgEdiPos.replace(TagITirar[d], "  ")
                                            }
                                         
                                            
                                        
                                        
                                    
                                    }
                                  } else if(QuantSessao === 2){//vendo se digitou o sabor com 2 item
                                     var Outro = false;
                                     var NomeSabores1 = ""
                                     var NomeSabores2 = ""
                                     var Sabores = []
                                      for(let i in  PalDiferencial){  
                                          // console.log("MsgEdiPos "+MsgEdiPos)    
                                          // console.log("Diferencial "+PalDiferencial[i])                                                                         
                                          if(MsgEdiPos.includes(PalDiferencial[i])){    
                                              Outro = true;
                                              Sabores = MsgEdiPos.split(PalDiferencial[i])
                                              NomeSabores1 = " "+Sabores[0]+" "
                                              NomeSabores2 = " "+Sabores[1]+" "
                                          }
                                      }
                                      // console.log("Sabores 1 "+NomeSabores1)
                                      // console.log("Sabores 2 "+NomeSabores2)
                                      
                                      if(DigiTamanho){//vendo se digitou o sabor
                                          if(Outro){//vendo se ele separou os sabores com a palavra outro
                                              if(tanhanho2){
                                              //console.log("Entrou no sabores com 2 ")
                                          
                                              var ListSabor = [];
                                              var ListDescr = [];
                                              var ListFoto = []; 
                                              var TagIMode = "";
                                              var TagITirar = []
                                              //console.log(GrupTamanho)
                                              
                                                  for(let i in GrupTamanho){
                                                      for(let j in GrupTamanho[i].TagsItens){
                                                        TagIMode =" "+ GrupTamanho[i].TagsItens[j].toLowerCase()+" "
                                                          
                                                          if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                             
                                                              if(NomeSabores1.includes(TagIMode)){
                                                            
                                                                  //console.log("Sabores 1 vendo "+NomeSabores1)
                                                              
                                                              if(ListSabor.length < QuantSabor){
                                                                  
                                                          
                                                                  if(ListSabor.includes(GrupTamanho[i].Nome)=== false){
                                                                    
                                                                      if( GrupTamanho[i].AtivoSabor){
                                                                      ListSabor.push(GrupTamanho[i].Nome)
                                                                      ListDescr.push(GrupTamanho[i].Descricao)
                                                                      ListFoto.push(GrupTamanho[i].foto)
        
                                                                      if(TagITirar.includes(TagIMode)=== false){
                                                                          TagITirar.push(TagIMode)
                                                                      }
        
                                                                          GrupSabor.push(GrupTamanho[i])
                                                                          DigiSabor = true;
                                                                          AtiSabor = GrupTamanho[i].AtivoSabor;
                                                                        
                                                                          VerMen={
                                                                              Nome:ListSabor,
                                                                              Descricao:ListDescr,
                                                                              Foto:ListFoto,
                                                                              Preco:GrupTamanho[i].Preco,
                                                                              Descont:GrupTamanho[i].Descont,
                                                                              SubSessao:GrupTamanho[i].Tamanho,
                                                                              Quant:1,
                                                                              Observacao:"",
                                                                              ItemEspeci:false,
                                                                              QuantGeral:1,
                                                                              Sessao:GrupTamanho[i].Sessao,
                                                                              MemFim:GrupTamanho[i].MemFim,
                                                                              QuantSb:GrupTamanho[i].QuantSb,
                                                                              ItemComTam:GrupTamanho[i].ComTam,
                                        
                                                                          }
                                                                          
                                                                  } else{
                                                                     // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                      if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                                                                          SaborIndis.push(GrupTamanho[i].Nome);
                                                                      }
                                                                  }
                                                                      
        
                                                                          }
                                                              }
                                                          
                                                          }
                                                      }
        
                                                      
                                                      
        
                                                          
                                                          
        
                                                      }
                                                      
                                                  }
                                                   ListSabor = [];
                                                   ListDescr = [];
                                                  ListFoto = []; 
                                                  TagIMode = "";
                                                  TagITirar = []
                                                  //console.log(GrupTamanho)
                                                  
                                                      for(let i in GrupTamanho2){
                                                          for(let j in GrupTamanho2[i].TagsItens){
                                                            TagIMode =" "+ GrupTamanho2[i].TagsItens[j].toLowerCase()+" "
                                                              
                                                              if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                            
                                                                  if(NomeSabores2.includes(TagIMode)){
                                                                     // console.log("Sabores 2 vendo "+NomeSabores2)
                                                                 
                                                                  
                                                                  if(ListSabor.length < QuantSabor2){
                                                                      
                                                              
                                                                      if(ListSabor.includes(GrupTamanho2[i].Nome)=== false){
                                                                        
                                                                          if( GrupTamanho2[i].AtivoSabor){
                                                                          ListSabor.push(GrupTamanho2[i].Nome)
                                                                          ListDescr.push(GrupTamanho2[i].Descricao)
                                                                          ListFoto.push(GrupTamanho2[i].foto)
            
                                                                          if(TagITirar.includes(TagIMode)=== false){
                                                                              TagITirar.push(TagIMode)
                                                                          }
            
                                                                              GrupSabor.push(GrupTamanho[i])
                                                                              DigiSabor2 = true;
                                                                              AtiSabor2 = GrupTamanho2[i].AtivoSabor;
                                                                            
                                                                              VerMen2={
                                                                                  Nome:ListSabor,
                                                                                  Descricao:ListDescr,
                                                                                  Foto:ListFoto,
                                                                                  Preco:GrupTamanho2[i].Preco,
                                                                                  Descont:GrupTamanho2[i].Descont,
                                                                                  SubSessao:GrupTamanho2[i].Tamanho,
                                                                                  Quant:1,
                                                                                  Observacao:"",
                                                                                  ItemEspeci:false,
                                                                                  QuantGeral:1,
                                                                                  Sessao:GrupTamanho2[i].Sessao,
                                                                                  MemFim:GrupTamanho2[i].MemFim,
                                                                                  QuantSb:GrupTamanho2[i].QuantSb,
                                                                                  ItemComTam:GrupTamanho2[i].ComTam,
                                            
                                                                              }
                                                                              
                                                                      } else{
                                                                         // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                          if(SaborIndis.includes(GrupTamanho2[i].Nome)=== false ){
                                                                              SaborIndis.push(GrupTamanho2[i].Nome);
                                                                          }
                                                                      }
                                                                          
            
                                                                              }
                                                                  }
                                                              
                                                              }
                                                          }
            
                                                          
                                                          
            
                                                              
                                                              
            
                                                          }
                                                          
                                                      }
      
                                                  for(let d in TagITirar){
                                                  Msg = Msg.replace(TagITirar[d], "  ")
                                                  MsgEdiPos = MsgEdiPos.replace(TagITirar[d], "  ")
                                                  }
                                              } else {//Aqui ativa o modo de colocar o sabor parara cada item repetido
                                                  Tam1Sabor2 = true;
                                              
                                                  var ListSabor = [];
                                                  var ListDescr = [];
                                                  var ListFoto = []; 
                                                  var TagIMode = "";
                                                  var TagITirar = []
                                                  //console.log(GrupTamanho)
                                                  
                                                      for(let i in GrupTamanho){
                                                          for(let j in GrupTamanho[i].TagsItens){
                                                            TagIMode =" "+ GrupTamanho[i].TagsItens[j].toLowerCase()+" "
                                                              
                                                              if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                                 
                                                                  if(NomeSabores1.includes(TagIMode)){
                                                                
                                                                      console.log("Sabores 1 vendo "+NomeSabores1)
                                                                  
                                                                  if(ListSabor.length < QuantSabor){
                                                                      
                                                              
                                                                      if(ListSabor.includes(GrupTamanho[i].Nome)=== false){
                                                                        
                                                                          if( GrupTamanho[i].AtivoSabor){
                                                                          ListSabor.push(GrupTamanho[i].Nome)
                                                                          ListDescr.push(GrupTamanho[i].Descricao)
                                                                          ListFoto.push(GrupTamanho[i].foto)
            
                                                                          if(TagITirar.includes(TagIMode)=== false){
                                                                              TagITirar.push(TagIMode)
                                                                          }
            
                                                                              GrupSabor.push(GrupTamanho[i])
                                                                              DigiSabor = true;
                                                                              AtiSabor = GrupTamanho[i].AtivoSabor;
                                                                            
                                                                              VerMen={
                                                                                  Nome:ListSabor,
                                                                                  Descricao:ListDescr,
                                                                                  Foto:ListFoto,
                                                                                  Preco:GrupTamanho[i].Preco,
                                                                                  Descont:GrupTamanho[i].Descont,
                                                                                  SubSessao:GrupTamanho[i].Tamanho,
                                                                                  Quant:1,
                                                                                  Observacao:"",
                                                                                  ItemEspeci:false,
                                                                                  QuantGeral:1,
                                                                                  Sessao:GrupTamanho[i].Sessao,
                                                                                  MemFim:GrupTamanho[i].MemFim,
                                                                                  QuantSb:GrupTamanho[i].QuantSb,
                                                                                  ItemComTam:GrupTamanho[i].ComTam,
                                            
                                                                              }
                                                                              
                                                                      } else{
                                                                         // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                          if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                                                                              SaborIndis.push(GrupTamanho[i].Nome);
                                                                          }
                                                                      }
                                                                          
            
                                                                              }
                                                                  }
                                                              
                                                              }
                                                          }
            
                                                          
                                                          
            
                                                              
                                                              
            
                                                          }
                                                          
                                                      }
                                                       ListSabor = [];
                                                       ListDescr = [];
                                                      ListFoto = []; 
                                                      TagIMode = "";
                                                      TagITirar = []
                                                      //console.log(GrupTamanho)
                                                      
                                                          for(let i in GrupTamanho){
                                                              for(let j in GrupTamanho[i].TagsItens){
                                                                TagIMode =" "+ GrupTamanho[i].TagsItens[j].toLowerCase()+" "
                                                                  
                                                                  if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                                
                                                                      if(NomeSabores2.includes(TagIMode)){
                                                                          console.log("Sabores 2 vendo "+NomeSabores2)
                                                                     
                                                                      
                                                                      if(ListSabor.length < QuantSabor){
                                                                          
                                                                  
                                                                          if(ListSabor.includes(GrupTamanho[i].Nome)=== false){
                                                                            
                                                                              if( GrupTamanho[i].AtivoSabor){
                                                                              ListSabor.push(GrupTamanho[i].Nome)
                                                                              ListDescr.push(GrupTamanho[i].Descricao)
                                                                              ListFoto.push(GrupTamanho[i].foto)
                
                                                                              if(TagITirar.includes(TagIMode)=== false){
                                                                                  TagITirar.push(TagIMode)
                                                                              }
                
                                                                                  //GrupSabor.push(GrupTamanho[i])
                                                                                  DigiSabor2 = true;
                                                                                  AtiSabor2 = GrupTamanho[i].AtivoSabor;
                                                                                
                                                                                  VerMen2={
                                                                                      Nome:ListSabor,
                                                                                      Descricao:ListDescr,
                                                                                      Foto:ListFoto,
                                                                                      Preco:GrupTamanho[i].Preco,
                                                                                      Descont:GrupTamanho[i].Descont,
                                                                                      SubSessao:GrupTamanho[i].Tamanho,
                                                                                      Quant:1,
                                                                                      Observacao:"",
                                                                                      ItemEspeci:false,
                                                                                      QuantGeral:1,
                                                                                      Sessao:GrupTamanho[i].Sessao,
                                                                                      MemFim:GrupTamanho[i].MemFim,
                                                                                      QuantSb:GrupTamanho[i].QuantSb,
                                                                                      ItemComTam:GrupTamanho[i].ComTam,
                                                
                                                                                  }
                                                                                  
                                                                          } else{
                                                                             // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                              if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                                                                                  SaborIndis.push(GrupTamanho[i].Nome);
                                                                              }
                                                                          }
                                                                              
                
                                                                                  }
                                                                      }
                                                                  
                                                                  }
                                                              }
                
                                                              
                                                              
                
                                                                  
                                                                  
                
                                                              }
                                                              
                                                          }
                                                       console.log("Aqui ja chegou 2 sabores")
                                                      for(let d in TagITirar){
                                                      Msg = Msg.replace(TagITirar[d], "  ")
                                                      MsgEdiPos = MsgEdiPos.replace(TagITirar[d], "  ")
                                                      }
                                                  }
                                                  
                                              } else {//Aqui vai entra se os sabores digitados é o mesmo para os 2 itens
                                                //  console.log("Entrou no sabores com 1 ")
                                          
                                          var ListSabor = [];
                                          var ListDescr = [];
                                          var ListFoto = []; 
                                          var TagIMode = "";
                                          var TagITirar = []
                                          //console.log(GrupTamanho)
                                          
                                              for(let i in GrupTamanho){
                                                  for(let j in GrupTamanho[i].TagsItens){
                                                    TagIMode =" "+ GrupTamanho[i].TagsItens[j].toLowerCase()+" "
                                                      
                                                      if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                   
                                                          if(MsgEdiPos.includes(TagIMode)){
                                                        
                                                         
                                                          
                                                          if(ListSabor.length < QuantSabor){
                                                              
                                                      
                                                              if(ListSabor.includes(GrupTamanho[i].Nome)=== false){
                                                                
                                                                  if( GrupTamanho[i].AtivoSabor){
                                                                  ListSabor.push(GrupTamanho[i].Nome)
                                                                  ListDescr.push(GrupTamanho[i].Descricao)
                                                                  ListFoto.push(GrupTamanho[i].foto)
    
                                                                  if(TagITirar.includes(TagIMode)=== false){
                                                                      TagITirar.push(TagIMode)
                                                                  }
    
                                                                      GrupSabor.push(GrupTamanho[i])
                                                                      DigiSabor = true;
                                                                      AtiSabor = GrupTamanho[i].AtivoSabor;
                                                                    
                                                                      VerMen={
                                                                          Nome:ListSabor,
                                                                          Descricao:ListDescr,
                                                                          Foto:ListFoto,
                                                                          Preco:GrupTamanho[i].Preco,
                                                                          Descont:GrupTamanho[i].Descont,
                                                                          SubSessao:GrupTamanho[i].Tamanho,
                                                                          Quant:1,
                                                                          Observacao:"",
                                                                          ItemEspeci:false,
                                                                          QuantGeral:1,
                                                                          Sessao:GrupTamanho[i].Sessao,
                                                                          MemFim:GrupTamanho[i].MemFim,
                                                                          QuantSb:GrupTamanho[i].QuantSb,
                                                                          ItemComTam:GrupTamanho[i].ComTam,
                                    
                                                                      }
                                                                      
                                                              } else{
                                                                 // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                  if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                                                                      SaborIndis.push(GrupTamanho[i].Nome);
                                                                  }
                                                              }
                                                                  
    
                                                                      }
                                                          }
                                                      
                                                      }
                                                  }
    
                                                  
                                                  
    
                                                      
                                                      
    
                                                  }
                                                  
                                              }
                                               ListSabor = [];
                                               ListDescr = [];
                                              ListFoto = []; 
                                              TagIMode = "";
                                              TagITirar = []
                                              //console.log(GrupTamanho)
                                              
                                                  for(let i in GrupTamanho2){
                                                      for(let j in GrupTamanho2[i].TagsItens){
                                                        TagIMode =" "+ GrupTamanho2[i].TagsItens[j].toLowerCase()+" "
                                                          
                                                          if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                       
                                                              if(MsgEdiPos.includes(TagIMode)){
                                                            
                                                             
                                                              
                                                              if(ListSabor.length < QuantSabor2){
                                                                  
                                                          
                                                                  if(ListSabor.includes(GrupTamanho2[i].Nome)=== false){
                                                                    
                                                                      if( GrupTamanho2[i].AtivoSabor){
                                                                      ListSabor.push(GrupTamanho2[i].Nome)
                                                                      ListDescr.push(GrupTamanho2[i].Descricao)
                                                                      ListFoto.push(GrupTamanho2[i].foto)
        
                                                                      if(TagITirar.includes(TagIMode)=== false){
                                                                          TagITirar.push(TagIMode)
                                                                      }
        
                                                                          GrupSabor.push(GrupTamanho2[i])
                                                                          DigiSabor2 = true;
                                                                          AtiSabor2 = GrupTamanho2[i].AtivoSabor;
                                                                        
                                                                          VerMen2={
                                                                              Nome:ListSabor,
                                                                              Descricao:ListDescr,
                                                                              Foto:ListFoto,
                                                                              Preco:GrupTamanho2[i].Preco,
                                                                              Descont:GrupTamanho2[i].Descont,
                                                                              SubSessao:GrupTamanho2[i].Tamanho,
                                                                              Quant:1,
                                                                              Observacao:"",
                                                                              ItemEspeci:false,
                                                                              QuantGeral:1,
                                                                              Sessao:GrupTamanho2[i].Sessao,
                                                                              MemFim:GrupTamanho2[i].MemFim,
                                                                              QuantSb:GrupTamanho2[i].QuantSb,
                                                                              ItemComTam:GrupTamanho2[i].ComTam,
                                        
                                                                          }
                                                                          
                                                                  } else{
                                                                     // console.log("Nome Sabor "+GrupTamanho[i].Nome)
                                                                      if(SaborIndis.includes(GrupTamanho2[i].Nome)=== false ){
                                                                          SaborIndis.push(GrupTamanho2[i].Nome);
                                                                      }
                                                                  }
                                                                      
        
                                                                          }
                                                              }
                                                          
                                                          }
                                                      }
        
                                                      
                                                      
        
                                                          
                                                          
        
                                                      }
                                                      
                                                  }
  
                                              for(let d in TagITirar){
                                              Msg = Msg.replace(TagITirar[d], "  ")
                                              MsgEdiPos = MsgEdiPos.replace(TagITirar[d], "  ")
                                              }
                                           
                                              
                                          }
                                          
                                      
                                      }
                                  }

                                  } else { //Se não tem tamanho, So tem sabor
                                    var Outro = false;
                                    var NomeSabores1 = ""
                                    var NomeSabores2 = ""
                                    var Sabores = []
                                     for(let i in  PalDiferencial){  
                                                                                                          
                                         if(MsgEdiPos.includes(PalDiferencial[i])){    
                                             Outro = true;
                                             Sabores = MsgEdiPos.split(PalDiferencial[i])
                                             NomeSabores1 = " "+Sabores[0]+" "
                                             NomeSabores2 = " "+Sabores[1]+" "
                                         }
                                     }
                                    if(Outro){
                                        Tam1Sabor2 = true;
                                      var NotSabor = true;
                                      var TagIMode = "";
                                      var TagITirar = []
                                     // console.log("Entrou Em Sem Tamanho 1")
                                      for(let i in GrupSessao){
                                          for(let j in GrupSessao[i].TagsItens){
                                              TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                                              
                                              if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                // console.log("Conb: "+TagIMode)
                                                // console.log("Sessao "+MsgEdiPos)
                                                 // console.log("Achou uma 1")
                                                 if(NomeSabores1.includes(TagIMode)){
                                                  //console.log("Achou uma 2")
                                                  if(GrupSessao[i].AtivoSabor){
                                                  if(DigiSabor === false){
                                                      if( GrupSessao[i].AtivoSabor){
                                                          if(TagITirar.includes(TagIMode)=== false){
                                                              TagITirar.push(TagIMode)
                                                          }

                                                          GrupSabor.push(GrupSessao[i])
                                                          DigiSabor = true;
                                                          AtiSabor = GrupSessao[i].AtivoSabor;
                                                          VerMen ={
                                                              Nome:[GrupSessao[i].Nome],
                                                              Descricao:[GrupSessao[i].Descricao],
                                                              Foto:[GrupSessao[i].foto],
                                                              Preco:GrupSessao[i].Preco,
                                                              Descont:GrupSessao[i].Descont,
                                                              SubSessao:GrupSessao[i].Tamanho,
                                                              Quant:1,
                                                              Observacao:"",
                                                              ItemEspeci:false,
                                                              QuantGeral:1,
                                                              Sessao:GrupSessao[i].Sessao,
                                                              MemFim:GrupSessao[i].MemFim,
                                                              QuantSb:1,
                                                              ItemComTam:GrupSessao[i].ComTam,
                                                          }

                                                      }
                                                  

                                                  

                                              } 
                                                  } else {
                                                      if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                                                          SaborIndis.push(GrupSessao[i].Nome);
                                                      }
                                                  DigiSabor = true;
                                                  AtiSabor = false;
                                                  }
                                                      

                                                      
                                                  
                                              
                                              
                                              }
                                          }

                                          
                                          

                                              
                                              

                                          }
                                          
                                      }
                                      for(let d in TagITirar){
                                      Msg = Msg.replace(TagITirar[d], "  ")
                                      } 
                                      var NotSabor = true;
                                      var TagIMode = "";
                                      var TagITirar = []
                                     // console.log("Entrou Em Sem Tamanho 1")
                                      for(let i in GrupSessao){
                                          for(let j in GrupSessao[i].TagsItens){
                                              TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                                              
                                              if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                // console.log("Conb: "+TagIMode)
                                                // console.log("Sessao "+MsgEdiPos)
                                                 // console.log("Achou uma 1")
                                                 if(NomeSabores2.includes(TagIMode)){
                                                  //console.log("Achou uma 2")
                                                  if(GrupSessao[i].AtivoSabor){
                                                  if(DigiSabor2 === false){
                                                      if( GrupSessao[i].AtivoSabor){
                                                          if(TagITirar.includes(TagIMode)=== false){
                                                              TagITirar.push(TagIMode)
                                                          }

                                                          GrupSabor.push(GrupSessao[i])
                                                          DigiSabor2 = true;
                                                          AtiSabor2 = GrupSessao[i].AtivoSabor;
                                                          VerMen2 ={
                                                              Nome:[GrupSessao[i].Nome],
                                                              Descricao:[GrupSessao[i].Descricao],
                                                              Foto:[GrupSessao[i].foto],
                                                              Preco:GrupSessao[i].Preco,
                                                              Descont:GrupSessao[i].Descont,
                                                              SubSessao:GrupSessao[i].Tamanho,
                                                              Quant:1,
                                                              Observacao:"",
                                                              ItemEspeci:false,
                                                              QuantGeral:1,
                                                              Sessao:GrupSessao[i].Sessao,
                                                              MemFim:GrupSessao[i].MemFim,
                                                              QuantSb:1,
                                                              ItemComTam:GrupSessao[i].ComTam,
                                                          }

                                                      }
                                                  

                                                  

                                              } 
                                                  } else {
                                                      if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                                                          SaborIndis.push(GrupSessao[i].Nome);
                                                      }
                                                  DigiSabor2 = true;
                                                  AtiSabor2 = false;
                                                  }
                                                      

                                                      
                                                  
                                              
                                              
                                              }
                                          }

                                          
                                          

                                              
                                              

                                          }
                                          
                                      }
                                      for(let d in TagITirar){
                                      Msg = Msg.replace(TagITirar[d], "  ")
                                      }

                                     // console.log("Ditou sabor "+DigiSabor)

                                       if(DigiSabor == false  ){//Aqui só entra se a sessão é o mesmo nome do sabor
                                       //  console.log("Entrou Em MemFim 1")
                                          for(let i in GrupSessao){
                                              for(let j in GrupSessao[i].TagsItens){
                                                  TagIMode =GrupSessao[i].TagsItens[j].toLowerCase()
                                                  // console.log("Conb: "+TagIMode)
                                                  // console.log("Sessao "+Msg)
                                                  if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                     // console.log("Achou uma 1")
                                                        // console.log("Conb: "+TagIMode)
                                                        //   console.log("Sessao "+SessaoGuar)
                                                     if(SessaoGuar.includes(TagIMode)){
                                                      //console.log("Achou uma 2")
                                                      if(GrupSessao[i].AtivoSabor){
                                                      if(DigiSabor === false){
                                                          if( GrupSessao[i].AtivoSabor){
                                                              if(TagITirar.includes(TagIMode)=== false){
                                                                  TagITirar.push(TagIMode)
                                                              }

                                                              GrupSabor.push(GrupSessao[i])
                                                              DigiSabor = true;
                                                              AtiSabor = GrupSessao[i].AtivoSabor;
                                                              VerMen={
                                                                  Nome:[GrupSessao[i].Nome],
                                                                  Descricao:[GrupSessao[i].Descricao],
                                                                  Foto:[GrupSessao[i].foto],
                                                                  Preco:GrupSessao[i].Preco,
                                                                  Descont:GrupSessao[i].Descont,
                                                                  SubSessao:GrupSessao[i].Tamanho,
                                                                  Quant:1,
                                                                  Observacao:"",
                                                                  ItemEspeci:false,
                                                                  QuantGeral:1,
                                                                  Sessao:GrupSessao[i].Sessao,
                                                                  MemFim:GrupSessao[i].MemFim,
                                                                  QuantSb:GrupSessao[i].QuantSb
                                                              }

                                                          }
                                                      

                                                      

                                                  } 
                                                      } else {
                                                          if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                                                              SaborIndis.push(GrupSessao[i].Nome);
                                                          }
                                                      DigiSabor = true;
                                                      AtiSabor = false;
                                                      }
                                                          

                                                          
                                                      
                                                  
                                                  
                                                  }
                                              }

                                              
                                              

                                                  
                                                  

                                              }
                                              
                                          }
                                       }

                                      
                                      // console.log(TagITirar)
                                      // console.log("Msg 3 "+Msg)
                                    } else {
                                        var NotSabor = true;
                                        var TagIMode = "";
                                        var TagITirar = []
                                       // console.log("Entrou Em Sem Tamanho 1")
                                        for(let i in GrupSessao){
                                            for(let j in GrupSessao[i].TagsItens){
                                                TagIMode =" "+ GrupSessao[i].TagsItens[j].toLowerCase()+" "
                                                
                                                if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                  // console.log("Conb: "+TagIMode)
                                                  // console.log("Sessao "+MsgEdiPos)
                                                   // console.log("Achou uma 1")
                                                   if(MsgEdiPos.includes(TagIMode)){
                                                    //console.log("Achou uma 2")
                                                    if(GrupSessao[i].AtivoSabor){
                                                    if(DigiSabor === false){
                                                        if( GrupSessao[i].AtivoSabor){
                                                            if(TagITirar.includes(TagIMode)=== false){
                                                                TagITirar.push(TagIMode)
                                                            }
  
                                                            GrupSabor.push(GrupSessao[i])
                                                            DigiSabor = true;
                                                            AtiSabor = GrupSessao[i].AtivoSabor;
                                                            VerMen ={
                                                                Nome:[GrupSessao[i].Nome],
                                                                Descricao:[GrupSessao[i].Descricao],
                                                                Foto:[GrupSessao[i].foto],
                                                                Preco:GrupSessao[i].Preco,
                                                                Descont:GrupSessao[i].Descont,
                                                                SubSessao:GrupSessao[i].Tamanho,
                                                                Quant:1,
                                                                Observacao:"",
                                                                ItemEspeci:false,
                                                                QuantGeral:1,
                                                                Sessao:GrupSessao[i].Sessao,
                                                                MemFim:GrupSessao[i].MemFim,
                                                                QuantSb:1,
                                                                ItemComTam:GrupSessao[i].ComTam,
                                                            }
  
                                                        }
                                                    
  
                                                    
  
                                                } 
                                                    } else {
                                                        if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                                                            SaborIndis.push(GrupSessao[i].Nome);
                                                        }
                                                    DigiSabor = true;
                                                    AtiSabor = false;
                                                    }
                                                        
  
                                                        
                                                    
                                                
                                                
                                                }
                                            }
  
                                            
                                            
  
                                                
                                                
  
                                            }
                                            
                                        }
                                        for(let d in TagITirar){
                                        Msg = Msg.replace(TagITirar[d], "  ")
                                        } 
  
                                       // console.log("Ditou sabor "+DigiSabor)
  
                                         if(DigiSabor == false  ){//Aqui só entra se a sessão é o mesmo nome do sabor
                                         //  console.log("Entrou Em MemFim 1")
                                            for(let i in GrupSessao){
                                                for(let j in GrupSessao[i].TagsItens){
                                                    TagIMode =GrupSessao[i].TagsItens[j].toLowerCase()
                                                    // console.log("Conb: "+TagIMode)
                                                    // console.log("Sessao "+Msg)
                                                    if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                                       // console.log("Achou uma 1")
                                                          // console.log("Conb: "+TagIMode)
                                                          //   console.log("Sessao "+SessaoGuar)
                                                       if(SessaoGuar.includes(TagIMode)){
                                                        //console.log("Achou uma 2")
                                                        if(GrupSessao[i].AtivoSabor){
                                                        if(DigiSabor === false){
                                                            if( GrupSessao[i].AtivoSabor){
                                                                if(TagITirar.includes(TagIMode)=== false){
                                                                    TagITirar.push(TagIMode)
                                                                }
  
                                                                GrupSabor.push(GrupSessao[i])
                                                                DigiSabor = true;
                                                                AtiSabor = GrupSessao[i].AtivoSabor;
                                                                VerMen={
                                                                    Nome:[GrupSessao[i].Nome],
                                                                    Descricao:[GrupSessao[i].Descricao],
                                                                    Foto:[GrupSessao[i].foto],
                                                                    Preco:GrupSessao[i].Preco,
                                                                    Descont:GrupSessao[i].Descont,
                                                                    SubSessao:GrupSessao[i].Tamanho,
                                                                    Quant:1,
                                                                    Observacao:"",
                                                                    ItemEspeci:false,
                                                                    QuantGeral:1,
                                                                    Sessao:GrupSessao[i].Sessao,
                                                                    MemFim:GrupSessao[i].MemFim,
                                                                    QuantSb:GrupSessao[i].QuantSb
                                                                }
  
                                                            }
                                                        
  
                                                        
  
                                                    } 
                                                        } else {
                                                            if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                                                                SaborIndis.push(GrupSessao[i].Nome);
                                                            }
                                                        DigiSabor = true;
                                                        AtiSabor = false;
                                                        }
                                                            
  
                                                            
                                                        
                                                    
                                                    
                                                    }
                                                }
  
                                                
                                                
  
                                                    
                                                    
  
                                                }
                                                
                                            }
                                         }
  
                                        
                                        // console.log(TagITirar)
                                        // console.log("Msg 3 "+Msg)
                                      }
                                  }

                            

                              } else {//se Digitou o tamanho e sabor
                                  console.log("Entrando no sem tamanho")

                                  // console.log("Entrou Aqui no tamanho Agoras")   
                              
                                  var NotTamanho = ""
                                  var Desa25=false;
                                  var TagTModi = ""
                                  var TagTTirar = ""
                                  //Digitou Tamanho 
                                  for(let i in ItensMenus){
                                      if(Desa25 === false){
                                          
                                  for(let j in ItensMenus[i].TagsTamanhos){
                                      TagTModi =" "+ItensMenus[i].TagsTamanhos[j].toLowerCase()+" ";
                                      // console.log("Conb: "+DivNome4[j])
                                      // console.log("Sessao "+ItensMenus[i].body.toLowerCase())
                                      if(TagTModi !== "" && TagTModi !== " " && TagTModi !== "  "){
                                          if(Msg.includes(TagTModi)){
                                          Desa25 = true;
                                          SessaoGuar = ItensMenus[i].Sessao;
                                          if(Msg.toLowerCase().includes(Borda)){
                                          
                                              if(ItensMenus[i].Tamanho.toLowerCase().includes(Borda)){
                                                  
                                                  if(NotTamanho){
                                                      if(NotTamanho === ItensMenus[i].Tamanho){
                                                          QuantSabor= ItensMenus[i].QuantSb
                                                          GrupTamanho.push(ItensMenus[i])
                                                          DigiTamanho = true;
                                                          DigiSessao = true;
                                                          AtiTamanho = ItensMenus[i].AtivoTamanho;
                                                        
                                                          VerMen={
                                                              Nome:[],
                                                              Descricao:[],
                                                              Foto:[],
                                                              Preco:ItensMenus[i].Preco,
                                                              Descont:ItensMenus[i].Descont,
                                                              SubSessao:ItensMenus[i].AtivoTamanho?ItensMenus[i].Tamanho:"",
                                                              Quant:1,
                                                              Observacao:"",
                                                              ItemEspeci:false,
                                                              QuantGeral:1,
                                                              Sessao:ItensMenus[i].Sessao,
                                                              MemFim:ItensMenus[i].MemFim,
                                                              QuantSb:ItensMenus[i].QuantSb,
                                                              ItemComTam:ItensMenus[i].ComTam,
                                                              
                                                          }
                                                      

                                                      }

                                                  } else {
                                                      TamanhoNome = ItensMenus[i].Tamanho;
                                                      AtiSessao = ItensMenus[i].AtivoSessao;
                                                      TagTTirar = TagTModi;
                                                      QuantSabor= ItensMenus[i].QuantSb
                                                      NotTamanho = ItensMenus[i].Tamanho
                                                      GrupTamanho.push(ItensMenus[i])
                                                      DigiTamanho = true;
                                                      DigiSessao = true;
                                                      SessaoGuar =ItensMenus[i].Sessao;
                                                      AtiTamanho = ItensMenus[i].AtivoTamanho;
                                                      ItemComTam = ItensMenus[i].ComTam;
                                                    
                                                      VerMen={
                                                          Nome:[],
                                                          Descricao:[],
                                                          Foto:[],
                                                          Preco:ItensMenus[i].Preco,
                                                          Descont:ItensMenus[i].Descont,
                                                          SubSessao:ItensMenus[i].AtivoTamanho?ItensMenus[i].Tamanho:"",
                                                          Quant:1,
                                                          Observacao:"",
                                                          ItemEspeci:false,
                                                          QuantGeral:1,
                                                          Sessao:ItensMenus[i].Sessao,
                                                          MemFim:ItensMenus[i].MemFim,
                                                          QuantSb:ItensMenus[i].QuantSb,
                                                          ItemComTam:ItensMenus[i].ComTam,
                                                      }
                                                  

                                                  }
                                              

                                              }
                                          
                                          } else {
                                              
                                              
                                              if(ItensMenus[i].Tamanho.toLowerCase().includes(Borda) === false){
                                              
                                                  if(NotTamanho){
                                                      if(NotTamanho === ItensMenus[i].Tamanho){
                                                          QuantSabor= ItensMenus[i].QuantSb
                                                          GrupTamanho.push(ItensMenus[i])
                                                          DigiTamanho = true;
                                                          DigiSessao = true
                                                          AtiTamanho = ItensMenus[i].AtivoTamanho;
                                                          
                                                          VerMen={
                                                              Nome:[],
                                                              Descricao:[],
                                                              Foto:[],
                                                              Preco:ItensMenus[i].Preco,
                                                              Descont:ItensMenus[i].Descont,
                                                              SubSessao:ItensMenus[i].AtivoTamanho?ItensMenus[i].Tamanho:"",
                                                              Quant:1,
                                                              Observacao:"",
                                                              ItemEspeci:false,
                                                              QuantGeral:1,
                                                              Sessao:ItensMenus[i].Sessao,
                                                              ItemComTam:ItensMenus[i].ComTam,
                                                              MemFim:ItensMenus[i].MemFim,
                                                              QuantSb:ItensMenus[i].QuantSb
                                                          }
                                                      

                                                      }

                                                  } else {
                                                      TagTTirar = TagTModi;
                                                      QuantSabor= ItensMenus[i].QuantSb
                                                      NotTamanho = ItensMenus[i].Tamanho
                                                      GrupTamanho.push(ItensMenus[i])
                                                      DigiTamanho = true;
                                                      DigiSessao = true;
                                                      TamanhoNome = ItensMenus[i].Tamanho;
                                                      AtiSessao=ItensMenus[i].AtivoSessao;
                                                      AtiTamanho = ItensMenus[i].AtivoTamanho;
                                                      SessaoGuar =ItensMenus[i].Sessao;
                                                      ItemComTam = ItensMenus[i].ComTam;
                                                      VerMen={
                                                          Nome:[],
                                                          Descricao:[],
                                                          Foto:[],
                                                          Preco:ItensMenus[i].Preco,
                                                          Descont:ItensMenus[i].Descont,
                                                          SubSessao:ItensMenus[i].AtivoTamanho?ItensMenus[i].Tamanho:"",
                                                          Quant:1,
                                                          Observacao:"",
                                                          ItemEspeci:false,
                                                          QuantGeral:1,
                                                          Sessao:ItensMenus[i].Sessao,
                                                          ItemComTam:ItensMenus[i].ComTam,
                                                          MemFim:ItensMenus[i].MemFim,
                                                          QuantSb:ItensMenus[i].QuantSb
                                                      }
                                                  

                                                  }
                                              

                                              }
                                      
                                          }
                                          // if(Desa25){ 
                                          //   if(ItensMenus[i].AtivoTamanho) { 
                                          // } else{

                                          // }
                                          // }
                                          
                                          
                                      } 
                                  }

                                      
                                      

                                      
                                      

                                  }
                                  }
                                  }
                                  Msg = Msg.replace(TagTTirar, "  ")
                                //   console.log(Msg)
                                //   console.log(NotTamanho)

                             
                                  
                              if(DigiTamanho &&  AtiTamanho){
                                  var ListSabor = [];
                                  var ListDescr = [];
                                  var ListFoto = []; 
                                  var TagIMode = "";
                                  var TagITirar = []
                                  
                                  for(let i in GrupTamanho){
                                      for(let j in GrupTamanho[i].TagsItens){
                                          TagIMode =" "+ GrupTamanho[i].TagsItens[j].toLowerCase()+" "
                                              // console.log("Conb: "+DivNome4[j])
                                              // console.log("Sessao "+GrupTamanho[i].Nome.toLowerCase())
                                              if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                              if(Msg.includes(TagIMode)){
                                                  if(ListSabor.length < QuantSabor){
                                                      if(ListSabor.includes(GrupTamanho[i].Nome)=== false){
                                                            
                                                          if( GrupTamanho[i].AtivoSabor && GrupTamanho[i].AtivoTamanho){
                                                              if(TagITirar.includes(TagIMode)=== false){
                                                                  TagITirar.push(TagIMode)
                                                              }
                                                          ListSabor.push(GrupTamanho[i].Nome)
                                                          ListDescr.push(GrupTamanho[i].Descricao)
                                                          ListFoto.push(GrupTamanho[i].foto)

                                                              GrupSabor.push(GrupTamanho[i])
                                                              DigiSabor = true;
                                                              AtiSabor = GrupTamanho[i].AtivoSabor;
                                                              VerMen={
                                                                  Nome:ListSabor,
                                                                  Descricao:ListDescr,
                                                                  Foto:ListFoto,
                                                                  Preco:GrupTamanho[i].Preco,
                                                                  Descont:GrupTamanho[i].Descont,
                                                                  SubSessao:GrupTamanho[i].Tamanho,
                                                                  Quant:1,
                                                                  Observacao:"",
                                                                  ItemEspeci:false,
                                                                  QuantGeral:1,
                                                                  Sessao:GrupTamanho[i].Sessao,
                                                                  ItemComTam:GrupTamanho[i].ComTam,
                                                                  MemFim:GrupTamanho[i].MemFim,
                                                                  QuantSb:GrupTamanho[i].QuantSb
                                                              }
                                                          } else {
                                                              if(SaborIndis.includes(GrupTamanho[i].Nome)=== false ){
                                                                  SaborIndis.push(GrupTamanho[i].Nome);
                                                              }
                                                              DigiSabor = true;
                                                              AtiSabor = false;
                                                          } 
                                                          

                                                              }
                                                  }
                                                      
                                                              

                                                              

                                                          
                                              }
                                                      
                                                  
                                              
                                              
                                              } 

                                          
                                          

                                              
                                              

                                          }
                                          
                                      }
                                  
                                      for(let d in TagITirar){
                                          Msg = Msg.replace(TagITirar[d], "  ")
                                          }
                                        //   console.log(TagITirar)
                                        //   console.log("Msg 3 "+Msg)
                              
                              } else { //digitou sessão com Sabor unico
                                   console.log("Entrou No Só Sabor 1")
                                  var NotSabor = true;
                                  var TagIMode = "";
                                  var TagITirar = []
                                  
                                  for(let i in ItensMenus){
                                      for(let j in ItensMenus[i].TagsItens){
                                          TagIMode =" "+ ItensMenus[i].TagsItens[j].toLowerCase()+" "
                                          // console.log("Conb: "+TagIMode)
                                          // console.log("Sessao "+Msg)
                                          if(TagIMode !== "" && TagIMode !== " " && TagIMode !== "  " && TagIMode !== "   "){
                                             // console.log("Achou uma 1")
                                             if(Msg.includes(TagIMode)){
                                              //console.log("Achou uma 2")
                                              if(ItensMenus[i].MemFim){

                                                for(let h in PalNum2){
                                                    if(Msg.includes(PalNum2[h]+TagIMode)){
                                                    QuantSessao = 2
                                                    }
                                                  }
                                                  for(let h in PalNum3){
                                                    if(Msg.includes(PalNum3[h]+TagIMode)){
                                                    QuantSessao = 2
                                                    }
                                                  }
                                                //  console.log("Entrou No Só Sabor 2")
                                              if(ItensMenus[i].AtivoSabor){
                                              if(DigiSabor === false){
                                                  if( ItensMenus[i].AtivoSabor){
                                                      if(TagITirar.includes(TagIMode)=== false){
                                                          TagITirar.push(TagIMode)
                                                      }
                                                      
                                                      AtiSessao = ItensMenus[i].AtivoSessao;
                                                      TagTTirar = TagTModi;
                                                      QuantSabor= ItensMenus[i].QuantSb
                                                      NotTamanho = ItensMenus[i].Tamanho
                                                      GrupTamanho.push(ItensMenus[i])
                                                      DigiSessao = true;
                                                      SessaoGuar =ItensMenus[i].Sessao;
                                                      ItemComTam = ItensMenus[i].ComTam;

                                                      GrupSabor.push(ItensMenus[i])
                                                      DigiSabor = true;
                                                      AtiSabor = ItensMenus[i].AtivoSabor;
                                                      VerMen={
                                                          Nome:[ItensMenus[i].Nome],
                                                          Descricao:[ItensMenus[i].Descricao],
                                                          Foto:[ItensMenus[i].foto],
                                                          Preco:ItensMenus[i].Preco,
                                                          Descont:ItensMenus[i].Descont,
                                                          SubSessao:"",
                                                          Quant:1,
                                                          Observacao:"",
                                                          ItemEspeci:false,
                                                          QuantGeral:1,
                                                          Sessao:ItensMenus[i].Sessao,
                                                          MemFim:ItensMenus[i].MemFim,
                                                          ItemComTam:ItensMenus[i].ComTam,
                                                          QuantSb:1
                                                      }

                                                  }
                                              

                                              

                                          } 
                                              } else {
                                                  if(SaborIndis.includes(GrupSessao[i].Nome)=== false ){
                                                      SaborIndis.push(GrupSessao[i].Nome);
                                                  }
                                              DigiSabor = true;
                                              AtiSabor = false;
                                              }
                                          }
                                                  

                                                  
                                              
                                          
                                          
                                          }
                                      }

                                      
                                      

                                          
                                          

                                      }
                                      
                                  }
                                  for(let d in TagITirar){
                                  Msg = Msg.replace(TagITirar[d], "  ")
                                  }
                                  // console.log(TagITirar)
                                  // console.log("Msg 3 "+Msg)

                              }
                              SessaoGuar = VerMen.Sessao;
                            //   console.log("Vendo Sessaõ")
                            //   console.log( SessaoGuar ) 
                            //   console.log("Vendo Tamanho")
                            //   console.log(GrupTamanho) 

                            //   console.log("Sabor Escolhido Sabor")
                            //   console.log(VerMen) 

                          

                              } 
             
             if(PrecoPre){
              if(DigiSessao === true && AtiSessao === false){

              ItensFalta.push(
                  {
                  Sessao:SessaoGuar,
                  Tamanho:"",
                  Sabor:"",
                  AtivoSessao:false,
                  AtivoTamanho:true,
                  AtivoSabor:true,
                  }
              )
          } else {


         
              if(ItemComTam){
               Variaveis = [{id:0, body:`🗂️ *Esse São os Preços e Tamanhos diponíveis ${SessaoGuar}* \n===================`}];
               var AnliVari = [];

               for(let i in GrupSessao){

                if(AnliVari.includes(GrupSessao[i].body)===false){
                   if(GrupSessao[i].AtivoTamanho){
                       AnliVari.push(GrupSessao[i].body)
                       Variaveis.push({
                           id:i,  
                           body:GrupSessao[i].body, 
                           QuantSb:GrupSessao[i].QuantSb, 
                           Nome:GrupSessao[i].Tamanho,
                           Descont: GrupSessao[i].Descont,
                           Tamanho: GrupSessao[i].Tamanho,
                           ComTam:true,
                           Preco:GrupSessao[i].Preco,
                           MemFim:GrupSessao[i].MemFim,
                           Sessao:GrupSessao[i].Sessao,
                           Descricao:GrupSessao[i].Descricao,
                           Quant:GrupSessao[i].Quant,
                           Ilimitado:GrupSessao[i].Ilimitado,
                           foto:GrupSessao[i].foto,
                           AtivoTamanho:GrupSessao[i].AtivoTamanho,
                           AtivoSabor:GrupSessao[i].AtivoSabor,
                           AtivoSessao:GrupSessao[i].AtivoSessao,
                           Temas:GrupSessao[i].Temas,

                       })

                   }
                  
                }
             
               }

              } else {

               var Variaveis = [{id:0, body:`🗂️ *Esse São os Preços e Sabores diponíveis ${SessaoGuar}* \n===================`}];
               var AnliVari = [];

               for(let i in GrupSessao){

                if(AnliVari.includes(GrupSessao[i].body)===false){
                   if(GrupSessao[i].AtivoSabor){
                       AnliVari.push(GrupSessao[i].body)
                       Variaveis.push({id:i,  body:GrupSessao[i].body})
                   }
                 
                }
             
               }
              }
              }
             } else {
             if(Preco === false){

                if(QuantSessao === 1){
             if(DigiSessao === true && AtiSessao === true){//digtou a sessão 

             if(DigiTamanho === true && AtiTamanho === true){//digitou o tamanho 
                      ItensPedido.push(VerMen)
                  
                  if(SaborIndis.length !== 0 ){
                      for(let y in SaborIndis){
                          ItensFalta.push(
                              {
                              Sessao:SessaoGuar,
                              Tamanho:TamanhoNome,
                              Sabor:SaborIndis[y],
                              AtivoSessao:true,
                              AtivoTamanho:true,
                              AtivoSabor:false,
                              }
                          )

                      }
                     
                    }
                  
              } else if(DigiTamanho === true && AtiTamanho === false){// Digtou tamanho mais esta falso
                ItensPedido.push(VerMen)
                     
                ItensFalta.push(
                          {
                          Sessao:SessaoGuar,
                          Tamanho:TamanhoNome,
                          Sabor:"",
                          AtivoSessao:true,
                          AtivoTamanho:false,
                          AtivoSabor:true,
                          }
                      )

              } else {//Não digitou o Tamanho
                ItensPedido.push(
                    {
                        Date:new Date().getTime(),
                        Descont:VerMen.Descont,
                        Descricao:VerMen.Descricao,
                        Foto:VerMen.Foto,
                        ItemEspeci:VerMen.ItemEspeci,
                        Nome:VerMen.Nome,
                        Preco:VerMen.Preco,
                        Quant:VerMen.Quant,
                        Sessao:SessaoGuar,
                        SubSessao:VerMen.SubSessao,
                        ItemComTam:ItemComTam,
                        MemFim:VerMen.MemFim,
                        QuantSb:VerMen.QuantSb
                    },
                )
                      if(SaborIndis.length !== 0 ){

                          for(let y in SaborIndis){
                              ItensFalta.push(
                                  {
                                  Sessao:SessaoGuar,
                                  Tamanho:TamanhoNome,
                                  Sabor:SaborIndis[y],
                                  AtivoSessao:true,
                                  AtivoTamanho:true,
                                  AtivoSabor:false,
                                  }
                              )

                          }
                         
                        }
              }  
         
              } else if(DigiSessao === true && AtiSessao === false){//Digitou a sessaõ mais está falsa
                  ItensFalta.push(
                      {
                      Sessao:SessaoGuar,
                      Tamanho:"",
                      Sabor:"",
                      AtivoSessao:false,
                      AtivoTamanho:true,
                      AtivoSabor:true,
                      }
                  )
              }
            } else if(QuantSessao === 2){
                if(DigiSessao === true && AtiSessao === true){//digtou a sessão 

                    if(DigiTamanho === true && AtiTamanho === true){//digitou o tamanho 
                     
                   

                          if(tanhanho2){
                               ItensPedido.push(VerMen, VerMen2)
                               if(AtiTamanho2){

                               } else {
                                   ItensFalta.push(
                                       {
                                       Sessao:SessaoGuar,
                                       Tamanho:TamanhoNome2,
                                       Sabor:"",
                                       AtivoSessao:true,
                                       AtivoTamanho:false,
                                       AtivoSabor:true,
                                       }
                                   )

                               }
                           } else {
                            if(Tam1Sabor2){//Se os itens iguais com sabores diferentes
                                ItensPedido.push(VerMen, VerMen2)
                            } else {//Se os itens iguais com sabores iguais
                                ItensPedido.push(VerMen, VerMen)
                            }
                               
                           }
                        
                       
                         
                       
       
                         if(SaborIndis.length !== 0 ){
                             for(let y in SaborIndis){
                                 ItensFalta.push(
                                     {
                                     Sessao:SessaoGuar,
                                     Tamanho:TamanhoNome,
                                     Sabor:SaborIndis[y],
                                     AtivoSessao:true,
                                     AtivoTamanho:true,
                                     AtivoSabor:false,
                                     }
                                 )
       
                             }
                            
                           }
                         
                     } else if(DigiTamanho === true && AtiTamanho === false){// Digtou tamanho mais esta falso
                       
                       
                        // console.log(VerMen)
                        // console.log(VerMen2)
                        if(tanhanho2){

                            ItensPedido.push(VerMen, VerMen2)

                            if(AtiTamanho2){
                       
                                ItensFalta.push(
                                    {
                                        Sessao:SessaoGuar,
                                        Tamanho:TamanhoNome,
                                        Sabor:"",
                                        AtivoSessao:true,
                                        AtivoTamanho:false,
                                        AtivoSabor:true,
                                    },
                                )
                               
                                   } else {
                                   
                                       ItensFalta.push(
                                           {
                                               Sessao:SessaoGuar,
                                               Tamanho:TamanhoNome+" e "+TamanhoNome2,
                                               Sabor:"",
                                               AtivoSessao:true,
                                               AtivoTamanho:false,
                                               AtivoSabor:true,
                                           },
                                       )
                                   
   
                                   }
                        } else {
                            ItensPedido.push(VerMen, VerMen)
                            ItensFalta.push(
                                {
                                    Sessao:SessaoGuar,
                                    Tamanho:TamanhoNome,
                                    Sabor:"",
                                    AtivoSessao:true,
                                    AtivoTamanho:false,
                                    AtivoSabor:true,
                                },
                            )
                        }
                       
       
                     } else {//Não digitou o Tamanho
                       
                            if(Tam1Sabor2){//Se os itens iguais com sabores diferentes
                               
                                ItensPedido.push(
                                    {
                                        Date:new Date().getTime(),
                                        Descont:VerMen.Descont,
                                        Descricao:VerMen.Descricao,
                                        Foto:VerMen.Foto,
                                        ItemEspeci:VerMen.ItemEspeci,
                                        Nome:VerMen.Nome,
                                        Preco:VerMen.Preco,
                                        Quant:VerMen.Quant,
                                        Sessao:SessaoGuar,
                                        SubSessao:VerMen.SubSessao,
                                        ItemComTam:ItemComTam,
                                        MemFim:VerMen.MemFim,
                                        QuantSb:VerMen.QuantSb
                                    },
                                    {
                                        Date:new Date().getTime(),
                                        Descont:VerMen2.Descont,
                                        Descricao:VerMen2.Descricao,
                                        Foto:VerMen2.Foto,
                                        ItemEspeci:VerMen2.ItemEspeci,
                                        Nome:VerMen2.Nome,
                                        Preco:VerMen2.Preco,
                                        Quant:VerMen2.Quant,
                                        Sessao:SessaoGuar,
                                        SubSessao:VerMen2.SubSessao,
                                        ItemComTam:ItemComTam,
                                        MemFim:VerMen2.MemFim,
                                        QuantSb:VerMen2.QuantSb
                                    },
                                )
                            } else {//Se os itens iguais com sabores iguais
                               
                                ItensPedido.push(
                                    {
                                        Date:new Date().getTime(),
                                        Descont:VerMen.Descont,
                                        Descricao:VerMen.Descricao,
                                        Foto:VerMen.Foto,
                                        ItemEspeci:VerMen.ItemEspeci,
                                        Nome:VerMen.Nome,
                                        Preco:VerMen.Preco,
                                        Quant:VerMen.Quant,
                                        Sessao:SessaoGuar,
                                        SubSessao:VerMen.SubSessao,
                                        ItemComTam:ItemComTam,
                                        MemFim:VerMen.MemFim,
                                        QuantSb:VerMen.QuantSb
                                    },
                                    {
                                        Date:new Date().getTime(),
                                        Descont:VerMen.Descont,
                                        Descricao:VerMen.Descricao,
                                        Foto:VerMen.Foto,
                                        ItemEspeci:VerMen.ItemEspeci,
                                        Nome:VerMen.Nome,
                                        Preco:VerMen.Preco,
                                        Quant:VerMen.Quant,
                                        Sessao:SessaoGuar,
                                        SubSessao:VerMen.SubSessao,
                                        ItemComTam:ItemComTam,
                                        MemFim:VerMen.MemFim,
                                        QuantSb:VerMen.QuantSb
                                    },
                                )
                            }
                        
       
                             if(SaborIndis.length !== 0 ){
                                 for(let y in SaborIndis){
                                     ItensFalta.push(
                                         {
                                         Sessao:SessaoGuar,
                                         Tamanho:TamanhoNome,
                                         Sabor:SaborIndis[y],
                                         AtivoSessao:true,
                                         AtivoTamanho:true,
                                         AtivoSabor:false,
                                         }
                                     )
       
                                 }
                                
                               }
                     }  
                
                     } else if(DigiSessao === true && AtiSessao === false){//Digitou a sessaõ mais está falsa
                         ItensFalta.push(
                             {
                             Sessao:SessaoGuar,
                             Tamanho:"",
                             Sabor:"",
                             AtivoSessao:false,
                             AtivoTamanho:true,
                             AtivoSabor:true,
                             }
                         )
                     }
            }
          }
          }

         
       

       }//Fim Das Analises Loop
       
       for(let i in PalCardapio){
          cardaVer = " "+PalCardapio[i]+" ";                                        
          if(Msg.includes(cardaVer)){
              
              Card25 = true;
              Msg = Msg.replace(cardaVer, "  ")
          }
  

      }

      var PagPix = "";
      for(let i in PalPix){
          PagPix =" "+ PalPix[i]+" ";
              if(Msg.includes(PagPix)){
              Msg = Msg.replace(PagPix, "  ")
              Pix = true;
            
              }
      

          }

var PagDinheiro = "";
          for(let i in PalDinheiro){
              PagDinheiro =" "+ PalDinheiro[i]+" ";
                  if(Msg.includes(PagDinheiro)){
                  Msg = Msg.replace(PagDinheiro, "  ")
                  Dinheiro = true;
                
                  }
          

              }
    
      var PagCartao = "";
                  for(let i in PalCartao){
                      PagCartao =" "+ PalCartao[i]+" ";
                          if(Msg.includes(PagCartao)){
                          Msg = Msg.replace(PagCartao, "  ")
                          Cartao = true;
                        
                          }
                  

                      }


       for(let i in  TiraPalavra){
          Msg = Msg.replaceAll(TiraPalavra[i], " ")
         }
        
         
                for(let i in PalEnd){
                    if( Entregar === false){
                        if(Msg.includes(PalEnd[i])){
                         End = Msg
                         Entregar = true;
                        }
                    }
                
      
                    }  
            

              for(let i in PalProximo){
                  
                      if(Msg.includes(PalProximo[i])){
                      
                          DigProximo  = true;
                      }
                  
              

                  } 

               
                  for(let i in PalEntrega){
                      // console.log("Msg "+ Msg)
                      // console.log("Palavras "+ PalEntrega[i])      
                      if(Msg.includes(PalEntrega[i])){
                          Buscar = true;
                          Entregar = false;
                      }
              

                  }

              
                  // MemEndereco:[],
                  // DigiBairro:false,
            
                    if(DadoEmp.TaxaPorBairro){
                      for(let i in DadoEmp.BairroEntregas){
                          if(DadoEmp.BairroEntregas[i].TagsBairro){
                          for(let j in DadoEmp.BairroEntregas[i].TagsBairro){
                          if(Desati == false){
                            //   console.log()
                              if(Msg.includes(DadoEmp.BairroEntregas[i].TagsBairro[j].toLowerCase())){
                                  if(DadoEmp.BairroEntregas[i].Ativo){
                                      BairroDigi = true;
                                      BairroAti = true;
                                      ValordaEntrega = DadoEmp.BairroEntregas[i].PrecoReal;
                                      Desati == true;
                                  } else {
                                      BairroDigi = true;
                                      BairroAti = false;
                                      Desati == true;

                                  }
                              }

                          }
                      }
                  }

                      }
                  }
                
                  var DadosEnv = {
                    ListaItens ,
                     ItensPedido, 
                     ItensFalta,
                      Card25,
                      Preco,
                      Encerrou,
                      Negacao,
                     Positiva,
                     Variaveis,
                    Pix,
                    Dinheiro,
                    Cartao,
                    Troco,
                    ExtPix,
                    End,
                    Entregar,
                   DigProximo,
                   BairroDigi,
                    BairroAti,
                   ValordaEntrega,
                   Desati ,
                   AnaliEnd,
                   Buscar,
                  }
    return DadosEnv;
    
 };