const express = require('express');
const app = express.Router();
const { loginals, loginprs } = require('../../database/db.js');

class EditarController {
    async getEditar(req, res) {
        try {
            const id = req.params.id;

            const registroLoginals = await loginals.findById(id);
            const registroLoginprs = await loginprs.findById(id);

            if (registroLoginals) {
                return res.render('editar', { registro: registroLoginals, tabela: 'loginals' });
            } else if (registroLoginprs) {
                return res.render('editar', { registro: registroLoginprs, tabela: 'loginprs' });
            } else {
                return res.status(404).send('Registro não encontrado em ambas as coleções');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro interno do servidor');
        }
    }

    async postEditar(req, res) {
        try {
            const id = req.params.id;

            const registroLoginals = await loginals.findByIdAndUpdate(id, req.body);
            const registroLoginprs = await loginprs.findByIdAndUpdate(id, req.body);

            if (registroLoginals) {
                return res.redirect('/'); // Redirecionar para a página principal ou outra após a edição
            } else if (registroLoginprs) {
                return res.redirect('/'); // Redirecionar para a página principal ou outra após a edição
            } else {
                return res.status(404).send('Registro não encontrado em ambas as coleções');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('Erro interno do servidor');
        }
    }
}

module.exports = new EditarController();
