'use strict';


(function () {
  var form = document.querySelector('.ad-form');
  var inputTitle = form.querySelector('#title');
  var inputPrice = form.querySelector('#price');
  var selectType = form.querySelector('#type');
  var selectTimeIn = form.querySelector('#timein');
  var selectTimeOut = form.querySelector('#timeout');
  var fieldsets = form.querySelectorAll('fieldset');

  var disableFormElement = function () {
    for (var i = 0; i < fieldsets.length; i++) {
      fieldsets[i].setAttribute('disabled', 'disabled');
    }
    return fieldsets;
  };
  disableFormElement();

  var enableFormElement = function () {
    for (var j = 0; j < fieldsets.length; j++) {
      fieldsets[j].removeAttribute('disabled');
    }
    form.classList.remove('ad-form--disabled');
  };

  var onInputTitleInvalid = function () {
    if (inputTitle.validity.tooShort) {
      inputTitle.setCustomValidity('Имя должно состоять минимум из 30 символов');
    } else if (inputTitle.validity.tooLong) {
      inputTitle.setCustomValidity('Имя не должно превышать 100 символов');
    } else if (inputTitle.validity.valueMissing) {
      inputTitle.setCustomValidity('Обязательное поле');
    } else {
      inputTitle.setCustomValidity('');
    }
  };

  inputTitle.addEventListener('invalid', onInputTitleInvalid);

  var onInputPriceInvalid = function () {
    if (inputPrice.validity.rangeOverflow) {
      inputPrice.setCustomValidity('Цена не должна превышать 1000000');
    } else if (inputPrice.validity.valueMissing) {
      inputPrice.setCustomValidity('Обязательное поле');
    } else {
      inputPrice.setCustomValidity('');
    }
  };
  inputPrice.addEventListener('invalid', onInputPriceInvalid);


  var minPriceBungalo = 0;
  var minPriceFlat = 1000;
  var minPriceHouse = 5000;
  var minPricePalace = 10000;

  inputPrice.setAttribute('placeholder', minPriceFlat);
  inputPrice.setAttribute('min', minPriceFlat);

  var onSelectChange = function () {
    if (selectType.value === 'bungalo') {
      inputPrice.min = minPriceBungalo;
      inputPrice.placeholder = minPriceBungalo;
    } else if (selectType.value === 'flat') {
      inputPrice.min = minPriceFlat;
      inputPrice.placeholder = minPriceFlat;
    } else if (selectType.value === 'house') {
      inputPrice.min = minPriceHouse;
      inputPrice.placeholder = minPriceHouse;
    } else if (selectType.value === 'palace') {
      inputPrice.min = minPricePalace;
      inputPrice.placeholder = minPricePalace;
    }
  };
  selectType.addEventListener('change', onSelectChange);


  var checkTime = function (value1, value2) {
    switch (value1.value) {
      case '12:00':
        value2.value = value1.value;
        break;

      case '13:00':
        value2.value = value1.value;
        break;

      case '14:00':
        value2.value = value1.value;
        break;
    }
  };

  selectTimeIn.addEventListener('change', function () {
    checkTime(selectTimeIn, selectTimeOut);
  });
  selectTimeOut.addEventListener('change', function () {
    checkTime(selectTimeOut, selectTimeIn);
  });

  var numberOfRooms = form.elements.rooms;
  var numberOfBedrooms = form.elements.capacity;


  var setDisabledCapacity = function () {
    numberOfBedrooms.options[0].disabled = true;
    numberOfBedrooms.options[1].disabled = true;
    numberOfBedrooms.options[3].disabled = true;
    numberOfBedrooms.options[2].selected = true;
  };


  var setAllOptions = function () {
    for (var j = 0; j < numberOfBedrooms.options.length; j++) {
      if (numberOfBedrooms.options[j].hasAttribute('disabled', 'disabled')) {
        numberOfBedrooms.options[j].removeAttribute('disabled', false);
      }
      if (numberOfBedrooms.options[j].hasAttribute('selected', true)) {
        numberOfBedrooms.options[j].removeAttribute('selected');
      }
    }
  };

  var disabledElements = function () {
    setAllOptions();
    switch (numberOfRooms.value) {
      case '1':
        numberOfBedrooms.options[0].disabled = true;
        numberOfBedrooms.options[1].disabled = true;
        numberOfBedrooms.options[3].disabled = true;
        numberOfBedrooms.options[2].selected = true;
        break;
      case '2':
        numberOfBedrooms.options[0].disabled = true;
        numberOfBedrooms.options[3].disabled = true;
        numberOfBedrooms.options[2].selected = true;
        break;
      case '3':
        numberOfBedrooms.options[3].disabled = true;
        numberOfBedrooms.options[2].selected = true;
        break;
      case '100':
        numberOfBedrooms.options[0].disabled = true;
        numberOfBedrooms.options[1].disabled = true;
        numberOfBedrooms.options[2].disabled = true;
        numberOfBedrooms.options[3].selected = true;
    }
  };
  numberOfRooms.addEventListener('change', function () {
    disabledElements();
  });

  window.formElements = {
    enableFormElement: enableFormElement,
    setDisabledCapacity: setDisabledCapacity,
  };
})();
