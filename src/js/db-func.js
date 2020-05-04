/* eslint-disable linebreak-style */
/* eslint-disable no-new-object */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

function writeToDB(collectionName, docName) {
  // Initialize Cloud Firestore through Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyAmHD6wCC5S0k4m_YRpByMBPxSKr8xMhec',
      authDomain: 'samiroomdb.firebaseio.com',
      projectId: 'samiroomdb',
    });
  }
  // Example: Enter data to firestore database
  const db = firebase.firestore();
  const docRef = db.collection(collectionName).doc(docName);
}

// Read from DB
function readFromDB(collectionName) {
  // Initialize Cloud Firestore through Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyAmHD6wCC5S0k4m_YRpByMBPxSKr8xMhec',
      authDomain: 'samiroomdb.firebaseio.com',
      projectId: 'samiroomdb',
    });
  }

  // Example: get data from firestore database
  const db = firebase.firestore();
  const object = db.collection(collectionName);
  return object;
}

function readOrderFromDB(collection, tableID) {
  // read from DB an order
  const order = readFromDB(collection);
  // read from DB apartment
  const apart = readFromDB('Apartments');
  // read from DB students
  const student = readFromDB('Students');
  // read from DB landlords
  const landlord = readFromDB('Landlord');
  // count numbers of lines in the orders table
  let index = 1;

  order.get().then((singleOrder) => {
    singleOrder.forEach((doc) => {
      // create new line
      const text = `tr${index}`;

      // add the new line to the table and give him index
      document.getElementById(tableID).innerHTML += `<tr id = tr${index}></tr>`;

      // Checkbox for mark an order
      document.getElementById(text).innerHTML += `<th scope='row'><div class='custom-control custom-checkbox'>
        <input type='checkbox' class='custom-control-input' id='customCheck${index}'><label class='custom-control-label'
        for='customCheck${index}'></label></div></th>`;

      // put orderID, apartID, address, studentName, numPayments,
      // numPaid, pricePerMonth, isPaid, startDate
      document.getElementById(text).innerHTML += `<td style="text-align: center">#${doc.data().orderID}</td>`;
      document.getElementById(text).innerHTML += `<td style="text-align: center">#${doc.data().apartID}</td>`;
      apart.where('apartmentID', '==', doc.data().apartID).get().then((apartDoc) => {
        apartDoc.forEach((a) => {
          console.log(a.data().address);
          document.getElementById(text).innerHTML += `<td style="text-align: center">${a.data().address}</td>`;
        });
      });
      student.where('ID', '==', doc.data().studentID).get().then((studentDoc) => {
        studentDoc.forEach((d) => {
          document.getElementById(text).innerHTML += `<td style="text-align: center">
                ${`${d.data().firstname}  ${d.data().lastname}`}</td>`;
        });
        document.getElementById(text).innerHTML += `<td style="text-align: center">${doc.data().numPayments}</td>`;
        document.getElementById(text).innerHTML += `<td style="text-align: center">${doc.data().numPaid}</td>`;
        apart.where('apartmentID', '==', doc.data().apartID).get().then((apartDoc) => {
          apartDoc.forEach((a) => {
            document.getElementById(text).innerHTML += `<td style="text-align: center">${a.data().pricePerMonth}₪</td>`;
          });
          if (doc.data().isPaid === true) {
            document.getElementById(text).innerHTML += '<td style="text-align: center">שולם</td>';
          }
          document.getElementById(text).innerHTML += `<td style="text-align: center">${'todo'}</td>`; // date
          document.getElementById(text).innerHTML += `<td style="text-align: center">${'order details'}</td>`; // more details
        });
      });

      index += 1;
    });
  });
}
