// //Notas
const { notas } = require('../../database/db.js');
// const { MongoClient } = require('mongodb'); 
// const { mongoURI } = require('../../database/db.js');


class notasController {
    async postNota(req, res) {
        try {
            const id = req.params.id;

            // Obter os valores atuais do banco de dados
            const notaAtual = await notas.findById(id);

            if (!notaAtual) {
                return res.status(404).send('Registro não encontrado');
            }

            // Obter os valores atuais ou do corpo da requisição
            const ciclo1 = parseFloat(req.body.ciclo1 || notaAtual.ciclo1);
            const ciclo2 = parseFloat(req.body.ciclo2 || notaAtual.ciclo2);
            const ciclo3 = parseFloat(req.body.ciclo3 || notaAtual.ciclo3);

            const total = ((ciclo1 + ciclo2 + ciclo3) / 3).toFixed(1);

            // Atualizar o documento com os novos valores e calcular a média
            const notaAtualizada = await notas.findOneAndUpdate(
                { _id: id },
                {
                    ciclo1,
                    ciclo2,
                    ciclo3,
                    total,
                },
                { new: true } // Retorna o documento atualizado
            );

            if (notaAtualizada) {
                console.log('Nota atualizada com sucesso:', notaAtualizada);
                return res.redirect('/');
            } else {
                return res.status(500).send('Erro ao atualizar nota');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro interno do servidor');
        }
    }
}


module.exports = new notasController();