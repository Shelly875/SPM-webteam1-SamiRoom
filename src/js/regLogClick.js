/* eslint-disable prefer-const */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
logOrReg = true;
$('#regtitle').hide();
$('.message a').click(() => {
  $('form').animate({ height: 'toggle', opacity: 'toggle' }, 'slow');
  if (logOrReg) {
    $('#logintitle').hide();
    $('#regtitle').show();
  // eslint-disable-next-line no-empty
  } else {
    $('#regtitle').hide();
    $('#logintitle').show();
  }
  logOrReg = !logOrReg;
});

// eslint-disable-next-line func-names
$('#userType').change(function () {
  if ($(this).val() == 'student') {
    $('#studentdiv').show();
 
    $('#idPic').attr('required', '');
    $('#idPic').attr('data-error', 'This field is required.');
  
  } else {
    $('#studentdiv').hide();
  
    $('#idPic').removeAttr('required');
    $('#idPic').removeAttr('data-error');

  }
});
$('#userType').trigger('change');
