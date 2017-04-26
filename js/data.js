// data.js
'use strict';

window.data = (function () {
  var PROPERTY_TITLES = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ];

  var PROPERTY_TYPES = {
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo'
  };

  var PROPERTY_CHECK_TIMES = [
    '12:00',
    '13:00',
    '14:00'
  ];

  var PROPERTY_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  var PRICE_MIN = 1000;
  var PRICE_MAX = 1000000;

  var LOCATION_X_MIN = 300;
  var LOCATION_X_MAX = 900;

  var LOCATION_Y_MIN = 100;
  var LOCATION_Y_MAX = 500;

  var ROOM_NUMBER_MIN = 1;
  var ROOM_NUMBER_MAX = 5;

  var GUESTS_NUMBER_MIN = 1;
  var GUESTS_NUMBER_MAX = 10;

  var createProperties = function (numberOfProperties) {
    var propertyTitlesList = window.utils.getRandomElementsFromArray(PROPERTY_TITLES, numberOfProperties);
    var properties = [];

    for (var i = 0; i < numberOfProperties; i++) {
      var property = createRandomProperty(i, propertyTitlesList);

      properties.push(property);
    }

    return properties;
  };

  var createRandomProperty = function (index, titles) {
    var location = {
      x: window.utils.getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
      y: window.utils.getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
    };

    var title = titles[index];
    var featuresNumber = window.utils.getRandomArrayIndex(PROPERTY_FEATURES) + 1;

    return {
      author: {
        avatar: 'img/avatars/user0' + (index + 1) + '.png'
      },
      offer: {
        title: title,
        address: location.x + ',' + location.y,
        price: window.utils.getRandomNumber(PRICE_MIN, PRICE_MAX),
        type: getPropertyTypeByTitle(title),
        rooms: window.utils.getRandomNumber(ROOM_NUMBER_MIN, ROOM_NUMBER_MAX),
        guests: window.utils.getRandomNumber(GUESTS_NUMBER_MIN, GUESTS_NUMBER_MAX),
        checkin: window.utils.getRandomArrayElement(PROPERTY_CHECK_TIMES),
        checkout: window.utils.getRandomArrayElement(PROPERTY_CHECK_TIMES),
        features: window.utils.getRandomElementsFromArray(PROPERTY_FEATURES, featuresNumber),
        description: '',
        photo: []
      },
      location: location
    };
  };

  var getPropertyTypeByTitle = function (title) {
    var lowerCaseTitle = title.toLowerCase();

    if (~lowerCaseTitle.indexOf('бунгало')) {
      return PROPERTY_TYPES.BUNGALO;
    }

    if (~lowerCaseTitle.indexOf('квартир')) {
      return PROPERTY_TYPES.FLAT;
    }

    return PROPERTY_TYPES.HOUSE;
  };

  return {
    createProperties: createProperties
  };
})();
