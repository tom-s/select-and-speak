"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rangyTextrange = _interopRequireDefault(require("rangy/lib/rangy-textrange"));

var _speakTts = _interopRequireDefault(require("speak-tts"));

var _get2 = _interopRequireDefault(require("lodash/get"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SelectAndSpeak =
/*#__PURE__*/
function (_Speech) {
  _inherits(SelectAndSpeak, _Speech);

  function SelectAndSpeak(props) {
    var _this;

    _classCallCheck(this, SelectAndSpeak);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SelectAndSpeak).call(this, props));
    _this.wordwrap = null;
    _this.autospeak = null;
    _this.touchMode = null;
    return _this;
  }

  _createClass(SelectAndSpeak, [{
    key: "init",
    value: function init(options) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        _get(_getPrototypeOf(SelectAndSpeak.prototype), "init", _this2).call(_this2, options).then(function (data) {
          _this2.wordwrap = (0, _get2.default)(options, 'wordwrap', true);
          _this2.autospeak = (0, _get2.default)(options, 'autospeak', true);
          window.addEventListener('mousedown', function () {
            _this2.touchMode = false;
          });
          window.addEventListener('touchstart', function () {
            _this2.touchMode = true;
          });
          window.addEventListener('mouseup', function (e) {
            if (!_this2.touchMode && _this2.autospeak) {
              _this2.speakSelectedText(e);

              e.preventDefault();
            }
          });
          window.addEventListener('touchend', function (e) {
            if (_this2.touchMode && _this2.autospeak) {
              _this2.speakSelectedText(e);

              e.preventDefault();
            }
          });
          resolve(data);
        }).catch(function (e) {
          return reject(e);
        });
      });
    }
  }, {
    key: "setWordwrap",
    value: function setWordwrap(wordwrap) {
      this.wordwrap = wordwrap;
    }
  }, {
    key: "setAutospeak",
    value: function setAutospeak(autospeak) {
      this.autospeak = autospeak;
    }
  }, {
    key: "speakSelectedText",
    value: function speakSelectedText() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var text = this.getSelectedText();
      return this.speak(_objectSpread({
        text: text,
        queue: false
      }, options));
    }
  }, {
    key: "getSelectedText",
    value: function getSelectedText() {
      var selection = _rangyTextrange.default.getSelection();

      if (this.wordwrap && selection.toString()) selection.expand('word'); // expand selection to word so that we don't have half words

      return selection.toString();
    }
  }]);

  return SelectAndSpeak;
}(_speakTts.default);

var _default = SelectAndSpeak;
exports.default = _default;