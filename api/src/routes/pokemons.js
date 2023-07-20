const { Router } = require("express");
const router = Router();
const { getPokemons } = require("../controllers/getPokemons");
const { getPokemonById } = require("../controllers/getPokemonById");
const { getPokemonByName } = require("../controllers/getPokemonByName");
const { postPokemon } = require("../handlers/postPokemon");

router.get("/pokemons",getPokemons)
router.get("/pokemons/:idPokemon",getPokemonById)
router.get('/pokemons/name?="..."',getPokemonByName)
router.post("/pokemons",postPokemon)

module.exports = router;