const letters = ["A", "J", "B", "F", "E", "I", "D", "G", "R", "Q", "L", "H"];
var uppercase;
var lowercase;
var correct = 0;
var incorrect = 0;

/**
 * Select a new capital letter and show it, then show a new lowercase letter
 */
function newLetter() {
    uppercase = letters[Math.floor(Math.random() * letters.length)];
    document.getElementById("letter").textContent = "Find: " + uppercase;
    newLowercase();
}

/**
 * Show a new lowercase letter
 */
function newLowercase() {
    lowercase = letters[Math.floor(Math.random() * letters.length)].toLowerCase();
    document.getElementById("lowercase").textContent = lowercase;
}

/**
 * Checks to see if the player is correct in the lower and uppercase letters being the same letter or not
 * @param {boolean} input True for matching, false for now matching
 */
function check(input) {
    const scoreText = document.getElementById("score");

    if (input && (uppercase.toLowerCase() == lowercase)) {
        correct++;
        newLetter();
    } else if (!input && !(uppercase.toLowerCase() == lowercase)) {
        correct++;
        newLowercase();
    } else {
        incorrect++;
        newLowercase();
    }

    scoreText.textContent = correct + " Correct answers and " + incorrect + " Incorrect answers";
}