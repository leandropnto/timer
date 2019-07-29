const { Tray, Menu } = require('electron');
const path = require('path');
const data = require('./data');
tray = null;

const gerarTrayTemplate = (callback, onExitClicked) => {

  let cursos = data.nomeDosCursos();
  const items = cursos.map(curso => {
    return {
      label: curso, type: 'radio', click: () => callback(curso)
    }
  });

  return Menu.buildFromTemplate([
    { label: 'Cursos', type: 'normal', enabled: false },
    ...items,
    {type: 'separator'},
    {label: 'Fechar', click: () => onExitClicked()}
  ]);
}


const addTray = (onChangeCurso, onExitClicked) => {
  tray = new Tray(path.join(__dirname, 'assets', 'img', 'icon-tray.png'));
  tray.setContextMenu( gerarTrayTemplate(onChangeCurso, onExitClicked));
}

module.exports = {
  addTray
}

