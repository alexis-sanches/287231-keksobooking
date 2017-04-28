// map.js
'use strict';

(function () {
  var properties;
  var pinContainer = document.querySelector('.tokyo__pin-map');
  var tokyoFilters = document.querySelector('.tokyo__filters');

  window.load.getData('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', onLoad);

  function onLoad(response) {
    tokyoFilters.addEventListener('change', function () {
      window.debounce(renderPins);
    });

    window.pin.render(pinContainer, response.slice(0, 3));

    function renderPins() {
      properties = window.filter(response);

      window.pin.render(pinContainer, properties);
    }
  }
})();
