const sentence = 'the cat sat on the mat';
const words = sentence.split(' ');
let index = 0;
let output_str = '';
const recording = false;
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
recognition.maxAlternatives = 1;

function output_word() {
    if(index < words.length) {
        output_str += `${words[index]} `;
        index ++;

        $('#output').val(output_str);
    }
}

function start () {
    index = 0;
    output_str = '';
    $('#output').val('');

    if(recording) {
        recognition.stop();
        recognition.start();
    } else {
        recording = true;
        recognition.start();
    }
}

function stop () {
    recording = false;
    recognition.stop();
}

recognition.onresult = (event) => {
    const length = event.results.length;
    const result = event.results[length - 1][0].transcript;

    check(result);
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


function start() {
    index = 0;
    output_str = '';
    output_word();
}

function check(result) {
    if(index !== 0) {
        if(result.trim().toLowerCase() === words[index - 1].trim().toLowerCase()) {
            if(index === words.length) {
                console.log('success');
                recording = false;
                recognition.stop();
            }
            output_word();
        }
    }
}

function next() {
    output_word();
}