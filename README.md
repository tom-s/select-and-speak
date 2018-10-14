Select and speak (text selection and speech synthesis) - Web based TTS
===

## Installation

```bash
npm install select-and-speak
```

## Description

Select (highlight) text in your browser and have it spoken by speech synthesis. Use https://github.com/tom-s/speak-tts for the speech synthesis.

See browser support here : http://caniuse.com/#feat=speech-synthesis

## Demo

[Here](http://experiments.thomschell.com/select-and-speak/demo/dist)

## Usage

Import the component :

```bash
import Speech from 'select-and-speak' // es6
// var Speech = require('select-and-speak') //if you use es5
```

Start the component :
```bash
const speech = new Speech()
speech.init().then((data) => {
	// The "data" object contains the list of available voices and the voice synthesis params
	console.log("Speech is ready, voices are available", data)
}).catch(e => {
	console.error("An error occured while initializing : ", e)
})
```

```bash
// Exemple with conf
Speech.init({
    'wordwrap': true, // default: whether or not selection should be expanded to the end of the word
    'autospeak': true // default: whether or not text should be spoken on selection (mouseUp or touchEnd event)
    // you can also add similar options to the ones in init() from https://github.com/tom-s/speak-tts
});
```

The Speech class inherits from the class provided by speak-tts. It means all the methods from speak-tts are available, plus the following:
- setWordwrap(bool)
- setAutospeak(bool)
-	speakSelectedText(options = {})
- getSelectedText()
- for the remaining methods please check out https://github.com/tom-s/speak-tts

Set wordwrap :

```javascript
speech.setWordwrap(false)
```

Set autospeak :

```javascript
speech.setAutospeak(false)
```

Speak the current selection :

```javascript
speech.speakSelectedText() // you can add similar options to the ones in speak() from  https://github.com/tom-s/speak-tts
```

Get current text selection :

```javascript
speech.getSelectedText({})
```

## Tests

These will be added soon. Please do not hesitate to add some !

## About the Author

I am a full-stack Javascript developer based in Lyon, France.

[Check out my website](http://www.thomschell.com)

## License

speech and speak is dual licensed under the MIT license and GPL.
For more information click [here](https://opensource.org/licenses/MIT).
