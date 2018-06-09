'use strict';

var offerTitle = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var offerType = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало'
];

var offerCheckInOut = ['12:00', '13:00', '14:00'];

var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var offerDescription = '';

var offerPhotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// функция случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

//функция получения рандомного элемента из массива
var getRandomData = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

// находим шаблон
var pinTemplate = document.querySelector('template').content.querySelector('.map__card');

// находим блок, куда вставлять сгенерированные объекты
var pinList = document.querySelector('.map');

// функция генерации объекта
var createPin = function () {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.popup__avatar').src = 'img/avatars/user' + 0 + getRandomNumber(1, 8) + '.png';

  pinElement.querySelector('.popup__title')
    .textContent = offerTitle[getRandomData(offerTitle)];

  pinElement.querySelector('.popup__text--price')
    .textContent = getRandomNumber(1000, 1000000) + '₽/ночь';

  pinElement.querySelector('.popup__type')
    .textContent = offerType[getRandomData(offerType)];

  pinElement.querySelector('.popup__text--capacity')
  .textContent = getRandomNumber(1, 5) + ' комнаты для ' + getRandomNumber(1, 5) + ' гостей';

  pinElement.querySelector('.popup__text--time')
    .textContent = 'Заезд после ' + offerCheckInOut[getRandomData(offerCheckInOut)] + ', ' + 'выезд до ' + offerCheckInOut[getRandomData(offerCheckInOut)];

  var randomFeatures = offerFeatures.slice(getRandomNumber(0, offerFeatures.length));
  pinElement.querySelectorAll('popup__feature').textContent = randomFeatures;

  for (var i = 0; i < offerPhotos.length; i++) {
    console.log(offerPhotos[i]);
    pinElement.querySelector('.popup__photo').src = offerPhotos[i];
  };

  return pinElement;
}

 console.log(createPin());

 var fragment = document.createDocumentFragment();
 for (var i = 0; i < 8; i++) {
  fragment.appendChild(createPin());
 }
 pinList.appendChild(fragment);
