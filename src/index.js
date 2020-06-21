/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

const EXPRESS = require('express');
const BODY_PARSER = require('body-parser');
const FS = require('fs');
const DB = require('./js/db-func');
const STUDENT = require('./js/modules/Student');
const ORDER = require('./js/modules/Order');
const LAND = require('./js/modules/Landlord');
const APART = require('./js/modules/Apartment');
const ATTR = require('./js/modules/Attraction');
const functions = require('./modules/functions');

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

const isLogged = false;

const baseArgg = { isLogged, isLandLord: false, isStudent: false };

APP.get('/', (req, res) => {
  functions.getAllpartments(res, apart, baseArgg, PATH);
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
    functions.getAllpartments(res, apart, baseArgg, PATH);
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
    functions.getAllpartments(res, apart, baseArgg, PATH);
  }
});

APP.get('/contact', (req, res) => {
  res.render(`${PATH}/contact`, { ...baseArgg });
});

APP.get('/logout', (req, res) => {
  baseArgg.isLogged = false;
  baseArgg.isStudent = false;
  baseArgg.isLandLord = false;
  console.log('successfully logout!');
  res.render(`${PATH}/`, { ...baseArgg });
});

APP.get('/myOrders', (req, res) => {
  res.render(`${PATH}/orders`, { ...baseArgg });
});

APP.post('/login', (req, res) => {
  const userID = req.body.user.id;
  const userPass = req.body.user.pass;
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
  const newApart = new APART();
  newApart.getApartNewID().then((apartID) => {
    baseArgg.newApartID = apartID;
    res.render(`${PATH}/newApart`, { ...baseArgg });
  });
});

APP.get('/editApart', (req, res) => {
  res.render(`${PATH}/editApart`, { ...baseArgg });
});

APP.post('/myApartments', (req, res) => {
  // Save attractions to db
  let attrIndex = 0;
  // const apartID = req.body.apart.ID;
  const apartID = Number(req.body.apart.ID);
  const attrName = req.body.attr.name;
  const attrID = req.body.attr.ID;
  const attrDesc = req.body.attr.desc;
  const attrBefore = req.body.attr.before;
  const attrAfter = req.body.attr.after;
  const attrImg = req.body.attr.img;
  const apartImg = 'images/Apartments';

  // All landlord apartments in the apartments page
  landlord.getLandlordAparts(baseArgg.landID).then((landApartments) => {
  // declare apartments class
    console.log(baseArgg.landID);
    const newApart = new APART(apartID, req.body.apart.address, req.body.apart.city,
      req.body.apart.desc, apartImg, false, Number(req.body.apart.numRoom), baseArgg.landID,
      Number(req.body.apart.payPerMonth), Number(req.body.apart.squereMeter),
      req.body.apart.startDate);

    newApart.writeApartToDB();

    // only one attraction
    if (typeof attrName === 'string') {
    // declare attraction class
      const attr = new ATTR(apartID, Number(attrID), attrName,
        attrDesc, `images/Attractions/${attrImg}`, attrBefore, attrAfter);

      attr.writeAttrToDB();
    } else {
    // multiple attractions
      for (attrIndex; attrIndex < attrName.length; attrIndex++) {
      // declare attraction class
        const attr = new ATTR(apartID, Number(attrID[attrIndex]), attrName[attrIndex],
          attrDesc[attrIndex], `images/Attractions/${attrImg[attrIndex]}`, attrBefore[attrIndex], attrAfter[attrIndex]);

        attr.writeAttrToDB();
      }
    }

    res.render(`${PATH}/apartments`, { landApartments, ...baseArgg });
  });
});

APP.get('/myApartments', (req, res) => {
  // All landlord apartments in the apartments page
  landlord.getLandlordAparts(baseArgg.landID).then((landApartments) => {
    res.render(`${PATH}/apartments`, { landApartments, ...baseArgg });
  });
});

APP.post('/addAttraction', (req, res) => {
  const attrID = req.body.attr.ID;
  const attrDesc = req.body.attr.desc;
  const attrName = req.body.attr.name;
  const attrBefore = req.body.attr.before;
  const attrAfter = req.body.attr.after;
  const attrImg = req.body.attr.img;
  const attr = new ATTR(baseArgg.apartID, Number(attrID), attrName, attrDesc,
    `images/Attractions/${attrImg}`, attrBefore, attrAfter);

  attr.writeAttrToDB();
  let apart2 = new Promise(((resolve, reject) => {}));
  const attr2 = new ATTR();

  let attractions = new Promise(((resolve, reject) => {}));
  let apartmentID; let address; let squereMeter;
  let pricePerMonth; let startDate; let isRent; let numRoom; let description;
  let imagePath; let ownerID; let city;
  const id = baseArgg.apartID;
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
    ownerID = doc.ownerID;
    // Show attractions
    attractions = attr2.getAllAttrByApart(Number(id));
    functions.showAttraction(res, PATH, baseArgg, attractions, apartmentID, address,
      numRoom, squereMeter, startDate, isRent, description, city, pricePerMonth, imagePath,
      ownerID);
  });
});

APP.get('/addAttraction', (req, res) => {
  res.render(`${PATH}/addAttraction`, { ...baseArgg });
});

APP.get('/payment', (req, res) => {
  res.render(`${PATH}/payment`, { ...baseArgg });
});

APP.post('/details', (req, res) => {
  let apart2 = new Promise(((resolve, reject) => {}));
  const attr = new ATTR();

  let attractions = new Promise(((resolve, reject) => {}));
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
    ownerID = doc.ownerID;
    baseArgg.apartID = Number(id);
    // Show attractions
    attractions = attr.getAllAttrByApart(Number(id));
    functions.showAttraction(res, PATH, baseArgg, attractions, apartmentID, address,
      numRoom, squereMeter, startDate, isRent, description, city, pricePerMonth, imagePath,
      ownerID);
  });
});

APP.use('*', (req, res) => {
  res.render(`${PATH}/404`);
});

APP.listen(APP_PORT);
// eslint-disable-next-line no-console
console.log(`app is running. port: ${APP_PORT}`, '/n', `http://127.0.0.1:${APP_PORT}/`);
