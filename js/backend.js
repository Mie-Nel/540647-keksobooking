'use strict';

(function () {
  var urlGet = 'https://js.dump.academy/keksobooking/data';
  var urlPost = 'https://js.dump.academy/keksobooking';
  var statusOk = 200;
  var timeOut = 10000;

  var setup = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusOk) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('запрос не успел выполниться ' + xhr.timeout + 'мс');
    });
    xhr.timeout = timeOut;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('GET', urlGet);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = setup(onLoad, onError);
    xhr.open('POST', urlPost);
    xhr.send(data);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 10px auto; text-align: center; background-color: green;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.font = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend = {
    load: load,
    save: save,
    errorHandler: errorHandler
  };
})();
