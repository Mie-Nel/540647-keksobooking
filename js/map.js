'use strict';

var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var HOUSE_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUESTS = 1;
var MAX_GUESTS = 5;
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var ADVERTS_COUNT = 8;
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];


var map = document.querySelector('.map');
map.classList.remove('map--faded');

function getUserAvatar(index) {
  var indexAvatar = index + 1;
  return 'img/avatars/user0' + indexAvatar + '.png';
}

function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomValueFromArray(arr) {
  var randomIndex = getRandomValue(0, arr.length - 1);
  return arr[randomIndex];
}

function getHouseTitle(index) {
  var houseTitles = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'];
  return houseTitles[index];
}

function getRandomFeatures(featuresArr) {
  var features = [];
  var featuresCount = Math.floor(Math.random() * (features.length + 1));
  for (var i = 0; i < featuresCount; i++) {
    features.push(featuresArr[i]);
  }
  return features;
}

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

function createPopUpData(advertCount) {
  var adverts = [];
  var advert = {};

  var locationX = '';
  var locationY = '';

  for (var i = 0; i < advertCount; i++) {
    locationX = getRandomValue(MIN_X, MAX_X);
    locationY = getRandomValue(MIN_Y, MAX_Y);

    advert = {
      'author': {
        'avatar': getUserAvatar(i)
      },

      'offer': {
        'title': getHouseTitle(i),
        'address': locationX + ', ' + locationY,
        'price': getRandomValue(MIN_PRICE, MAX_PRICE),
        'type': getRandomValueFromArray(HOUSE_TYPE),
        'rooms': getRandomValue(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomValue(MIN_GUESTS, MAX_GUESTS),
        'checkin': getRandomValueFromArray(CHECKIN_TIME),
        'checkout': getRandomValueFromArray(CHECKOUT_TIME),
        'features': getRandomFeatures(FEATURES),
        'description': '',
        'photos': getShuffledPhotos(PHOTOS)
      },

      'location': {
        'x': locationX,
        'y': locationY
      }
    };
    adverts.push(advert);
  }
  return adverts;
}

var adverts = createPopUpData(ADVERTS_COUNT);

function renderPins() {
  // var template = document.querySelector('.map__pins');
  var similarElement = document.querySelector('template').content.querySelector('.map__pin');
  var fragment = document.createDocumentFragment();

  adverts.forEach(function (item) {
    var element = similarElement.cloneNode(true);
    element.querySelector('img').src = item.author.avatar;
    element.querySelector('img').style = 'left: ' + item.locationX + 'px; ' + 'top: ' + item.locationY + 'px';
    fragment.appendChild(element);
    // template.appendChild.fragment;
  });
}

renderPins(adverts);

// var renderFeatures = function (features) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < features.length; i++) {
//     var newElement = document.createElement('li');
//     newElement.className = 'feature feature--' + features[i];
//     fragment.appendChild(newElement);
//   }
//   return fragment;
// }

// var renderPictures = function (photos) {
//    var fragment = document.createDocumentFragment();
//    for (var i = 0; i < photos.length; i++) {
//     var similarElement = document.querySelector('template').content.querySelector('.popup__photos img').cloneNode(true);
//    }
// }

// function renderPopUp(item) {
//   var similarCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
//   var cardElement = similarCardTemplate.cloneNode(true);

//   cardElement.querySelector('img').src = item.author.avatar;
//   cardElement.querySelector('h3').textContent = item.offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
//   cardElement.querySelector('.popup__text--price').textContent = item.offer.price;
//   cardElement.querySelector('.popup__type').textContent = item.offer.type;
//   cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + item.offer.guests;
//   cardElement.querySelector('.popup__text--time').textContent = item.offer.checkin + item.offer.checkout;
//   cardElement.querySelector('.popup__features').textContent = '';
//   cardElement.querySelector('.popup__features').appendChild(renderFeatures(item.offer.features));
//   cardElement.querySelector('.popup__description').textContent = item.offer.description;
//   cardElement.querySelector('.popup__photos').appendChild(renderPictures(item.offer.photos));
//   return cardElement;
// }