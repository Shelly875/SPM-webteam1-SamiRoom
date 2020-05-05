/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */


function editOrder() {
  // Variable definition
  const orderRow = $('#tbody input[type=checkbox]:checked').closest('tr');
  const status = orderRow.find('#status')[0];
  const rent = orderRow.find('#monthlyRent')[0];
  const apartID = orderRow.find('#apartID')[0];

  // check if there is more than one checkbox checked
  if (document.querySelectorAll('input:checked').length > 1) {
    alert('יש לסמן הזמנה אחת בלבד!');
  }
  if (document.querySelectorAll('input:checked').length < 1) {
    alert('יש לסמן הזמנה כדי לערוך!');
  } else {
    status.innerHTML = `<input style="height:30px" class="form-control" placeholder=${status.textContent} maxlength="10" size="7"">`;
    rent.innerHTML = `<input style="height:30px" class="form-control" placeholder=${rent.textContent} maxlength="10" size="7"">`;
  }
}

function deleteOrder() {
  // Variable definition

  // Open access to db
  const order = readFromDB('Orders'); // .doc(`order0${orderRow[2]}`);

  // Run over all the checked checkboxs
  order.get().then((allOrders) => {
    allOrders.forEach((singleOrder) => {
      // todo
    });
  });
}
