let velocidade = 3

const LARGURA_TELA = 288
const ALTURA_TELA = 512
const N_PASSAROS = 20

let passarinhos = []
let jogando = false
let ciclos = 0


function preload() {
    bg = loadImage('assets/background.png')
    canoImagemInferior = loadImage('assets/cano-inferior.png');
    canoImagemSuperior = loadImage('assets/cano-superior.png');
    chaoImagem = loadImage('assets/base.png')
    passarinhoImagem = [
        loadImage('assets/bluebird-downflap.png'),
        loadImage('assets/bluebird-midflap.png'),
        loadImage('assets/bluebird-upflap.png'),
        loadImage('assets/bluebird-midflap.png')
    ]

    fonteTitulo = loadFont('assets/Flappy-Bird.ttf')
    fonteTexto = loadFont('assets/MonoRegular.ttf')
}

function setup() {
    frameRate(60)
    angleMode(DEGREES)

    createCanvas(600, 520)
    dash = new Dashboard()
    chao = new Chao(chaoImagem)
    canos = new Cano(canoImagemInferior, canoImagemSuperior)

    botaoStart = createButton('Start')
    botaoAutomatico = createButton('')
}

function draw() {
    //contorno
    fill(102);
    rect(0, 0, 296, 520)
    image(bg, 4, 4, 288, 512)

    atualizaSensores()
    decisaoPulo()
    atualizaDash()
    canos.atualiza()
    chao.atualiza()

    //painel informacoes
    dash.atualiza(jogando)

    passarinhos.forEach((passarinho) => {
        passarinho.atualiza()
    })

    verificaColisoes()
    verificaVidas()
}

function keyPressed() {
    if (key) {
        passarinhos[0].pular()
    }
}

function verificaColisoes() {
    if (jogando) {
        passarinhos.forEach((passarinho) => {
            if (passarinho.vida) {
                verificaColisaoCanos(passarinho)
            }
            if (passarinho.vida) {
                verificaColisaoTeto(passarinho)
            }
            if (passarinho.vida) {
                verificaColisaoChao(passarinho)
            }
        })
    }
}

function verificaColisaoCanos(passarinho) {
    if (passarinho.x + passarinho.largura > canos.x && passarinho.x < canos.x + canos.largura) {
        if (passarinho.y < canos.yS + canos.altura) {
            if (passarinho.vida) {
                passarinho.vida = false
                passarinho.fitness = dash.score - 1
            }
            passarinho.velocidade = velocidade
        } else if (passarinho.y + passarinho.altura > canos.yI) {
            if (passarinho.vida) {
                passarinho.vida = false
                passarinho.fitness = dash.score - 1
            }
            passarinho.velocidade = velocidade
        }
    }
}

function verificaColisaoTeto(passarinho) {
    if (passarinho.y < 0) {
        if (passarinho.vida) {
            passarinho.vida = false
            passarinho.fitness = dash.score - 5
        }
        passarinho.velocidade = velocidade
    }
}

function verificaColisaoChao(passarinho) {
    if (passarinho.y > 470 - passarinho.altura) {
        if (passarinho.vida) {
            passarinho.vida = false
            passarinho.fitness = dash.score - 5
        }
        passarinho.velocidade = velocidade
    }
}

function verificaVidas() {
    if (jogando) {
        const todosMortos = passarinhos.every((passaro => !passaro.vida))
        if (todosMortos) {
            jogando = false
            canos.velocidade = 0
            chao.velocidade = 0
            passarinhos.map((passarinho) => {
                passarinho.velocidade = 0
            })
            let timeout = setTimeout(() => {
                jogoAutomatico()
            }, 500)
            return () => {
                clearTimeout(timeout)
            }
        }
    }
}

function atualizaDash() {
    if (jogando) {
        ciclos++

        if (ciclos >= 30) {
            ciclos = 0
            dash.nSaida = false
            passarinhos.forEach((passaro) => {
                if (passaro.vida) {
                    dash.i1 = passaro.sensor.distanciaTeto
                    dash.i2 = passaro.sensor.distanciaCanoSuperior
                    dash.i3 = passaro.sensor.distanciaCanoInferior
                    dash.i4 = passaro.sensor.distanciaChao

                    dash.h1 = passaro.network.weight_ho.data[0][0] * 100
                    dash.h2 = passaro.network.weight_ho.data[0][1] * 100
                    dash.h3 = passaro.network.weight_ho.data[0][2] * 100
                    dash.h4 = passaro.network.weight_ho.data[0][3] * 100
                    dash.h5 = passaro.network.weight_ho.data[0][4] * 100
                }
            })
        }
    }
}

function decisaoPulo() {
    if (jogando) {
        passarinhos.forEach((passaro) => {
            if (passaro.vida) {
                const neuronio = passaro.network.previsao([
                    passaro.sensor.distanciaTeto,
                    passaro.sensor.distanciaCanoSuperior,
                    passaro.sensor.distanciaCanoInferior,
                    passaro.sensor.distanciaChao,
                ])

                if (neuronio[0] > 0) {
                    passaro.pular()
                    dash.nSaida = true
                }
            }
        })
    }
}

function atualizaSensores() {
    if (jogando) {
        passarinhos = passarinhos.map((passaro) => {
            if (passaro.vida) {
                passaro.sensor.distanciaTeto = passaro.y
                passaro.sensor.distanciaChao = chao.y - passaro.y - passaro.altura
                passaro.sensor.distanciaCanoSuperior = calcularDistanciaEuclidiana(
                    passaro.x + passaro.largura,
                    passaro.y,
                    canos.x,
                    canos.yS + canos.altura
                )
                passaro.sensor.distanciaCanoInferior = calcularDistanciaEuclidiana(
                    passaro.x + passaro.largura,
                    passaro.y + passaro.altura,
                    canos.x,
                    canos.yI
                )
            }
            return passaro
        })
    }
}

function calcularDistanciaEuclidiana(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function NovoJogo() {
    if (!jogando) {
        dash.geracao = 1
        dash.score = 0
        dash.maximo = 0
        criaPassaros()
        jogando = true
        chao.velocidade = velocidade
        canos.velocidade = velocidade
        canos.reset()
    }
}

function jogoAutomatico() {
    if (dash.modoAutomatico) {
        dash.geracao++
        dash.score = 0
        criaGeracao()
        jogando = true
        chao.velocidade = velocidade
        canos.velocidade = velocidade
        canos.reset()
    }
}

function criaPassaros() {
    let genes = new Genes(N_PASSAROS, 31, -1, 1)
    let populacao = genes.geraPopulacao()
    passarinhos = []

    for (let i = 0; i < N_PASSAROS; i++) {
        let nn = new RedeNeural(4, 5, 1)
        nn.carregarRede(populacao[i])
        let novoPassaro = new Passarinho(passarinhoImagem)
        novoPassaro.network = nn
        passarinhos.push(novoPassaro)
    }
}

function criaGeracao() {
    let genes = new Genes(N_PASSAROS, 31, -1, 1)
    const passarosClassificados = ordenarPorFitness()
    passarinhos = []

    const novaGeracao = genes.crossover(
        passarosClassificados[0].network.buscaRede(),
        passarosClassificados[1].network.buscaRede()
    )
    const novaGeracaoMutacao = genes.mutacao(novaGeracao)

    for (let i = 0; i < N_PASSAROS; i++) {
        let nn = new RedeNeural(4, 5, 1)
        nn.carregarRede(novaGeracaoMutacao[i])
        let novoPassaro = new Passarinho(passarinhoImagem)
        novoPassaro.network = nn
        passarinhos.push(novoPassaro)
    }
}

function ordenarPorFitness() {
    passarinhos.sort(function (a, b) {
        return b.fitness - a.fitness;
    })
    return passarinhos
}


