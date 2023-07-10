

 module.exports = (GrupSessao, MsgEdiPos, Msg,  QuantSessao, DadoEmp) =>{
  var PalDiferencial = ["outra", "outro", "outra de", "outro de"]
  var NotTamanho = ""
  //Digitou Tamanho 
  var TamanhoNome= ""
  var TagTModi = ""
  var TagTTirar = ""
  var QuantSabor = 1;
  var GrupTamanho = [];
  var DigiTamanho = false;
  var AtiTamanho = false;
  var NotTamanho2 = ""
  var TamanhoNome2 = ""
  var TagTModi2 = ""
  var TagTTirar2 = ""
  var QuantSabor2 = 1;
  var GrupTamanho2 = [];
  var DigiTamanho2 = false;
  var AtiTamanho2 = false;
  var Borda = "com borda";
  var tanhanho2 = false;
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
    if(QuantSessao === 1){
        for(let i in GrupSessao){
        for(let j in GrupSessao[i].TagsTamanhos){
            TagTModi =" "+GrupSessao[i].TagsTamanhos[j].toLowerCase()+" "
           
            if(TagTModi !== "" && TagTModi !== " " && TagTModi !== "  "){
              if(MsgEdiPos.includes(TagTModi)){
  
                if(GrupSessao[i].AtivoTamanho) {
                
                  if(Msg.toLowerCase().includes(Borda)){
                      if(GrupSessao[i].Tamanho.toLowerCase().includes(Borda)){
                          if(NotTamanho){
                              if(NotTamanho === GrupSessao[i].Tamanho){
                                  QuantSabor= GrupSessao[i].QuantSb
                                  GrupTamanho.push(GrupSessao[i])
                                  DigiTamanho = true;
                                  AtiTamanho = GrupSessao[i].AtivoTamanho;
                                  VerMen={
                                    Date:new Date().getTime(),
                                    Descont:GrupSessao[i].Descont,
                                    Descricao:[],
                                    Foto:[],
                                    ItemEspeci:true,
                                    Nome:[],
                                    Preco:GrupSessao[i].Preco,
                                    Quant:1,
                                    Sessao:GrupSessao[i].Sessao,
                                    SubSessao:GrupSessao[i].Tamanho,
                                    ItemComTam:GrupSessao[i].ComTam,
                                    MemFim:GrupSessao[i].MemFim,
                                    QuantSb:GrupSessao[i].QuantSb
                                  }
          
                              }
          
                          } else {
                              TagTTirar = TagTModi;
                              QuantSabor= GrupSessao[i].QuantSb
                              NotTamanho = GrupSessao[i].Tamanho
                              GrupTamanho.push(GrupSessao[i])
                              DigiTamanho = true;
                              AtiTamanho = GrupSessao[i].AtivoTamanho;
                              VerMen={
                                Date:new Date().getTime()+2000,
                                Descont:GrupSessao[i].Descont,
                                Descricao:[],
                                Foto:[],
                                ItemEspeci:true,
                                Nome:[],
                                Preco:GrupSessao[i].Preco,
                                Quant:1,
                                Sessao:GrupSessao[i].Sessao,
                                SubSessao:GrupSessao[i].Tamanho,
                                ItemComTam:GrupSessao[i].ComTam,
                                MemFim:GrupSessao[i].MemFim,
                                QuantSb:GrupSessao[i].QuantSb
                              }
          
                          }
          
                      }
                  } else {
                      if(GrupSessao[i].Tamanho.toLowerCase().includes(Borda) === false){
                          if(NotTamanho){
                              if(NotTamanho === GrupSessao[i].Tamanho){
                                  QuantSabor= GrupSessao[i].QuantSb
                                  GrupTamanho.push(GrupSessao[i])
                                  DigiTamanho = true;
                                  AtiTamanho = GrupSessao[i].AtivoTamanho;
                                  VerMen={
                                    Date:new Date().getTime()+3000,
                                    Descont:GrupSessao[i].Descont,
                                    Descricao:[],
                                    Foto:[],
                                    ItemEspeci:true,
                                    Nome:[],
                                    Preco:GrupSessao[i].Preco,
                                    Quant:1,
                                    Sessao:GrupSessao[i].Sessao,
                                    SubSessao:GrupSessao[i].Tamanho,
                                    ItemComTam:GrupSessao[i].ComTam,
                                    MemFim:GrupSessao[i].MemFim,
                                    QuantSb:GrupSessao[i].QuantSb
                                  }
          
                              }
          
                          } else {
                        
                              TagTTirar = TagTModi;
                            QuantSabor= GrupSessao[i].QuantSb
                              NotTamanho = GrupSessao[i].Tamanho
                              GrupTamanho.push(GrupSessao[i])
                              DigiTamanho = true;
                              AtiTamanho = GrupSessao[i].AtivoTamanho;
                              VerMen={
                                Date:new Date().getTime()+4000,
                                Descont:GrupSessao[i].Descont,
                                Descricao:[],
                                Foto:[],
                                ItemEspeci:true,
                                Nome:[],
                                Preco:GrupSessao[i].Preco,
                                Quant:1,
                                Sessao:GrupSessao[i].Sessao,
                                SubSessao:GrupSessao[i].Tamanho,
                                ItemComTam:GrupSessao[i].ComTam,
                                MemFim:GrupSessao[i].MemFim,
                                QuantSb:GrupSessao[i].QuantSb
                              }
          
                          }
                      }
          
                      }
                
              } else {
                  TagTTirar = TagTModi;
                  TamanhoNome = GrupSessao[i].Tamanho;
                  DigiTamanho = true;
                  AtiTamanho = false;
                  VerMen={
                    Date:new Date().getTime(),
                    Descont:0,
                    Descricao:[],
                    Foto:[],
                    ItemEspeci:true,
                    Nome:[],
                    Preco:0,
                    Quant:1,
                    Sessao:GrupSessao[i].Sessao,
                    SubSessao:"",
                    ItemComTam:GrupSessao[i].ComTam,
                    MemFim:GrupSessao[i].MemFim,
                    QuantSb:1
                  } 
              }
              
              
              
          }  
            
            }
        }  
      }
      MsgEdiPos = MsgEdiPos.replace(TagTTirar, "  ")
  //console.log("Msg Mudada "+MsgEdiPos)
    } else if(QuantSessao === 2){
      
      for(let i in GrupSessao){
        for(let j in GrupSessao[i].TagsTamanhos){
            TagTModi =" "+GrupSessao[i].TagsTamanhos[j].toLowerCase()+" "
            
            if(TagTModi !== "" && TagTModi !== " " && TagTModi !== "  "){
              if(MsgEdiPos.includes(TagTModi)){

                if(GrupSessao[i].AtivoTamanho) {
                
                  if(Msg.toLowerCase().includes(Borda)){
                      if(GrupSessao[i].Tamanho.toLowerCase().includes(Borda)){
                          if(NotTamanho){
                              if(NotTamanho === GrupSessao[i].Tamanho){
                                  QuantSabor= GrupSessao[i].QuantSb
                                  GrupTamanho.push(GrupSessao[i])
                                  DigiTamanho = true;
                                  AtiTamanho = GrupSessao[i].AtivoTamanho;
                                  VerMen={
                                    Date:new Date().getTime(),
                                    Descont:GrupSessao[i].Descont,
                                    Descricao:[],
                                    Foto:[],
                                    ItemEspeci:true,
                                    Nome:[],
                                    Preco:GrupSessao[i].Preco,
                                    Quant:1,
                                    Sessao:GrupSessao[i].Sessao,
                                    SubSessao:GrupSessao[i].Tamanho,
                                    ItemComTam:GrupSessao[i].ComTam,
                                    MemFim:GrupSessao[i].MemFim,
                                    QuantSb:GrupSessao[i].QuantSb
                                  }
          
                              }
          
                          } else {
                              TagTTirar = TagTModi;
                              QuantSabor= GrupSessao[i].QuantSb
                              NotTamanho = GrupSessao[i].Tamanho
                              GrupTamanho.push(GrupSessao[i])
                              DigiTamanho = true;
                              AtiTamanho = GrupSessao[i].AtivoTamanho;
                              VerMen={
                                Date:new Date().getTime()+2000,
                                Descont:GrupSessao[i].Descont,
                                Descricao:[],
                                Foto:[],
                                ItemEspeci:true,
                                Nome:[],
                                Preco:GrupSessao[i].Preco,
                                Quant:1,
                                Sessao:GrupSessao[i].Sessao,
                                SubSessao:GrupSessao[i].Tamanho,
                                ItemComTam:GrupSessao[i].ComTam,
                                MemFim:GrupSessao[i].MemFim,
                                QuantSb:GrupSessao[i].QuantSb
                              }
          
                          }
          
                      }
                  } else {
                      if(GrupSessao[i].Tamanho.toLowerCase().includes(Borda) === false){
                          if(NotTamanho){
                              if(NotTamanho === GrupSessao[i].Tamanho){
                                  QuantSabor= GrupSessao[i].QuantSb
                                  GrupTamanho.push(GrupSessao[i])
                                  DigiTamanho = true;
                                  AtiTamanho = GrupSessao[i].AtivoTamanho;
                                  VerMen={
                                    Date:new Date().getTime()+3000,
                                    Descont:GrupSessao[i].Descont,
                                    Descricao:[],
                                    Foto:[],
                                    ItemEspeci:true,
                                    Nome:[],
                                    Preco:GrupSessao[i].Preco,
                                    Quant:1,
                                    Sessao:GrupSessao[i].Sessao,
                                    SubSessao:GrupSessao[i].Tamanho,
                                    ItemComTam:GrupSessao[i].ComTam,
                                    MemFim:GrupSessao[i].MemFim,
                                    QuantSb:GrupSessao[i].QuantSb
                                  }
          
                              }
          
                          } else {
                         
                              TagTTirar = TagTModi;
                             QuantSabor= GrupSessao[i].QuantSb
                              NotTamanho = GrupSessao[i].Tamanho
                              GrupTamanho.push(GrupSessao[i])
                              DigiTamanho = true;
                              AtiTamanho = GrupSessao[i].AtivoTamanho;
                              VerMen={
                                Date:new Date().getTime()+4000,
                                Descont:GrupSessao[i].Descont,
                                Descricao:[],
                                Foto:[],
                                ItemEspeci:true,
                                Nome:[],
                                Preco:GrupSessao[i].Preco,
                                Quant:1,
                                Sessao:GrupSessao[i].Sessao,
                                SubSessao:GrupSessao[i].Tamanho,
                                ItemComTam:GrupSessao[i].ComTam,
                                MemFim:GrupSessao[i].MemFim,
                                QuantSb:GrupSessao[i].QuantSb
                              }
          
                          }
                      }
          
                      }
                
              } else {
                if(NotTamanho){
                 
                } else {
                  NotTamanho = GrupSessao[i].Tamanho
                  TagTTirar = TagTModi;
                  TamanhoNome = GrupSessao[i].Tamanho;
                  DigiTamanho = true;
                  AtiTamanho = false; 
                  VerMen={
                    Date:new Date().getTime(),
                    Descont:0,
                    Descricao:[],
                    Foto:[],
                    ItemEspeci:true,
                    Nome:[],
                    Preco:0,
                    Quant:1,
                    Sessao:GrupSessao[i].Sessao,
                    SubSessao:"",
                    ItemComTam:GrupSessao[i].ComTam,
                    MemFim:GrupSessao[i].MemFim,
                    QuantSb:1
                  }
                }
              }
               
               
              
             }  
            
            } 
           
        }  
      }

      var Outro = false;
      for(let i in  PalDiferencial){
                                                                             
          if(MsgEdiPos.includes(PalDiferencial[i]+TagTTirar)){ 
            if(TagTTirar) {      
            console.log("Tirando 1"+PalDiferencial[i]+TagTTirar)   
              Outro = true;
              MsgEdiPos = MsgEdiPos.replace(PalDiferencial[i]+TagTTirar, "  ")
            }
          }
      }

      if(Outro === false){
        MsgEdiPos = MsgEdiPos.replace(TagTTirar, "  ")
      }


     
         // console.log("Msg Mudada 1 "+MsgEdiPos)
      for(let i in GrupSessao){
        for(let j in GrupSessao[i].TagsTamanhos){
            TagTModi =" "+GrupSessao[i].TagsTamanhos[j].toLowerCase()+" "
            // console.log("Conb: "+DivNome4[j])
            // console.log("Sessao "+GrupSessao[i].body.toLowerCase())
            if(TagTModi !== "" && TagTModi !== " " && TagTModi !== "  "){
              if(MsgEdiPos.includes(TagTModi)){
           //   console.log("Achou "+TagTModi)
                if(GrupSessao[i].Tamanho !== NotTamanho){
              tanhanho2 = true;
                if(GrupSessao[i].AtivoTamanho) {
                
                  if(Msg.toLowerCase().includes(Borda)){
                      if(GrupSessao[i].Tamanho.toLowerCase().includes(Borda)){
                          if(NotTamanho2){
                              if(NotTamanho2 === GrupSessao[i].Tamanho){
                                  QuantSabor2 = GrupSessao[i].QuantSb
                                  GrupTamanho2.push(GrupSessao[i])
                                  DigiTamanho2 = true;
                                  AtiTamanho2 = GrupSessao[i].AtivoTamanho;
                                  VerMen2={
                                    Date:new Date().getTime()+4000,
                                    Descont:GrupSessao[i].Descont,
                                    Descricao:[],
                                    Foto:[],
                                    ItemEspeci:true,
                                    Nome:[],
                                    Preco:GrupSessao[i].Preco,
                                    Quant:1,
                                    Sessao:GrupSessao[i].Sessao,
                                    SubSessao:GrupSessao[i].Tamanho,
                                    ItemComTam:GrupSessao[i].ComTam,
                                    MemFim:GrupSessao[i].MemFim,
                                    QuantSb:GrupSessao[i].QuantSb
                                  }
          
                              }
          
                          } else {
                              TagTTirar2 = TagTModi;
                              QuantSabor2 = GrupSessao[i].QuantSb
                              NotTamanho2 = GrupSessao[i].Tamanho
                              GrupTamanho2.push(GrupSessao[i])
                              DigiTamanho2 = true;
                              AtiTamanho2 = GrupSessao[i].AtivoTamanho;
                              VerMen2={
                                Date:new Date().getTime()+5000,
                                Descont:GrupSessao[i].Descont,
                                Descricao:[],
                                Foto:[],
                                ItemEspeci:true,
                                Nome:[],
                                Preco:GrupSessao[i].Preco,
                                Quant:1,
                                Sessao:GrupSessao[i].Sessao,
                                SubSessao:GrupSessao[i].Tamanho,
                                ItemComTam:GrupSessao[i].ComTam,
                                MemFim:GrupSessao[i].MemFim,
                                QuantSb:GrupSessao[i].QuantSb
                              }
          
                          }
          
                      }
                  } else {
                      if(GrupSessao[i].Tamanho.toLowerCase().includes(Borda) === false){
                          if(NotTamanho2){
                              if(NotTamanho2 === GrupSessao[i].Tamanho){
                                  QuantSabor2 = GrupSessao[i].QuantSb
                                  GrupTamanho2.push(GrupSessao[i])
                                  DigiTamanho2 = true;
                                  AtiTamanho2 = GrupSessao[i].AtivoTamanho;
                                  VerMen2={
                                    Date:new Date().getTime()+7000,
                                    Descont:GrupSessao[i].Descont,
                                    Descricao:[],
                                    Foto:[],
                                    ItemEspeci:true,
                                    Nome:[],
                                    Preco:GrupSessao[i].Preco,
                                    Quant:1,
                                    Sessao:GrupSessao[i].Sessao,
                                    SubSessao:GrupSessao[i].Tamanho,
                                    ItemComTam:GrupSessao[i].ComTam,
                                    MemFim:GrupSessao[i].MemFim,
                                    QuantSb:GrupSessao[i].QuantSb
                                  }
          
                              }
          
                          } else {
                        
                              TagTTirar2 = TagTModi;
                            QuantSabor2 = GrupSessao[i].QuantSb
                              NotTamanho2  = GrupSessao[i].Tamanho
                              GrupTamanho2.push(GrupSessao[i])
                              DigiTamanho2 = true;
                              AtiTamanho2 = GrupSessao[i].AtivoTamanho;
                              VerMen2={
                                Date:new Date().getTime()+8000,
                                Descont:GrupSessao[i].Descont,
                                Descricao:[],
                                Foto:[],
                                ItemEspeci:true,
                                Nome:[],
                                Preco:GrupSessao[i].Preco,
                                Quant:1,
                                Sessao:GrupSessao[i].Sessao,
                                SubSessao:GrupSessao[i].Tamanho,
                                ItemComTam:GrupSessao[i].ComTam,
                                MemFim:GrupSessao[i].MemFim,
                                QuantSb:GrupSessao[i].QuantSb
                              }
          
                          }
                      }
          
                      }
                
              } else {
                if(NotTamanho2){
                 
                } else {
                  tanhanho2 = true;
                  NotTamanho2 = GrupSessao[i].Tamanho
                  TagTTirar2 = TagTModi;
                  TamanhoNome2 = GrupSessao[i].Tamanho;
                  DigiTamanho2 = true;
                  AtiTamanho2 = false; 

                  VerMen2={
                    Date:new Date().getTime()+4000,
                    Descont:0,
                    Descricao:[],
                    Foto:[],
                    ItemEspeci:true,
                    Nome:[],
                    Preco:0,
                    Quant:1,
                    Sessao:GrupSessao[i].Sessao,
                    SubSessao:"",
                    ItemComTam:GrupSessao[i].ComTam,
                    MemFim:GrupSessao[i].MemFim,
                    QuantSb:1
                  }
                }
              }
              }
             
            
            } 
            
            } 
           
        }  
      }

      var Outro2 = false;
      for(let i in  PalDiferencial){  
        if(TagTTirar2) {                                                                  
          if(MsgEdiPos.includes(PalDiferencial[i]+TagTTirar2)){ 
            if(TagTTirar2) {     
            console.log("Tirando 2"+PalDiferencial[i]+TagTTirar2)     
              Outro2 = true;
              MsgEdiPos = MsgEdiPos.replace(PalDiferencial[i]+TagTTirar2, "  ")
            }
          }
        }     
      }

      if(Outro2 === false){
        MsgEdiPos = MsgEdiPos.replace(TagTTirar2, "  ")
      }
    

      console.log("Msg Mudada 2 "+MsgEdiPos)
    }


     
                  var DadosEnv = {
                    NotTamanho,
                    TamanhoNome,
                    DigiTamanho,
                    TagTModi,
                    TagTTirar,
                     QuantSabor,
                     GrupTamanho,
                     AtiTamanho,
                     tanhanho2,
                     NotTamanho2,
                     TamanhoNome2,
                     DigiTamanho2,
                     TagTModi2,
                     TagTTirar2,
                    QuantSabor2,
                    GrupTamanho2,
                    AtiTamanho2,
                     VerMen ,
                     VerMen2,
                     VerMen3, 
                     MsgEdiPos, 
                  }
    return DadosEnv;
    
 };