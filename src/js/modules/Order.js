/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const DB_REQ = require('firebase');

module.exports = class Order {
  constructor(apartID = 0, isPaid = true, landlordID = 0, numPaid = 0, numPayments = 0,
    orderID = 0, studentID = 0) {
    this.apartID = apartID;
    this.isPaid = isPaid;
    this.landlordID = landlordID;
    this.numPaid = numPaid;
    this.numPayments = numPayments;
    this.orderID = orderID;
    this.studentID = studentID;
  }

  readOrderFromDB(orderDocNum) {
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
    const object = db.collection('Orders').doc(orderDocNum).get().then((doc) => {
      const newOrder = new Order();
      newOrder.apartID = doc.data().apartID;
      newOrder.studentID = doc.data().studentID;
      newOrder.isPaid = doc.data().isPaid;
      newOrder.landlordID = doc.data().landlordID;
      newOrder.numPayments = doc.data().numPayments;
      newOrder.numPaid = doc.data().numPaid;
      newOrder.orderID = doc.data().orderID;

      // return promise with the newStudent class
      return Promise.resolve(newOrder);
    });

    return object;
  }

  writeStudentToDB(apartID, studentID, isPaid, landlordID, numPayments, orderID, numPaid) {
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
    const object = db.collection('Orders').get().then((doc) => {
      // get number of rows in the collection
      const n = doc.size;
      // add new row
      db.collection('Orders').doc(`order0${n + 1}`).set({
        apartID,
        studentID,
        isPaid,
        landlordID,
        numPayments,
        orderID,
        numPaid,
      });
    });
  }

  printOrder(order) {
    order.then((doc) => {
      console.log('details about order: ');
      console.log(`apartID: ${doc.apartID}`);
      console.log(`isPaid: ${doc.isPaid}`);
      console.log(`landlord ID: ${doc.landlordID}`);
      console.log(`number of payments: ${doc.numPayments}`);
      console.log(`number paid: ${doc.numPaid}`);
      console.log(`order ID: ${doc.orderID}`);
      console.log(`student ID: ${doc.studentID}`);
    });
  }
};
