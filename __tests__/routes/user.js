'use strict';

var request = require('supertest');

describe('user routes', function() {

  var url = 'http://localhost:3000';

  it('should retrieve a single user', function(done) {
    request(url)
    .get('/api/user/1')
    .end(function(err, res) {
      res.status.should.be.equal(200);
      res.body.should.have.property('email');
      res.body.should.have.property('firstName');
      res.body.should.have.property('lastName');
      done();
    });
  });

});