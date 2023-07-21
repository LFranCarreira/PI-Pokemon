const { Router } = require("express");
const router = Router();
const { getPokemonId }=require("../handlers/getPokemonId")
const { getPokemonByName } = require("../controllers/getPokemonByName");
const { postPokemon } = require("../handlers/postPokemon");
const { getAllPokemons } = require("../handlers/getPokemons");

router.get("/pokemons",getAllPokemons)
router.get("/pokemons/:idPokemon",getPokemonId)
router.get('/pokemons/name?="..."',getPokemonByName)
router.post("/pokemons",postPokemon)

module.exports = router;