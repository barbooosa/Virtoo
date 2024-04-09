
const {Curso} = require('../../database/db.js')

class cursoController{
  async criarCurso (req, res) {
    const { nome, numPeriodos } = req.body;
    await criarCurso(nome, numPeriodos);
    res.send(`Curso ${nome} criado com sucesso!`);
    
  }
  async criarMateria (req, res) {
    const { nomeCurso, periodo, materia } = req.body;
    await adicionarMateria(nomeCurso, periodo, materia);
    res.send(`Matéria ${materia} adicionada ao período ${periodo} do curso ${nomeCurso}!`);
  }
  async consultarCurso(req, res) {
    const curso = await Curso.findOne({ nome: req.params.nome });
    if (!curso) {
      res.status(404).send(`Curso ${req.params.nome} não encontrado.`);

      return;
    }
    // res.send(curso);
    res.render('cursos', { curso });
 
  }

}



async function  criarCurso(nome, numPeriodos) {
  const curso = new Curso({ nome, periodos: [] });
  for (let i = 1; i <= numPeriodos; i++) {
    curso.periodos.push({ numero: i, materias: [] });
  }
  await curso.save();
  console.log(`Curso ${nome} criado com sucesso!`);
}

async function adicionarMateria(nomeCurso, periodo, materia) {
  const curso = await Curso.findOne({ nome: nomeCurso });
  if (!curso) {
    console.log(`Curso ${nomeCurso} não encontrado.`);
    return;
  }
  const periodoObj = curso.periodos.find(p => p.numero === periodo);
  if (!periodoObj) {
    console.log(`Período ${periodo} não encontrado no curso ${nomeCurso}.`);
    return  ;
  }
  periodoObj.materias.push(materia);
  await curso.save();
  console.log(`Matéria ${materia} adicionada ao período ${periodo} do curso ${nomeCurso}!`);
}

module.exports = new cursoController();