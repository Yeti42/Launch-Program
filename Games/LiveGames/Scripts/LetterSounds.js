var spoken = false;
var word = "No word";

const wordsStart = [
    "bad", "bag", "ban", "bud", "bed", "bat", "bid", "big",
    "dog", "dab", "dot", "dig", "den", "dip", "dim",
    "tab", "ten", "tag", "tap", "tin", "tip", "tug", "top", "tub",
    "pat", "pad", "pet", "pot", "pin", "put", "pan",
    "get", "gum", "got", "gas", "gap", "gad", "gab",
    "not", "net", "nap", "nip", "nut", "nod", "nab"
];

const wordsEnd = [
    "tab", "tub", "dab", "rob", "web", "rib", "gab", "rub",
    "bed", "pad", "bud", "red", "bid", "pod", "had",
    "bat", "hot", "put", "sit", "net", "pot", "cat", "nut",
    "top", "nap", "dip", "tap", "rip", "sup", "gap", "lip",
    "big", "dog", "tag", "peg", "bag", "tug", "pig", "rag",
    "ten", "pin", "man", "bun", "pan", "ban", "win", "hen"
];


var side = true;
var letter = "a";

const button = document.getElementById("SpeakButton");
const resultText = document.getElementById("Score");
var correct = 0;
var incorrect = 0;

/**
 * Say the word. If a word has not been selected, select a new word then say it.
 */
function speak() {
    if (!spoken) {
        NewWord();
        button.textContent = "Say word again";
        spoken = true;
    }

    const utterance = new SpeechSynthesisUtterance(word);
    speechSynthesis.speak(utterance);
}

/**
 * Select a new word. This is done with a coin toss for which list to select from, then a ranomly selected word from that list.
 */
function NewWord() {
    document.getElementById("WordInput").value = "";

    const coin = Math.random() < 0.5 ? true : false;
    if (coin) {
        const index = Math.floor(Math.random() * wordsStart.length);
        word = wordsStart[index];
        side = true;
        console.log("Letter is at start");

        const letterText = document.getElementById("LetterText");
        letterText.textContent = "The letter is " + word[0];
    }
    else {
        const index = Math.floor(Math.random() * wordsEnd.length);
        word = wordsEnd[index];
        side = false;
        console.log("Letter is at end");
        const letterText = document.getElementById("LetterText");
        letterText.textContent = "The letter is " +  word[word.length - 1];
    }
}

/**
 * Checks if the right color was selected
 * @param {boolean} color True for green, false for red
 * @param {string} inputWord The word that has been typed
 */
function check(color, inputWord) {
    if (!spoken) {
        return;
    }

    if (inputWord != word) {
        document.getElementById("WordHelp").textContent = "That is not the right word, try again";
        return;
    }

    console.log(color);

    if (side && color) {
        correct++;
    } else if (!side && !color) {
        correct++;
    } else if (side && !color) {
        incorrect++;
    } else if (!side && color) {
        incorrect++;
    }

    resultText.textContent = correct + " Correct and " + incorrect + " Incorrect";

    spoken = false;
    button.textContent = "New Word";

    document.getElementById("WordHelp").innerHTML = "<br>";
}

// Logic for accepting forms without needing to go to a new page.
document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Stops page from reloading

    const isTrue = event.submitter.value === "true";
    const typedWord = document.getElementById("WordInput").value.trim().toLowerCase();
    check(isTrue, typedWord);
});
