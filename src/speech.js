import _ from 'lodash'
import rangy from 'rangy/lib/rangy-textrange'
import Speak from 'speak-tts'

console.log("speak", Speak)
const Speech = ((window) => {
	
	let CONF = {
    'speak': {
      //'lang' : 'en-GB', // if no language specified, automatic detection will be done
      'volume': 1,
      'rate': 1,
      'pitch': 1,
    },
		'textSelection' : {
			'wordwrap': true,
			'button': {
				'tag': 'div', // main wrapper of button
				'content': '<p>Click here to listen</p>' // content of button
			}
		}
	}

	function _init(conf) {
		// Import conf
		if(conf) CONF =_.merge(CONF, conf)

		// Polyfill
		if(!Speak.browserSupport()) {
			return false
		} else {

      const SpeakConf = _.merge(CONF.speak, {
        onVoicesLoaded: (data) => {
          const { voices } = data
          _addVoicesList(voices)
          if(_.get(conf, 'speak.voicesLoaded')) {
            conf.speak.voicesLoaded(voices)
          }
        }
      })
			Speak.init(SpeakConf)
		}

		// Start listening to events
		if(_touchSupport()) {
			// Append button
			let button =_addTouchButton();
			button.addEventListener('click', (e) => {
				let text = _getSelectedText();
				Speak.speak({
					text: text
				});
			});
		} else {
			window.addEventListener('mouseup', (e) => {
				let text = _getSelectedText();
				Speak.speak({
					text: text
				});
				e.preventDefault();
			});
		}		
	}

	const _addVoicesList = (voices) => {
		let list = window.document.createElement('div')
		list.innerHTML += '<h2>Voices</h2><p>'
		voices.forEach((voice) => {
			list.innerHTML += voice.name + ' (' + voice.lang + ')' + ' '
		})
		list.innerHTML += '</p>';
		window.document.body.appendChild(list);
	}

	const _addTouchButton  = () => {
		const button = window.document.createElement(CONF.textSelection.button.tag)
		button.innerHTML = CONF.textSelection.button.content
		window.document.body.appendChild(button)
		return button
	}
	
	const _touchSupport = () => {
		return ('ontouchstart' in window || navigator.maxTouchPoints) // works on IE10/11 and Surface
	}

	const _getSelectedText = () => {
		if(CONF.textSelection.wordwrap) rangy.getSelection().expand('word') // expand selection to word so that we don't have half words
	  return rangy.getSelection().toString()
	}

	return {
		init: _init,
		browserSupport: Speak.browserSupport,
    getSpeakInstance: () => Speak
	}
})(window);

export default Speech