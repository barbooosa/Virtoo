
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const mongoURI = ('mongodb+srv://admin:tBQIKCyTroUHg9SG@virtoo.degggre.mongodb.net/')
const jwt = require('jsonwebtoken') 
class loginController{
    async loginpage (req, res, checkToken) {
        // Certificar que req.session e req.session.cpf estão definidos
        if (req.session && req.session.cpf) {
          res.render('inicio', { cpf: req.session.cpf });
        } else {
          res.redirect('/');
        }
      }
    async login(req, res){
        const { user, senha } = req.body;
        const secret = process.env.SECRET
        
 
        if(!user){
          return res.status(422).json({msg:"O usuário é obrigatorio"})
        }
        if(!senha){
          return res.status(422).json({msg:"A senha é obrigatorio"})
        }

        try {
          const client = await MongoClient.connect(mongoURI);
          const db = client.db();
      
          // Tentar encontrar o usuário em loginprs
          const collectionLoginPrs = db.collection('loginprs');
          const userRecordPrs = await collectionLoginPrs.findOne({ user });
      
          if (userRecordPrs && await bcrypt.compare(senha, userRecordPrs.senha)) {
            req.session.user = userRecordPrs.user;
            console.log("LOGADO COM SUCESSO(loginprs)", token);
            res.redirect('inicio');
            return; // Encerrar a execução aqui se o login for bem-sucedido
          }
      
          // Se o usuário não foi encontrado em loginprs, tentar em loginals
          const collectionLoginals = db.collection('loginals');
          const userRecordLoginals = await collectionLoginals.findOne({ user });
      
          if (userRecordLoginals && await bcrypt.compare(senha, userRecordLoginals.senha)) {
            req.session.user = userRecordLoginals.user;
            console.log("LOGADO COM SUCESSO (loginals)", token);
            res.redirect('inicio');
            return; // Encerrar a execução aqui se o login for bem-sucedido
          }
          const token = jwt.sign(
            {
              id: userRecordPrs ? userRecordPrs.id : userRecordLoginals.id,
            },
            secret,
          );
          res.status(200).json({ msg: " Logado com sucesso" }).cookie('token', token, { httpOnly: true });

       
          // Se nenhum usuário foi encontrado
          res.render('login', { error: 'Credenciais inválidas' });
          console.log("LOGADO SEM SUCESSO");

          
      
          client.close();
        } catch (err) {
          console.error('Erro ao consultar o banco de dados:', err);
          res.status(500).render('error', { message: 'Erro interno do servidor' });
        }
      }

  
}

module.exports = new loginController()