const mongoURI = require('../../database/db.js')
const { MongoClient } = require('mongodb');

class turmaController{
    async turma  (req,res){
        const {nomeMat , profResp , numMatricu , numVagas, cargaHoraria , info} = req.body
    
        try {
            const client = await MongoClient.connect(mongoURI);
            const db = client.db();
            const collection = db.collection('turmas');
            await collection.insertOne({ nomeMat , profResp , numMatricu , numVagas, cargaHoraria , info});
            res.redirect('/cadastro/turma')    
            client.close();
    
        }
        catch (err) {
        console.error('Erro ao consultar o banco de dados:', err);
    
        // Se o erro for relacionado ao índice único, trate o caso
        if (err.code === 11000) {
            res.render('cadastro', { error: 'Turma já existe' });
        } else {
            res.status(500).send('Erro interno do servidor');
        }
        }
        console.log(req.body)
    }

    
}

module.exports = new turmaController()
function generateRandomMatricula() {
    const maxMatricula = 9999999; // Máximo de 7 dígitos
    const minMatricula = 1000000; // Mínimo de 7 dígitos (para garantir que tenha pelo menos 6 dígitos)
  
    const matricula = Math.floor(minMatricula + Math.random() * (maxMatricula - minMatricula + 1));
  
    return matricula;
  }
  
  const matricu = generateRandomMatricula();
  

