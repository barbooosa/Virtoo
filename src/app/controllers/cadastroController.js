const mongoURI = ('mongodb+srv://admin:<password>@virtoo.degggre.mongodb.net/')
const { MongoClient } = require('mongodb');
const verificarCPF = require('validador-de-cpf')
const bcrypt = require('bcrypt');
const moment = require('moment');



class cadastroController{

    async storeals (req, res)   {       //CADASTRO DE ALUNO
        const { name, birthday , cpf  , email , fone , endereco, curso, periodo , turno } = req.body;
        
        try{
          const client = await MongoClient.connect(mongoURI);
          const db = client.db();
          const collection = db.collection('loginals');
      

          const notasCollection = db.collection('notas');
          
          // Verifica se o usuário já existe
          const existingCpf = await collection.findOne({ cpf });
          
          if (!(email.includes('@') && email.includes('.com'))) {
            res.render('cadastro.ejs', { error: 'Email invalido' });
          } else {
            // continua o codigo
            if (existingCpf) {
              res.render('cadastro.ejs', { error: 'Usuário já existe' });
            } if (validarCpf == false) {
              res.render('cadastro.ejs', { error: 'CPF invalido' });
            } else {
              // Cria um novo usuário
              // Gerar automaticamente a senha a partir dos 9 primeiros dígitos do CPF
              let user = cpf.replace(/[.,;-]/g, "");
              const senha = user.slice(0, 9);

              const dataHoraAtual = moment() //pega a data e hora atual
              const data = dataHoraAtual.format('DD/MM/YYYY') //formata a data
              const hora = dataHoraAtual.format('HH:mm')//formata a hora

              const matricu = await generateRandomMatricula(collection);

              var hashedPassword = bcrypt.hashSync(senha, 10);
              await collection.insertOne({ name, birthday , user , senha: hashedPassword , email , fone , endereco, matricu, curso, periodo , turno, data, hora });
              const ciclo1 = "00" //adciona a notas com valor default
              const ciclo2 = "00"
              const ciclo3 = "00"
              const total = (ciclo1 + ciclo2 + ciclo3) / 3 //já adciona o total das notas
  
              await notasCollection.insertOne({ name, user,periodo, ciclo1, ciclo2 , ciclo3, total }); //adciona o nome, user, periodo e notas na tabela de notas
              res.redirect('/');
            }
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
      }
    async storeprs(req, res) {       //CADASTRO DE PROFESSOR    
        const { name, sex , estadocivil, birthday, cpf, email, fone, endereco, materia, turno } = req.body;
      
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
            let user = cpf.replace(/[.,;-]/g, "");
            const senha = user.slice(0, 9);
            var hashedPassword = bcrypt.hashSync(senha, 10);

            const dataHoraAtual = moment() //pega a data e hora atual
            const data = dataHoraAtual.format('DD/MM/YYYY') //formata a data
            const hora = dataHoraAtual.format('HH:mm')//formata a hora

            const numberidentify = await generateRandomMatricula(collection);
            const cargo = "Professor(a)";
            await collection.insertOne({ name, sex , estadocivil, birthday, user, senha: hashedPassword, email, fone, endereco, materia, turno, numberidentify, data, hora,cargo});

            res.redirect('/');
          } client.close();
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
      }
    update(){}
    delete(){}
   
}

async function isMatriculaExists(matricula, collection) {
  const existingMatricula = await collection.findOne({ matricu: matricula });
  return existingMatricula !== null;
}

async function generateRandomMatricula(collection) {
  const maxMatricula = 9999999; // Máximo de 7 dígitos
  const minMatricula = 1000000; // Mínimo de 7 dígitos

  let matricula;
  let isDuplicate = true;

  while (isDuplicate) {
    matricula = Math.floor(minMatricula + Math.random() * (maxMatricula - minMatricula + 1));
    isDuplicate = await isMatriculaExists(matricula, collection);
  }

  return matricula;
}
module.exports = new cadastroController();