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
      type: optionFilter('type', array, filters),
      price: priceFilter(array, filters),
      rooms: optionFilter('rooms', array, filters),
      guests: optionFilter('guests', array, filters),
      wifi: featureFilter('wifi', array, filters),
      dishwasher: featureFilter('dishwasher', array, filters),
      parking: featureFilter('parking', array, filters),
      washer: featureFilter('washer', array, filters),
      elevator: featureFilter('elevator', array, filters),
      conditioner: featureFilter('conditioner', array, filters),
    };

    function optionFilter(option, array, filters) {
      var filteredArray = array.filter(function (it) {
        if (filters[option] === 'any') {

          return true;
        } else {

          return it.offer[option] === +filters[option];
        };
      });

      return filteredArray;
    }

    function featureFilter(feature, array, filters) {
      var filteredArray = array.filter(function (it) {
        if (!filters[feature]) {

          return true
        } else {

          return it.offer.features.includes(feature);
        }
      });

      return filteredArray;
    }

    function priceFilter(array, filters) {
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
