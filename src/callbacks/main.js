const { ipcMain, BrowserWindow } = require('electron');
const path = require('path');
const data = require('../data');
const tray = require('../tray');
let sobreWindow = null
let main = null;
let cursoAtivo = null;
let tempoAtual = "00:00:00";

const onCursoChanged = (curso) => {
  main && main.send('curso-trocado', curso);
}

const onClosedWindow = () => {
  data.salvaDados(cursoAtivo, tempoAtual);
}

const onExitClicked = (app) => {
  main && main.send('salvar-curso');
}

const startListeners = (app, mainWindow) => {

  main = mainWindow;

  ipcMain.on('abrir-janela-sobre', (event) => {
    if (sobreWindow == null) {
      sobreWindow = new BrowserWindow({
        width: 300,
        height: 220,
        maximizable: false,
        minimizable: false,
        alwaysOnTop: true,
        frame: false,
        webPreferences: {
          nodeIntegration: true,
        }
      });
      sobreWindow.setMenu(null);
      sobreWindow.on('closed', () => sobreWindow = null);
  
    }
  
    sobreWindow.loadURL(path.join(__dirname, '..', 'pages', 'About', 'index.html'));
  
  });


  ipcMain.on('fechar-janela-sobre', () => {
    sobreWindow.close();
  });

  ipcMain.on('curso-parado', (event, curso, tempo) => {
    cursoAtivo = curso;
    data.salvaDados(curso, tempo);
  });

  ipcMain.on('curso-adicionado', async (event, curso) => {
    console.log('curso adicionado');
    cursoAtivo = curso;
    await data.salvaDados(curso, "00:00:00");
    tray.addTray();
  });

  ipcMain.on('quit', event => {
    app.quit();
  })

  ipcMain.on('minimize', event => {
    mainWindow.minimize();
  })

}



module.exports = {
  onCursoChanged,
  onExitClicked,
  startListeners
}