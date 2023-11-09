const ID_CONTEUDO = "conteudo"
const ID_BOTAO_JOGAR = "jogar"
const ID_MESSAGEM = "mensagem"
const ID_CONTADOR = "contador"
const MESSAGEN = {
    success: {
        msg: 'Combinação correta',
        classe: 'alert-success'
    },
    error: {
    
        msg: 'Combinação errada',
        classe: 'alert-danger'
    }
}

const CLASS_INVISIBLE = "invisible"
const ID_CARREGANDO = "carregando"

class Tela {
    
    static gerarHTMLPersonagem({id, nome, img}) {
        return `
        <div class="col-md-3">
            <div class="card" style="width: 50%;" 
                onclick="window.verificarSelecao('${id}', '${nome}')"
            >
                <img name="${nome}" src="${img}" 
                class="card-img-top" alt="..." />
            </div>
        </div>
        `
    }

    static atualizarPersonagens(personagens) {
        const html = Tela.gerarHTMLPersonagens(personagens)
        Tela.carregarHTML(html)
    } 

    static gerarHTMLPersonagens(personagens){
        return  personagens.map(Tela.gerarHTMLPersonagem).join('')
    }

    static carregarHTML(html) {
        //através do objeto window, que o navegado formece para pagian
        //posso selecionar meu documento html um elemento específico
        //de um id ou de outras formas, ex.: abaixo
       const divConteudo= window.document.getElementById(ID_CONTEUDO)
       divConteudo.innerHTML = html
    }

    static configurarBotaoJogar(fn) {
        const buttonJogar= window.document.getElementById(ID_BOTAO_JOGAR)
        buttonJogar.onclick = fn
    }

    static configurarBotaoSelecaoDeCarta(fn) {
        window.verificarSelecao = fn
    }


    static mostarCardDoPersonagem(nome, img){
        const cards = document.getElementsByName(nome)
        for (const card of cards) {
            card.src = img
        }
    }

    static exibirMessagem(sucesso = true) {
        const messagem = document.getElementById(ID_MESSAGEM)
        if(sucesso) {
            messagem.classList.add(MESSAGEN.success.classe);
            messagem.classList.remove(MESSAGEN.error.classe);
            messagem.innerHTML = MESSAGEN.success.msg
        }else {
            messagem.classList.add(MESSAGEN.error.classe);
            messagem.classList.remove(MESSAGEN.success.classe);
            messagem.innerHTML = MESSAGEN.error.msg
        }
        messagem.classList.remove(CLASS_INVISIBLE)

        setTimeout(function(){
            messagem.classList.add(CLASS_INVISIBLE)
        }, 1000)
    }

    /**
     * @returns {number} 
     */
    static exibirProgresso() {
        const carregando = document.getElementById(ID_CARREGANDO)
        const divContador = document.getElementById(ID_CONTADOR)

        divContador.innerHTML = ""
        carregando.classList.remove(CLASS_INVISIBLE)
       
        let contador = 3
        const contagem = function(){
            divContador.innerHTML = `caregando em `+contador--
        }

        return  setInterval(contagem, 1000)
    }


    /**
     * @param {number} idInterval O id do intervalo para limpar
     * @returns {void}
     */
    static esconderProgresso(idInterval) {
        clearInterval(idInterval)
        const carregando = document.getElementById(ID_CARREGANDO)
        carregando.classList.add(CLASS_INVISIBLE)
    }

}
