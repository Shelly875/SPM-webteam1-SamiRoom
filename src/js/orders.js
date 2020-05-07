/* eslint-disable no-console */
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
    status.innerHTML = '<select id="statusChoice"><option value="complete">שולם</option>'
      + '<option value="incomplete">טרם שולם</option></select>';
    rent.innerHTML = `<input type="text" style="height:30px" class="form-control" 
      placeholder=${rent.textContent} maxlength="10" size="7"">`;
    orderRow[0].innerHTML += '<td><input type="submit" value="שלח"></td>';

    orderRow[0].addEventListener('keyup', (event) => {
      if (event.keyCode === 13) {
        if ($('#statusChoice option:selected').text() === 'שולם') {
          status.innerHTML = `<td><text id="status" style="text-align: center;color:green;">
            ${$('#statusChoice option:selected').text()}</text></td>`;
        }
      }
    });
  }
}

function deleteOrder() {
  // Variable definition

  // Open access to db
  const order = readFromDB('Orders'); // .doc(`order0${orderRow[2]}`);

  // Run over all the checked checkboxs
  order.get().then((allOrders) => {
    allOrders.forEach((singleOrder) => {
    });
  });
}
