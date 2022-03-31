function Game() {
	const JOGADOR_X = "X";
	const JOGADOR_O = "O";

	let quadrados = [];
	let jogadorAtual = null;
	let vencedor = null;
	var game = document.getElementById("Game");

	function setPlayer(player) {
		jogadorAtual.jogadorAtual = player;
		jogadorAtual.innerHTML = "Jogador: <strong>" + player + "</strong>";
	}

	function changePlayer() {
		if (jogadorAtual.jogadorAtual === JOGADOR_X) {
			setPlayer(JOGADOR_O);
		} else {
			setPlayer(JOGADOR_X);
		}
	}

	function setResultado(resultado) {
		vencedor.innerHTML = resultado;
		jogadorAtual.innerHTML = "";
	}

	function escolherQuadrado(id) {
		if (vencedor.innerHTML !== "") return;
		if (quadrados[id - 1].innerHTML !== " ") return;

		quadrados[id - 1].innerHTML = jogadorAtual.jogadorAtual;
		quadrados[id - 1].style.color = "#000";

		changePlayer();
		checaVencedor();
	}

	function criarTabuleiro() {
		let line = document.createElement("div");
		for (let i = 1, linha = 0; i < 10; i++) {
			let obj = document.createElement("div");
			obj.id = i;
			obj.className = "quadrado";
			obj.innerHTML = " ";
			obj.addEventListener("click", () => {
				escolherQuadrado(obj.id);
			});
			quadrados.push(obj);
			linha++;
			line.appendChild(obj);
			if (linha == 3) {
				game.appendChild(line);
				linha = 0;
				line = document.createElement("div");
			}
		}
	}

	function criarJogadorAtual() {
		jogadorAtual = document.createElement("div");
		jogadorAtual.className = "jogador";
		setPlayer(JOGADOR_X);
		game.appendChild(jogadorAtual);
	}

	function criarVencedor() {
		vencedor = document.createElement("div");
		vencedor.className = "vencedor";
		game.appendChild(vencedor);
	}

	function criarBtnRestart() {
		let divRestart = document.createElement("div");
		let btnRestart = document.createElement("button");
		btnRestart.addEventListener("click", restart);
		btnRestart.innerText = "Reiniciar";
		divRestart.appendChild(btnRestart);
		game.appendChild(divRestart);
	}

	function InitialConfigs() {
		criarTabuleiro();
		criarJogadorAtual();
		criarVencedor();
		criarBtnRestart();
	}

	function restart() {
		setResultado("");
		vencedor.removeAttribute("style");

		quadrados.forEach((el) => {
			el.removeAttribute("style");
			el.innerHTML = " ";
		});

		setPlayer(JOGADOR_X);
	}

	function checaVencedor() {
		if (checaSequencia(quadrados[0], quadrados[1], quadrados[2])) {
			mudaCorQuadrado(quadrados[0], quadrados[1], quadrados[2]);
			setVencedor(quadrados[0]);
			return;
		}

		if (checaSequencia(quadrados[3], quadrados[4], quadrados[5])) {
			mudaCorQuadrado(quadrados[3], quadrados[4], quadrados[5]);
			setVencedor(quadrados[3]);
			return;
		}

		if (checaSequencia(quadrados[6], quadrados[7], quadrados[8])) {
			mudaCorQuadrado(quadrados[6], quadrados[7], quadrados[8]);
			setVencedor(quadrados[6]);
			return;
		}

		if (checaSequencia(quadrados[0], quadrados[3], quadrados[6])) {
			mudaCorQuadrado(quadrados[0], quadrados[3], quadrados[6]);
			setVencedor(quadrados[0]);
			return;
		}

		if (checaSequencia(quadrados[1], quadrados[4], quadrados[7])) {
			mudaCorQuadrado(quadrados[1], quadrados[4], quadrados[7]);
			setVencedor(quadrados[1]);
			return;
		}

		if (checaSequencia(quadrados[2], quadrados[5], quadrados[8])) {
			mudaCorQuadrado(quadrados[2], quadrados[5], quadrados[8]);
			setVencedor(quadrados[2]);
			return;
		}

		if (checaSequencia(quadrados[0], quadrados[4], quadrados[8])) {
			mudaCorQuadrado(quadrados[0], quadrados[4], quadrados[8]);
			setVencedor(quadrados[0]);
			return;
		}

		if (checaSequencia(quadrados[2], quadrados[4], quadrados[6])) {
			mudaCorQuadrado(quadrados[2], quadrados[4], quadrados[6]);
			setVencedor(quadrados[2]);
			return;
		}

		if (quadrados.filter((el) => el.innerHTML !== " ").length > 8) {
			setEmpate();
		}
	}

	function setEmpate() {
		setResultado("EMPATE!!!");
		vencedor.style.color = "#FF0";
	}

	function setVencedor(quadrado) {
		setResultado("Vencedor: " + quadrado.innerHTML);
		vencedor.style.color = "#0F0";
	}

	function mudaCorQuadrado(quadrado1, quadrado2, quadrado3) {
		quadrado1.style.background = "#0f0";
		quadrado2.style.background = "#0f0";
		quadrado3.style.background = "#0f0";
	}

	function checaSequencia(quadrado1, quadrado2, quadrado3) {
		return quadrado1.innerHTML !== " " &&
			quadrado1.innerHTML === quadrado2.innerHTML &&
			quadrado2.innerHTML === quadrado3.innerHTML
			? true
			: false;
	}

	InitialConfigs();
}

Game();
