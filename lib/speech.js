'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _rangyTextrange = require('rangy/lib/rangy-textrange');

var _rangyTextrange2 = _interopRequireDefault(_rangyTextrange);

var _speakTts = require('speak-tts');

var _speakTts2 = _interopRequireDefault(_speakTts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
				'tag': 'div', // main wrapper of button
				'content': '<p>Click here to listen</p>' // content of button
			}
		}
	};

	function _init(conf) {
		// Import conf
		if (conf) CONF = _lodash2.default.merge(CONF, conf);

		// Polyfill
		if (!_speakTts2.default.browserSupport()) {
			return false;
		} else {

			var SpeakConf = _lodash2.default.merge(CONF.speak, {
				onVoicesLoaded: function onVoicesLoaded(data) {
					var voices = data.voices;

					_addVoicesList(voices);
					if (_lodash2.default.get(conf, 'speak.voicesLoaded')) {
						conf.speak.voicesLoaded(voices);
					}
				}
			});
			_speakTts2.default.init(SpeakConf);
		}

		// Start listening to events
		if (_touchSupport()) {
			// Append button
			var button = _addTouchButton();
			button.addEventListener('click', function (e) {
				var text = _getSelectedText();
				_speakTts2.default.speak({
					text: text
				});
			});
		} else {
			window.addEventListener('mouseup', function (e) {
				var text = _getSelectedText();
				_speakTts2.default.speak({
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
		var button = window.document.createElement(CONF.textSelection.button.tag);
		button.innerHTML = CONF.textSelection.button.content;
		window.document.body.appendChild(button);
		return button;
	};

	var _touchSupport = function _touchSupport() {
		return 'ontouchstart' in window || navigator.maxTouchPoints; // works on IE10/11 and Surface
	};

	var _getSelectedText = function _getSelectedText() {
		if (CONF.textSelection.wordwrap) _rangyTextrange2.default.getSelection().expand('word'); // expand selection to word so that we don't have half words
		return _rangyTextrange2.default.getSelection().toString();
	};

	return {
		init: _init,
		browserSupport: _speakTts2.default.browserSupport,
		getSpeakInstance: function getSpeakInstance() {
			return _speakTts2.default;
		}
	};
}(window);

exports.default = Speech;