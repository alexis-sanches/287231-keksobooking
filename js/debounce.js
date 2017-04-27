// debounce.js
'use strict';

window.debounce = (function () {
  return function(fun) {
    var DEBOUNCE_INTERVAL = 500;
    var lastTimeout;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
  };
})();
