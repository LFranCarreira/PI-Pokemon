const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app.js'); // Update the path if needed

describe('GET /types', () => {
  it('should respond with status 200 and an array of 20 types, each having the "Name" property', (done) => {
    request(app)
      .get('/types')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.equal(20); // Assuming you expect exactly 20 types
        res.body.forEach((type) => {
          expect(type).to.have.property('Name').that.is.an('string');
          // Add more assertions as per your response structure
        });
        done();
      });
  });
});
