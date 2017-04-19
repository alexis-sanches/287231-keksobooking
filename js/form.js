'use strict';

var notice = document.querySelector('.notice');
var noticeForm = notice.querySelector('.notice__form');
var typeOfProperty = noticeForm.querySelector('#type');
var priceOfProperty = noticeForm.querySelector('#price');
var roomNumberOfProperty = noticeForm.querySelector('#room_number');
var capacityOfProperty = noticeForm.querySelector('#capacity');
var checkinOfProperty = noticeForm.querySelector('#time');
var checkoutOfProperty = noticeForm.querySelector('#timeout');

validateForm();

function validateForm() {
  var checkoutTime = checkoutOfProperty.querySelector('')
  checkinOfProperty.addEventListener('change', function (evt) {

  });
}

function isCheckedOption(select) {
  var checkedOption = select.querySelector('option[selected]').value;
  console.log(checkedOption);

  return checkedOption;
}
