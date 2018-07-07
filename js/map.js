'use strict';

(function () {
  var adverts = [];
  var fragment = document.createDocumentFragment();

  var renderPins = function (advert, index) {
    var template = document.querySelector('.map__pins');
    var similarElement = document.querySelector('template').content.querySelector('.map__pin');
    var element = similarElement.cloneNode(true);
    element.querySelector('img').setAttribute('src', advert.author.avatar);
    element.setAttribute('style', 'left: ' + advert.location.x + 'px; ' + 'top: ' + advert.location.y + 'px');
    element.setAttribute('data-ad-number', index);
    fragment.appendChild(element);
    template.appendChild(fragment);
  };


  var successHandler = function (arrData) {
    arrData.forEach(renderPins, fragment);
    adverts = arrData;
  };


  var renderFeatures = function (features) {
    for (var i = 0; i < features.length; i++) {
      var newElement = document.createElement('li');
      newElement.className = 'feature feature--' + features[i];
      fragment.appendChild(newElement);
    }
    return fragment;
  };

  var renderPictures = function (photos) {
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
    cardElement.querySelector('.popup__text--price').textContent = item.offer.price + '₽/ночь';
    switch (item.offer.type) {
      case 'house':
        cardElement.querySelector('.popup__type').textContent = 'Дом';
        break;
      case 'flat':
        cardElement.querySelector('.popup__type').textContent = 'Квартира';
        break;
      case 'bungalo':
        cardElement.querySelector('.popup__type').textContent = 'Бунгало';
        break;
      case 'palace':
        cardElement.querySelector('.popup__type').textContent = 'Дворец';
        break;
    }
    cardElement.querySelector('.popup__text--capacity').textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + item.offer.checkin + ' выезд до ' + item.offer.checkout;
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
    adverts: adverts,
    ESC_KEYCODE: ESC_KEYCODE,
    successHandler: successHandler,
    closeCard: closeCard,
  };
})();
