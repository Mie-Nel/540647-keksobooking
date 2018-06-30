'use strict';

(function () {
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


  var getUserAvatar = function (index) {
    var indexAvatar = index + 1;
    return 'img/avatars/user0' + indexAvatar + '.png';
  };

  var getHouseTitle = function (index) {
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
  };

  var getRandomFeatures = function (featuresArr) {
    var features = [];
    var featuresCount = Math.floor(Math.random() * (featuresArr.length + 1));
    for (var i = 0; i < featuresCount; i++) {
      features.push(featuresArr[i]);
    }
    return features;
  };

  var createPopUpData = function (advertCount) {
    var adverts = [];
    var advert = {};

    var locationX = '';
    var locationY = '';

    for (var i = 0; i < advertCount; i++) {
      locationX = window.utils.getRandomValue(MIN_X, MAX_X);
      locationY = window.utils.getRandomValue(MIN_Y, MAX_Y);

      advert = {
        'author': {
          'avatar': getUserAvatar(i)
        },

        'offer': {
          'title': getHouseTitle(i),
          'address': locationX + ', ' + locationY,
          'price': window.utils.getRandomValue(MIN_PRICE, MAX_PRICE),
          'type': window.utils.getRandomValueFromArray(HOUSE_TYPE),
          'rooms': window.utils.getRandomValue(MIN_ROOMS, MAX_ROOMS),
          'guests': window.utils.getRandomValue(MIN_GUESTS, MAX_GUESTS),
          'checkin': window.utils.getRandomValueFromArray(CHECKIN_TIME),
          'checkout': window.utils.getRandomValueFromArray(CHECKOUT_TIME),
          'features': getRandomFeatures(FEATURES),
          'description': '',
          'photos': window.utils.getShuffledPhotos(PHOTOS)
        },

        'location': {
          'x': locationX,
          'y': locationY
        }
      };
      adverts.push(advert);
    }
    return adverts;

  };

  var adverts = createPopUpData(ADVERTS_COUNT);

  var renderPins = function (advertsArr) {
    var template = document.querySelector('.map__pins');
    var similarElement = document.querySelector('template').content.querySelector('.map__pin');
    var fragment = document.createDocumentFragment();

    advertsArr.forEach(function (item, index) {
      var element = similarElement.cloneNode(true);
      element.querySelector('img').setAttribute('src', item.author.avatar);
      element.setAttribute('style', 'left: ' + item.location.x + 'px; ' + 'top: ' + item.location.y + 'px');
      element.setAttribute('data-ad-number', index);
      fragment.appendChild(element);
      template.appendChild(fragment);
    });
  };

  var renderFeatures = function (features) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < features.length; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'feature feature--' + features[i];
      fragment.appendChild(newElement);
    }
    return fragment;
  };

  var renderPictures = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      var similarElement = document.querySelector('template').content.querySelector('.popup__photo').cloneNode(true);
      similarElement.setAttribute('src', photos[i]);
      similarElement.setAttribute('width', 45);
      similarElement.setAttribute('height', 40);
      fragment.appendChild(similarElement);
    }
    return fragment;
  };

  var ESC_KEYCODE = 27;

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card === null) {
      return;
    } else {
      map.removeChild(card);
    }
  };

  var renderPopUp = function (item) {
    var similarCardTemplate = document.querySelector('template').content.querySelector('article.map__card');
    var cardElement = similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__avatar').src = item.author.avatar;
    cardElement.querySelector('.popup__title').textContent = item.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = item.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = item.offer.price;
    cardElement.querySelector('.popup__type').textContent = item.offer.type;
    cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + item.offer.guests;
    cardElement.querySelector('.popup__text--time').textContent = item.offer.checkin + item.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = '';
    cardElement.querySelector('.popup__features').appendChild(renderFeatures(item.offer.features));
    cardElement.querySelector('.popup__description').textContent = item.offer.description;
    cardElement.querySelector('.popup__photos').appendChild(renderPictures(item.offer.photos));

    var closeCardButton = cardElement.querySelector('.popup__close');
    closeCardButton.addEventListener('click', closeCard);
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeCard();
      }
    });

    return cardElement;
  };

  var map = document.querySelector('.map');
  var showPopup = function (evt) {
    var target = evt.target;
    var parentElement = target.parentNode;

    var index = parentElement.dataset.adNumber;

    if (adverts[index]) {
      var cardFragment = document.createDocumentFragment();
      cardFragment.appendChild(renderPopUp(adverts[index]));
      map.insertBefore(cardFragment, document.querySelector('.map__filters-container'));
    }
  };

  var closePopup = function (evt) {
    var target = evt.target;
    var parentElement = target.parentNode;

    if (parentElement) {
      closeCard();
    }
  };

  var mapPins = document.querySelector('.map__pins');
  mapPins.addEventListener('click', closePopup);
  mapPins.addEventListener('click', showPopup);

  window.pins = {
    renderPins: renderPins,
    adverts: adverts
  };
})();
