Select and speak (text selection and speech synthesis) - Web based TTS
===

## Installation

```bash
npm install select-and-speak
```

## Description

Select (highlight) text in your browser and in order to have spoken by speech synthesis. Use https://github.com/tom-s/speak-tts for the speech capability and language detection

See browser support here : http://caniuse.com/#feat=speech-synthesis

## Demo

[Here](http://experiments.thomschell.com/select-and-speak/demo/dist)

## Usage

Import the component :

```bash
import Speech from './utils/speech.js';
```

Start the component :
```bash
Speech.init();
```

You can pass the following properties at init time:
- volume
- rate
- pitch
- lang : if you don't pass a language, the language of the selected text will be automatically detected thanks to franc (https://github.com/wooorm/franc). If you pass a language, this will be used for all audio outputs (nevertheless the language of the selected text)

```bash
// Example with full conf
Speech.init({
    'speak': { // CONF for speak-tts
      //'lang' : 'en-GB', // if no language specified, automatic detection will be done
      'volume': 1,
      'rate': 1,
      'pitch': 1,
    },
    'textSelection' : {
      'wordwrap': true,
      'button': { // button displayed on touch devices
        'tag': 'div', // main wrapper of button
        'content': '<p>Click here to listen</p>' // content of button
      }
    }
});
```

## Supported languages
  "ar-SA" // arabic
  "cs-CZ" // czech
  "da-DK" // danish
  "de-DE" // german
  "el-GR" // greek
  "en-AU" // australian
  "en-GB" // english
  "en-IE"
  "en-US"
  "en-US"
  "en-ZA"
  "es-ES" // spanish
  "es-MX"
  "fi-FI" // finish
  "fr-CA"
  "fr-FR" // french
  "he-IL" // hebrew
  "hi-IN" // hindi
  "hu-HU" // hungarian
  "id-ID" // indonesian
  "it-IT" // italian
  "ja-JP" // japanese
  "ko-KR" // korean
  "nl-NL" // dutch
  "no-NO" // norwegian
  "pl-PL" // polish
  "pt-BR" // portuguese brazilian
  "pt-PT" // portuguese
  "ro-RO" // romanian
  "ru-RU" // russian
  "sk-SK" // slovak
  "sv-SE" // swedish
  "th-TH" // thai
  "tr-TR" // turkish
  "zh-CN" // chinese (S)
  "zh-HK" // chinese hong kong
  "zh-TW" // chinese (T'en-US';


## Tests

These will be added soon. Please do not hesitate to add some !

## About the Author

I am a full-stack Javascript developer based in Lyon, France.

[Check out my website](http://www.thomschell.com)

## License

speech and speak is dual licensed under the MIT license and GPL.
For more information click [here](https://opensource.org/licenses/MIT).
