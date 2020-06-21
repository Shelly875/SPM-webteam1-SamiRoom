/* eslint-disable linebreak-style */
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

function showAttraction(res, PATH, baseArgg, attractions, apartmentID, address,
  numRoom, squereMeter, startDate, isRent, description, city, pricePerMonth, imagePath,
  ownerID) {
  attractions.then((allAtters) => {
    baseArgg.allAtters = allAtters;
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
      ownerID,
    });
  });
}

module.exports = {
  getAllpartments,
  showAttraction,
};
