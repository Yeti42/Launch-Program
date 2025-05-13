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

function check() {
    if (checked) {
        return;
    }
    const cell = document.getElementById(tableId).textContent;
    const input = document.getElementById("input").value;
    const scoreOne = document.getElementById("scoreOne");
    var isCorrect;

    if (cell == input) {
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
