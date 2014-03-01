/* Tester for App */

var clientenv = require('../helpers/helper.spec.js'),
    should = require('should'),
    sinon = require('sinon');

describe('userModel', function() {

  var User;

  beforeEach(function(done) {
    clientenv.setup(function() {
      UserModel = require(appDir + 'users/userModel.js');
      fbStub = sinon.stub(global, 'Firebase', function(fbRef, callback) {
        // callback();
      });
      loginStub = sinon.stub(global, 'FirebaseSimpleLogin');

      done();
    });
  });

  afterEach(function() {
    fbStub.restore();
    loginStub.restore();
  });

  describe('loads the model', function() {
    it('without errors', function() {
      should.exist(UserModel);

      userModel = new UserModel();
      should.exist(userModel);
    });
  });

  describe('connects to Firebase', function() {
    it('loads Firebase with a URL', function() {
      app.fbUrl = 'http://blah.com';
      
      fbStub.calledOnce.should.be.false;
      userModel = new UserModel();

      fbStub.calledOnce.should.be.true;
      fbStub.getCall(0).args[0].should.equal(app.fbUrl);  // Firebsae has been called w/ URL
    });

    it('loads Firebase-Simple-Login', function() {
      loginStub.calledOnce.should.be.false;
      userModel = new UserModel();
      loginStub.calledOnce.should.be.true;  // Auth has been called
    });

  });

  describe('User signed out', function() {
    it('User can login', function() {
    });
  });

  describe('User signed in', function() {
    it('Should remain logged in', function() {
      userModel = new UserModel();
      // console.log(userModel);
      // loginStub.expects(getCall(0)).returns()
    });

    it('User can log out', function() {
    });
  });
});

