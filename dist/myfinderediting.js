"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _plugin=_interopRequireDefault(require("./plugin")),_myfindercommand=_interopRequireDefault(require("./myfindercommand"));function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}/**
 * @extends module:core/plugin~Plugin
 */var MyFinderEditing=/*#__PURE__*/function(){function a(b){_classCallCheck(this,a),this.editor=b}/**
     * @inheritDoc
     */return _createClass(a,null,[{key:"pluginName",/**
     * @inheritDoc
     */get:function a(){return"MyFinderEditing"}/**
     * @inheritDoc
     */},{key:"requires",get:function a(){return[];//[Notification];
}}]),_createClass(a,[{key:"init",value:function b(){var a=this.editor;a.commands.add("myfinder",new _myfindercommand.default(a))}}]),a}();exports.default=MyFinderEditing;