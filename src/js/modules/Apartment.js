/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const DB_REQ = require('firebase');

module.exports = class Apartment {
  constructor(apartmentID = 0, address = null, city = null, description = null,
    imagePath = null, isRent = false, numRoom = 0, ownerID = 0, pricePerMonth = 0,
    squereMeter = 0, startDate = null) {
    this.apartmentID = apartmentID;
    this.address = address;
    this.city = city;
    this.description = description;
    this.imagePath = imagePath;
    this.isRent = isRent;
    this.numRoom = numRoom;
    this.ownerID = ownerID;
    this.pricePerMonth = pricePerMonth;
    this.squereMeter = squereMeter;
    this.startDate = startDate;
  }

  readApartFromDB(apartDocNum) {
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
    const object = db.collection('Apartments').doc(apartDocNum).get().then((doc) => {
      const newApart = new Apartment();
      newApart.apartmentID = doc.data().apartmentID;
      newApart.address = doc.data().address;
      newApart.city = doc.data().city;
      newApart.description = doc.data().description;
      newApart.imagePath = doc.data().imagePath;
      newApart.isRent = doc.data().isRent;
      newApart.numRoom = doc.data().numRoom;
      newApart.ownerID = doc.data().ownerID;
      newApart.pricePerMonth = doc.data().pricePerMonth;
      newApart.squereMeter = doc.data().squereMeter;
      newApart.startDate = doc.data().startDate;

      // return promise with the newStudent class
      return Promise.resolve(newApart);
    })
      .catch((err) => false);
    return object;
  }

  writeApartToDB() {
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
    const object = db.collection('Apartments').get().then((doc) => {
      // get number of rows in the collection
      const n = doc.size;
      // add new row
      db.collection('Apartments').doc(`apart0${n + 1}`).set({
        apartmentID: this.apartmentID,
        address: this.address,
        city: this.city,
        landlordID: this.landlordID,
        description: this.description,
        imagePath: this.imagePath,
        isRent: this.isRent,
        numRoom: this.numRoom,
        ownerID: this.pricePerMonth,
        pricePerMonth: this.pricePerMonth,
        squereMeter: this.squereMeter,
        startDate: this.startDate,
      });
    });
  }

  searchApartById(apartID) {
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
    somePromise2 = db.collection('Apartments').where('apartmentID', '==', apartID).get().then((docs) => {
      docs.forEach((doc) => { somePromise = this.readApartFromDB(doc.id); });
      return somePromise;
    });
    return somePromise2;
  }

  getAllApart() {
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
    const allApartments = {};
    const apartment = [];
    let count = 1;
    const index = 0;
    let somePromise = new Promise(((resolve, reject) => {}));
    somePromise = db.collection('Apartments').get().then((allDocs) => {
      // get number of rows in the collection
      allDocs.forEach((doc) => {
        apartment[index] = doc.data().address;
        apartment[index + 1] = doc.data().apartmentID;
        apartment[index + 2] = doc.data().description;
        apartment[index + 3] = doc.data().imagePath;
        apartment[index + 4] = doc.data().isRent;
        apartment[index + 5] = doc.data().numRoom;
        apartment[index + 6] = doc.data().ownerID;
        apartment[index + 7] = doc.data().squereMeter;
        apartment[index + 8] = doc.data().pricePerMonth;
        apartment[index + 9] = doc.data().city;
        apartment[index + 10] = doc.data().startDate;
        allApartments[`apart0${count}`] = apartment.slice();
        count += 1;
      });
      return Promise.resolve(allApartments);
    });
    return somePromise;
  }

  printApart(apart) {
    apart.then((doc) => {
      console.log('details about apartment: ');
      console.log(`apartID: ${doc.apartmentID}`);
      console.log(`city: ${doc.city}`);
      console.log(`desc: ${doc.description}`);
      console.log(`address: ${doc.address}`);
      console.log(`imagPath: ${doc.imagePath}`);
      console.log(`isRent: ${doc.isRent}`);
      console.log(`numRooms: ${doc.numRoom}`);
      console.log(`ownerID: ${doc.ownerID}`);
      console.log(`pricePerMonth: ${doc.pricePerMonth}`);
      console.log(`squere: ${doc.squereMeter}`);
      console.log(`startDate: ${doc.startDate}`);
    });
  }
};
