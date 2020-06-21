/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const DB_REQ = require('firebase');

module.exports = class Student {
  constructor(id = 0, password = null, firstname = null, lastname = null, city = null,
    phone = 0, email = null, address = null, IsApproved = false,
    studentCardNum = 0, birthdate = null) {
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
    this.birthdate = birthdate;
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
    })
      .catch((err) => false);

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
      if (docs.empty) {
        return Promise.resolve(false);
      }
      docs.forEach((doc) => {
        somePromise = this.readStudentFromDB(doc.id);
      });
      return somePromise;
    });
    return somePromise2;
  }

  confirmStudent(studentID, studentPass) {
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
    somePromise = this.searchStudentByID(studentID);
    somePromise2 = somePromise.then((student) => {
      // Student is not exists
      if (student === false) {
        console.log('Student not exists');
        return Promise.resolve(student);
      }
      // Student password not equal to the one sent
      if (student.password !== studentPass) {
        console.log('Passwords are not alike!');
        return Promise.resolve(false);
      }
      // Student confirmed
      console.log('Student confirmed successfully!');
      return Promise.resolve(true);
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
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
        phone: this.phone,
        birthdate: this.birthdate,
        studentCardNum: this.studentCardNum,
      });
    });
  }
};
