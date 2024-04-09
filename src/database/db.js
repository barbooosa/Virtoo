const mongoose = require("mongoose");

// Define a tabela de aluno
const loginalsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
        nullok: false
    },
    birthday: {
        type: String,
        required: true,
        index: true,
        nullok: false
    },
    user: {
        type: String,
        required: true,
        unique: true,
        nullok: false
    },
    senha: {
        type: String,
        required: true,
        unique: true,
        nullok: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        nullok: false
    },
    fone: {
        type: String,
        required: true,
        unique: true,
        index: true,
        nullok: false
    },
    endereco: {
        type: String,
        required: true,
        nullok: false
    },
    matricu: {
        type: String,
        required: true,
        unique: true,
        nullok: false
    },
    curso: {
        type: String,
        required: true,
        index: true,
        nullok: false,
    },
    periodo: {
        type: String,
        required: true,
        nullok: false,
    },
    turno: {
        type: String,
        required: true,
        unique: false,
        index: true,
        nullok: false, // permite o campo ser vazio
    },
    data: {
        type: String,
        required: true,
        index: true,
        nullok: false,
    },
    hora: {
        type: String,
        required: true,
        index: true,
        nullok: false,
    }
});
// Define a tabela de professor
const loginprsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    sex: {
        type: String,
        required: true,
        index: true,
    },
    estadocivil: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fone: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    endereco: {
        type: String,
        required: true,
    },
    materia: {
        type: String,
        required: true,
        index: true,
    },
    turno: {
        type: String,
        required: true,
        unique: false,
        index: true,
    },
    numberidentify: {
        type: String,
        required: true,
        unique: true,
    },
    data: {
        type: String,
        required: true,
        index: true,
        nullok: false,
    },  
    hora: {
        type: String,
        required: true,
        index: true,
        nullok: false,
    },
    cargo: {
        type: String,
        required: true,
        index: true,
        nullok: false,
    }
});

const turmaSchema = new mongoose.Schema({
    nomeMat: {
        type: String,
        required: true,
        index: true,                                                                                                                                                                
    },
    profResp: {
        type: String,
        required: true,
        index: true,
    },
    numMatricu: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    numVagas: {         
        type: String,
        required: true,
        index: true,
    },
    cargaHoraria: {
        type: String,
        required: true,
        index: true,
    },
    info: {
        type: String,
        required: true,
        index: true,
    },

});    

const notasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    user: {
        type: String,
        required: true,
        index: true,
    },
    materia: {
        type: String,
        required: true,
        index: true,
    },
    periodo : {
        type: String,
        required: true,
        index: true,
    },
    ciclo1: {
        type: String,
        required: true,
        index: true,
    },
    ciclo2: {
        type: String,
        required: true,
        index: true,
    },
    ciclo3: {
        type: String,
        required: true,
        index: true,
    },
    total: {
        type: String,
        required: true,
        index: true,
    },
})
// Definição do esquema para as matérias
const materiaSchema = new mongoose.Schema({
    nome: String,
    curso: {
        type: String,
        required: true,
        index: true,
    },
    periodo: {
        type: Number,
        required: true
    }
});

const CursoSchema = new mongoose.Schema({
    nome: String,
    periodos: [{
      numero: Number,
      materias: [String]
    }]
  });
  



// // Função para criar matérias
// async function criarMaterias(nomeMateria, curso, numeroPeriodo) {
//     const materia = new Materia({
//         nome: nomeMateria,
//         curso: curso,
//         periodo: numeroPeriodo
//     });
//     await materia.save();
//     console.log(`Matéria ${nomeMateria} criada com sucesso no período ${numeroPeriodo} do curso ${curso}.`);
// }
// Informações Banco de Dados
const loginprs = mongoose.model('loginprs', loginprsSchema);
const loginals = mongoose.model('loginals', loginalsSchema);
const turma = mongoose.model('turma', turmaSchema);
const Materia = mongoose.model('Materia', materiaSchema);
const Curso = mongoose.model('Curso', CursoSchema);
const notas = mongoose.model('nota', notasSchema);
// const Curso = mongoose.model('Curso', cursoSchema);
const dbconnect = ('mongodb+srv://admin:tBQIKCyTroUHg9SG@virtoo.degggre.mongodb.net/')
const mongoURI =  ('mongodb+srv://admin:tBQIKCyTroUHg9SG@virtoo.degggre.mongodb.net/')

// Exportar tabelas
module.exports = { loginprs, loginals, turma, notas, dbconnect, mongoURI, Materia, Curso}; 


// // Definição do esquema para as matérias
// const materiaSchema = new mongoose.Schema({
//     nome: String,
//     curso: {
//         type: String,
//         required: true,
//         index: true,
//     },
//     periodo: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Periodo'
//     }
// });

// // Definição do esquema para os períodos
// const periodoSchema = new mongoose.Schema({
//     numero: Number,
// });


async function criarCurso(nome, numPeriodos) {
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
      return;
    }
    periodoObj.materias.push(materia);
    await curso.save();
    console.log(`Matéria ${materia} adicionada ao período ${periodo} do curso ${nomeCurso}!`);
  }
