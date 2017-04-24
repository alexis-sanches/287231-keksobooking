'use strict';

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

var PROPERTY_TYPE_TRANSLATIONS = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
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

var NUMBER_OF_PROPERTIES = 8;

var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;

var lodgeTemplate = document.getElementById('lodge-template');
var offerDialog = document.getElementById('offer-dialog');
var pinContainer = document.querySelector('.tokyo__pin-map');

init();

function init() {
  var properties = createProperties(NUMBER_OF_PROPERTIES);
  var pins = createPins(properties);

  renderPins(pinContainer, pins);
  events(properties);
}

function createPins(properties) {
  var pins = [];

  properties.forEach(function (property) {
    var pin = createPin(property);

    pins.push(pin);
  });

  return pins;
}

function createProperties(numberOfProperties) {
  var propertyTitlesList = getRandomElementsFromArray(PROPERTY_TITLES, numberOfProperties);
  var properties = [];

  for (var i = 0; i < numberOfProperties; i++) {
    var property = createRandomProperty(i, propertyTitlesList);

    properties.push(property);
  }

  return properties;
}

function createRandomProperty(index, titles) {
  var location = {
    x: getRandomNumber(LOCATION_X_MIN, LOCATION_X_MAX),
    y: getRandomNumber(LOCATION_Y_MIN, LOCATION_Y_MAX)
  };

  var title = titles[index];
  var featuresNumber = getRandomArrayIndex(PROPERTY_FEATURES) + 1;

  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: title,
      address: location.x + ',' + location.y,
      price: getRandomNumber(PRICE_MIN, PRICE_MAX),
      type: getPropertyTypeByTitle(title),
      rooms: getRandomNumber(ROOM_NUMBER_MIN, ROOM_NUMBER_MAX),
      guests: getRandomNumber(GUESTS_NUMBER_MIN, GUESTS_NUMBER_MAX),
      checkin: getRandomArrayElement(PROPERTY_CHECK_TIMES),
      checkout: getRandomArrayElement(PROPERTY_CHECK_TIMES),
      features: getRandomElementsFromArray(PROPERTY_FEATURES, featuresNumber),
      description: '',
      photo: []
    },
    location: location
  };
}

function createPin(property) {
  var pin = document.createElement('div');
  var avatarImage = document.createElement('img');

  pin.className = 'pin';

  pin.style.left = property.location.x + 'px';
  pin.style.top = property.location.y + 'px';

  avatarImage.className = 'rounded';
  avatarImage.src = property.author.avatar;
  avatarImage.width = 40;
  avatarImage.height = 40;
  avatarImage.tabIndex = 0;

  pin.appendChild(avatarImage);

  return pin;
}

function renderPins(container, pinElements) {
  var fragment = document.createDocumentFragment();

  pinElements.forEach(function (element) {
    fragment.appendChild(element);
  });

  container.appendChild(fragment);
}

function renderPropertyElement(property) {
  var element = lodgeTemplate.content.cloneNode(true);
  var dialogPanel = document.querySelector('.dialog__panel');
  var lodgeTitle = element.querySelector('.lodge__title');
  var lodgeAddress = element.querySelector('.lodge__address');
  var lodgePrice = element.querySelector('.lodge__price');
  var lodgeType = element.querySelector('.lodge__type');
  var lodgeRoomsAndGuests = element.querySelector('.lodge__rooms-and-guests');
  var lodgeCheckin = element.querySelector('.lodge__checkin-time');
  var lodgeFeatures = element.querySelector('.lodge__features');
  var lodgeDescription = element.querySelector('.lodge__description');
  var dialogImage = document.querySelector('.dialog__title > img');

  lodgeTitle.textContent = property.offer.title;
  lodgeAddress.textContent = property.offer.address;
  lodgePrice.textContent = property.offer.price + ' ₽/ночь';
  lodgeType.textContent = PROPERTY_TYPE_TRANSLATIONS[property.offer.type];
  lodgeRoomsAndGuests.textContent = 'Для ' + property.offer.guests + ' гостей в ' + property.offer.rooms + ' комнатах';
  lodgeCheckin.textContent = 'Заезд после ' + property.offer.checkin + ', выезд до ' + property.offer.checkout;
  lodgeFeatures.appendChild(createFeaturesElement(property.offer.features));
  lodgeDescription.textContent = property.offer.description;

  dialogImage.setAttribute('src', property.author.avatar);
  offerDialog.replaceChild(element, dialogPanel);
}

function createFeaturesElement(features) {
  var fragment = document.createDocumentFragment();

  features.forEach(function (feature) {
    var featureElement = document.createElement('span');
    featureElement.classList.add('feature__image');
    featureElement.classList.add('feature__image--' + feature);
    fragment.appendChild(featureElement);
  });

  return fragment;
}

function getPropertyTypeByTitle(title) {
  var lowerCaseTitle = title.toLowerCase();

  if (~lowerCaseTitle.indexOf('бунгало')) {
    return PROPERTY_TYPES.BUNGALO;
  }

  if (~lowerCaseTitle.indexOf('квартир')) {
    return PROPERTY_TYPES.FLAT;
  }

  return PROPERTY_TYPES.HOUSE;
}

/**
 * MODULE UTILS.JS
 *
 * AUXILLIARY FUNCTIONS
 */

function getRandomElementsFromArray(arr, numberOfElements) {
  var arrayCopy = arr.slice();
  var newArray = [];

  if (numberOfElements === 'undefined') {
    numberOfElements = arr.length + 1;
  }

  for (var i = 0; i < numberOfElements; i++) {
    var randomIndex = getRandomArrayIndex(arrayCopy);

    newArray.push(arrayCopy[randomIndex]);
    arrayCopy.splice(randomIndex, 1);
  }

  return newArray;
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomArrayElement(array) {
  return array[getRandomArrayIndex(array)];
}

function getRandomArrayIndex(array) {
  return getRandomNumber(0, array.length);
}

function addClass(element, newClass) {
  element.classList.add(newClass);
}

function removeClass(element, newClass) {
  element.classList.remove(newClass);
}

/**
 * MODULE EVENTS.JS
 */

function events(properties) {
  var pins = pinContainer.querySelectorAll('.pin:not(.pin__main)');
  var pinsAndProperties = connectPins();
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var dialogCloseImage = dialogClose.querySelector('.dialog__close img');


  addClass(offerDialog, 'hidden');

  pinsAndProperties.forEach(function (currentObject) {
    var pinImage = currentObject.pin.querySelector('.rounded');


    currentObject.pin.addEventListener('click', function () {
      openDialog(currentObject);
    });

    pinImage.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER_KEY_CODE) {
        openDialog(currentObject);
      }
    });
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEY_CODE && !offerDialog.classList.contains('hidden')) {
      closeDialog(evt);
    }
  });

  dialogClose.addEventListener('click', function (evt) {
    closeDialog(evt);
  });

  dialogCloseImage.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY_CODE) {
      closeDialog(evt);
    }
  });

  /**
   * FUNCTIONS FOR EVENTS.JS
   */

  function openDialog(currentObject) {
    deactivatePins();
    addClass(currentObject.pin, 'pin--active');
    removeClass(offerDialog, 'hidden');
    renderPropertyElement(currentObject.property);
  }

  function closeDialog(evt) {
    evt.preventDefault();
    deactivatePins();
    addClass(offerDialog, 'hidden');
  }

  function deactivatePins() {
    pins.forEach(function (pin) {
      removeClass(pin, 'pin--active');
    });
  }

  function connectPins() {
    var newObject = [];

    for (var i = 0; i < pins.length; i++) {
      var currentObject = {
        pin: pins[i],
        property: properties[i]
      };

      newObject.push(currentObject);
    }

    return newObject;
  }
}
