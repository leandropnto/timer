const { Menu, ipcMain } = require("electron");

const template = [
  {
    label: "Visualizar",
    submenu: [
      {
        role: "reload"
      },
      {
        role: 'toggledevtools'
      }
    ]
  },
  {
    label: 'Janela',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    label: "Sobre",
    submenu: [
      {
        label: "Sobre o Timer",
        accelerator: 'CommandOrControl+I',
        click: () => {
          ipcMain.emit("abrir-janela-sobre");
        }
      }
    ]
  }
];

const createMenu = app => {
  const menu =
    process.platform == "darwin"
      ? [
          {
            label: app.getName(),
            submenu: [{ label: "Sair", click: () => app.quit() }]
          },
          ...template
        ]
      : template;
  return Menu.buildFromTemplate(menu);
};

module.exports = { createMenu };
