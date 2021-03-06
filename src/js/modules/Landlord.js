/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const DB_REQ = require('firebase');
const APART = require('./Apartment');
const functions = require('../../modules/functions');


module.exports = class Landlord {
  constructor(id = 0, firstname = null, lastname = null, city = null, phone = 0, email = null,
    isPrivate = true, companyName = null, password = null, birthday = null) {
    this.id = id;
    this.firtsname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.city = city;
    this.isPrivate = isPrivate;
    this.password = password;
    this.companyName = companyName;
    this.birthday = birthday;
  }

  readLandFromDB(landlordDocNum) {
    // Initialize Cloud Firestore through Firebase
    if (DB_REQ.apps.length === 0) {
      DB_REQ.initializeApp({
        apiKey: 'AIzaSyAmHD6wCC5S0k4m_YRpByMBPxSKr8xMhec',
        authDomain: 'samiroomdb.firebaseio.com',
        projectId: 'samiroomdb',
      });
    }

    // Example: get data from firestore database
    const db = DB_REQ.firestore();
    const object = db.collection('Landlord').doc(landlordDocNum).get().then((doc) => {
      const newLandlord = new Landlord();
      newLandlord.id = doc.data().ID;
      newLandlord.firstname = doc.data().firstname;
      newLandlord.lastname = doc.data().lastname;
      newLandlord.phone = doc.data().phone;
      newLandlord.email = doc.data().email;
      newLandlord.city = doc.data().city;
      newLandlord.isPrivate = doc.data().isPrivate;
      newLandlord.password = doc.data().password;
      newLandlord.companyName = doc.data().companyName;
      newLandlord.birthday = doc.data().birthday;

      // return promise with the newStudent class
      return Promise.resolve(newLandlord);
    })
      .catch((err) => false);

    return object;
  }

  writeLandlordToDB() {
    // Initialize Cloud Firestore through Firebase
    if (DB_REQ.apps.length === 0) {
      DB_REQ.initializeApp({
        apiKey: 'AIzaSyAmHD6wCC5S0k4m_YRpByMBPxSKr8xMhec',
        authDomain: 'samiroomdb.firebaseio.com',
        projectId: 'samiroomdb',
      });
    }

    // Example: get data from firestore database
    const db = DB_REQ.firestore();
    const object = db.collection('Landlord').get().then((doc) => {
      // get number of rows in the collection
      const n = doc.size;
      // add new row
      db.collection('Landlord').doc(`landlord0${n + 1}`).set({
        ID: this.id,
        isPrivate: this.isPrivate,
        email: this.email,
        firstname: this.firtsname,
        lastname: this.lastname,
        city: this.city,
        password: this.password,
        phone: this.phone,
        companyName: this.companyName,
        birthday: this.birthday,
      });
    });
  }

  searchLandlordByID(landID) {
    // Initialize Cloud Firestore through Firebase
    if (DB_REQ.apps.length === 0) {
      DB_REQ.initializeApp({
        apiKey: 'AIzaSyAmHD6wCC5S0k4m_YRpByMBPxSKr8xMhec',
        authDomain: 'samiroomdb.firebaseio.com',
        projectId: 'samiroomdb',
      });
    }

    // Example: get data from firestore database
    const db = DB_REQ.firestore();
    let somePromise = () => new Promise(((resolve, reject) => {}));
    let somePromise2 = () => new Promise(((resolve, reject) => {}));
    somePromise2 = db.collection('Landlord').where('ID', '==', landID).get().then((docs) => {
      if (docs.empty) {
        return Promise.resolve(false);
      }
      docs.forEach((doc) => { somePromise = this.readLandFromDB(doc.id); });
      return somePromise;
    });
    return somePromise2;
  }

  confirmLandlord(landlordID, landlordPass) {
    // Initialize Cloud Firestore through Firebase
    if (DB_REQ.apps.length === 0) {
      DB_REQ.initializeApp({
        apiKey: 'AIzaSyAmHD6wCC5S0k4m_YRpByMBPxSKr8xMhec',
        authDomain: 'samiroomdb.firebaseio.com',
        projectId: 'samiroomdb',
      });
    }

    // Example: get data from firestore database
    const db = DB_REQ.firestore();
    let somePromise = new Promise(((resolve, reject) => {}));
    let somePromise2 = new Promise(((resolve, reject) => {}));
    somePromise = this.searchLandlordByID(landlordID);
    somePromise2 = somePromise.then((landlord) => {
      // Landlord is not exists
      if (landlord === false) {
        console.log('Landlord not exists');
        return Promise.resolve(landlord);
      }
      // Landlord password not equal to the one sent
      if (landlord.password !== landlordPass) {
        console.log('Pass are not alike!');
        return Promise.resolve(true);
      }
      // Landlord confirmed
      console.log('Landlord confirmed successfully!');
      return Promise.resolve(true);
    });
    return somePromise2;
  }

  async getLandlordAparts(ownerID) {
    // Initialize Cloud Firestore through Firebase
    if (DB_REQ.apps.length === 0) {
      DB_REQ.initializeApp({
        apiKey: 'AIzaSyAmHD6wCC5S0k4m_YRpByMBPxSKr8xMhec',
        authDomain: 'samiroomdb.firebaseio.com',
        projectId: 'samiroomdb',
      });
    }
    // Example: get data from firestore database
    const db = DB_REQ.firestore();
    const landlordAparts = {};
    const apartment = [];
    // const count = 1;
    const index = 0;
    let somePromise2 = new Promise(((resolve, reject) => {}));
    somePromise2 = functions.getApartByLandID(db, ownerID, apartment,
      index, landlordAparts);
    return somePromise2;
  }
};
