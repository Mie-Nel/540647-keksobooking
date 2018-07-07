'use strict';

var filters = document.querySelector('.map__filters');
var houseType = filters.querySelector('#housing-type');
// var housePrice = filters.querySelector('#housing-price');
// var houseRooms = filters.querySelector('#housing-rooms');
// var houseGuests = filters.querySelector('#housing-guests');
// var houseFeatures = filters.querySelector('#housing-features');


var ANY_VALUE = 'any';

var filterPins = function () {
  var checkType = function (advert) {
    return (houseType.value === advert.offer.type) || (houseType.value === ANY_VALUE);
  };

  var filteredPins = window.pins.adverts.filter(checkType);
  return filteredPins;
};


houseType.addEventListener('change', function () {
  filterPins();
  // console.log(filterPins());
});
