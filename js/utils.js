'use strict';

(function () {
  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomValueFromArray = function (arr) {
    var randomIndex = getRandomValue(0, arr.length - 1);
    return arr[randomIndex];
  };

  var getShuffledPhotos = function (a) {
    var j;
    var x;
    var i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  };

  window.utils = {
    getRandomValue: getRandomValue,
    getRandomValueFromArray: getRandomValueFromArray,
    getShuffledPhotos: getShuffledPhotos
  };
})();
