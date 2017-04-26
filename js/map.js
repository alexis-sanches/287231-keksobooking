// map.js
'use strict';

(function () {
  var NUMBER_OF_PROPERTIES = 8;

  var lodgeTemplate = document.getElementById('lodge-template');
  var offerDialog = document.getElementById('offer-dialog');
  var properties = window.data(NUMBER_OF_PROPERTIES);
  var pins = window.render.createPins(properties);
  var pinsAndProperties = [];
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var dialogCloseImage = dialogClose.querySelector('.dialog__close img');
  var pinContainer = document.querySelector('.tokyo__pin-map');

  var openDialog = function (currentObject) {
    deactivatePins();
    window.utils.addClass(currentObject.pin, 'pin--active');
    window.utils.removeClass(offerDialog, 'hidden');
    window.card(currentObject.property);
  };

  var closeDialog = function (evt) {
    evt.preventDefault();
    deactivatePins();
    window.utils.addClass(offerDialog, 'hidden');
  };

  var deactivatePins = function () {
    pins.forEach(function (pin) {
      window.utils.removeClass(pin, 'pin--active');
    });
  };

  var connectPins = function () {
    var newObject = [];

    for (var i = 0; i < pins.length; i++) {
      var currentObject = {
        pin: pins[i],
        property: properties[i]
      };
      newObject.push(currentObject);
    }

    return newObject;
  };

  pinsAndProperties = connectPins();
  window.utils.addClass(offerDialog, 'hidden');

  pinsAndProperties.forEach(function (currentObject) {
    var pinImage = currentObject.pin.querySelector('.rounded');

    currentObject.pin.addEventListener('click', function () {
      openDialog(currentObject);
    });

    pinImage.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterCode(evt.keyCode)) {
        openDialog(currentObject);
      }
    });
  });

  document.addEventListener('keydown', function (evt) {
    if (window.utils.isEscCode(evt.keyCode) && !offerDialog.classList.contains('hidden')) {
      closeDialog(evt);
    }
  });

  dialogClose.addEventListener('click', function (evt) {
    closeDialog(evt);
  });

  dialogCloseImage.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterCode(evt.keyCode)) {
      closeDialog(evt);
    }
  });

  window.render.renderPins(pinContainer, pins);
})();
