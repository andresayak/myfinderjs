"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}var plugin=/*#__PURE__*/function(){/**
     * @inheritDoc
     */function a(b){_classCallCheck(this,a),this.editor=b}/**
     * @inheritDoc
     */return _createClass(a,[{key:"destroy",value:function a(){this.stopListening()}}]),a}();exports.default=plugin;