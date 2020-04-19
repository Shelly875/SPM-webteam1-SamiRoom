/* eslint-disable linebreak-style */
/* global Console */

const EXPRESS = require('express');

const APP_PORT = process.env.PORT || 3000;
const APP = EXPRESS();

APP.get('/', (req, res) => {
  res.send('Hello World!');
});

APP.listen(APP_PORT);
Console.log(`app is running. port: ${APP_PORT}`, '/n', `http://127.0.0.1:${APP_PORT}/`);
