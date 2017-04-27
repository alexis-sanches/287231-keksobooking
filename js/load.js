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

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
          break;
      }
      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 10000;

    xhr.open('GET', url);
    xhr.send();
  };

  return {
    getData: load
  };
})();
