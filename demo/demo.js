import SelectAndSpeak from '../src/speech.js'

const _addVoicesList = (voices) => {
	const list = window.document.createElement('div')
	let html = '<h2>Available Voices</h2><select id="languages"><option value="">autodetect language</option>'
	voices.forEach((voice) => {
		html += `<option value="${voice.lang}" data-name="${voice.name}">${voice.name} (${voice.lang})</option>`
	})
	list.innerHTML = html
	window.document.body.appendChild(list)
}

function _init() {
	const speech = new SelectAndSpeak()
	speech.init({
		wordwrap: true,
    autospeak: true
	}).then((data) => {
		_addVoicesList(data.voices)
		_prepareSpeakButton(speech)
	}).catch(e => {
		console.error("An error occured while initializing : ", e)
	})
	const text = (speech.hasBrowserSupport()) ? 'Hurray, your browser supports speech synthesis' : "Your browser does NOT support speech synthesis. Try using Chrome of Safari instead !"
	document.getElementById("support").innerHTML = text
}

function _prepareSpeakButton(speech) {
	const speakButton = document.getElementById('play')
	const pauseButton = document.getElementById('pause')
  const resumeButton = document.getElementById('resume')
  const autospeakCheckbox = document.getElementById('autospeak')
  const wordwrapCheckbox = document.getElementById('wordwrap')

	speakButton.addEventListener('click', () => {
		const language = languages.value
		const voice = languages.options[languages.selectedIndex].dataset.name
		if(language) speech.setLanguage(languages.value)
    if(voice) speech.setVoice(voice)
		speech.speakSelectedText().then((data) => {
			console.log("Success !", data)
		}).catch(e => {
			console.error("An error occurred :", e)
		})
	})

	pauseButton.addEventListener('click', () => {
		speech.pause()
	})

	resumeButton.addEventListener('click', () => {
		speech.resume()
  })
  
  autospeakCheckbox.addEventListener('click', () => {
    speech.setAutospeak(autospeakCheckbox.checked)
  })

  wordwrapCheckbox.addEventListener('click', () => {
    speech.setWordwrap(wordwrapCheckbox.checked)
  })
}

_init()