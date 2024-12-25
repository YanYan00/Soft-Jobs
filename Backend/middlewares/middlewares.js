const jwt = require('jsonwebtoken');

const verificarTokenMiddleware = (req,res,next)=>{
    try {
        const Authorization = req.header("Authorization");
        if(!Authorization){
            return res.status(401).json({message: "Token no proporcionado"});
        }
        const token = Authorization.split("Bearer ")[1];
        jwt.verify(token,"Sft-Jbs");
        const { email } = jwt.decode(token);
        req.email = email;
        next();
    } catch (error) {
        res.status(500).send(error);
    }
}
const verificarCredencialesMiddleware = (req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(401).json({message: "Credenciales incompletas"})
    }
    next();
}
module.exports ={
    verificarTokenMiddleware,
    verificarCredencialesMiddleware
}