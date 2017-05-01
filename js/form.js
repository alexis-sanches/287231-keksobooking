// form.js
'use strict';

(function () {
  var notice = document.querySelector('.notice');
  var noticeForm = notice.querySelector('.notice__form');
  var typeOfProperty = noticeForm.querySelector('#type');
  var priceOfProperty = noticeForm.querySelector('#price');
  var roomNumberOfProperty = noticeForm.querySelector('#room_number');
  var capacityOfProperty = noticeForm.querySelector('#capacity');
  var checkinOfProperty = noticeForm.querySelector('#time');
  var checkoutOfProperty = noticeForm.querySelector('#timeout');

  var checkTimeValues = ['12', '13', '14'];
  var typesValues = ['flat', 'hut', 'palace'];
  var priceValues = [1000, 0, 10000];
  var roomsValues = ['1', '2', '100'];
  var capacityValues = ['0', '3', '3'];

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    if (!checkFormValidity()) {
      window.utils.addInvalidClass(noticeForm.elements);
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

  window.synchronizeFields(checkinOfProperty, checkoutOfProperty, checkTimeValues, checkTimeValues, syncValues);

  window.synchronizeFields(checkoutOfProperty, checkinOfProperty, checkTimeValues, checkTimeValues, syncValues);

  window.synchronizeFields(typeOfProperty, priceOfProperty, typesValues, priceValues, syncPrices);

  window.synchronizeFields(roomNumberOfProperty, capacityOfProperty, roomsValues, capacityValues, syncValues);

  window.synchronizeFields(capacityOfProperty, roomNumberOfProperty, capacityValues.slice(0, 2), roomsValues.slice(0, 2), syncValues);

  function syncValues(element, value) {
    element.value = value;
  }

  function syncPrices(element, value) {
    element.value = value;
    element.placeholder = value;
  }

  function checkFormValidity() {
    [].some.call(noticeForm.elements, function (it) {
      return !it.checkValidity();
    });
  }
})();
