var tableId = null;
var isSinglePlayer;
var previousId = null;
var turn = true; // True for player 1's turn, false for player 2.
var checked = false;

var playerOneCorrect = 0;
var playerTwoCorrect = 0;
var playerOneWrong = 0;
var playerTwoWrong = 0;

const startOneText = "Player 1 score: ";
const startTwoText = "Player 2 score: ";

/**
 * Sets the game to either singleplayer or 2 player mode
 * @param {boolean} input Should the game be in single player mode?
 */
function single(input) {
    isSinglePlayer = input;

    const buttons = document.getElementById("loadButtons");
    const calendar = document.getElementById("calendar");

    buttons.style.display = "none";
    calendar.style.display = "inherit";

    if (!isSinglePlayer) {
        const playerTwo = document.getElementById("scoreTwo");
        playerTwo.style.display = "inherit";
    }
}

/**
 * Select the next number and allow checking inputs
 */
function nextNumber() {
    if (previousId != null) {
        const previousCell = document.getElementById(previousId);
        previousCell.style.backgroundColor = "";
    }

    tableId = "day-" + (Math.floor(Math.random() * 31) + 1);
    const cell = document.getElementById(tableId);
    cell.style.backgroundColor = "yellow";

    previousId = tableId;

    document.getElementById("input").value = "";
    checked = false;
}

/**
 * Checks if the number in the text input is correct, if so it increases the correct
 * score counter of the current player. If incorrect, increases the incorrect counter of the current player
 */
function check() {
    const cell = document.getElementById(tableId).textContent;
    const input = document.getElementById("input").value;
    const scoreOne = document.getElementById("scoreOne");
    var isCorrect;

    if (checked || (input == "")) {
        return;
    }

    const numericInput = parseInt(input);
    const wordInput = wordsToNumber(input);
    const inputNumber = !isNaN(numericInput) ? numericInput : wordInput;

    if (parseInt(cell) == inputNumber) {
        isCorrect = true;
    } else {
        isCorrect = false;
    }

    if (isSinglePlayer) {
        if (isCorrect) {
            playerOneCorrect++;
        } else {
            playerOneWrong++;
        }
        scoreOne.textContent = playerOneCorrect + " Correct and " + playerOneWrong + " Incorrect";
    } else {
        if (turn) {
            if (isCorrect) {
                playerOneCorrect++;
            } else {
                playerOneWrong++;
            }
            scoreOne.textContent = startOneText + playerOneCorrect + " Correct and " + playerOneWrong + " Incorrect";
            turn = false;
        } else {
            if (isCorrect) {
                playerTwoCorrect++;
            } else {
                playerTwoWrong++;
            }
            scoreTwo.textContent = startTwoText + playerTwoCorrect + " Correct and " + playerTwoWrong + " Incorrect";
            turn = true;
        }
    }

    checked = true;
}

function wordsToNumber(words) {
    const numberWords = {
        zero: 0, one: 1, two: 2, three: 3, four: 4,
        five: 5, six: 6, seven: 7, eight: 8, nine: 9,
        ten: 10, eleven: 11, twelve: 12, thirteen: 13, fourteen: 14,
        fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
        twenty: 20, thirty: 30
    };

    words = words.toLowerCase().replace(/-/g, ' ').trim();
    const parts = words.split(/\s+/);
    let number = 0;

    if (parts.length == 1) {
        return numberWords[parts[0]] ?? NaN;
    } else if (parts.length === 2 && numberWords[parts[0]] >= 20 && numberWords[parts[0]] % 10 === 0) {
        return (numberWords[parts[0]] ?? 0) + (numberWords[parts[1]] ?? 0);
    }

    return NaN;
}


/**
 * Speech reconition, only works for Chrome-based browsers.
 */
function startListening() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Speech recognition not supported in this browser.");
        return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
        let transcript = event.results[0][0].transcript.toLowerCase().trim();

        // Remove trailing punctuation
        transcript = transcript.replace(/[.,!?]$/, '');

        console.log("Recognized:", transcript);

        // Extract the first number from the spoken input
        const match = transcript.match(/\d+/);

        if (match) {
            const number = parseInt(match[0], 10);
            document.getElementById('input').value = number;
            check(); // Pass the number to your function if needed
        } else {
            console.log("No number recognized.");
        }
    };

    recognition.onerror = function (event) {
        console.error("Speech recognition error:", event.error);
    };
}
