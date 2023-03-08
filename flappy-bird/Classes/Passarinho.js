class Passarinho {
    constructor(imagem) {
        this.imagem = imagem;
        this.velocidade = 0;
        this.x = random(20, 40);
        this.y = random(100, 350);
        this.altura = 24;
        this.largura = 34;
        this.peso = 0.3;
        this.vida = true;
        this.sensor = {};
        this.network = {};
        this.fitness = 0;

        this.forcaGravidade = 0;
        this.angulo = 0;

        this._imagemAtual = 0;
        this._cont = 0;
        this._cor = [random(100, 255), random(100, 255), random(100, 255)];
    };

    atualiza() {
        this._cont++;
        this.gravidade();
        this.x -= this.velocidade;

        if (this._cont >= 10 && this.vida) {
            this._cont = 0;
            this._imagemAtual = this._imagemAtual < 3 ? this._imagemAtual += 1 : 0;
        }

        push();
        angleMode(DEGREES);
        imageMode(CENTER);
        translate(this.x + (this.largura) / 2, this.y + (this.altura) / 2);
        if (this.forcaGravidade > 0) {
            if (this.angulo < 20) {
                this.angulo = 20;
            }
        } else if (this.forcaGravidade <= 0) {
            if (this.angulo > -20) {
                this.angulo = -20;
            }
        }
        rotate(this.angulo);
        image(this.imagem[this._imagemAtual], 0, 0);
        tint(this._cor, 50);
        image(this.imagem[this._imagemAtual], 0, 0);
        pop();
    };

    pular() {
        if (this.vida) {
            this.y += -5;
            this.forcaGravidade = -5;
        }
    };

    gravidade() {
        if (this.vida) {
            this.y = this.y + this.forcaGravidade;

            if (this.forcaGravidade <= 5) {
                this.forcaGravidade += this.peso;
            } else {
                this.forcaGravidade = 5;
            }
        }
    };
}