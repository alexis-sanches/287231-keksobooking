// 1 card.js
'use strict';

window.card = (function () {
  var offerDialog = document.getElementById('offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');

  document.addEventListener('keydown', function (evt) {
    if (window.utils.isEscCode(evt.keyCode) && !offerDialog.classList.contains('hidden')) {
      closeDialog(evt);
    }
  });

  dialogClose.addEventListener('click', function (evt) {
    closeDialog(evt);
  });

  dialogClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterCode(evt.keyCode)) {
      closeDialog(evt);
    }
  });

  var renderPropertyElement = function (property) {
    var lodgeTemplate = document.getElementById('lodge-template');
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

    var PROPERTY_TYPE_TRANSLATIONS = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало'
    };

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
  };

  function createFeaturesElement(features) {
    var fragment = document.createDocumentFragment();

    features.forEach(function (feature) {
      var featureElement = document.createElement('span');
      featureElement.classList.add('feature__image');
      featureElement.classList.add('feature__image--' + feature);
      fragment.appendChild(featureElement);
    });

    return fragment;
  };

  function closeDialog(evt) {
    evt.preventDefault();
    window.utils.removeClassFromAll('pin--active');
    offerDialog.classList.add('hidden');
  }

  return {
    renderPropertyElement: renderPropertyElement
  };
})();
