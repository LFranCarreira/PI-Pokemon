const {Pokemons,Type}=require("../db")

const newPokemon = async function (id,name,image,health,attack,defense,speed,height,weight,typeOne, typeTwo){
  const newPokemon = await Pokemons.create({id,name,image,health,attack,defense,speed,height,weight});
  const types = [ typeOne, typeTwo === null || typeTwo === undefined ? '' : typeTwo ]
  for (const type of types) {
    const eachType = await Type.findOne({
        where: {name: type}
    })
await newPokemon.addType(eachType)
}
return newPokemon
};

module.exports = newPokemon;