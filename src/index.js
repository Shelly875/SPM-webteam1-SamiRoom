/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

const EXPRESS = require('express');
const DB = require('./js/db-func');
const ST = require('./js/modules/Student');
const ORDER = require('./js/modules/Order');
const LAND = require('./js/modules/Landlord');
const APART = require('./js/modules/Apartment');

const APP_PORT = process.env.PORT || 3000;
const APP = EXPRESS();
const router = EXPRESS.Router();
const PATH = __dirname;

APP.use(EXPRESS.static(__dirname));
console.log('starting...');
// DB.takeApartImages(1);

// test student class
const s = new ST();
let s1 = new Promise(((resolve, reject) => {}));
s1 = s.readStudentFromDB('student01');
s.printStudent(s1);

// test order class
const order = new ORDER();
let order1 = new Promise(((resolve, reject) => {}));
order1 = order.readOrderFromDB('order01');
order.printOrder(order1);

// test landlord class
const landlord = new LAND();
let landlord1 = new Promise(((resolve, reject) => {}));
landlord1 = landlord.readLandFromDB('landlord01');
landlord.printLandlord(landlord1);

// test apartment class
const apart = new APART();
let apart1 = new Promise(((resolve, reject) => {}));
apart1 = apart.readApartFromDB('apart01');
apart.printApart(apart1);

router.get('/home', (req, res) => {
  res.sendFile(`${PATH}/index.html`);
});

router.get('/contact', (req, res) => {
  res.sendFile(`${PATH}/contact.html`);
});

router.get('/myOrders', (req, res) => {
  res.sendFile(`${PATH}/orders.html`);
});

router.get('/login', (req, res) => {
  res.sendFile(`${PATH}/login.html`);
});

router.get('/registertion', (req, res) => {
  res.sendFile(`${PATH}/registertion.html`);
});

router.get('/myApartments', (req, res) => {
  res.sendFile(`${PATH}/apartments.html`);
});

router.get('/details', (req, res) => {
  res.sendFile(`${PATH}/apartment-detail.html`);
  // DB.readApartmentDetails('1');
});

APP.use('/', router);

APP.use('*', (req, res) => {
  res.sendFile(`${PATH}/404.html`);
});

APP.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

APP.listen(APP_PORT);
// eslint-disable-next-line no-console
console.log(`app is running. port: ${APP_PORT}`, '/n', `http://127.0.0.1:${APP_PORT}/`);
