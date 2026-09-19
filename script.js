// ===============================
// JOGO DA VELHA
// ===============================

// Tabuleiro
const casas = document.querySelectorAll(".casa");

// Status do jogo
const status = document.getElementById("status");

// Botões
const btnReiniciar = document.getElementById("btnReiniciar");
const btnNova = document.getElementById("btnNova");

// Placar
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

// Estado do jogo
let tabuleiro = ["", "", "", "", "", "", "", "",""];

let jogadorAtual = "X";

let jogoAtivo = true;

let pontosX = 0;
let pontosO = 0;


// Combinações vencedoras
const combinacoesVencedoras = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


// ===============================
// CLIQUE NAS CASAS
// ===============================

casas.forEach(casa => {

    casa.addEventListener("click", jogar);

});


// ===============================
// FUNÇÃO PRINCIPAL DO JOGO
// ===============================

function jogar(event) {

    const casa = event.target;

    const indice = casa.dataset.index;


    // Impede jogar em casa ocupada
    if (tabuleiro[indice] !== "" || !jogoAtivo) {

        return;

    }


    // Salva jogada
    tabuleiro[indice] = jogadorAtual;

    casa.textContent = jogadorAtual;

    casa.classList.add(jogadorAtual.toLowerCase());


    // Verifica resultado
    verificarResultado();

}


// ===============================
// VERIFICAR RESULTADO
// ===============================

function verificarResultado() {

    let venceu = false;

    let combinacaoVencedora = [];


    for (let combinacao of combinacoesVencedoras) {

        const a = combinacao[0];
        const b = combinacao[1];
        const c = combinacao[2];


        if (
            tabuleiro[a] !== "" &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {

            venceu = true;

            combinacaoVencedora = combinacao;

            break;

        }

    }


    // ===============================
    // VITÓRIA
    // ===============================

    if (venceu) {

        jogoAtivo = false;

        status.textContent =
            `🎉 Jogador ${jogadorAtual} venceu!`;


        // Marca as casas vencedoras
        combinacaoVencedora.forEach(indice => {

            casas[indice].classList.add("vencedora");

        });


        // Atualiza placar
        if (jogadorAtual === "X") {

            pontosX++;

            scoreX.textContent = pontosX;

        } else {

            pontosO++;

            scoreO.textContent = pontosO;

        }


        return;

    }


    // ===============================
    // EMPATE
    // ===============================

    if (!tabuleiro.includes("")) {

        jogoAtivo = false;

        status.textContent = "🤝 Empate!";

        return;

    }


    // ===============================
    // TROCA DE JOGADOR
    // ===============================

    jogadorAtual = jogadorAtual === "X" ? "O" : "X";

    status.textContent =
        `Vez do jogador ${jogadorAtual}`;

}


// ===============================
// REINICIAR PARTIDA
// ===============================

btnReiniciar.addEventListener("click", reiniciarPartida);


function reiniciarPartida() {

    tabuleiro = ["", "", "", "", "", "", "", "",];

    jogadorAtual = "X";

    jogoAtivo = true;


    // Limpa todas as casas
    casas.forEach(casa => {

        casa.textContent = "";

        casa.classList.remove(
            "x",
            "o",
            "vencedora"
        );

    });


    status.textContent = "Vez do jogador X";

}


// ===============================
// ZERAR PLACAR
// ===============================

btnNova.addEventListener("click", zerarPlacar);


function zerarPlacar() {

    pontosX = 0;

    pontosO = 0;

    scoreX.textContent = "0";

    scoreO.textContent = "0";


    reiniciarPartida();

}
