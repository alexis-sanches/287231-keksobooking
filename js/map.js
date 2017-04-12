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
var tokyoPinMap = document.querySelector('.tokyo__pin-map');
var fragment = document.createDocumentFragment();
var offerDialog = document.getElementById('offer-dialog');
var dialogPanel = document.querySelector('.dialog__panel');
var template = document.getElementById('lodge-template');
var element = template.content.cloneNode(true);
var firstAnnouncement;

var randomize = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArrayElement = function (array) {
  return array[randomize(0, array.length)];
};

var checkContain = function (list, object) {
  for (var j = 0; j < list.length; j++) {
    if (object === list[j]) {
      return true;
    }
  }
  return false;
};

var getSampleFromArray = function (array) {
  var sample = [];
  var sampleLength = randomize(1, array.length);

  for (var k = 0; k < sampleLength; k++) {
    var currentObj = getRandomArrayElement(array);
    if (!checkContain(sample, currentObj)) {
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

var getTemplateType = function () {
  switch (firstAnnouncement.offer.type) {
    case 'flat':
      return 'Квартира';
      break;
    case 'house':
      return 'Дом';
      break;
    case 'bungalo':
      return 'Бунгало';
      break;
    default:
      return 'Неизвестный тип';
      break;
  }
};

var getTemplateFeatures = function () {
  var templateString = '';
  for (i = 0; i < firstAnnouncement.offer.features.length; i++) {
    templateString = templateString + '<span class=\'feature__image feature__image--' + (firstAnnouncement.offer.features[i]) + '\'></span>';
  }
  return templateString;
};

var createPin = function () {
  for (i = 0; i < announcements.length; i++) {
    var pin = document.createElement('div');
    var avatarImage = document.createElement('img');
    pin.className = 'pin';
    pin.style.left = announcements[i].location.x + 'px';
    pin.style.top = announcements[i].location.y + 'px';
    avatarImage.className = 'rounded';
    avatarImage.src = announcements[i].author.avatar;
    avatarImage.width = '40';
    avatarImage.height = '40';
    pin.appendChild(avatarImage);
    fragment.appendChild(pin);
  }
  return fragment;
};

for (var i = 0; i < titles.length; i++) {
  locations[i] = {
    x: randomize(300, 900),
    y: randomize(100, 500)
  };

  announcements[i] = {
    author: {
      avatar: 'img/avatars/user0' + (i + 1) + '.png'
    },

    offer: {
      title: titles[i],
      address: locations[i].x + ', ' + locations[i].y,
      price: randomize(1000, 1000000),
      type: chooseType(i, types),
      rooms: randomize(1, 5),
      guests: randomize(1, 10),
      checkin: getRandomArrayElement(checkTimes),
      checkout: getRandomArrayElement(checkTimes),
      features: getSampleFromArray(featuresList),
      description: '',
      photos: []
    },

    location: {
      x: locations[i].x,
      y: locations[i].y
    }
  };
}

firstAnnouncement = announcements[0];

tokyoPinMap.appendChild(createPin());

element.querySelector('.lodge__title').textContent = firstAnnouncement.offer.title;
element.querySelector('.lodge__address').textContent = firstAnnouncement.offer.address;
element.querySelector('.lodge__price').textContent = firstAnnouncement.offer.price + '₽/ночь';
element.querySelector('.lodge__type').textContent = getTemplateType();
element.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + firstAnnouncement.offer.guests + ' гостей в ' + firstAnnouncement.offer.rooms + ' комнатах';
element.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + firstAnnouncement.offer.checkin + ', выезд до ' + firstAnnouncement.offer.checkout;
element.querySelector('.lodge__features').innerHTML = getTemplateFeatures();
element.querySelector('.lodge__description').textContent = firstAnnouncement.offer.description;

document.querySelector('.dialog__title > img').setAttribute('src', firstAnnouncement.author.avatar);
offerDialog.replaceChild(element.children[0], dialogPanel);
