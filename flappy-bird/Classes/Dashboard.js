class Dashboard {
    constructor() {
        this.x = 297;
        this.y = 0;
        this.altura = 600;
        this.largura = 303;

        this.geracao = 0;
        this.score = 0;
        this.maximo = 0;
        this.modoAutomatico = false;

        this.i1 = 1000;
        this.i2 = 1000;
        this.i3 = 1000;
        this.i4 = 1000;

        this.h1 = 1000;
        this.h2 = 1000;
        this.h3 = 1000;
        this.h4 = 1000;
        this.h5 = 1000;

        this.nSaida = false;

        textAlign(0, CENTER);
    };

    calculaCor(valor, min, max) {
        let r = map(valor, min, max, 0, 1);
        return lerpColor(color('red'), color(20), r);
    };

    calculaPeso(valor, min, max) {
        return map(valor, min, max, 1, 4);
    };

    atualiza(jogando) {
        if (jogando) {
            this.score++;
        }
        if (this.score > this.maximo) {
            this.maximo = this.score;
        }

        fill('deepskyblue');
        rect(this.x, this.y, this.largura, this.altura);

        fill('black');
        textFont(fonteTitulo);
        textSize(50);
        text('FLAPPY BIRD IA', 320, 30);
        fill('orange');
        text('FLAPPY BIRD IA', 318, 28);

        fill('black');
        textFont(fonteTexto);
        textSize(20);
        text(`Geracao: ${this.geracao}`, 320, 80);

        textSize(20);
        text(`Score: ${this.score}`, 320, 110);

        textSize(20);
        text(`Maximo: ${this.maximo}`, 320, 140);

        textSize(20);
        text(`Rede Neural`, 320, 190);

        // camada de inputs
        push()
        fill(this.calculaCor(this.i1, 0, 200))
        ellipse(330, 235, 20, 20)
        stroke(this.calculaCor(this.i1, 0, 200))
        strokeWeight(this.calculaPeso(this.i1, 400, 0))
        line(330, 235, 400, 220)
        line(330, 235, 400, 250)
        line(330, 235, 400, 280)
        line(330, 235, 400, 310)
        line(330, 235, 400, 340)
        pop()

        push()
        fill(this.calculaCor(this.i2, 0, 200))
        ellipse(330, 265, 20, 20)
        stroke(this.calculaCor(this.i2, 0, 200))
        strokeWeight(this.calculaPeso(this.i2, 400, 0))
        line(330, 265, 400, 220)
        line(330, 265, 400, 250)
        line(330, 265, 400, 280)
        line(330, 265, 400, 310)
        line(330, 265, 400, 340)
        pop()

        push()
        fill(this.calculaCor(this.i3, 0, 200))
        ellipse(330, 295, 20, 20)
        stroke(this.calculaCor(this.i3, 0, 200))
        strokeWeight(this.calculaPeso(this.i3, 400, 0))
        line(330, 295, 400, 220)
        line(330, 295, 400, 250)
        line(330, 295, 400, 280)
        line(330, 295, 400, 310)
        line(330, 295, 400, 340)
        pop()

        push()
        fill(this.calculaCor(this.i4, 0, 200))
        ellipse(330, 325, 20, 20)
        stroke(this.calculaCor(this.i4, 0, 200))
        strokeWeight(this.calculaPeso(this.i4, 400, 0))
        line(330, 325, 400, 220)
        line(330, 325, 400, 250)
        line(330, 325, 400, 280)
        line(330, 325, 400, 310)
        line(330, 325, 400, 340)
        pop()

        //camada oculta
        push()
        fill(this.calculaCor(this.h1, -100, 100))
        ellipse(400, 220, 20, 20)
        stroke(this.calculaCor(this.h1, -100, 100))
        strokeWeight(this.calculaPeso(this.h1, 100, -100))
        line(400, 220, 470, 280)
        pop()

        push()
        fill(this.calculaCor(this.h2, -100, 100))
        ellipse(400, 250, 20, 20)
        stroke(this.calculaCor(this.h2, -100, 100))
        strokeWeight(this.calculaPeso(this.h2, 100, -100))
        line(400, 250, 470, 280)
        pop()

        push()
        fill(this.calculaCor(this.h3, -100, 100))
        ellipse(400, 280, 20, 20)
        stroke(this.calculaCor(this.h3, -100, 100))
        strokeWeight(this.calculaPeso(this.h3, 100, -100))
        line(400, 280, 470, 280)
        pop()

        push()
        fill(this.calculaCor(this.h4, -100, 100))
        ellipse(400, 310, 20, 20)
        stroke(this.calculaCor(this.h4, -100, 100))
        strokeWeight(this.calculaPeso(this.h4, 100, -100))
        line(400, 310, 470, 280)
        pop()

        push()
        fill(this.calculaCor(this.h5, -100, 100))
        ellipse(400, 340, 20, 20)
        stroke(this.calculaCor(this.h5, -100, 100))
        strokeWeight(this.calculaPeso(this.h5, 100, -100))
        line(400, 340, 470, 280)
        pop()

        // saida
        push()
        if (this.nSaida) {
            fill('red')
        } else {
            fill(20)
        }
        ellipse(470, 280, 20, 20)
        pop()

        botaoStart.position(330, 450)
        botaoStart.class('botao-start')
        botaoStart.mousePressed(() => {
            NovoJogo()
        })

        botaoAutomatico.position(460, 450)
        if (this.modoAutomatico) {
            botaoAutomatico.class('botao-automatico--ativo')
            botaoAutomatico.html('Automático')
        } else {
            botaoAutomatico.class('botao-automatico')
            botaoAutomatico.html('Manual')
        }
        botaoAutomatico.mousePressed(() => {
            this.modoAutomatico = !this.modoAutomatico
        })
    }
}