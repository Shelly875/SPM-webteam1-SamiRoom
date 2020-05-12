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
    });

    return object;
  }

  writeApartToDB(apartmentID, address, city, description, imagePath,
    isRent, numRoom, ownerID, pricePerMonth, squereMeter = 0, startDate = null) {
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
        apartmentID,
        address,
        city,
        landlordID,
        description,
        imagePath,
        isRent,
        numRoom,
        ownerID,
        pricePerMonth,
        squereMeter,
        startDate,
      });
    });
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
