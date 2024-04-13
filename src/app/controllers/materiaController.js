// const mongoose = require("mongoose");
// const materiaSchema = new mongoose.Schema({
//     curso: String,
//     materias: [{    
//       periodoLista:[{
//         periodo: Number,
//         materiasLista: [{
//             nome: String,
//         }]
//     }]
// }]
// }); 
// const Materia = mongoose.model('Materia', materiaSchema);

// class materiaController{
//     async materias (req, res){
//         const { curso, periodo, materias } = req.body;
      
//         try {
//           const cursoExistente = await Materia.findOne({ curso });
      
//           if (cursoExistente) {
//             // Adiciona um novo período à matéria existente
//             cursoExistente.materias.push({
//               periodoLista: [{
//                 periodo,
//                 materiasLista: materias,
//               }],
//             });
      
//             await cursoExistente.save();
//             res.redirect('/curso');
//           } else {
//             // Cria uma nova matéria com o primeiro período
//             const novaMateria = new Materia({
//               curso,
//               materias: [{
//                 periodoLista: [{
//                   periodo,
//                   materiasLista: materias,
//                 }],
//               }],
//             });
      
//             await novaMateria.save();
//             res.redirect('/curso');
//           }
//         } catch (error) {
//           console.error('Erro ao adicionar matéria:', error);
//           res.status(500).json({ error: 'Erro ao adicionar matéria' });
//         }
//       }

//     async curso (req, res){
//         try {
//           const cursos = await Materia.find();
//           res.render('cursos', { cursos });
//         } catch (error) {
//           console.error('Erro ao obter cursos:', error);
//           res.status(500).json({ error: 'Erro ao obter cursos' });
//         }
//       }

//     async telaEditarCurso (req, res) {
//         try {
//           const cursoId = req.params.id;
//           const periodoId = req.params.periodoId;
      
//           console.log('ID do Curso:', cursoId);
//           console.log('ID do Período:', periodoId);
      
//           const curso = await Materia.findById(cursoId);
      
//           if (!curso) {
//             return res.status(404).send('Curso não encontrado');
//           }
      
//           console.log('Curso:', curso);
      
//           if (!curso.materias || !Array.isArray(curso.materias) || curso.materias.length === 0) {
//             console.error('Matérias não encontradas ou estão vazias.');
//             return res.status(404).send('Matérias não encontradas ou estão vazias.');
//           }
      
//           const periodoEditar = curso.materias[0].periodoLista.find(periodo => periodo._id.toString() === periodoId.toString());
      
//           if (!periodoEditar) {
//             console.error('Período não encontrado:', periodoId);
//             return res.status(404).send('Período não encontrado');
//           }
      
//           res.render('editar-materia', { curso, periodoEditar });
//         } catch (error) {
//           console.error('Erro ao obter curso para edição:', error);
//           res.status(500).json({ error: 'Erro ao obter curso para edição' });
//         }
//       }

//     async editarCurso(req, res)  {
//         try {
//           const cursoId = req.params.id;
//           const periodoId = req.params.periodoId;
//           const { materiasLista } = req.body;
      
//           console.log('ID do Curso:', cursoId);
//           console.log('ID do Período:', periodoId);
//           console.log('Materias a serem atualizadas:', materiasLista);
      
//           const curso = await Materia.findById(cursoId);
      
//           if (!curso) {
//             return res.status(404).send('Curso não encontrado');
//           }
      
//           const periodoEditar = curso.materias.find(periodo => periodo._id.toString() === periodoId.toString());
      
//           if (!periodoEditar) {
//             console.error('Período não encontrado:', periodoId);
//             return res.status(404).send('Período não encontrado');
//           }
      
//           // Atualizar as matérias do período
//           periodoEditar.materiasLista = materiasLista;
      
//           await curso.save();
//           res.redirect('/curso');
//         } catch (error) {
//           console.error('Erro ao editar curso:', error);
//           res.status(500).json({ error: 'Erro ao editar curso' });
//         }}
// }
 
// module.exports = new materiaController()