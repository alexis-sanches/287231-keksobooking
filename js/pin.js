// pin.js
'use strict';

window.pin = (function () {
  var offerDialog = document.getElementById('offer-dialog');
  var PIN_IMAGE_SIZE = 40;

  var renderPins = function (container, properties) {
    var previousPins = document.querySelectorAll('.pin:not(.pin__main)');
    var fragment = document.createDocumentFragment();
    var pins = [];

    for (var i = 0; i < previousPins.length; i++) {
      container.removeChild(previousPins[i]);
    }

    properties.forEach(function (property) {
      var pin = createPin(property);

      pins.push(pin);
    });

    pins.forEach(function (it, index) {
      window.showCard(it, offerDialog, properties[index], openDialog);
      fragment.appendChild(it);
    });

    container.appendChild(fragment);
  };

  function createPin(property) {
    var pin = document.createElement('div');
    var avatarImage = document.createElement('img');

    pin.className = 'pin';

    pin.style.left = property.location.x + 'px';
    pin.style.top = property.location.y + 'px';

    avatarImage.className = 'rounded';
    avatarImage.src = property.author.avatar;
    avatarImage.width = PIN_IMAGE_SIZE;
    avatarImage.height = PIN_IMAGE_SIZE;
    avatarImage.tabIndex = 0;

    pin.appendChild(avatarImage);

    return pin;
  }

  function openDialog(pin, property) {
    window.utils.removeClassFromAll('pin--active');
    pin.classList.add('pin--active');
    offerDialog.classList.remove('hidden');
    window.card.renderPropertyElement(property);
  }

  return {
    render: renderPins
  };
})();
