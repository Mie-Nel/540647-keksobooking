'use strict';

(function () {
  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');


  var pinMainMouseup = function () {
    map.classList.remove('map--faded');
    window.formElements.enableFormElement();
    window.formElements.setDisabledCapacity();
    window.pins.renderPins(window.pins.adverts);
  };


  pinMain.addEventListener('mouseup', function () {
    pinMainMouseup();
  });

  var PIN_WIDTH = 65;
  var inputAddress = document.querySelector('#address');

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      inputAddress.value = startCoords.x + ' ' + startCoords.y;

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      var MIN_LEFT = 0;
      var MAX_RIGHT = 1200 - PIN_WIDTH;
      var MIN_TOP = 130;
      var MAX_BOTTOM = 630;

      if (startCoords.x < MIN_LEFT) {
        pinMain.style.left = MIN_LEFT + PIN_WIDTH + 'px';
      }
      if (startCoords.x > MAX_RIGHT) {
        pinMain.style.left = MAX_RIGHT + 'px';
      }
      if (startCoords.y < MIN_TOP) {
        pinMain.style.top = MIN_TOP + 'px';
      }
      if (startCoords.y > MAX_BOTTOM) {
        pinMain.style.top = MAX_BOTTOM + 'px';
      }
    };


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
