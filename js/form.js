'use strict';

var notice = document.querySelector('.notice');
var noticeForm = notice.querySelector('.notice__form');
var typeOfProperty = noticeForm.getElementById('type');
var priceOfProperty = noticeForm.getElementById('price');
var roomNumberOfProperty = noticeForm.getElementById('room_number');
var capacityOfProperty = noticeForm.getElementById('capacity');
var checkinOfProperty = noticeForm.getElementById('time');
var checkoutOfProperty = noticeForm.getElementById('timeout');

validateForm();

function validateForm() {
  checkinOfProperty.addEventListener('change', function (evt) {

  });
}

function isCheckedOption(select) {
  var checkedOption = select.querySelector('option[selected]');

  return checkedOption;
}
