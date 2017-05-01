// utils.js
'use strict';

window.utils = (function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;

  var isEscCode = function (code) {
    return code === ESC_KEY_CODE
      ? true
      : false;
  };

  var isEnterCode = function (code) {
    return code === ENTER_KEY_CODE
      ? true
      : false;
  };

  var removeClassFromAll = function (nameOfClass) {
    var array = document.querySelectorAll('.' + nameOfClass);

    array.forEach(function (it) {
      it.classList.remove(nameOfClass);
    });
  };

  var isChecked = function (checkbox) {
    return checkbox.checked
      ? true
      : false;
  };

  var addInvalidClass = function (array) {
    array.forEach(function (it) {
      if (!it.validity.valid) {
        it.style.border = '2px solid red';
      }
    });
  };

  return {
    isEscCode: isEscCode,
    isEnterCode: isEnterCode,
    removeClassFromAll: removeClassFromAll,
    isChecked: isChecked,
    addInvalidClass: addInvalidClass
  };
})();
