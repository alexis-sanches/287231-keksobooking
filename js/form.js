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
  checkinOfProperty.addEventListener('change', onCheckinChange);
  
  checkoutOfProperty.addEventListener('change', onCheckoutChange);

  roomNumberOfProperty.addEventListener('change', onRoomsNumberChange);

  typeOfProperty.addEventListener('change', onTypeChange);

  capacityOfProperty.addEventListener('change', onCapacityChange);

  noticeForm.addEventListener('submit', function () {
    noticeForm.reset();
  });

  function onCheckinChange(evt) {
    checkoutOfProperty.value = evt.target.value;
  }

  function onCheckoutChange(evt) {
    checkinOfProperty.value = evt.target.value;
  }

  function onTypeChange(evt) {
    switch (evt.target.value) {
      case 'flat':
        priceOfProperty.value = 1000;
        priceOfProperty.min = 1000;
        break;
      case 'hut':
        priceOfProperty.value = 0;
        priceOfProperty.min = 0;
        break;
      default:
        priceOfProperty.value = 10000;
        priceOfProperty.min = 10000;
        break;
    }
  }

  function onRoomsNumberChange(evt) {
    switch (evt.target.value) {
      case '1':
        capacityOfProperty.value = 0;
        break;
      default:
        capacityOfProperty.value = 3;
    }
  }

  function onCapacityChange(evt) {
    switch (evt.target.value) {
      case '3':
        roomNumberOfProperty.value = 2;
        break;
    }
  }
}
