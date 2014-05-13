var chai = require('chai')
  , Strategy = require('../lib/strategy');


describe('Strategy', function() {

  describe('handling a request with a custom token filed', function() {
    var strategy = new Strategy({ field: 'user_access_token' }, function(token, done) {
      if (token == 'vF9dft4qmT') {
        return done(null, { id: '1234' }, { scope: 'read' });
      }
      return done(null, false);
    });

    describe('handling a request with valid token', function() {
      var user
        , info;

      before(function(done) {
        chai.passport(strategy)
          .success(function(u, i) {
            user = u;
            info = i;
            done();
          })
          .req(function(req) {
            req.body = {};
            req.body.user_access_token = 'vF9dft4qmT';
          })
          .authenticate();
      });

      it('should supply user', function() {
        expect(user).to.be.an.object;
        expect(user.id).to.equal('1234');
      });

      it('should supply info', function() {
        expect(info).to.be.an.object;
        expect(info.scope).to.equal('read');
      });
    });
  });

});
