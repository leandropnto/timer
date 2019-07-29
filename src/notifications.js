const path = require('path');


const sendNotification = (titulo, texto, icone) => {
  console.log(path.join(__dirname, 'img', 'icon.png'));

  return new Notification(titulo, {
    body: texto,
    icon: path.join(__dirname, 'app', 'img', icone || 'icon.png')
  });

}

module.exports = {
  sendNotification
}