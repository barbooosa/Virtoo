const jwt = require('jsonwebtoken');
class tokenjwt {
  checkToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({msg:"Não permitido!"})
    }
    
    try{
        const secret = process.env.SECRET
        jwt.verify(token,secret)
        next()
    }catch{
        res.status(400).json({msg:"Token inválido"})
    }
}
}

module.exports = new tokenjwt();