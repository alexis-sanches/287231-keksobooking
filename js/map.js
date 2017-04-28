// map.js
'use strict';

(function () {
  var pinContainer = document.querySelector('.tokyo__pin-map');
  var tokyoFilters = document.querySelector('.tokyo__filters');

  var DELAY_TIME = 500;

  window.load.getData('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', onLoad);

  function onLoad(response) {
    tokyoFilters.addEventListener('change', function () {
      var properties = window.filter(response);

      window.debounce(window.pin.render.bind(null, pinContainer, properties), DELAY_TIME);
    });

    window.pin.render(pinContainer, response.slice(0, 3));
  }
})();
