const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const pokemons=require("./pokemons")
const type=require("./type")

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/",pokemons)
router.use("/",type)

module.exports = router;
