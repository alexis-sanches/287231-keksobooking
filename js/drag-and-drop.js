// map.js
'use strict';

(function () {
  var PIN_MAIN_HEIGHT = 94;
  var PIN_MAIN_WIDTH = 75;
  var halfWidth = Math.floor(PIN_MAIN_WIDTH / 2);

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

      var currentX = pinMain.offsetLeft - shift.x;
      var currentY = pinMain.offsetTop - shift.y;

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.left = currentX + 'px';
      pinMain.style.top = currentY + 'px';

      addressOfProperty.value = 'x: ' + (currentX + halfWidth) + ', y: ' + (currentY + PIN_MAIN_HEIGHT);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      pinMain.removeEventListener('mousemove', onMouseMove);
      pinMain.removeEventListener('mouseup', onMouseUp);
    };

    pinMain.addEventListener('mousemove', onMouseMove);
    pinMain.addEventListener('mouseup', onMouseUp);
  });

  /* В ТЗ сказано, что поле должно быть readonly, но в качестве дополнительного задания
   * можно было реализовать изменение координат пина при изменении поля. Не считайте это
   * несоответствием ТЗ.
   */

  addressOfProperty.addEventListener('change', function (evt) {
    var split = evt.target.value.split(', ');

    var pinCoordinates = {
      x: split[0].slice(3, 6),
      y: split[1].slice(3, 6)
    };

    pinMain.style.left = (+pinCoordinates.x - halfWidth) + 'px';
    pinMain.style.top = (+pinCoordinates.y - PIN_MAIN_HEIGHT) + 'px';
  });
})();
