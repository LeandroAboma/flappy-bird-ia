# Flappy Bird IA
Este projeto consiste no desenvolvimento do jogo Flappy Bird, controlado por uma rede neural treinada com algoritmos de aprendizado de máquina. O objetivo é criar uma inteligência artificial capaz de jogar o jogo de forma autônoma, sem intervenção humana.

O jogo foi desenvolvido em JavaScript, utilizando a biblioteca P5.js para renderizar as imagens no navegador. A rede neural foi desenvolvida para ser utilizada em conjunto com um algoritmo genético, que gera os parâmetros iniciais da rede e realiza a seleção artificial dos melhores indivíduos de cada geração, bem como o cruzamento e a mutação das populações das demais gerações.

A rede neural possui quatro entradas: distância do teto, distância do chão, distância do cano superior e distância do cano inferior. Na camada oculta, há cinco neurônios e apenas uma saída para fazer o pássaro pular. A rede tem 31 parâmetros, sendo 20 pesos da entrada para a camada oculta, 5 bias para a camada oculta e 5 pesos da camada oculta para a saída, além de 1 bias para a saída. A função de ativação utilizada foi a ReLU (Rectified Linear Unit), que é uma função de ativação não linear que permite que padrões complexos nos dados sejam aprendidos.


# Instalação 
Para executar o jogo Flappy Bird IA, siga as instruções abaixo:

1. Baixe o repositório em sua máquina local.
2. Certifique-se de ter o Node.js instalado.
3. No terminal, navegue até a pasta do projeto e execute o seguinte comando para instalar o servidor http-server:
    ```bash
    npm install -g http-server
    ```
4. Em seguida, execute o seguinte comando para instalar o browser-sync:
    ```bash
    npm install -g browser-sync
    ```
5. Para iniciar o servidor, execute o seguinte comando no terminal:
    ```bash
    browser-sync start --server -f -w
    ```
6. O navegador será aberto automaticamente e você poderá acessar o jogo no seguinte endereço:
    ```bash
    http://localhost:3000/flappy-bird
    ```

# Preview
<img alt="preview" src="https://user-images.githubusercontent.com/56095974/227356958-b4982adb-bff2-4e69-a41d-7a75d39f55db.png" width="512">

