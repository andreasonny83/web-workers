var activation = document.getElementById('activation');
var deactivation = document.getElementById('deactivation');
var postMessage = document.getElementById('post-message');

var worker = (function initWorkers() {
  var w;

  function status() {
    console.log(typeof(w));
  }

  function addListener(name) {
    if (!w) {
      return;
    }

    w.addEventListener(name, function(e) {
      console.log(e.data);
    }, false);
  }

  function postMessage(message) {
    w.postMessage(message);
  }

  function stop() {
    if (!w) {
      return;
    }

    console.log('stopping the worker');

    w.terminate();
    w = undefined;
  }

  function start() {
    if (!window.Worker) {
      console.log('Web workers are not supported by this browser.');
    }

    if (typeof w === 'undefined') {
      console.log('starting worker');

      w = new Worker('worker.js');

      addListener('message');
    }
  }

  function init() {
    start();
  }

  return {
    init: init,
    postMessage: postMessage,
    start: start,
    stop: stop,
    status: status
  };
})();

worker.init();

postMessage.addEventListener('click', function() {
  worker.postMessage('hello');
});

activation.addEventListener('click', function() {
  worker.start();
});

deactivation.addEventListener('click', function() {
  worker.stop();
});
