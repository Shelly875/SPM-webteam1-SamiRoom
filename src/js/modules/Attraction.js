/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const DB_REQ = require('firebase');


module.exports = class Attraction {
  constructor(apartID = 0, attrID = 0, name = null, description = null,
    img = null, priceBefore = 0, priceAfter = 0) {
    this.apartID = apartID;
    this.attrID = attrID;
    this.name = name;
    this.description = description;
    this.img = img;
    this.priceBefore = priceBefore;
    this.priceAfter = priceAfter;
  }

  readAttrFromDB(attrDocNum) {
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
    const object = db.collection('Attractions').doc(attrDocNum).get().then((doc) => {
      const newAttr = new Attraction();
      newAttr.apartID = doc.data().apartID;
      newAttr.attrID = doc.data().attrID;
      newAttr.description = doc.data().description;
      newAttr.img = doc.data().img;
      newAttr.priceBefore = doc.data().priceBefore;
      newAttr.priceAfter = doc.data().priceAfter;
      newAttr.name = doc.data().name;

      // return promise with the newStudent class
      return Promise.resolve(newApart);
    })
      .catch((err) => false);
    return object;
  }

  async writeAttrToDB() {
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
    const object = db.collection('Attractions').get().then((doc) => {
      // get number of rows in the collection
      const n = doc.size;
      console.log(3);
      console.log(`attr0${n + 1}`);
      // add new row
      db.collection('Attractions').doc(`attr0${n + 1}`).set({
        apartID: this.apartID,
        attrID: this.attrID,
        name: this.name,
        description: this.description,
        img: this.img,
        priceBefore: this.priceBefore,
        priceAfter: this.priceAfter,
      });
      console.log(4);
    });
  }

  searchAttrtById(attrID) {
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
    somePromise2 = db.collection('Attractions').where('attrID', '==', attrID).get().then((docs) => {
      docs.forEach((doc) => { somePromise = this.readAttrFromDB(doc.id); });
      return somePromise;
    });
    return somePromise2;
  }


  async searchAttrByApart(apID) {
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
    let somePromise2 = new Promise(((resolve, reject) => {}));
    somePromise2 = db.collection('Attractions').where('apartID', '==', apID).get().then((docs) => Promise.resolve(docs))
      .catch((err) => {
        console.log('no attractions found', err);
      });
    return somePromise2;
  }


  getAllAttrByApart(apartID) {
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
    const allAttractions = {};
    const attraction = [];
    let count = 1;
    const index = 0;
    let somePromise = new Promise(((resolve, reject) => {}));
    somePromise = db.collection('Attractions').where('apartID', '==', apartID).get().then((allDocs) => {
      // get number of rows in the collection
      allDocs.forEach((doc) => {
        attraction[index] = doc.data().apartID;
        attraction[index + 1] = doc.data().attrID;
        attraction[index + 2] = doc.data().description;
        attraction[index + 3] = doc.data().img;
        attraction[index + 4] = doc.data().priceBefore;
        attraction[index + 5] = doc.data().priceAfter;
        attraction[index + 6] = doc.data().name;
        allAttractions[`attr0${count}`] = attraction.slice();
        count += 1;
      });
      return Promise.resolve(allAttractions);
    });
    return somePromise;
  }
};
