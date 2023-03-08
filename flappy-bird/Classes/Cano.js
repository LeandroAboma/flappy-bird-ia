class Cano {
    constructor(imagemInferior, imagemSuperior) {
        this.imagemInferior = imagemInferior
        this.imagemSuperior = imagemSuperior
        this.velocidade = 0
        this.altura = 320
        this.largura = 52
        this.gap = 140
        this.x = 300
        this.yS = 0
        this.yI = 0
    }

    atualiza() {
        //cano inferior
        image(this.imagemInferior, this.x, this.yI)
        fill('rgba(255,0,0,0.5)')

        //cano superior
        image(this.imagemSuperior, this.x, this.yS);
        fill('rgba(255,0,0,0.5)')

        if (this.x < -this.largura) {
            this.reset()
        } else {
            this.x -= this.velocidade
        }
    }

    reset() {
        this.x = 300
        this.yS = random(60, 280) - this.altura
        this.yI = this.yS + this.altura + this.gap
    }
}