"use strict";

function Utils(errorOutputId) {
  // eslint-disable-line no-unused-vars
  var self = this;
  this.errorOutput = document.getElementById(errorOutputId);
  var OPENCV_URL = 'opencv.js';

  this.loadOpenCv = function (onloadCallback) {
    var script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('type', 'text/javascript');
    script.addEventListener('load', function () {
      if (cv.getBuildInformation) {
        console.log(cv.getBuildInformation());
        onloadCallback();
      } else {
        // WASM
        cv['onRuntimeInitialized'] = function () {
          console.log(cv.getBuildInformation());
          onloadCallback();
        };
      }
    });
    script.addEventListener('error', function () {
      self.printError('Failed to load ' + OPENCV_URL);
    });
    script.src = OPENCV_URL;
    var node = document.getElementsByTagName('script')[0];
    node.parentNode.insertBefore(script, node);
  };

  this.createFileFromUrl = function (path, url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function (ev) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          var data = new Uint8Array(request.response);
          cv.FS_createDataFile('/', path, data, true, false, false);
          callback();
        } else {
          self.printError('Failed to load ' + url + ' status: ' + request.status);
        }
      }
    };

    request.send();
  };

  this.loadImageToCanvas = function (url, cavansId) {
    var canvas = document.getElementById(cavansId);
    var ctx = canvas.getContext('2d');
    var img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
    };

    img.src = url;
  };

  this.executeCode = function (textAreaId) {
    try {
      this.clearError();
      var code = document.getElementById(textAreaId).value;
      eval(code);
    } catch (err) {
      this.printError(err);
    }
  };

  this.clearError = function () {
    this.errorOutput.innerHTML = '';
  };

  this.printError = function (err) {
    if (typeof err === 'undefined') {
      err = '';
    } else if (typeof err === 'number') {
      if (!isNaN(err)) {
        if (typeof cv !== 'undefined') {
          err = 'Exception: ' + cv.exceptionFromPtr(err).msg;
        }
      }
    } else if (typeof err === 'string') {
      var ptr = Number(err.split(' ')[0]);

      if (!isNaN(ptr)) {
        if (typeof cv !== 'undefined') {
          err = 'Exception: ' + cv.exceptionFromPtr(ptr).msg;
        }
      }
    } else if (err instanceof Error) {
      err = err.stack.replace(/\n/g, '<br>');
    }

    this.errorOutput.innerHTML = err;
  };

  this.loadCode = function (scriptId, textAreaId) {
    var scriptNode = document.getElementById(scriptId);
    var textArea = document.getElementById(textAreaId);

    if (scriptNode.type !== 'text/code-snippet') {
      throw Error('Unknown code snippet type');
    }

    textArea.value = scriptNode.text.replace(/^\n/, '');
  };

  this.addFileInputHandler = function (fileInputId, canvasId) {
    var inputElement = document.getElementById(fileInputId);
    inputElement.addEventListener('change', function (e) {
      var files = e.target.files;

      if (files.length > 0) {
        var imgUrl = URL.createObjectURL(files[0]);
        self.loadImageToCanvas(imgUrl, canvasId);
      }
    }, false);
  };

  function onVideoCanPlay() {
    if (self.onCameraStartedCallback) {
      self.onCameraStartedCallback(self.stream, self.video);
    }
  }

  ;

  this.startCamera = function (resolution, callback, videoId) {
    var constraints = {
      'qvga': {
        width: {
          exact: 320
        },
        height: {
          exact: 240
        }
      },
      'vga': {
        width: {
          exact: 640
        },
        height: {
          exact: 480
        }
      }
    };
    var video = document.getElementById(videoId);

    if (!video) {
      video = document.createElement('video');
    }

    var videoConstraint = constraints[resolution];

    if (!videoConstraint) {
      videoConstraint = true;
    }

    navigator.mediaDevices.getUserMedia({
      video: videoConstraint,
      audio: false
    }).then(function (stream) {
      video.srcObject = stream;
      video.play();
      self.video = video;
      self.stream = stream;
      self.onCameraStartedCallback = callback;
      video.addEventListener('canplay', onVideoCanPlay, false);
    })["catch"](function (err) {
      self.printError('Camera Error: ' + err.name + ' ' + err.message);
    });
  };

  this.stopCamera = function () {
    if (this.video) {
      this.video.pause();
      this.video.srcObject = null;
      this.video.removeEventListener('canplay', onVideoCanPlay);
    }

    if (this.stream) {
      this.stream.getVideoTracks()[0].stop();
    }
  };
}

;