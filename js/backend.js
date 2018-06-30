'use strict';

// (function() {
//   var urlGet = 'https://js.dump.academy/keksobooking/data';
//   var urlPost = 'https://js.dump.academy/keksobooking';
//   var statusOk = 200;
//   var timeOut = 5000;

//   var onLoad = function (data) {
//     var adverts = data;
//   };

//   var onError = function (message) {
//     console.error(message);
//   };

//   window.load = function (onLoad, onError) {
//     var xhr = new XMLHttpRequest();
//     xhr.responseType = 'json';

//     xhr.addEventListener('load', function () {
//       if (xhr.status === statusOk) {
//         onLoad(xhr.response);
//       } else {
//         onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
//       }
//     });

//     xhr.addEventListener('error', function () {
//       onError('Произошла ошибка соединения');
//     });
//     xhr.addEventListener('timeout', function () {
//       onError('запрос не успел выполниться ' + xhr.timeout + 'мс');
//     });
//     xhr.timeout = timeOut;

//     xhr.open('GET', urlGet);
//     xhr.send();
//   };

//   var upload = function (data, onLoad, onError) {
//       var xhr = new XMLHttpRequest();
//       xhr.responseType = 'json';

//     xhr.addEventListener('load', function () {
//       if (xhr.status === statusOk) {
//         onLoad(xhr.response);
//       } else {
//         onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
//       }
//     });

//     xhr.addEventListener('error', function () {
//       onError('Произошла ошибка соединения');
//     });
//     xhr.addEventListener('timeout', function () {
//       onError('запрос не успел выполниться ' + xhr.timeout + 'мс');
//     });
//     xhr.timeout = timeOut;

//     xhr.open('POST', urlPost);
//     xhr.send(data);
//   };

//   var errorHandler = function (errorMessage) {
//     var node = document.createElement('div');
//     node.style = 'z-index: 100; margin: 10px auto; text-align: center; background-color: green;';
//     node.style.position = 'fixed';
//     node.style.left = 0;
//     node.style.right = 0;
//     node.style.font = '30px';
//     node.textContent = errorMessage;
//     document.body.insertAdjacentElement('afterbegin', node);
//   };
// })();
