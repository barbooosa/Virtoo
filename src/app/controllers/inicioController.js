class inicioController{
    inicio(req, res){
        res.render('login', { error: null });
      }
}

module.exports = new inicioController()