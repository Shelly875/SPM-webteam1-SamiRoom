/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const DB_REQ = require('firebase');

module.exports = class Student {
  constructor(id = 0, firstname = null, lastname = null, city = null,
    phone = 0, email = null, address = null, IsApproved = false,
    studentCardNum = 0, password = null) {
    this.id = id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.city = city;
    this.phone = phone;
    this.email = email;
    this.address = address;
    this.IsApproved = IsApproved;
    this.studentCardNum = studentCardNum;
    this.password = password;
  }

  readStudentFromDB(studentDocNum) {
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
    const object = db.collection('Students').doc(studentDocNum).get().then((doc) => {
      const newStudent = new Student();
      newStudent.id = doc.data().ID;
      newStudent.firstname = doc.data().firstname;
      newStudent.lastname = doc.data().lastname;
      newStudent.city = doc.data().city;
      newStudent.phone = doc.data().phone;
      newStudent.email = doc.data().email;
      newStudent.address = doc.data().address;
      newStudent.IsApproved = doc.data().IsApproved;
      newStudent.studentCardNum = doc.data().studentCardNum;
      newStudent.password = doc.data().password;

      // return promise with the newStudent class
      return Promise.resolve(newStudent);
    });

    return object;
  }

  searchStudentByID(studentID) {
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
    somePromise2 = db.collection('Students').where('ID', '==', studentID).get().then((docs) => {
      docs.forEach((doc) => { somePromise = this.readApartFromDB(doc.id); });
      return somePromise;
    });
    return somePromise2;
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
    const object = db.collection('Students').get().then((doc) => {
      // get number of rows in the collection
      const n = doc.size;
      // add new row
      db.collection('Students').doc(`student0${n + 1}`).set({
        ID: this.id,
        IsApproved: this.IsApproved,
        address: this.address,
        city: this.city,
        email: this.email,
        firstname: this.firtsname,
        lastname: this.lastname,
        password: this.password,
        phone: this.phone,
        startDate: this.startDate,
        studentCardNum: this.studentCardNum,
      });
    });
  }


  printStudent(student) {
    // student class object get Promise student function
    student.then((doc) => {
      console.log('details about student: ');
      console.log(`first name: ${doc.firstname}`);
      console.log(`last name: ${doc.lastname}`);
      console.log(`password: ${doc.password}`);
      console.log(`id: ${doc.id}`);
      console.log(`student card number: ${doc.studentCardNum}`);
      console.log(`Is Approved: ${doc.IsApproved}`);
      console.log(`city: ${doc.city}`);
      console.log(`email: ${doc.email}`);
      console.log(`phone: ${doc.phone}`);
    });
  }
};
