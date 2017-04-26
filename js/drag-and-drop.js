// map.js
'use strict';

(function () {
  var PIN_MAIN_HEIGHT = 94;
  var PIN_MAIN_WIDTH = 75;

  var pinMain = document.querySelector('.pin__main');
  var addressOfProperty = document.querySelector('#address');

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';

      addressOfProperty.value = 'x: ' + (pinMain.offsetLeft - shift.x + Math.floor(PIN_MAIN_WIDTH / 2)) + ', y: ' + (pinMain.offsetTop - shift.y + PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      pinMain.removeEventListener('mousemove', onMouseMove);
      pinMain.removeEventListener('mouseup', onMouseUp);
    };

    pinMain.addEventListener('mousemove', onMouseMove);
    pinMain.addEventListener('mouseup', onMouseUp);
  });

  addressOfProperty.addEventListener('change', function (evt) {
    var pinCoordinates = {
      x: evt.target.value.split(', ')[0].slice(3, 6),
      y: evt.target.value.split(', ')[1].slice(3, 6)
    };

    pinMain.style.left = (+pinCoordinates.x - Math.floor(PIN_MAIN_WIDTH / 2)) + 'px';
    pinMain.style.top = (+pinCoordinates.y - PIN_MAIN_HEIGHT) + 'px';
  });
})();
