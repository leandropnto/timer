const jsonfile = require('jsonfile-promised');
const path = require('path');
const fs = require('fs');

const criaArquivoDeCurso = async (nomeArquivo, conteudo) => {
  try {
    await jsonfile.writeFile(nomeArquivo, conteudo);
  } catch (error) {
    console.log(error);
  }
};

const salvaDados = async (curso, tempo) => {
  console.log(path.join(__dirname, '..', 'data', `${curso}.json`));
  const arquivoCurso = path.join(__dirname, '..', 'data', `${curso}.json`);

  if (fs.existsSync(arquivoCurso)) {
    await adicionaTempoAoCurso(arquivoCurso, tempo);
  } else {
    try {
      await criaArquivoDeCurso(arquivoCurso, {});
      await adicionaTempoAoCurso(arquivoCurso, tempo);
    } catch (error) {
      console.log(error);
    }
  }
}

const adicionaTempoAoCurso = async (arquivoCurso, tempoEstudado) => {
  const dados = {
    ultimoEstudo: new Date().toISOString(),
    tempo: tempoEstudado
  }
  await jsonfile.writeFile(arquivoCurso, dados);

}

const pegarDados = async curso => {
  const arquivoCurso = path.join(__dirname, '..', 'data', `${curso}.json`);
  return await jsonfile.readFile(arquivoCurso)
}

const nomeDosCursos = () => {
  return fs.readdirSync(path.join(__dirname, '..', 'data')).map(nome => nome.replace('.json', ''));
}

module.exports = {
  salvaDados,
  criaArquivoDeCurso ,
  pegarDados,
  nomeDosCursos
}