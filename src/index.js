/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const DB = require('./js/db-func');
const STUDENT = require('./js/modules/Student');
const ORDER = require('./js/modules/Order');
const LAND = require('./js/modules/Landlord');
const APART = require('./js/modules/Apartment');
const auth = require('./modules/auth');
// const apartValidation = require('./js/apartValidation');

const APP_PORT = process.env.PORT || 3000;
const APP = EXPRESS();
const PATH = __dirname;

APP.use(EXPRESS.urlencoded({ extended: true }));
APP.use(EXPRESS.static(__dirname));
console.log('starting...');

// set the view engine to ejs
APP.set('view engine', 'ejs');

// declare student class
const student = new STUDENT();

// declare order class
const order = new ORDER();

// declare landlord class
const landlord = new LAND();

// declare apartment class
const apart = new APART();

const isLogged = auth.isLogged();

const baseArgg = { isLogged, isLandLord: false, isStudent: false };

APP.get('/', (req, res) => {
  // All apartments in the main page
  apart.getAllApart().then((apartments) => {
    baseArgg.apartments = apartments;
    res.render(`${PATH}/`, { ...baseArgg });
  });
});

APP.post('/', (req, res) => {
  if (req.body.user.regidcard) {
    const newStudent = new STUDENT(req.body.user.regid, req.body.user.regpass,
      req.body.user.fname, req.body.user.lname, req.body.user.city,
      req.body.user.phone, req.body.user.email, req.body.user.address,
      true, req.body.user.regidcard, req.body.user.birthday);
    const studentName = req.body.user.fname;
    const studentID = req.body.user.regid;
    baseArgg.isStudent = true;
    baseArgg.isLogged = true;
    baseArgg.studentName = studentName;
    baseArgg.studentID = Number(studentID);
    newStudent.writeStudentToDB();
    // All apartments in the main page
    apart.getAllApart().then((apartments) => {
      baseArgg.apartments = apartments;
      res.render(`${PATH}/`, { ...baseArgg });
    });
  } else {
    const newLand = new LAND(req.body.user.regid,
      req.body.user.fname, req.body.user.lname, req.body.user.city,
      req.body.user.phone, req.body.user.email, null,
      true, null, req.body.user.regpass, req.body.user.birthday);
    const landName = req.body.user.fname;
    const landID = req.body.user.regid;
    baseArgg.isLandLord = true;
    baseArgg.isLogged = true;
    baseArgg.landName = landName;
    baseArgg.landID = Number(landID);
    newLand.writeLandlordToDB();
    // All apartments in the main page
    apart.getAllApart().then((apartments) => {
      baseArgg.apartments = apartments;
      res.render(`${PATH}/`, { ...baseArgg });
    });
  }
});

APP.get('/contact', (req, res) => {
  res.render(`${PATH}/contact`, { ...baseArgg });
});

APP.get('/myOrders', (req, res) => {
  res.render(`${PATH}/orders`, { ...baseArgg });
});

APP.post('/login', (req, res) => {
  const userID = req.body.user.id;
  const userPass = req.body.user.pass;
  const isStudent = true;
  student.confirmStudent(Number(userID), userPass).then((resultStudent) => {
    if (resultStudent === false) {
      landlord.confirmLandlord(Number(userID), userPass).then((resultLandlord) => {
        if (resultLandlord === false) {
          res.render(`${PATH}/login`, { ...baseArgg, resultLandlord });
        } else {
          landlord.searchLandlordByID(Number(userID)).then((land) => {
            baseArgg.isLandLord = true;
            baseArgg.isLogged = true;
            baseArgg.landName = land.firstname;
            baseArgg.landID = Number(userID);
            res.render(`${PATH}/`, { ...baseArgg });
          });
        }
      });
    } else {
      student.searchStudentByID(Number(userID)).then((stud) => {
        baseArgg.isStudent = true;
        baseArgg.isLogged = true;
        baseArgg.studentName = stud.firstname;
        baseArgg.studentID = Number(userID);
        res.render(`${PATH}/`, { ...baseArgg });
      });
    }
  });
});

APP.get('/login', (req, res) => {
  res.render(`${PATH}/login`, { ...baseArgg });
});

APP.get('/registertion', (req, res) => {
  res.render(`${PATH}/registertion`);
});

APP.get('/newApart', (req, res) => {
  res.render(`${PATH}/newApart`, { ...baseArgg });
});

APP.get('/editApart', (req, res) => {
  res.render(`${PATH}/editApart`, { ...baseArgg });
});

APP.post('/myApartments', (req, res) => {
  // All landlord apartments in the apartments page
  landlord.getLandlordAparts(316243567).then((landApartments) => {
    res.render(`${PATH}/apartments`, { landApartments, ...baseArgg });
  });
});

APP.get('/myApartments', (req, res) => {
  // All landlord apartments in the apartments page
  landlord.getLandlordAparts(baseArgg.landID).then((landApartments) => {
    res.render(`${PATH}/apartments`, { landApartments, ...baseArgg });
  });
});

APP.get('/payment', (req, res, idApart) => {
  res.render(`${PATH}/payment`, { ...baseArgg });
});

APP.post('/details', (req, res) => {
  let apart2 = new Promise(((resolve, reject) => {}));
  let apartmentID; let address; let squereMeter;
  let pricePerMonth; let startDate; let isRent; let numRoom; let description;
  let imagePath; let ownerID; let city; let id;

  // we need to get this from the previuos screen
  for (const [key, value] of Object.entries(req.body)) {
    id = key.substring(0, key.length - 2);
  }
  apart2 = apart.searchApartById(Number(id));
  apart2.then((doc) => {
    numRoom = doc.numRoom;
    apartmentID = doc.apartmentID;
    address = doc.address;
    squereMeter = doc.squereMeter;
    startDate = doc.startDate;
    description = doc.description;
    pricePerMonth = doc.pricePerMonth;
    city = doc.city;
    imagePath = doc.imagePath;
    res.render(`${PATH}/apartment-detail`, {
      ...baseArgg,
      apartmentID,
      address,
      numRoom,
      squereMeter,
      startDate,
      isRent,
      description,
      city,
      pricePerMonth,
      imagePath,
    });
  });
});

APP.use('*', (req, res) => {
  res.render(`${PATH}/404`);
});

APP.listen(APP_PORT);
// eslint-disable-next-line no-console
console.log(`app is running. port: ${APP_PORT}`, '/n', `http://127.0.0.1:${APP_PORT}/`);
