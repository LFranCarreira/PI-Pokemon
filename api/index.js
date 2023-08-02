const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { Type } = require("./src/db.js")
// Syncing all the models at once.

//get all the types in order to create a pokemon without searching the types before
const preLoadTypes = async () => {
  const types = await fetch("https://pokeapi.co/api/v2/type")
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => {
      throw Error(error.message);
    });
  types.results.forEach((type) => {
    Type.findOrCreate({
      where: { Name: type.name},
    });
  });
};
conn
  .sync({ force: true })
  .then(() => {
    server.listen(3001, async() => {
      try {
        await preLoadTypes();
      } catch (error) {
        console.log(error);
      }
      console.log(`Server raised in port: http://localhost:3001`);
      
    });
  })
  .catch((error) => console.log(error.message));
