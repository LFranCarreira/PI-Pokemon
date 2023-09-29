/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemons, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  Name: 'Pikachu',
  Image: 'pikachu.jpg',
  Health: 100,
  Attack: 50,
  Defense: 30,
  Height: 151,
  Speed: 121,
  Weight: 181,
  Types: ['shadow', 'dark'],
};

describe('Pokemon routes', () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error('Unable to connect to the database:', err);
    })
  );
  beforeEach(() =>
    Pokemons.sync({ force: true }).then(() => Pokemons.create(pokemon))
  );
  describe('GET /pokemons', () => {
    it('should get 200', () => agent.get('/pokemons').expect(200));
  });
});
describe('GET /pokemons/:idPokemon', () => {
  it('should get 200', async () => await agent.get('/pokemons/1').expect(200));
  it('response should be an object with the pokemon stats', async () => {
    const response = await agent.get('/pokemons/1');
    expect(response.body).to.have.property('ID');
    expect(response.body).to.have.property('Name');
    expect(response.body).to.have.property('Image');
    expect(response.body).to.have.property('Health');
    expect(response.body).to.have.property('Attack');
    expect(response.body).to.have.property('Defense');
    expect(response.body).to.have.property('Speed');
    expect(response.body).to.have.property('Height');
    expect(response.body).to.have.property('Weight');
    expect(response.body).to.have.property('Types');
  });
});

describe("GET /pokemons?name=pokemon'", () => {
  it('should get 200', async () => {
    await agent.get('/pokemons?name=iron-leaves').expect(200);
  });
  it('response of an object with the pokemon properties', async () => {
    const response = await agent.get('/pokemons?name=iron-leaves');
    expect(response.body).to.have.property('ID');
    expect(response.body).to.have.property('Name');
    expect(response.body).to.have.property('Image');
    expect(response.body).to.have.property('Health');
    expect(response.body).to.have.property('Types');
  });
  it('error if the pokemon not found', async () => {
    const response = await agent.get('/pokemons?name=lalalasasañaxs');
    expect(response.status).to.deep.equal(404);
  });
});
