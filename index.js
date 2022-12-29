const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const colors = [ 'aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', /* … */ ];
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')};`

const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

function start () {
    recognition.start();
}

recognition.onresult = (event) => {
    const length = event.results.length;
    const result = event.results[length - 1][0].transcript;

    console.log(result);
}

recognition.onnomatch = (event) => {
    console.log(event)

}

recognition.onerror = function(event) {
    console.log(event.error);
}

recognition.onsoundend = (event) => {
    console.log('Sound has stopped being received');
  }

  recognition.onspeechend = () => {
    console.log('Speech has stopped being detected');
  }

  recognition.onaudioend = () => {
    console.log('Audio capturing ended');
  }