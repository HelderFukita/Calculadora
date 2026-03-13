import { useState } from "react";
import { View,Text, Pressable, StyleSheet } from "react-native";

export default function Home(){
    const [display, setDisplay] = useState("0");
    const [valorAnterior, setValorAnterior] = useState<number | null>(null);
    const [operacao, setOperacao] = useState<string | null>(null);

function adicionarNumero(num: string){
    setDisplay(display === "0" ? num : display + num);
}

function definirOperacao(op: string){
    setValorAnterior(parseFloat(display));
    setOperacao(op);
    setDisplay("0");
}

function calcularResultado(){
    if(valorAnterior === null || operacao === null) return;

    const valorAtual = parseFloat(display);
    let resultado = 0;

    switch(operacao){
        case"+":
            resultado = valorAnterior + valorAtual;
            break;
        case"-":
            resultado = valorAnterior - valorAtual;
            break;
        case"*":
            resultado = valorAnterior * valorAtual;
            break;
        case"/":
            resultado = valorAnterior / valorAtual;
            break;    
    }

    setDisplay(resultado.toString());
    setValorAnterior(null);
    setOperacao(null);
    }

    function calcularPorcentagem() {
        const valorAtual = parseFloat(display);

        if (valorAnterior !== null && operacao !== null) {
            const porcentagem = (valorAnterior * valorAtual) / 100;
            setDisplay(porcentagem.toString());
        } else {
            const resultado = valorAtual / 100;
            setDisplay(resultado.toString());
        }
    }

    function limparTudo(){
        setDisplay("0");
        setValorAnterior(null);
        setOperacao(null);
    }

    return (

        <View style={estilos.container}>
            <View style={estilos.containerDisplay}>
                <Text style={estilos.display}>{display}</Text>
            </View>

            <View style={estilos.linha}>
                <BotaoCalculadora texto="AC" tipo="cinza" aoPressionar={limparTudo}/>
                <BotaoCalculadora texto="+/-" tipo="cinza"/>
                <BotaoCalculadora texto="%" tipo="cinza" aoPressionar={calcularPorcentagem}/>
                <BotaoCalculadora texto="/" tipo="laranja" aoPressionar={()=> definirOperacao("/")}/>
            </View>

            <View style={estilos.linha}>
                <BotaoCalculadora texto="7" aoPressionar={() => adicionarNumero("7")} />
                <BotaoCalculadora texto="8" aoPressionar={() => adicionarNumero("8")} />
                <BotaoCalculadora texto="9" aoPressionar={() => adicionarNumero("9")} />
                <BotaoCalculadora texto="*" tipo="laranja" aoPressionar={() => definirOperacao("*")} />
            </View>

            <View style={estilos.linha}>
                <BotaoCalculadora texto="4" aoPressionar={() => adicionarNumero("4")} />
                <BotaoCalculadora texto="5" aoPressionar={() => adicionarNumero("5")} />
                <BotaoCalculadora texto="6" aoPressionar={() => adicionarNumero("6")} />
                <BotaoCalculadora texto="-" tipo="laranja" aoPressionar={() => definirOperacao("-")} />
            </View>

            <View style={estilos.linha}>
                <BotaoCalculadora texto="1" aoPressionar={() => adicionarNumero("1")} />
                <BotaoCalculadora texto="2" aoPressionar={() => adicionarNumero("2")} />
                <BotaoCalculadora texto="3" aoPressionar={() => adicionarNumero("3")} />
                <BotaoCalculadora texto="+" tipo="laranja" aoPressionar={() => definirOperacao("+")} />
            </View>

            <View style={estilos.linha}>
                <BotaoCalculadora texto="0" largo aoPressionar={() => adicionarNumero("0")} />
                <BotaoCalculadora texto="." aoPressionar={() => adicionarNumero(".")} />
                <BotaoCalculadora texto="=" tipo="laranja" aoPressionar={calcularResultado} />
            </View>
    
        </View>  
    );
}

function BotaoCalculadora({ texto, aoPressionar, tipo = "escuro", largo = false }: any) {
  return (
    <Pressable
      style={[
        estilos.botao,
        largo && estilos.botaoLargo,
        tipo === "cinza" && estilos.botaoCinza,
        tipo === "laranja" && estilos.botaoLaranja,
      ]}
      onPress={aoPressionar}
    >
      <Text style={estilos.textoBotao}>{texto}</Text>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#000",
        justifyContent:"flex-end",
        padding:20,
    },
  containerDisplay: {
    marginBottom: 20,
    alignItems: "flex-end",
  },
  display: {
    color: "#fff",
    fontSize: 60,
    fontWeight: "300",
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  botao: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
  botaoLargo: {
    width: 155,
    borderRadius: 35,
    alignItems: "flex-start",
    paddingLeft: 28,
  },
  botaoCinza: {
    backgroundColor: "#a5a5a5",
  },
  botaoLaranja: {
    backgroundColor: "#ff9500",
  },
  textoBotao: {
    color: "#fff",
    fontSize: 30,
  },
});
