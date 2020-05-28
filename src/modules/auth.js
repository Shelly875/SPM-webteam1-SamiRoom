const firebase_auth = require('@firebase/auth');

function isLogged() {
  return false;
}

function isLandlord() {
  true;
}

function auth(id, password) {

}

function register(email, password) {
  firebase_auth.createUserWithEmailAndPassword(email, password);
}

function passwordComplexitriy(password) {

}

module.exports = {
  isLogged,

};
