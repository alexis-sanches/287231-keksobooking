// map.js
'use strict';

(function () {
  var properties;
  var pinContainer = document.querySelector('.tokyo__pin-map');
  var tokyoFilters = document.querySelector('.tokyo__filters');

  var controls = {
    type: tokyoFilters.querySelector('#housing_type'),
    price: tokyoFilters.querySelector('#housing_price'),
    rooms: tokyoFilters.querySelector('#housing_room-number'),
    guests: tokyoFilters.querySelector('#housing_guests-number'),
    wifi: tokyoFilters.querySelector('input[value=wifi]'),
    dishwasher: tokyoFilters.querySelector('input[value=dishwasher]'),
    parking: tokyoFilters.querySelector('input[value=parking]'),
    washer: tokyoFilters.querySelector('input[value=washer]'),
    elevator: tokyoFilters.querySelector('input[value=elevator]'),
    conditioner: tokyoFilters.querySelector('input[value=conditioner]')
  };

  var filters = {
    type: controls.type.value,
    price: controls.price.value,
    rooms: controls.rooms.value,
    guests: controls.guests.value,
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false
  };

  window.load.getData('https://intensive-javascript-server-kjgvxfepjl.now.sh/keksobooking/data', onLoad);

  function onLoad(response) {
    Object.values(controls).forEach(function (control, i) {
      control.addEventListener('change', function (evt) {
        if (evt.target.tagName === 'SELECT') {
          filters[Object.keys(filters)[i]] = evt.target.value;
        } else if (evt.target.checked) {
          filters[Object.keys(filters)[i]] = true;
        } else {
          filters[Object.keys(filters)[i]] = false;
        }

        renderPins(response);
      });
    });

    renderPins(response);
  }

  function filterPins(evt) {
    if (evt.target.tagName === 'SELECT') {
      filters[Object.keys(filters)[i]] = evt.target.value;
    } else if (evt.target.checked) {
      filters[Object.keys(filters)[i]] = true;
    } else {
      filters[Object.keys(filters)[i]] = false;
    }

    renderPins(response);
  }

  function renderPins(response) {
    properties = window.filterProperties(response, filters);

    window.pin.render(pinContainer, properties);
  }
})();
