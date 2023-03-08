class Chao {
    constructor(imagem) {
        this.imagem = imagem
        this.velocidade = 0
        this.x = 0
        this.y = 470
    }

    atualiza() {
        let x2 = this.x + 336
        image(this.imagem, this.x -= this.velocidade, this.y)
        image(this.imagem, x2 -= this.velocidade, this.y)

        if (x2 === 0) {
            this.x = 0
        }
    }
}