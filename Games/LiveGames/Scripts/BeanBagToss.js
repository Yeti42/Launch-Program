landed = null;
const correctText = document.getElementById("isCorrect");
var tossed = false;

function toss() {
    if (tossed) {
        return;
    }
    for (let i = 1; i < 10; i++) {
        const cell = document.getElementById(i);
        cell.style.backgroundColor = '';
    }
    selectedCell = Math.floor(Math.random() * 9) + 1;
    console.log(selectedCell);
    landed = document.getElementById(selectedCell);
    landed.style.backgroundColor = 'rgb(158, 158, 253)';

    const wordInput = document.getElementById('wordInput');
    wordInput.value = "";

    correctText.textContent = `Input a word starting with ${landed.textContent}`;

    tossed = true;
}

async function checkWord() {
    const word = document.getElementById('wordInput').value.toLowerCase();
    const pre = landed.textContent;

    if (word.startsWith(pre)) {
        const isReal = await isRealWord(word);
        if (isReal) {
            console.log("Correct");
            correctText.textContent = "Correct!";
        } else {
            console.log("Incorrect (not a real word)");
            correctText.textContent = "Incorrect, that is not a real word";
        }
    } else {
        console.log("Incorrect (doesn't start with the right letters)");
        correctText.textContent = `Incorrect, that word doesn't start with the right letters (${pre})`
    }

    tossed = false;
}

async function isRealWord(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return res.ok;
    } catch (error) {
        return false;
    }
}


function startListening() {
    // Use webkitSpeechRecognition for Chrome
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser.");
        return;
    }

    // Set the language
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start(); // Start listening for speech

    recognition.onresult = function (event) {
        var transcript = event.results[0][0].transcript.toLowerCase().trim();

        transcript = transcript.replace(/[.,!?]$/, ''); // Remove trailing period if it exists

        document.getElementById('wordInput').value = transcript; // Input whatever was said

        console.log("Recognized:", transcript);
        checkWord();
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
    };
}


