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

landlord.confirmLandlord(316243567, 'Wedg153k*').then((result) => {
  console.log(result);
});

APP.get('/', (req, res) => {
  // All apartments in the main page
  apart.getAllApart().then((apartments) => {
    res.render(`${PATH}/`, { apartments });
  });
});

APP.post('/', (req, res) => {
});

APP.get('/contact', (req, res) => {
  res.render(`${PATH}/contact`);
});

APP.get('/myOrders', (req, res) => {
  res.render(`${PATH}/orders`);
});

APP.post('/login', (req, res) => {
  res.render(`${PATH}/login`);
  console.log(req.body.user.id);
});

APP.get('/login', (req, res) => {
  res.render(`${PATH}/login`);
});

APP.get('/registertion', (req, res) => {
  res.render(`${PATH}/registertion`);
});

APP.get('/newApart', (req, res) => {
  res.render(`${PATH}/newApart`);
});

APP.get('/myApartments', (req, res) => {
  // All landlord apartments in the apartments page
  landlord.getLandlordAparts(316243567).then((landApartments) => {
    res.render(`${PATH}/apartments`, { landApartments });
  });
});

APP.get('/payment', (req, res, idApart) => {
  res.render(`${PATH}/payment`);
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
