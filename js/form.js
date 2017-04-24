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
};

var notice = document.querySelector('.notice');
var noticeForm = notice.querySelector('.notice__form');
var typeOfProperty = noticeForm.querySelector('#type');
var priceOfProperty = noticeForm.querySelector('#price');
var roomNumberOfProperty = noticeForm.querySelector('#room_number');
var capacityOfProperty = noticeForm.querySelector('#capacity');
var checkinOfProperty = noticeForm.querySelector('#time');
var checkoutOfProperty = noticeForm.querySelector('#timeout');
var submitForm = noticeForm.querySelector('.form__submit');

validateForm();

function validateForm() {
  checkinOfProperty.addEventListener('change', onCheckinChange);

  checkoutOfProperty.addEventListener('change', onCheckoutChange);

  roomNumberOfProperty.addEventListener('change', onRoomsNumberChange);

  typeOfProperty.addEventListener('change', onTypeChange);

  capacityOfProperty.addEventListener('change', onCapacityChange);

  noticeForm.addEventListener('submit', function (evt) {
    if (!checkFormValidity()) {
      evt.preventDefault();
      addInvalidClass(noticeForm.elements);
    }
  });

  function addInvalidClass(array) {
    for (var i = 0; i < array.length; i++) {
      if (!array[i].validity.valid) {
        array[i].classList.add('invalid');
      }
    }
  }

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
    var flatType = evt.target.value || 'default';

    priceOfProperty.value = TYPES[flatType].price;
    priceOfProperty.min = TYPES[flatType].minPrice;
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
