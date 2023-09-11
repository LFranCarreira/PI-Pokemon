const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app.js'); 
describe('GET /pokemons', () => {
    it('should respond with status 200 and data when a valid Pokemon name is provided', (done) => {
      request(app)
        .get('/pokemons/pikachu')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  
    it('should respond with status 404 when an invalid Pokemon name is provided', (done) => {
      request(app)
        .get('/pokemons/tatata')
        .expect(404, done);
    });
  });