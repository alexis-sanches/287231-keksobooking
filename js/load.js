// load.js
'use strict';

window.load = (function () {
  var onError = function (error) {
    var errorContainer = document.createElement('div');
    var errorMessage = document.createElement('p');

    errorContainer.classList.add('error');
    errorMessage.textContent(error);
    errorContainer.appendChild(errorMessage);
    document.querySelector('body').appendChild(errorContainer);
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
    var UNKNOWN_ERROR = 'Произошла неизвестная ошибка: ' + xhr.status + xhr.statusText;
    var CONNECTION_ERROR = 'Произошла ошибка соединения';
    var TIMEOUT_ERROR = 'Запрос не успел выполниться за ' + TIMEOUT + ' мс';

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (RESPONSE_TYPES[xhr.status]) {
        if (xhr.status === 200) {
          RESPONSE_TYPES[xhr.status](xhr.response);
        } else {
          onError(RESPONSE_TYPES[xhr.status]);
        }
      } else {
        onError(UNKNOWN_ERROR);
      }
    });

    xhr.addEventListener('error', function () {
      onError(CONNECTION_ERROR);
    });

    xhr.addEventListener('timeout', function () {
      onError(TIMEOUT_ERROR);
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', url);
    xhr.send();
  };

  return {
    getData: load
  };
})();
