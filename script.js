const sliders = document.querySelectorAll("input");
sliders.forEach(slider => slider.addEventListener("input", calcular));

function calcular() {

    let agua = parseFloat(document.getElementById("agua").value);
    let fertilizante = parseFloat(document.getElementById("fertilizante").value);
    let desmatamento = parseFloat(document.getElementById("desmatamento").value);
    let energia = parseFloat(document.getElementById("energia").value);

    // PRODUÇÃO
    let producao = (agua * 0.3) + (fertilizante * 0.4) + (energia * 0.3);

    // IMPACTO
    let impacto = (desmatamento * 0.7) + (fertilizante * 0.3) - (energia * 0.6);

    // SUSTENTABILIDADE
    let sustentabilidade = 100 - impacto;

    producao = limitar(producao);
    sustentabilidade = limitar(sustentabilidade);

    document.getElementById("prod").innerText = producao.toFixed(1);
    document.getElementById("sust").innerText = sustentabilidade.toFixed(1);

    // BARRA
    let nivel = (producao + sustentabilidade) / 2;
    let barra = document.getElementById("barraNivel");

    barra.style.width = nivel + "%";

    if (nivel > 70) barra.style.background = "limegreen";
    else if (nivel > 40) barra.style.background = "orange";
    else barra.style.background = "red";

    // MENSAGEM
    let msg = "";
    if (nivel > 70) msg = "🌟 Sistema sustentável e produtivo!";
    else if (nivel > 40) msg = "⚖️ Equilíbrio médio.";
    else msg = "🚨 Alto impacto ambiental!";

    document.getElementById("mensagem").innerText = msg;

    salvarHistorico(producao, sustentabilidade);
}

function limitar(valor) {
    return Math.max(0, Math.min(100, valor));
}

// HISTÓRICO COM LOCALSTORAGE
function salvarHistorico(prod, sust) {

    let lista = JSON.parse(localStorage.getItem("ecoAgro")) || [];

    lista.push({
        prod: prod.toFixed(1),
        sust: sust.toFixed(1)
    });

    localStorage.setItem("ecoAgro", JSON.stringify(lista));

    mostrarHistorico();
}

function mostrarHistorico() {

    let lista = JSON.parse(localStorage.getItem("ecoAgro")) || [];
    let ul = document.getElementById("lista");

    ul.innerHTML = "";

    lista.slice(-5).reverse().forEach(item => {
        let li = document.createElement("li");
        li.innerText = `🌾 ${item.prod} | 🌍 ${item.sust}`;
        ul.appendChild(li);
    });
}

// iniciar
calcular();
mostrarHistorico();