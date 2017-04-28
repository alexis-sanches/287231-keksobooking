// load.js
'use strict';

window.load = (function () {
  var onError = function (error) {
    var errorContainer = document.createElement('div');
    var errorMessage = document.createElement('p');

    errorContainer.classList.add('error');
    errorMessage.textContent = error;
    errorContainer.appendChild(errorMessage);
    document.body.appendChild(errorContainer);
  };

  var load = function (url, onLoad) {
    var xhr = new XMLHttpRequest();

    var RESPONSE_TYPES = {
      200: onLoad,
      400: 'Неверный запрос',
      401: 'Пользователь не авторизован',
      404: 'Ничего не найдено'
    };

    var TIMEOUT = 10000;

    var ERRORS = {
      UNKNOWN: 'Произошла неизвестная ошибка: ' + xhr.status + xhr.statusText,
      CONNECTION: 'Произошла ошибка соединения',
      DELAY: 'Запрос не успел выполниться за ' + TIMEOUT + ' мс'
    };

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (RESPONSE_TYPES[xhr.status]) {
        if (xhr.status === 200) {
          RESPONSE_TYPES[xhr.status](xhr.response);
        } else {
          onError(RESPONSE_TYPES[xhr.status]);
        }
      } else {
        onError(ERRORS.UNKNOWN);
      }
    });

    xhr.addEventListener('error', function () {
      onError(ERRORS.CONNECTION);
    });

    xhr.addEventListener('timeout', function () {
      onError(ERRORS.DELAY);
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', url);
    xhr.send();
  };

  return {
    getData: load
  };
})();
