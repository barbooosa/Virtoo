const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cadastroController = require('../src/app/controllers/cadastroController.js');
const {dbconnect} = require('../src/database/db.js');
const loginController = require('../src/app/controllers/loginController.js');
const inicioController = require('../src/app/controllers/inicioController.js');
const calendarioController = require('./app/controllers/calendarioController.js');
const turmaController = require('./app/controllers/turmaController.js');
const editarController = require ('./app/controllers/editarController.js');
const notasController = require('./app/controllers/notasController.js');
const {checkToken} = require('./app/controllers/tokenController.js')
const cursoController = require('./app/controllers/cursoController.js')
// const materiaController = require('./app/controllers/materiaController.js')

const port = 3200;
const jwt = require('jsonwebtoken');
const tokenController = require('./app/controllers/tokenController.js');
const app = express();
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS
 
app.use(express.json());
app.set('view engine', 'ejs'); // Configura o mecanismo de visualização como ejs
app.set('views', path.join(__dirname, 'views')); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secretpass', resave: true, saveUninitialized: true }));
 

////////////////// LOGIN //////////////
app.get('/inicio', loginController.loginpage);

app.get('/', inicioController.inicio);
  
app.post('/login',checkToken, loginController.login);

app.get('/aluno/profile', loginController.loginpage);

app.post("/cadastro/turma", turmaController.turma)
 
 
//deleta um usuario do banco de dados
app.delete("/:id", async (req,res)=>{
    const login = await login.findByIdAndDelete(req.params.id)
    return res.send(login)
})
////////////////// CADASTRAR ALUNO /////
app.get('/cadastroals', (req, res) => {
    res.render('cadastro', { error: null });
  });
 
// Adiciona um aluno novo no banco de dados
app.post('/cadastroals', cadastroController.storeals);
 
////////////////// CADASTRAR PROFESSOR //
app.get('/cadastroprs', (req, res) => {
  res.render('cadastro', { error: null });
});
// Adiciona um professor novo no banco de dados
app.post('/cadastroprs', cadastroController.storeprs);

////////////////// LOGADO ////////////////
app.get("/logado", async (req,res)=>{
    res.render("login deu certo")
})

///////////////////CALENDARIO///////////////////////
app.get('/calendario', (req, res) => {
  res.render('calendario', { calendarData: null });
});

app.get( '/calendario', calendarioController.calendario);

/////////////////// EDITAR USUARIO///////////////////////
app.get('/editar/:id', editarController.getEditar);

app.post('/editar/:id', editarController.postEditar);

/////////////////// EDITAR NOTAS/////////////////////////////////////

app.post('/notas/:id', notasController.postNota); 
// app.get('/notas/:ciclo', notasController.postEditarNota); 



// app.get('/curso',materiaController.curso);

// app.post('/cadastrar-curso', materiaController.materias)

// app.get('/editar/curso/:id/:periodoId',materiaController.telaEditarCurso )

// app.post('/editar/curso/:id/:periodoId',materiaController.editarCurso)

/////////////////////

app.post('/curso', cursoController.criarCurso);

app.post('/curso/materia', cursoController.criarMateria);

app.get('/curso/:nome', cursoController.consultarCurso);

 
//Servidor rodando(confirmação) ...
app.listen(port,(req,res)=>{
    mongoose.connect(dbconnect)
    console.log('conectado ao banco de dados')
    console.log('ta rodando')
});