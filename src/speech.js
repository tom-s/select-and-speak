import rangy from 'rangy/lib/rangy-textrange'
import Speech from 'speak-tts'
import get from 'lodash/get'

class SelectAndSpeak extends Speech {
	constructor(props) {
		super(props)
		this.wordwrap = null
		this.autospeak = null
		this.touchMode = null
	}

	init(options) {
		return new Promise((resolve, reject) => {
			super.init(options)
				.then((data) => {
					this.wordwrap = get(options, 'wordwrap', true)
					this.autospeak = get(options, 'autospeak', true)

					window.addEventListener('mousedown', () => {
						this.touchMode = false
					})

					window.addEventListener('touchstart', () => {
						this.touchMode = true
					})

					window.addEventListener('mouseup', e => {
						if(!this.touchMode && this.autospeak) {
							this.speakSelectedText(e)
							e.preventDefault()
						}
					})

					window.addEventListener('touchend', e => {
						if(this.touchMode && this.autospeak) {
							this.speakSelectedText(e)
							e.preventDefault()
						}
					})
					resolve(data)
				}).catch(e => reject(e))
		})
	}

	setWordwrap(wordwrap) {
		this.wordwrap = wordwrap
	}

	setAutospeak(autospeak) {
		this.autospeak = autospeak
	}

	speakSelectedText(options = {}) {
		const text = this.getSelectedText()
		return this.speak({
			text,
			queue: false,
			...options
		})
	}

	getSelectedText() {
		const selection = rangy.getSelection()
		if(this.wordwrap && selection.toString()) selection.expand('word') // expand selection to word so that we don't have half words
		return selection.toString()
	}
}

export default SelectAndSpeak
