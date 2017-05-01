// filter.js
'use strict';

window.filter = (function () {
  var tokyoFilters = document.querySelector('.tokyo__filters');
  var type = tokyoFilters.querySelector('#housing_type');
  var price = tokyoFilters.querySelector('#housing_price');
  var rooms = tokyoFilters.querySelector('#housing_room-number');
  var guests = tokyoFilters.querySelector('#housing_guests-number');
  var features = tokyoFilters.querySelectorAll('#housing_features input');

  var PRICES = {
    high: [50000, 10000000],
    middle: [10000, 50000],
    low: [0, 10000]
  };

  return function (array) {
    function typeFilter(arr) {
      return arr.filter(function (it) {
        return type.value === 'any'
          ? true
          : it.offer.type === type.value;
      });
    }

    function guestsFilter(arr) {
      return arr.filter(function (it) {
        return guests.value === 'any'
          ? true
          : it.offer.guests === +guests.value;
      });
    }

    function roomsFilter(arr) {
      return arr.filter(function (it) {
        return rooms.value === 'any'
          ? true
          : it.offer.rooms === +rooms.value;
      });
    }

    function priceFilter(arr) {
      return arr.filter(function (it) {
        return price.value === 'any'
          ? true
          : it.offer.price > PRICES[price.value][0] && it.offer.price <= PRICES[price.value][1];
      });
    }

    function featuresFilter(featuresList) {
      return function (arr) {
        featuresList.forEach(function (feature) {
          arr = arr.filter(function (it) {
            return window.utils.isChecked(feature)
              ? it.offer.features.includes(feature.value)
              : true;
          });
        });

        return arr;
      };
    }

    return [typeFilter,
      priceFilter,
      roomsFilter,
      guestsFilter,
      featuresFilter(features)].reduce(function (prev, filter) {
        return filter(prev);
      }, array);

  };
})();
