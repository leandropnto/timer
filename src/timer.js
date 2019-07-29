const moment = require('moment');
const { ipcRenderer } = require('electron');

const segundosParaTempo = segundos => {
  return moment().startOf('day').seconds(segundos).format('HH:mm:ss');
}

let tempo = null;
let timerId = null;
let segundos = null;

module.exports = {
  iniciar: (el) => {
    tempo = moment.duration(el.textContent); 
    segundos = tempo.asSeconds();
    timerId = setInterval(() => {
      segundos++;
      el.textContent =segundosParaTempo(segundos);
    }, 1000);
  },

  parar: (curso) => {
     clearInterval(timerId);
     let tempoEstudado = segundosParaTempo(segundos);
     ipcRenderer.send('curso-parado', curso, tempoEstudado);
  }
}