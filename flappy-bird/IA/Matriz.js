class Matriz {
    constructor(rows = 0, cols = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = new Array(rows).fill().map(() => new Array(cols).fill(0));
    };

    randomizar(minimo, maximo) {
        this.map(() => {
            return Math.random() * (maximo - minimo) + minimo;
        });
    };

    static map(matrizA, func) {
        let matriz = new Matriz(matrizA.rows, matrizA.cols);
        matriz.data = matriz.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            });
        });
        return matriz;
    };

    map(func) {
        this.data = this.data.map((arr, i) => {
            return arr.map((num, j) => {
                return func(num, i, j);
            });
        });
        return this;
    };

    static listaParaMatriz(array) {
        let matriz = new Matriz(array.length, 1);
        matriz.map((elemento, i) => {
            return array[i];
        });
        return matriz;
    };

    static matrizParaLista(objeto) {
        let array = [];
        objeto.map((elemento) => {
            array.push(elemento);
        });
        return array;
    };

    static soma(matriz_a, matriz_b) {
        const matriz = new Matriz(matriz_a.rows, matriz_b.cols);
        matriz.data = matriz_a.data.map((row, i) => row.map((value, j) => value + matriz_b.data[i][j]));
        return matriz;
    };

    static multiplica(matrizA, matrizB) {
        let matriz = new Matriz(matrizA.rows, matrizB.cols);
        matriz.map((num, i, j) => {
            let sum = 0;
            for (let k = 0; k < matrizA.cols; k++) {
                let elemento1 = matrizA.data[i][k];
                let elemento2 = matrizB.data[k][j];
                sum += elemento1 * elemento2;
            }
            return sum;
        });
        return matriz;
    };
}