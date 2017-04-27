// synchronize-fields.js
'use strict';

window.synchronizeFields = (function () {
  return function (changedElement, dependentElement, changedValues, dependentValues, callback) {
    changedElement.addEventListener('change', function (evt) {
      for (var i = 0; i < changedValues.length; i++) {
        if (changedValues[i] === evt.target.value) {
          callback(dependentElement, dependentValues[i]);
        }
      }
    });
  };
})();
