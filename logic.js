var initBackgroundColor = document.querySelector('.container')
initBackgroundColor.style.backgroundColor = 'lime'
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
//Init speech sytenthesis
const message = new SpeechSynthesisUtterance();
//Runs translation
function onSpeak(e) {
    let language1 = document.querySelector('#player-1-voices').value
    const firstlanguage = language1.slice(-5, -3).toLowerCase()
    console.log(firstlanguage)
    let language2 = document.querySelector('#player-2-voices').value
    const secondlanguage = language2.slice(-5, -3).toLowerCase()
    const spokenmessage = e.results[0][0].transcript;
    console.log(spokenmessage)
    translate(spokenmessage, firstlanguage, secondlanguage);
    return spokenmessage
}
//Set text
function setTextMessage(input) {
    message.text = input
}
//Speak text
function speakText() {
    speechSynthesis.speak(message)
}
//Pulls translation API and feeds to on speak to record
function translate(message, firstlanguage, secondlanguage) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
        "method": "POST",
        "headers": {
            "x-rapidapi-host": "google-translate1.p.rapidapi.com",
            "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70",
            "content-type": "application/x-www-form-urlencoded"
        },
        "data": {
            "source": firstlanguage,
            "q": message,
            "target": secondlanguage
        }
    }
    //Pulls api and translates
    $.ajax(settings).done(function (response) {
        console.log(response);
        const outcome = response.data.translations[0].translatedText
        $('#msg').html(`<div>${outcome}</div>`)
        console.log(outcome)
        setTextMessage(outcome);
        speakText()
    })
};
// }
//Function to start recording
function startRecording() {
    recognition.start()
}
//On button click, then recording starts
$('.btn-start').on('mousedown', startRecording)
//Once recording is complete ("result"), then translation occurs
recognition.addEventListener('result', onSpeak);
let player_1_voices = [];
//Grabs voices from API & stores into options for user to select from
function getVoices() {
    player_1_voices = speechSynthesis.getVoices()
    player_1_voices.forEach(voice => {
        const option1 = document.createElement('option')
        option1.value = voice.lang;
        option1.innerHTML = `${voice.name} ${voice.lang}`
        $('.voices').append(option1)
    })
    document.querySelector('#player-1-voices').value = document.querySelector('#player-1-voices')[48].value;
    document.querySelector('#player-2-voices').value = document.querySelector('#player-1-voices')[51].value;
}
//Event listener for when voice options are changed & default getVoices is called for when doc is loaded
speechSynthesis.addEventListener('voiceschanged', getVoices)
function swap() {
    let language1 = document.querySelector('#player-1-voices').value
    let language2 = document.querySelector('#player-2-voices').value
    document.querySelector('#player-1-voices').value = language2;
    document.querySelector('#player-2-voices').value = language1;
    console.log('fuck')
    console.log(initBackgroundColor.style.backgroundColor)
    // initBackgroundColor.style.backgroundColor = 'lime' ? initBackgroundColor.style.backgroundColor = 'red' : initBackgroundColor.style.backgroundColor = 'green'
    // console.log(initBackgroundColor.style.backgroundColor)
    if(initBackgroundColor.style.backgroundColor == 'lime'){
    initBackgroundColor.style.backgroundColor = 'red'
   } else {
    initBackgroundColor.style.backgroundColor = 'lime'
   }
    console.log(initBackgroundColor.style.backgroundColor)
}
recognition.addEventListener('end', swap)



















// window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// // document.querySelector('#player-1-voices').value = es-US;
// // document.querySelector('#player-2-voices').value = es-ES;

// let recognition = new window.SpeechRecognition();
// //Init speech sytenthesis
// const message = new SpeechSynthesisUtterance();
// //Runs translation
// function onSpeak(e) {
//     let language1 = document.querySelector('#player-1-voices').value
//     const firstlanguage = language1.slice(-5, -3).toLowerCase()
//     console.log(firstlanguage)
//     let language2 = document.querySelector('#player-2-voices').value
//     const secondlanguage = language2.slice(-5, -3).toLowerCase()
//     const spokenmessage = e.results[0][0].transcript;
//     console.log(spokenmessage)
//     translate(spokenmessage, firstlanguage, secondlanguage);
//     return spokenmessage
// }
// //Set text
// function setTextMessage(input) {
//     message.text = input
// }
// //Speak text
// function speakText() {
//     speechSynthesis.speak(message)
// }
// //Pulls translation API and feeds to on speak to record
// function translate(message, firstlanguage, secondlanguage) {
//     var settings = {
//         "async": true,
//         "crossDomain": true,
//         "url": "https://google-translate1.p.rapidapi.com/language/translate/v2",
//         "method": "POST",
//         "headers": {
//             "x-rapidapi-host": "google-translate1.p.rapidapi.com",
//             "x-rapidapi-key": "9d23a098c0mshffb86547dfcfa5ap17bf84jsn411163bf9f70",
//             "content-type": "application/x-www-form-urlencoded"
//         },
//         "data": {
//             "source": firstlanguage,
//             "q": message,
//             "target": secondlanguage
//         }
//     }
//     //Pulls api and translates
//     $.ajax(settings).done(function (response) {
//         console.log(response);
//         const outcome = response.data.translations[0].translatedText
//         $('#msg').html(`<div>${outcome}</div>`)
//         console.log(outcome)
//         setTextMessage(outcome);
//         speakText()
//     })
// };
// // }
// //Function to start recording
// function startRecording() {
//     recognition.start()
// }
// //On button click, then recording starts
// $('.btn-start').on('click', startRecording)
// //Once recording is complete ("result"), then translation occurs
// recognition.addEventListener('result', onSpeak);
// let player_1_voices = [];
// //Grabs voices from API & stores into options for user to select from
// function getVoices() {
//     player_1_voices = speechSynthesis.getVoices()
//     player_1_voices.forEach(voice => {
//         const option1 = document.createElement('option')
//         option1.value = voice.lang;
//         option1.innerHTML = `${voice.name} ${voice.lang}`
//         $('.voices').append(option1)
//     })
//     // console.log(player_1_voices);
//     // console.log(document.querySelector('#player-1-voices')[48].innerHTML);
//     // console.log(document.querySelector('#player-1-voices')[0].innerHTML);
//     // lang1 = document.querySelector('#player-1-voices')[48].innerHTML;
//     // lang2 = document.querySelector('#player-1-voices')[51].innerHTML;
//     // console.log(lang1);
//     // console.log(lang2);
//     // console.log(document.querySelector('#player-1-voices'));
//     document.querySelector('#player-1-voices').value = document.querySelector('#player-1-voices')[4].value;
//     document.querySelector('#player-2-voices').value = document.querySelector('#player-1-voices')[7].value;
//     // document.querySelector('#player-1-voices').value = `${player_1_voices[48].name} ${player_1_voices[48].lang}`
//     // document.querySelector('#player-2-voices').value = `${player_1_voices[51].name} ${player_1_voices[51].lang}`
// }
// //Event listener for when voice options are changed & default getVoices is called for when doc is loaded
// speechSynthesis.addEventListener('voiceschanged', getVoices)
// // getVoices()
// function swap() {
//     let language1 = document.querySelector('#player-1-voices').value
//     let language2 = document.querySelector('#player-2-voices').value
//     console.log(language1);
//     console.log(language2);
//     document.querySelector('#player-1-voices').value = language2;
//     document.querySelector('#player-2-voices').value = language1;
// }
// recognition.addEventListener('end', swap)

// $('#flip').on('click', swap);







// // function getVoices() {
// //     // let voiceList = []
// //     player_1_voices = speechSynthesis.getVoices()
// //     player_1_voices.forEach(voice => {
// //         const option1 = document.createElement('option')
// //         option1.value = voice.lang;
// //         option1.innerHTML = `${voice.name} ${voice.lang}`
// //         $('.voices').append(option1);
// //         voiceList.append(option1);
// //         console.log(player_1_voices);
// //     })
// //     console.log(player_1_voices[48]);
// //     setting1 = ($('.voices')[0]);
// //     console.log(setting1);
    
// //     // document.querySelector('#player-1-voices').value = `${player_1_voices[48].name} ${player_1_voices[48].lang}`
// //     // document.querySelector('#player-2-voices').value = `${player_1_voices[51].name} ${player_1_voices[51].lang}`
// // }