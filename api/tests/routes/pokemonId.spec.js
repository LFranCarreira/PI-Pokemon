const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app.js');

describe('GET /pokemons/:idPokemon', () => {
  it('should respond with status 200 when a valid ID is provided', (done) => {
    request(app)
      .get('/pokemons/1')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should respond with status 200 when a valid large ID is provided', (done) => {
    request(app)
      .get('/pokemons/1000')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should respond with status 404 when an invalid ID is provided', (done) => {
    request(app).get('/pokemons/1020').expect(404, done);
  });
});
