const letters = ["A", "J", "B", "F", "E", "I", "D", "G", "R", "Q", "L", "H"];
var uppercase;
var lowercase;
var correct = 0;
var incorrect = 0;


function newLetter() {
    uppercase = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById("letter").textContent = "Find: " + uppercase;
    newLowercase();
}

function newLowercase() {
    lowercase = letters[Math.floor(Math.random() * letters.length)].toLowerCase();
    document.getElementById("lowercase").textContent = lowercase;
}

function check(input) {
    const scoreText = document.getElementById("score");

    if (input && (uppercase.toLowerCase() == lowercase)) {
        correct++;
        newLetter();
    } else if (input && !(uppercase.toLowerCase() == lowercase)) {
        incorrect++;
        newLetter();
    } else {
        newLowercase();
    }

    scoreText.textContent = correct + " Correct answers and " + incorrect + " Incorrect answers";
}