// map.js
'use strict';

(function () {
  var NUMBER_OF_PROPERTIES = 8;

  var offerDialog = document.getElementById('offer-dialog');
  var properties = window.data.createProperties(NUMBER_OF_PROPERTIES);
  var pins = window.render.createPins(properties);
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var pinContainer = document.querySelector('.tokyo__pin-map');

  pins.forEach(function (it, i) {
    window.showCard(it, offerDialog, properties[i], openDialog);
  });

  document.addEventListener('keydown', function (evt) {
    if (window.utils.isEscCode(evt.keyCode) && !offerDialog.classList.contains('hidden')) {
      closeDialog(evt);
    }
  });

  dialogClose.addEventListener('click', function (evt) {
    closeDialog(evt);
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterCode(evt.keyCode)) {
      closeDialog(evt);
    }
  });

  window.render.renderPins(pinContainer, pins);

  function openDialog(pin, property) {
    deactivatePins();
    pin.classList.add('pin--active');
    offerDialog.classList.remove('hidden');
    window.card.renderPropertyElement(property);
  }

  function closeDialog(evt) {
    evt.preventDefault();
    deactivatePins();
    offerDialog.classList.add('hidden');
  }

  function deactivatePins() {

  }

  var closeDialog = function (evt) {
    pins.forEach(function (pin) {
      pin.classList.remove('pin--active');
    });
  };
})();
