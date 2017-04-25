'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomArrayElement = function (array) {
    return array[getRandomArrayIndex(array)];
  };

  var getRandomArrayIndex = function (array) {
    return getRandomNumber(0, array.length);
  }

  var getRandomElementsFromArray = function (arr, numberOfElements) {
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
  };

  var addClass = function (element, newClass) {
    element.classList.add(newClass);
  }

  var removeClass = function (element, newClass) {
    element.classList.remove(newClass);
  }

  var isEscCode = function (code) {
    if (code === ESC_KEY_CODE) {

      return true;
    }

    return false;
  };

  var isEnterCode = function (code) {
    if (code === ENTER_KEY_CODE) {

      return true;
    }

    return false;
  };

  return {
    getRandomNumber: getRandomNumber,
    getRandomArrayElement: getRandomArrayElement,
    getRandomArrayIndex: getRandomArrayIndex,
    getRandomElementsFromArray: getRandomElementsFromArray,
    addClass: addClass,
    removeClass: removeClass,
    isEscCode: isEscCode,
    isEnterCode: isEnterCode
  };
})();
