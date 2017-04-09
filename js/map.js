'use strict';
var titles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var types = ['flat', 'house', 'bungalo'];
var checkTimes = ['12:00', '13:00', '14:00'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var announcements = [];
var locations = [];

var randomize = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min) + min);
  return randomNumber;
};

var randomArrayElement = function (array) {
  return array[randomize(0, array.length)];
};

var getSampleFromArray = function (array) {
  var contain = function (list, object) {
    for (var j = 0; j < list.length; j++) {
      if (object === list[j]) {
        return true;
      }
      return false;
    }
  };

  var sample = [];
  var sampleLength = randomize(1, array.length);

  for (var k = 0; k < sampleLength; k++) {
    var currentObj = randomArrayElement(array);
    if (!contain(sample, currentObj)) {
      sample[k] = currentObj;
    } else {
      k--;
    }
  }
  return sample;
};

var chooseType = function (index, array) {
  if (index === 0 || index === 1) {
    return array[0];
  } else if (index >= 2 && index <= 5) {
    return array[1];
  } else {
    return array[3];
  }
};


for (var i = 0; i < titles.length; i++) {
  locations[i] = {'x': randomize(300, 900), 'y': randomize(100, 500)};
  announcements[i] = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png'
    },

    'offer': {
      'title': titles[i],
      'address': locations[i].x + ', ' + locations[i].y,
      'price': randomize(1000, 1000000),
      'type': chooseType(i, types),
      'rooms': randomize(1, 5),
      'guests': randomize(1, 10),
      'checkin': randomArrayElement(checkTimes),
      'checkout': randomArrayElement(checkTimes),
      'features': getSampleFromArray(featuresList),
      'description': '',
      'photos': []
    },

    'location': {
      'x': locations[i].x + 28,
      'y': locations[i].y + 75
    }
  }
}

var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();

for (var i = 0; i < announcements.length; i++) {
  var pin = document.createElement('div');

  pin.className = 'pin';
  pin.setAttribute('style', 'left: ' + announcements[i].location.x + 'px; top: ' + announcements[i].location.y + 'px');
  pin.insertAdjacentHTML('beforeend', '<img src=\'' + announcements[i].author.avatar + '\' class=\'rounded\' width=\'40\' height=\'40\'>');
  fragment.appendChild(pin);
}

tokyoPinMap.appendChild(fragment);

var template = document.getElementById('lodge-template');
var element = template.content.cloneNode(true);
var templateElements = element.children[0].children;

var templateType = function () {
  if (announcements[0].offer.type === 'flat') {
    return 'Квартира';
  } else if (announcements[0].offer.type === 'house') {
    return 'Дом';
  } else {
    return 'Бунгало';
  }
};

var templateFeatures = function () {
  var templateString = '';
  for (i = 0; i < announcements[0].offer.features.length; i++) {
    templateString = templateString + '<span class=\'feature__image feature__image--' + (announcements[0].offer.features[i]) + '\'></span>';
  }
  return templateString;
};

element.querySelector('.lodge__title').textContent = announcements[0].offer.title;
element.querySelector('.lodge__address').textContent = announcements[0].offer.address;
element.querySelector('.lodge__price').textContent = announcements[0].offer.price + '₽/ночь';
element.querySelector('.lodge__type').textContent = templateType();
element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + announcements[0].offer.guests + ' гостей в ' + announcements[0].offer.rooms + ' комнатах';
element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + announcements[0].offer.checkin + ', выезд до ' + announcements[0].offer.checkout;
element.querySelector('.lodge__features').innerHTML = templateFeatures();
element.querySelector('.lodge__description').textContent = announcements[0].offer.description;

var offerDialog = document.getElementById('offer-dialog');
var dialogPanel = document.querySelector('.dialog__panel');

document.querySelector('.dialog__title > img').setAttribute('src', announcements[0].author.avatar);
offerDialog.replaceChild(element.children[0], dialogPanel);
