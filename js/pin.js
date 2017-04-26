// pin.js
'use strict';

window.render = (function () {
  var createPins = function (properties) {
    var pins = [];

    properties.forEach(function (property) {
      var pin = createPin(property);

      pins.push(pin);
    });

    return pins;
  };

  var createPin = function (property) {
    var pin = document.createElement('div');
    var avatarImage = document.createElement('img');

    pin.className = 'pin';

    pin.style.left = property.location.x + 'px';
    pin.style.top = property.location.y + 'px';

    avatarImage.className = 'rounded';
    avatarImage.src = property.author.avatar;
    avatarImage.width = 40;
    avatarImage.height = 40;
    avatarImage.tabIndex = 0;

    pin.appendChild(avatarImage);

    return pin;
  };

  var renderPins = function (container, pinElements) {
    var fragment = document.createDocumentFragment();

    pinElements.forEach(function (element) {
      fragment.appendChild(element);
    });

    container.appendChild(fragment);
  };

  return {
    createPins: createPins,
    renderPins: renderPins
  };
})();
