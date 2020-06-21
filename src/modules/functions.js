/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */


function getAllpartments(res, apart, baseArgg, PATH) {
  apart.getAllApart().then((apartments) => {
    baseArgg.apartments = apartments;
    res.render(`${PATH}/`, { ...baseArgg });
  });
}

module.exports = {
  getAllpartments,
};
