/* eslint-disable eqeqeq */
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

// set the view engine to ejs
APP.set('view engine', 'ejs');

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

APP.get('/', (req, res) => {
  res.render(`${PATH}/index`);
});

APP.get('/contact', (req, res) => {
  res.render(`${PATH}/contact`);
});

APP.get('/myOrders', (req, res) => {
  res.render(`${PATH}/orders`);
});

APP.get('/login', (req, res) => {
  res.render(`${PATH}/login`);
  let x=0;
  if(x==2)
  {
    alert("logged");
    res.render(`${PATH}/`);
  }
  else{
    alert("failed");
  }
});

APP.get('/registertion', (req, res) => {
  res.render(`${PATH}/registertion`);
});

APP.get('/myApartments', (req, res) => {
  res.render(`${PATH}/apartments`);
});

APP.get('/details', (req, res) => {
  res.render(`${PATH}/apartment-detail`);
});

APP.use('*', (req, res) => {
  res.render(`${PATH}/404`);
});


APP.listen(APP_PORT);
// eslint-disable-next-line no-console
console.log(`app is running. port: ${APP_PORT}`, '/n', `http://127.0.0.1:${APP_PORT}/`);
