// debounce.js
'use strict';

window.debounce = (function () {
  var DEBOUNCE_INTERVAL = 500;

  return function (fun, delay) {
    var lastTimeout;
    var interval = delay || DEBOUNCE_INTERVAL;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(fun, interval);
  };
})();
