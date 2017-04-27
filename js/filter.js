// filter.js
'use strict';

window.filterProperties = (function () {
  return function (array, filters) {
    var MAX_PRICE = Math.max.apply(Math, array.map(function (it) {
      return it.offer.price;
    }));

    var PRICES = {
      high: [50000, MAX_PRICE],
      middle: [10000, 50000],
      low: [0, 10000]
    };

    var filtersList = {
      type: optionFilter('type'),
      price: priceFilter(),
      rooms: optionFilter('rooms'),
      guests: optionFilter('guests'),
      wifi: featureFilter('wifi'),
      dishwasher: featureFilter('dishwasher'),
      parking: featureFilter('parking'),
      washer: featureFilter('washer'),
      elevator: featureFilter('elevator'),
      conditioner: featureFilter('conditioner'),
    };

    function optionFilter(option) {
      return array.filter(function (it) {
        if (filters[option] === 'any') {

          return true;
        }

        return it.offer[option] === +filters[option];
      });
    }

    function featureFilter(feature) {
      return array.filter(function (it) {
        if (!filters[feature]) {

          return true
        }

        return it.offer.features.includes(feature);
      });
    }

    function priceFilter() {
      return array.filter(function (it) {
        return it.offer.price > PRICES[filters.price][0] && it.offer.price <= PRICES[filters.price][1];
      });
    }

    var properties = array.filter(function (it) {
      for (var filter in filtersList) {
        if (!filtersList[filter].includes(it)) {

          return false;
        }
      }

      return true;
    });

    return properties
  };
})();
