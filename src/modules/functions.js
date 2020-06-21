/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
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

async function getApartByLandID(db, ownerID, apartment,
  index, landlordAparts) {
  let count = 1;
  let somePromise2 = new Promise(((resolve, reject) => {}));
  somePromise2 = db.collection('Apartments').where('ownerID', '==', ownerID).get().then((docs) => {
    docs.forEach((doc) => {
      apartment[index] = doc.data().address;
      apartment[index + 1] = doc.data().apartmentID;
      apartment[index + 2] = doc.data().description;
      apartment[index + 3] = doc.data().imagePath;
      apartment[index + 4] = doc.data().isRent;
      apartment[index + 5] = doc.data().numRoom;
      apartment[index + 6] = doc.data().ownerID;
      apartment[index + 7] = doc.data().squereMeter;
      apartment[index + 8] = doc.data().pricePerMonth;
      apartment[index + 9] = doc.data().city;
      apartment[index + 10] = doc.data().startDate;
      landlordAparts[`apart0${count}`] = apartment.slice();
      count += 1;
    });
    return Promise.resolve(landlordAparts);
  });
  return somePromise2;
}

module.exports = {
  getAllpartments,
  showAttraction,
  getApartByLandID,
};
