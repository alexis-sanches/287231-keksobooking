'use strict';

var TYPES = {
  flat: {
    price: 1000,
    minPrice: 1000
  },
  hut: {
    price: 0,
    minPrice: 0
  },
  palace: {
    price: 10000,
    minPrice: 10000
  },
}

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
    if (!checkFormValidity()) {
      evt.preventDefault();
    } else {
      noticeForm.reset();
      noticeForm.submit();
    }
  });

  function checkFormValidity() {
    for (var i = 0; i < noticeForm.elements.length; i++) {
      if (!noticeForm.elements[i].checkValidity()) {
        return false;
      }
    }

    return true;
  }

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
    if (evt.target.value === '1') {
      capacityOfProperty.value = 0;
    } else {
      capacityOfProperty.value = 3;
    }
  }

  function onCapacityChange(evt) {
    if (evt.target.value === '3') {
      roomNumberOfProperty.value = 2;
    }
  }
}
