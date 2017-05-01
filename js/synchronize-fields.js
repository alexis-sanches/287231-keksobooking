// synchronize-fields.js
'use strict';

window.synchronizeFields = (function () {
  return function (changedElement, dependentElement, changedValues, dependentValues, callback) {
    changedElement.addEventListener('change', function (evt) {
      changedValues.forEach(function (it, i) {
        if (it === evt.target.value) {
          callback(dependentElement, dependentValues[i]);
        }
      });
    });
  };
})();
