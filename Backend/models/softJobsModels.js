const pool = require('../db/server.js');
const bcrypt =require('bcryptjs');

const verificarCredenciales= async(email,password)=>{
    const values = [email];
    const consulta = "SELECT * FROM usuarios WHERE email = $1";
    const {rows:[usuario],rowCount} = await pool.query(consulta,values);
    const {password: passwordEncriptada}=usuario;
    const passwordEsCorrecta = bcrypt.compareSync(password,passwordEncriptada);
    if(!passwordEsCorrecta) throw {code:401, message: "Credenciales incorrectas"};
}

const registrarUsuarioDB = async(usuario) =>{
    let {email,password,rol,lenguage} =usuario;
    const passwordEncriptada = bcrypt.hashSync(password);
    password = passwordEncriptada;
    const values = [email,passwordEncriptada,rol,lenguage];
    const consulta = "INSERT INTO usuarios values (DEFAULT, $1,$2,$3,$4)";
    await pool.query(consulta,values);
}
const obtenerUsuarioDB = async(email) => {
    const consulta = "SELECT email, rol, lenguage FROM usuarios WHERE email = $1";
    const values = [email];
    const {rows: [usuario], rowCount} = await pool.query(consulta, values);
    if(!rowCount) throw { code: 404, message: "No se encontro este usuario" }
    return usuario;
}
module.exports = {
    verificarCredenciales,
    registrarUsuarioDB,
    obtenerUsuarioDB
}