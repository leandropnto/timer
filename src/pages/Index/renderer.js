const { ipcRenderer } = require("electron");
const timer = require("../../timer");
const data = require("../../data");
const {sendNotification} = require('../../notifications');

const linkSobre = document.querySelector(".info-button");
const botaoPlay = document.querySelector(".botao-play");
const botaoAdicionar = document.querySelector(".botao-adicionar");
const campoAdicionar = document.querySelector(".campo-adicionar");
const closeButton = document.querySelector('.close');
const minimizeButton = document.querySelector('.minimize');

let iniciado = false;
let tempo = document.querySelector(".tempo");
let curso = document.querySelector(".curso");

let images = ["../../assets/img/play-button.svg", "../../assets/img/stop-button.svg"];

linkSobre.addEventListener("click", function() {
  console.log("abrindo sobre");
  ipcRenderer.send("abrir-janela-sobre");
});

botaoPlay.addEventListener("click", _ => {
  images = images.reverse();
  botaoPlay.src = images[0];
  iniciado ? timer.parar(curso.textContent) : timer.iniciar(tempo);
  iniciado = !iniciado;
});

botaoAdicionar.addEventListener("click", _ => {
  const novoCurso = campoAdicionar.value;
  curso.textContent = novoCurso;
  tempo.textContent = "00:00:00";
  campoAdicionar.value = "";
  ipcRenderer.send("curso-adicionado", novoCurso);
});

campoAdicionar.addEventListener('keyup', _ => {
  console.log(campoAdicionar.value);
  botaoAdicionar.disabled = campoAdicionar.value === "";
});

window.onload = async () => {
  const dados = await data.pegarDados(curso.textContent);
  tempo.textContent = dados.tempo;
};

ipcRenderer.on("curso-trocado", async (event, nomeCurso) => {
  if (iniciado)   botaoPlay.click();

  curso.textContent = nomeCurso;
  try {
    const dados = await data.pegarDados(nomeCurso);
    tempo.textContent = dados.tempo;
  } catch (error) {
    console.log('curso não encontrado ou sem dados');
    tempo.textContent = "00:00:00";
  }
  
});

ipcRenderer.on("salvar-curso", async event => {
  timer.parar(curso.textContent);
  ipcRenderer.send("quit");
});

ipcRenderer.on("start", async event => {
  botaoPlay.click();

  iniciado
    ? sendNotification('Timer', `Timer para o curso ${curso.textContent} iniciado`, 'play-button.png')
    : sendNotification('Timer', `Timer para o curso ${curso.textContent} parado`, 'stop-button.png')
});


closeButton.addEventListener('click', _ => {
  ipcRenderer.send("quit");
});

minimizeButton.addEventListener('click', _ => {
  ipcRenderer.send("minimize");
})