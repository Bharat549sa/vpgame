"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var editTools = function editTools(imageSource) {
  _classCallCheck(this, editTools);

  this.imageSource = imageSource;
  this.modificationArray = [];
  this.mat = cv.imread(imageSource);
};