class JogoDaMemoria {
    
  /**
   * 
   * @param {object} options
   * @param {import('./tela.js')} options.tela
   */
    constructor({tela}){
        this.tela = tela
        this.personagens = [
            {nome: "batman", img: "./assets/images/batman.png"},
            {nome: "ciclope", img: "./assets/images/ciclop.png"},
            {nome: "deadpool", img: "./assets/images/deadpool.png"},
            {nome: "mulhermaravilha", img: "./assets/images/mulhermaravilha.png"},
        ]
        this.acertos = 0;
        this.personagensComIndentificador = []
        this.imagemPadrao = "./assets/images/default.png"
        this.personagensSelecionados= []
    }

    inicializar() {
        console.log("Inicializou jogo")
        this.carregarPersonagens(this.personagens)
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
    }

    verificarSelecaoPersonagens(id, nome) {

        if(this.acertos >=4){
            this.personagensSelecionados = []
            this.jogar();
            this.acertos =0;
        }
      
        const idIndefenido = id === 'undefined';
        if(idIndefenido) return;

        const quantidadeDePersonagensSelecionados = this.personagensSelecionados.length

        if(quantidadeDePersonagensSelecionados == 0 ){
            this.personagensSelecionados.push({id, nome})
            return
        }

       const [personagemSelecionado] = this.personagensSelecionados;


        if(personagemSelecionado.id == id) {
            this.tela.exibirMessagem(false);
            this.personagensSelecionados = []
             this.progressoID = undefined;
            return
        }

        if(personagemSelecionado.nome === nome) {
        
            const valor = this.personagens.find(p=> p.nome === nome)
            this.tela.mostarCardDoPersonagem(valor.nome, valor.img)

            this.acertos++;

            this.tela.exibirMessagem()

            this.personagensSelecionados = []
            return
        }

        this.tela.exibirMessagem(false);

        this.personagensSelecionados = []

    }
   
    carregarPersonagens(personagens) {
        this.tela.atualizarPersonagens(personagens)
    }

    jogar() {
        this.embaralhar()
        this.progressoID = this.tela.exibirProgresso()
        setTimeout(this.esconderCartas.bind(this), 3000)
        setTimeout(this.esconderProgresso.bind(this), 3000)
        
    }

    esconderProgresso() {
        this.tela.esconderProgresso(this.progressoID)
    }

    embaralhar() {
        const copias = this.personagens
        .concat(this.personagens)
        .map(function(personagem){
            return {
                ...personagem,
                id: Math.random()
            }
        })
        copias.sort(function(){
            return Math.random() - 0.6
        })
        this.carregarPersonagens(copias)
        this.personagensComIndentificador = copias
    }

    esconderCartas() {
        const img = this.imagemPadrao
        const personagenImagemDefault = this.personagensComIndentificador
        .map(function(personagem){
            return {
                ...personagem,
                img,
            }
        })
        this.carregarPersonagens(personagenImagemDefault)
        this.tela.esconderProgresso()
        this.tela.configurarBotaoSelecaoDeCarta(this.verificarSelecaoPersonagens.bind(this))
    }

    
}
