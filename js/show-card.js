// show-card.js
'use strict';

window.showCard = (function () {
  return function (clickedElement, renderedElement, property, callback) {
    clickedElement.addEventListener('click', function (evt) {
      renderedElement.classList.remove('hidden');
      callback(clickedElement, property);
    });

    clickedElement.addEventListener('keydown', function (evt) {
      if (window.utils.isEnterCode(evt.keyCode)) {
        renderedElement.classList.remove('hidden');
        callback(clickedElement, property);
      }
    });
  };
})();
