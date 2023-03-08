function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function relu(x) {
    if (x > 0) {
        return x;
    } else {
        return 0;
    }
}

class RedeNeural {
    constructor(i_nodes, h_nodes, o_nodes) {
        this.i_nodes = i_nodes;
        this.h_nodes = h_nodes;
        this.o_nodes = o_nodes;

        this.bias_ih = new Matriz(this.h_nodes, 1);
        this.bias_ih.randomizar(0, 1);
        this.bias_ho = new Matriz(this.o_nodes, 1);
        this.bias_ho.randomizar();

        this.weight_ih = new Matriz(this.h_nodes, this.i_nodes);
        this.weight_ih.randomizar(0, 1);
        this.weight_ho = new Matriz(this.o_nodes, this.h_nodes);
        this.weight_ho.randomizar(0, 1);

        this.fitness = 0;
    };

    carregarRede(array) {
        const numPesoEsperados = this.weight_ih.rows * this.weight_ih.cols
            + this.weight_ho.rows * this.weight_ho.cols
            + this.bias_ih.rows * this.bias_ih.cols
            + this.bias_ho.rows * this.bias_ho.cols;

        if (numPesoEsperados !== array.length) {
            throw new Error(
                `Erro ao carregar parâmetros da rede: Esperado: ${numPesoEsperados}, Informados ${array.length}`
            );
        }

        let index = 0;

        this.bias_ih = this.bias_ih.map(() => array[index++]);
        this.weight_ih = this.weight_ih.map(() => array[index++]);
        this.bias_ho = this.bias_ho.map(() => array[index++]);
        this.weight_ho = this.weight_ho.map(() => array[index++]);
    };

    buscaRede() {
        const rede = [];

        this.bias_ih.map((elemento) => {
            rede.push(elemento);
        })

        this.weight_ih.map((elemento) => {
            rede.push(elemento);
        })

        this.bias_ho.map((elemento) => {
            rede.push(elemento);
        })

        this.weight_ho.map((elemento) => {
            rede.push(elemento);
        })

        return rede;
    };

    previsao(array) {
        const inputs = Matriz.listaParaMatriz(array);
        let hidden = Matriz.multiplica(this.weight_ih, inputs);
        hidden = Matriz.soma(hidden, this.bias_ih);
        hidden.map(relu);

        // HIDDEN -> OUTPUT
        let output = Matriz.multiplica(this.weight_ho, hidden);
        output = Matriz.soma(output, this.bias_ho);
        output.map(relu);
        output = Matriz.matrizParaLista(output);
        return output;
    };
}


