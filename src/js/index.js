/* eslint-disable linebreak-style */

const EXPRESS = require('express');

const APP_PORT = process.env.PORT || 3000;
const APP = EXPRESS();

APP.get('/', (req, res) => {
  res.send('Hello World!');
});

APP.listen(APP_PORT);
// eslint-disable-next-line no-console
console.log(`app is running. port: ${APP_PORT}`, '/n', `http://127.0.0.1:${APP_PORT}/`);
