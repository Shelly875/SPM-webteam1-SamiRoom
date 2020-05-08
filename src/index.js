/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

const EXPRESS = require('express');

const APP_PORT = process.env.PORT || 3000;
const APP = EXPRESS();
const router = EXPRESS.Router();
const PATH = __dirname;

// all pages in the web
APP.use(EXPRESS.static(__dirname));

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
console.log(`app is running on port: ${APP_PORT}`);
console.log(`http://127.0.0.1: ${APP_PORT}/`);
