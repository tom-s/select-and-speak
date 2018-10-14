"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rangyTextrange = _interopRequireDefault(require("rangy/lib/rangy-textrange"));

var _speakTts = _interopRequireDefault(require("speak-tts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Speech = function (window) {
  var CONF = {
    'speak': {
      //'lang' : 'en-GB', // if no language specified, automatic detection will be done
      'volume': 1,
      'rate': 1,
      'pitch': 1
    },
    'textSelection': {
      'wordwrap': true,
      'button': {
        'tag': 'div',
        // main wrapper of button
        'content': '<p>Click here to listen</p>' // content of button

      }
    }
  };

  function _init() {
    var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      speak: null
    };
    // Import conf
    var speak = conf.speak;
    if (conf) CONF = _objectSpread({}, CONF, conf); // Polyfill

    if (!_speakTts.default.browserSupport()) {
      return false;
    } else {
      var voicesLoaded = {
        onVoicesLoaded: function onVoicesLoaded(data) {
          var voices = data.voices;

          _addVoicesList(voices);

          if (speak && speak.voicesLoaded) {
            speak.voicesLoaded(voices);
          }
        }
      };

      var SpeakConf = _objectSpread({}, CONF.speak, voicesLoaded);

      _speakTts.default.init(SpeakConf);
    } // Start listening to events


    if (_touchSupport()) {
      // Append button
      var button = _addTouchButton();

      button.addEventListener('click', function (e) {
        var text = _getSelectedText();

        _speakTts.default.speak({
          text: text
        });
      });
    } else {
      window.addEventListener('mouseup', function (e) {
        var text = _getSelectedText();

        _speakTts.default.speak({
          text: text
        });

        e.preventDefault();
      });
    }
  }

  var _addVoicesList = function _addVoicesList(voices) {
    var list = window.document.createElement('div');
    list.innerHTML += '<h2>Voices</h2><p>';
    voices.forEach(function (voice) {
      list.innerHTML += voice.name + ' (' + voice.lang + ')' + ' ';
    });
    list.innerHTML += '</p>';
    window.document.body.appendChild(list);
  };

  var _addTouchButton = function _addTouchButton() {
    var _CONF = CONF,
        textSelection = _CONF.textSelection;
    var button = window.document.createElement(textSelection.button.tag);
    button.innerHTML = textSelection.button.content;
    window.document.body.appendChild(button);
    return button;
  };

  var _touchSupport = function _touchSupport() {
    return 'ontouchstart' in window || navigator.maxTouchPoints; // works on IE10/11 and Surface
  };

  var _getSelectedText = function _getSelectedText() {
    var _CONF2 = CONF,
        textSelection = _CONF2.textSelection;
    if (textSelection.wordwrap) _rangyTextrange.default.getSelection().expand('word'); // expand selection to word so that we don't have half words

    return _rangyTextrange.default.getSelection().toString();
  };

  return {
    init: _init,
    browserSupport: _speakTts.default.browserSupport,
    getSpeakInstance: function getSpeakInstance() {
      return _speakTts.default;
    }
  };
}(window);

var _default = Speech;
exports.default = _default;