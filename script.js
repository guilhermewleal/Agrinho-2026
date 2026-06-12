let producao = 50;
let ambiente = 50;
let ano = 2070;

let xp = 0;
let nivel = 1;

let historicoProd = [];
let historicoAmb = [];

let missao = "Aumente o ambiente para 80";

const ctx = document.getElementById("grafico").getContext("2d");

function iniciar(){
    document.getElementById("intro").style.display = "none";
    document.getElementById("game").style.display = "block";
    atualizar();
}

function selecionarRegiao(){
    let regiao = document.getElementById("regiao").value;

    if(regiao === "Nordeste"){
        ambiente -= 10;
    } else {
        ambiente += 5;
    }
    atualizar();
}

function atualizar(){
    document.getElementById("prod").innerText = producao;
    document.getElementById("amb").innerText = ambiente;
    document.getElementById("ano").innerText = "Ano: " + ano;
    document.getElementById("xp").innerText = "XP: " + xp + " | Nível: " + nivel;
    document.getElementById("missao").innerText = "🎯 Missão: " + missao;

    let eq = (producao + ambiente) / 2;
    document.getElementById("equilibrio").style.width = eq + "%";

    historicoProd.push(producao);
    historicoAmb.push(ambiente);

    desenharGrafico();
    iaFeedback();
    verificarNivel();
    verificarMissao();
    mostrarRanking();
}

function acao(tipo){

    som();

    if(tipo===1){ producao+=10; ambiente+=5; xp+=10;}
    if(tipo===2){ producao+=20; ambiente-=20; xp+=5;}
    if(tipo===3){ producao+=8; ambiente+=15; xp+=15;}

    evento();
    limitar();

    ano += 5;
    atualizar();
}

function evento(){
    let r = Math.random();

    if(r<0.3){
        ambiente-=10;
        clima("seca");
        mostrarEvento("🌪️ Seca!");
    }
    else if(r<0.6){
        producao-=10;
        mostrarEvento("🐛 Pragas!");
    }
    else{
        ambiente+=5;
        clima("chuva");
        mostrarEvento("🌧️ Chuva!");
    }
}

function clima(tipo){
    if(tipo==="seca") document.body.style.background="#5a3e1b";
    if(tipo==="chuva") document.body.style.background="#1b3e5a";
}

function mostrarEvento(msg){
    document.getElementById("evento").innerText = msg;
}

function iaFeedback(){
    let msg="";
    if(ambiente<30 && producao>70) msg="🤖 Você está destruindo o ecossistema!";
    else if(ambiente>80) msg="🤖 Sistema sustentável!";
    else msg="🤖 Ajuste suas estratégias.";
    document.getElementById("ia").innerText = msg;
}

function verificarNivel(){
    if(xp >= nivel*50){
        nivel++;
        conquistas("🏆 Subiu de nível!");
    }
}

function verificarMissao(){
    if(ambiente>=80){
        xp+=50;
        conquistas("🎯 Missão concluída!");
        missao = "Aumente produção para 90";
    }
}

function conquistas(msg){
    document.getElementById("conquistas").innerText = msg;
}

function desenharGrafico(){
    ctx.clearRect(0,0,400,200);

    ctx.strokeStyle="#00ffcc";
    ctx.beginPath();
    historicoProd.forEach((v,i)=>ctx.lineTo(i*20,200-v));
    ctx.stroke();

    ctx.strokeStyle="#ff4444";
    ctx.beginPath();
    historicoAmb.forEach((v,i)=>ctx.lineTo(i*20,200-v));
    ctx.stroke();
}

function som(){
    let audio = new Audio("https://www.soundjay.com/button/beep-07.wav");
    audio.play();
}

function limitar(){
    producao = Math.max(0,Math.min(100,producao));
    ambiente = Math.max(0,Math.min(100,ambiente));
}

function final(){
    let score = producao + ambiente;

    let resultado = ambiente<30 ?
    "Você destruiu o planeta…" :
    score>160 ?
    "🏆 Você salvou a Terra!" :
    "⚖️ Futuro incerto.";

    alert(resultado);
    salvarRanking(score);
}

function salvarRanking(score){
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    ranking.push(score);
    ranking.sort((a,b)=>b-a);
    ranking = ranking.slice(0,5);
    localStorage.setItem("ranking", JSON.stringify(ranking));
}

function mostrarRanking(){
    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];
    let lista = document.getElementById("ranking");
    lista.innerHTML = "";
    ranking.forEach(p=>{
        let li = document.createElement("li");
        li.innerText = p;
        lista.appendChild(li);
    });
}