const jwt = require('jsonwebtoken');
const {verificarCredenciales,registrarUsuarioDB, obtenerUsuarioDB} = require('../models/softJobsModels.js');

const loguearUsuario = async(req,res) =>{
    try {
        const {email,password} = req.body;
        await verificarCredenciales(email,password);
        const token = jwt.sign({email},"Sft-Jbs",{expiresIn:120});
        res.send({token});
    } catch (error) {
        res.status(error.code || 500).send(error);
    }
}

const registrarUsuario = async(req,res) =>{
    try {
        const usuario = req.body;
        await registrarUsuarioDB(usuario);
        res.send("Usuario creado con éxito");
        console.log("Registrado con exito");
    } catch (error) {
        res.status(500).send(error);
        console.log("No se pudo registrar");
    }

}

const obtenerUsuario = async (req,res)=>{
    try {
        const usuario = await obtenerUsuarioDB(req.email);
        res.send(usuario);
    } catch (error) {
        res.status(500).send(error);
    }
}
module.exports={
    registrarUsuario,
    loguearUsuario,
    obtenerUsuario
}