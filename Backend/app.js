const express = require('express');
const app = express();
const cors = require('cors');
const { registrarUsuario, loguearUsuario, obtenerUsuario } = require('./controllers/softJobsControllers.js');
const { verificarTokenMiddleware, verificarCredencialesMiddleware } = require('./middlewares/middlewares.js');

app.listen(3000,console.log("Servidor corriendo en puerto 3000"));
app.use(cors());
app.use(express.json());
app.use((req,res,next) =>{
    console.log(`Ruta de consulta:${req.path}, con el metodo: ${req.method}`);
    next();
})

app.post("/login",verificarCredencialesMiddleware, async(req,res)=>{
    await loguearUsuario(req,res);
});
app.post("/usuarios",async (req,res)=>{
    await registrarUsuario(req,res);
});

app.get("/usuarios", verificarTokenMiddleware, async (req,res)=>{
    await obtenerUsuario(req,res);
});