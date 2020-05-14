/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const DB_REQ = require('firebase');
const APART = require('./Apartment');

module.exports = class Landlord {
  constructor(id = 0, firstname = null, lastname = null, phone = 0, email = null,
    isPrivate = true, companyName = null, password = null) {
    this.id = id;
    this.firtsname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.isPrivate = isPrivate;
    this.studentCardNum = password;
    this.companyName = companyName;
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
      newLandlord.isPrivate = doc.data().isPrivate;
      newLandlord.password = doc.data().password;
      newLandlord.companyName = doc.data().companyName;

      // return promise with the newStudent class
      return Promise.resolve(newLandlord);
    });

    return object;
  }

  writeStudentToDB() {
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
        password: this.password,
        phone: this.phone,
        companyName: this.companyName,
      });
    });
  }

  getLandlordAparts(ownerID) {
    // Initialize Cloud Firestore through Firebase
    if (DB_REQ.apps.length === 0) {
      DB_REQ.initializeApp({
        apiKey: 'AIzaSyAmHD6wCC5S0k4m_YRpByMBPxSKr8xMhec',
        authDomain: 'samiroomdb.firebaseio.com',
        projectId: 'samiroomdb',
      });
    }
    let apart;
    const landlordAparts = {};
    // Example: get data from firestore database
    const db = DB_REQ.firestore();
    let somePromise2 = new Promise(((resolve, reject) => {}));
    somePromise2 = db.collection('Apartments').where('ownerID', '==', ownerID).get().then((docs) => {
      docs.forEach((doc) => {
      });
      return somePromise;
    });
  }


  printLandlord(landlord) {
    // student class object get Promise student function
    landlord.then((doc) => {
      console.log('details about landlord: ');
      console.log(`first name: ${doc.firstname}`);
      console.log(`last name: ${doc.lastname}`);
      console.log(`password: ${doc.password}`);
      console.log(`id: ${doc.id}`);
      console.log(`companyName (if exists): ${doc.companyName}`);
      console.log(`Is private: ${doc.isPrivate}`);
      console.log(`email: ${doc.email}`);
      console.log(`phone: ${doc.phone}`);
    });
  }
};
