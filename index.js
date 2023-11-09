function onLoad(){

  

    const parametros = {
        tela: Tela
    }

    const jogoDaMemoria = new JogoDaMemoria(parametros);
    jogoDaMemoria.inicializar()

}

window.onload = onLoad



class Soma {
    executar(a, b){
        return a +b
    }
}

var soma = new Soma();
var fn = soma.executar

fn(2, 6)
