const express = require('express');
const { google } = require('googleapis');
const session = require('express-session');
const { MongoClient } = require('mongodb');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const verificarCPF = require('validador-de-cpf')
// const { CLIENT_ID ,CLIENT_SECRET ,REDIRECT_URL } = require('./id.env')
// // import env from "./ev";

// // dotenv.config({});

//cria a tabela login do Aluno
const loginals = mongoose.model('loginals',{
  name:{
      type:String,
      required:true,
      unique:true,
      index:true,
      nullok: false
  },
  birthday:{
    type:String,
    required:true,
    index:true,
    nullok: false
  },
  cpf:{
      type:String,
      required:true,
      unique:true,
      nullok: false
  },
  email:{
      type:String,
      required:true,
      unique:true,
      nullok: false
  },
  fone:{
    type:String,
    required:true,
    unique:true,
    index:true,
    nullok: false
  },
  endereco:{
      type:String,
      required:true,
      nullok: false
  },
  matricu:{
      type:String,
      required:true,
      unique:true,
      nullok: false
  },
  curso:{
    type:String,
    required:true,
    index:true,
    nullok: false,
  },
  periodo:{
      type:String,
      required:true,
      nullok: false,
  },
  turno:{
      type:String,
      required:true,
      unique:false,
      index:true,
      nullok: false, // permite que o campo seja vazio
  },
});
  
//cria a tabela login dos Professores
const loginprs = mongoose.model('loginprs',{
name:{
  type:String,
  required:true,
  unique:true,
  index:true,
},
sex:{
  type:String,
  required:true,
  index:true,
},
estadocivil:{
    type:String,
    required:true,
},
birthday:{
  type:String,
  required:true,
  index:true,
},
cpf:{
    type:String,
    required:true,
    unique:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
fone:{
  type:String,
  required:true,
  unique:true,
  index:true,
},
endereco:{
    type:String,
    required:true,
},
materia:{
  type:String,
  required:true,
  index:true,
},
turno:{
    type:String,
    required:true,
    unique:false,
    index:true,

},
  numberidentify:{
    type:String,
    required:true,
    unique:true,
},

});





const port = 3200;
const app = express();

app.use(express.json());
app.set('view engine', 'ejs'); // Configura o mecanismo de visualização como ejs
app.set('views', path.join(__dirname, 'views')); // Especifique o diretório de visualizações, se necessário
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secretpass', resave: true, saveUninitialized: true }));


const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
// geral a url do calendario
const scopes = [
  'https://www.googleapis.com/auth/calendar'
];

////criar calendario
app.get("/calendario", (req, res) =>{
    const url = oauth2Client.generateAuthURL({
        acess_type : "offline",
        scope : scopes
    });

    res.redirect(url);
});

app.get('/calendario/redirect' , (req , res) =>{
    res.send("calendario on");
});
    


////////////////// LOGIN ////////////////////////////////////////////////////////////////////////////////




app.get('/inicio', (req, res) => {
    // Certificar que req.session e req.session.cpf estão definidos
    if (req.session && req.session.cpf) {
      res.render('inicio', { cpf: req.session.cpf });
    } else {
      res.redirect('/');
    }
  });


const mongoURI = 'mongodb+srv://admin:backvirtoo@virtoo.degggre.mongodb.net/?retryWrites=true&w=majority'

app.get('/', (req, res) => {
    res.render('login', { error: null });
  });
  
app.post("/login", async (req, res) => {
    const { cpf } = req.body;

    try {
        const client = await MongoClient.connect(mongoURI);
        const db = client.db();
        const collection = db.collection('loginals');
        const cpfRecord = await collection.findOne({ cpf });

        if (cpfRecord) {
            req.session = req.session || {};
            req.session.cpf = cpf;
           res.redirect('/inicio');
        } else {
            res.render('login', { error: 'Credenciais inválidas' });
        }

        client.close();
    } catch (err) {
        console.error('Erro ao consultar o banco de dados:', err);
        res.status(500).render(__dirname + '/views/error', { message: 'Erro interno do servidor' });
    }
    console.log(req.body)
    

});

app.post("/login", async (req, res) => {
  const { cpf, numberidentify } = req.body;

  try {
      const client = await MongoClient.connect(mongoURI);
      const db = client.db();
      const collection = db.collection('loginprs');
      const cpfRecord = await collection.findOne({ cpf });

      if (cpfRecord && await bcrypt.compare(numberidentify, cpfRecord.numberidentify)) {
          req.session = req.session || {};
          req.session.cpf = cpf;
         res.redirect('/inicio');
      } else {
          res.render('login', { error: 'Credenciais inválidas' });
      }

      client.close();
  } catch (err) {
      console.error('Erro ao consultar o banco de dados:', err);
      res.status(500).render(__dirname + '/views/error', { message: 'Erro interno do servidor' });
  }
  console.log(req.body)
  

});

 
  

//deleta um usuario do banco de dados
app.delete("/:id", async (req,res)=>{
    const login = await login.findByIdAndDelete(req.params.id)
    return res.send(login)
})



////////////////// CADASTRAR ALUNO //////////////////////////////////////////////////////////////////////////
app.get('/cadastroals', (req, res) => {
    res.render('cadastro', { error: null });
  });


 
// Adiciona um aluno novo no banco de dados
app.post('/cadastroals', async (req, res) => {
    const { name, birthday , cpf , email , fone , endereco, matricu, curso, periodo , turno } = req.body;
    
    try {
      const client = await MongoClient.connect(mongoURI);
      const db = client.db();
      const collection = db.collection('loginals');
  
      // Verifica se o usuário já existe
      const existingCpf = await collection.findOne({ cpf });
      
      //Verifica se o CPF é valido
      const validarCpf = verificarCPF(cpf);
  
      if (existingCpf) {
        res.render('cadastro', { error: 'Usuário já existe' });
      } if (validarCpf == false) {
        res.render('cadastro', { error: 'CPF invalido' });
      } else {
        // Cria um novo usuário
        const hashedMatricu = await bcrypt.hash(matricu, 10);
        await collection.insertOne({ name, birthday , cpf , email , fone , endereco, matricu: hashedMatricu , curso, periodo , turno });
        res.redirect('/');
      }
  
      client.close();
    } catch (err) {
      console.error('Erro ao consultar o banco de dados:', err);
  
      // Se o erro for relacionado ao índice único, trate o caso
      if (err.code === 11000) {
        res.render('cadastro', { error: 'Usuário já existe' });
      } else {
        res.status(500).send('Erro interno do servidor');
      }
    }
    console.log(req.body)
  });

// Adiciona um novo aluno no banco de dados
app.post("/cadastrarals", async (req,res)=>{
    const Login = new loginals({
        name : req.body.name,
        birthday : req.body.birthday,
        cpf : req.body.cpf,
        email : req.body.email,
        fone : req.body.fone,
        endereco : req.body.endereco,
        matricu : req.body.matricu,
        curso : req.body.curso,
        periodo : req.body.periodo,
        turno : req.body.turno,
    })

    await Login.save()
    return res.send(Login)
})


////////////////// CADASTRAR PROFESSOR //////////////////////////////////////////////////////////////////////////
app.get('/cadastroprs', (req, res) => {
  res.render('cadastro', { error: null });
});
// Adiciona um professor novo no banco de dados
app.post('/cadastroprs', async (req, res) => {
  const { name, sex , estadocivil, birthday, cpf, email, fone, endereco, materia, turno, numberidentify } = req.body;

  try {
    const client = await MongoClient.connect(mongoURI);
    const db = client.db();
    const collection = db.collection('loginprs');

    // Verifica se o usuário já existe
    const existingCpf = await collection.findOne({ cpf });

    //Verifica se o CPF é valido
    const validarCpf = verificarCPF(cpf);

    if (existingCpf) {
      res.render('cadastro', { error: 'Usuário já existe' });
    } if (validarCpf == false) {
      res.render('cadastro', { error: 'CPF inválido' });
    } else {
      // Cria um novo professor
      const hashedPassword = await bcrypt.hash(numberidentify, 10);
      await collection.insertOne({ name, sex , estadocivil, birthday, cpf, email, fone, endereco, materia, turno, numberidentify: hashedPassword});
      res.redirect('/');
    }

    client.close();
  } catch (err) {
    console.error('Erro ao consultar o banco de dados:', err);

    // Se o erro for relacionado ao índice único, trate o caso
    if (err.code === 11000) {
      res.render('cadastro', { error: 'Usuário já existe' });
    } else {
      res.status(500).send('Erro interno do servidor');
    }
  }
  console.log(req.body)
});


// Adiciona um novo professor no banco de dados
app.post("/cadastrarprs", async (req,res)=>{
  const Login = new loginals({
      name : req.body.name,
      sex : req.body.sex,
      estadocivil : req.body.estadocivil,
      birthday : req.body.birthday,
      cpf : req.body.cpf,
      email : req.body.email,
      fone : req.body.fone,
      endereco : req.body.endereco,
      materia : req.body.materia,
      turno : req.body.turno,
      numberidentify : req.body.numberidentify,
      
  })

  await Login.save()
  return res.send(Login)
})

////////////////// LOGADO //////////////////////////////////////////////////////////////////////////
 
app.get("/logado", async (req,res)=>{
    res.render("login deu certo")
})

/////////////////////////////////////////////////////////////////////////////////////////////////
//Servidor rodando(confirmação) ...
app.listen(port,(req,res)=>{
    mongoose.connect('mongodb+srv://admin:backvirtoo@virtoo.degggre.mongodb.net/?retryWrites=true&w=majority')
    console.log('conectado ao banco de dados')
    console.log('ta rodando')
})