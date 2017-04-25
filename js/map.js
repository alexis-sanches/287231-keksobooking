'use strict';

var lodgeTemplate = document.getElementById('lodge-template');
var offerDialog = document.getElementById('offer-dialog');
var pinContainer = document.querySelector('.tokyo__pin-map');

(function () {
  var NUMBER_OF_PROPERTIES = 8;

  var properties = window.data(NUMBER_OF_PROPERTIES);
  var pinsList = window.render.createPins(properties);

  window.render.renderPins(pinContainer, pinsList);
  events();

  function events() {
    var pins = pinContainer.querySelectorAll('.pin:not(.pin__main)');
    var pinsAndProperties = connectPins();
    var dialogClose = offerDialog.querySelector('.dialog__close');
    var dialogCloseImage = dialogClose.querySelector('.dialog__close img');

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

    function openDialog(currentObject) {
      deactivatePins();
      window.utils.addClass(currentObject.pin, 'pin--active');
      window.utils.removeClass(offerDialog, 'hidden');
      window.card(currentObject.property);
    }

    function closeDialog(evt) {
      evt.preventDefault();
      deactivatePins();
      window.utils.addClass(offerDialog, 'hidden');
    }

    function deactivatePins() {
      pins.forEach(function (pin) {
        window.utils.removeClass(pin, 'pin--active');
      });
    }

    function connectPins() {
      var newObject = [];

      for (var i = 0; i < pins.length; i++) {
        var currentObject = {
          pin: pins[i],
          property: properties[i]
        };
        newObject.push(currentObject);
      }

      return newObject;
    }
  }
})();
