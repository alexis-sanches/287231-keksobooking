// form.js
'use strict';

(function () {
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

  var CAPACITY_OF_PROPERTY = {
    zero: 0,
    three: 3
  };

  var notice = document.querySelector('.notice');
  var noticeForm = notice.querySelector('.notice__form');
  var typeOfProperty = noticeForm.querySelector('#type');
  var priceOfProperty = noticeForm.querySelector('#price');
  var roomNumberOfProperty = noticeForm.querySelector('#room_number');
  var capacityOfProperty = noticeForm.querySelector('#capacity');
  var checkinOfProperty = noticeForm.querySelector('#time');
  var checkoutOfProperty = noticeForm.querySelector('#timeout');

  var checkFormValidity = function () {
    for (var i = 0; i < noticeForm.elements.length; i++) {
      if (!noticeForm.elements[i].checkValidity()) {
        return false;
      }
    }

    return true;
  };

  var addInvalidClass = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (!array[i].validity.valid) {
        array[i].style.border = '2px solid red';
      }
    }
  };

  var onCheckinChange = function (evt) {
    checkoutOfProperty.value = evt.target.value;
  };

  var onCheckoutChange = function (evt) {
    checkinOfProperty.value = evt.target.value;
  };

  var onTypeChange = function (evt) {
    var flatType = evt.target.value;

    if (TYPES[flatType]) {
      priceOfProperty.value = TYPES[flatType].price;
      priceOfProperty.min = TYPES[flatType].minPrice;
    }
  };

  var onRoomsNumberChange = function (evt) {
    if (evt.target.value === '1') {
      capacityOfProperty.value = CAPACITY_OF_PROPERTY.zero;
    } else {
      capacityOfProperty.value = CAPACITY_OF_PROPERTY.three;
    }
  };

  var onCapacityChange = function (evt) {
    if (evt.target.value === '3') {
      roomNumberOfProperty.value = 2;
    }
  };

  checkinOfProperty.addEventListener('change', onCheckinChange);
  checkoutOfProperty.addEventListener('change', onCheckoutChange);
  roomNumberOfProperty.addEventListener('change', onRoomsNumberChange);
  typeOfProperty.addEventListener('change', onTypeChange);
  capacityOfProperty.addEventListener('change', onCapacityChange);

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (!checkFormValidity()) {
      addInvalidClass(noticeForm.elements);
    } else {
      noticeForm.submit();
      noticeForm.reset();
    }
  });

  noticeForm.addEventListener('change', function (evt) {
    if (evt.target.checkValidity()) {
      evt.target.style.border = null;
    }
  });
})();
