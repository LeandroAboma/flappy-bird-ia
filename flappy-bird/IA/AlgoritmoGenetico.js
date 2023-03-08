class Genes {
    constructor(nIndividos, nCromossomos, menorValorCrom = 0, maiorValorCrom = 1) {
        this.nIndividos = nIndividos;
        this.nCromossomos = nCromossomos;
        this.menorValorCrom = menorValorCrom;
        this.maiorValorCrom = maiorValorCrom;
    }

    geraIndividos() {
        const individuo = [];
        for (let i = 0; i < this.nCromossomos; i++) {
            individuo.push(Math.random() * (this.maiorValorCrom - this.menorValorCrom) + this.menorValorCrom);
        }
        return individuo;
    };

    geraPopulacao() {
        const populacao = [];
        for (let i = 0; i < this.nIndividos; i++) {
            populacao.push(this.geraIndividos());
        }
        return populacao;
    };

    crossover(paiA, paiB) {
        let proximaGeracao = [];

        proximaGeracao.push(paiA);
        proximaGeracao.push(paiB);

        while (proximaGeracao.length < this.nIndividos) {
            const pontoCruzamento = parseInt(Math.random() * paiA.length);
            let novoFilho = paiA.slice(0, pontoCruzamento).concat(paiB.slice(pontoCruzamento));
            let novoFilhoNum = novoFilho.map(valor => Number(valor));
            proximaGeracao.push(novoFilhoNum);
        }
        return proximaGeracao;
    };

    mutacao(populacao, taxaMutacao = 0.25) {
        populacao.map((individuo) => {
            if (Math.random() < taxaMutacao) {
                const pontoMutacao = parseInt(Math.random() * individuo.length);
                individuo[pontoMutacao] = Math.random();
            }
        });
        return populacao;
    };
}
