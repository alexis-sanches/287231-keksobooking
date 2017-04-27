// map.js
'use strict';

(function () {
  var pinContainer = document.querySelector('.tokyo__pin-map');

  window.load.getData('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', onLoad);

  function onLoad(response) {
    var properties = response;

    window.pin.render(pinContainer, properties);
  }
})();
