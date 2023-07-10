

 module.exports = (GrupSessao, MsgEdiPos, Msg,  QuantSessao, DadoEmp) =>{
  
  var NotTamanho = ""
  //Digitou Tamanho 
  var TamanhoNome
  var TagTModi = ""
  var TagTTirar = ""
  var QuantSabor = 1;
  var GrupTamanho = [];
  var DigiTamanho = false;
  var AtiTamanho = false;
  var Borda = "com borda";
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
      ItemComTam:false
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
      ItemComTam:false
    };

  for(let i in GrupSessao){
  for(let j in GrupSessao[i].TagsTamanhos){
      TagTModi =" "+GrupSessao[i].TagsTamanhos[j].toLowerCase()+" "
      // console.log("Conb: "+DivNome4[j])
      // console.log("Sessao "+GrupSessao[i].body.toLowerCase())
      if(TagTModi !== "" && TagTModi !== " " && TagTModi !== "  "){
      if(MsgEdiPos.includes(TagTModi)){
           
          // console.log("Nome "+GrupSessao[i].Nome)
          // console.log("AtivoSabor "+GrupSessao[i].AtivoSabor)
          // console.log("AtivoTam "+GrupSessao[i].AtivoTamanho)
          // console.log("AtivoSess "+GrupSessao[i].AtivoSessao)

          if(QuantSessao === 1){
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
                              Nome:[],
                              Descricao:[],
                              Foto:[],
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

                  } else {
                      TagTTirar = TagTModi;
                      QuantSabor= GrupSessao[i].QuantSb
                      NotTamanho = GrupSessao[i].Tamanho
                      GrupTamanho.push(GrupSessao[i])
                      DigiTamanho = true;
                      AtiTamanho = GrupSessao[i].AtivoTamanho;
                      VerMen={
                          Nome:[],
                          Descricao:[],
                          Foto:[],
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
              if(GrupSessao[i].Tamanho.toLowerCase().includes(Borda) === false){
                  if(NotTamanho){
                      if(NotTamanho === GrupSessao[i].Tamanho){
                          QuantSabor= GrupSessao[i].QuantSb
                          GrupTamanho.push(GrupSessao[i])
                          DigiTamanho = true;
                          AtiTamanho = GrupSessao[i].AtivoTamanho;
                          VerMen={
                              Nome:[],
                              Descricao:[],
                              Foto:[],
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

                  } else {
                 
                      TagTTirar = TagTModi;
                     QuantSabor= GrupSessao[i].QuantSb
                      NotTamanho = GrupSessao[i].Tamanho
                      GrupTamanho.push(GrupSessao[i])
                      DigiTamanho = true;
                      AtiTamanho = GrupSessao[i].AtivoTamanho;
                      VerMen={
                          Nome:[],
                          Descricao:[],
                          Foto:[],
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

              }
        
      } else {
          TagTTirar = TagTModi;
          TamanhoNome = GrupSessao[i].Tamanho;
          DigiTamanho = true;
          AtiTamanho = false; 
      }
          } else if(QuantSessao === 2){
          for(let h in PalDiferencial){
              if(Msg.includes(PalDiferencial[h]+TagTModi)){
              
              }
            }

        } else if(QuantSessao === 3){
       }
    }   
      }

  
      

      
      

  }
  
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
                     VerMen ,
                     VerMen2,
                     VerMen3,  
                  }
    return DadosEnv;
    
 };