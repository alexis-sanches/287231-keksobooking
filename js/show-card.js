// show-card.js
'use strict';

window.showCard = (function () {
  return function (clickedElement, renderedElement, property, callback) {
    clickedElement.addEventListener('click', function (evt) {
      onPinClick(evt);
    });

    clickedElement.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterCode(evt.keyCode)) {
        onPinClick(evt);
      }
    });

    function onPinClick(evt) {
      renderedElement.classList.remove('hidden');
      callback(clickedElement, property);
    }
  };
})();
