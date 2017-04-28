// filter.js
'use strict';

window.filter = (function () {
  return function (array) {
    var tokyoFilters = document.querySelector('.tokyo__filters');
    var type = tokyoFilters.querySelector('#housing_type');
    var price = tokyoFilters.querySelector('#housing_price');
    var rooms = tokyoFilters.querySelector('#housing_room-number');
    var guests = tokyoFilters.querySelector('#housing_guests-number');
    var features = tokyoFilters.querySelectorAll('#housing_features input');

    var MAX_PRICE = Math.max.apply(Math, array.map(function (it) {
      return it.offer.price;
    }));

    var PRICES = {
      high: [50000, MAX_PRICE],
      middle: [10000, 50000],
      low: [0, 10000]
    };

    var filters = {
      type: optionFilter(type),
      price: priceFilter(),
      rooms: optionFilter(rooms),
      guests: optionFilter(guests),
      features: featuresFilter(features)
    };

    function optionFilter(option) {
      return array.filter(function (it) {
        if (option.value === 'any') {

          return true;
        }

        return it.offer[option] === +option.value;
      });
    }

    function priceFilter() {
      return array.filter(function (it) {
        return it.offer.price > PRICES[price.value][0] && it.offer.price <= PRICES[price.value][1];
      });
    }

    function featuresFilter(featuresList) {
      for (var i = 0; i < featuresList.length; i++) {
        array = array.filter(function (it) {
          if (window.utils.isChecked(featuresList[i])) {

            return it.offer.features.includes(featuresList[i].value);
          }

          return true;
        });
      }

      return array;
    }

    return array.filter(function (it) {
      for (var filter in filters) {
        if (!filters[filter].includes(it)) {

          return false;
        }
      }

      return true;
    });
  };
})();
