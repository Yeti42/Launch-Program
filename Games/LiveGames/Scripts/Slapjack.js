const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var target = '';
var card = document.getElementById("card");
var result = document.getElementById("result");
var targetLetterSpan = document.getElementById("targetLetter");
var next = document.getElementById("next");
var deck = [];

function start() {
    // Choose a target letter
    target = letters[Math.floor(Math.random() * letters.length)];
    targetLetterSpan.textContent = target;
    result.textContent = "";

    setDeck(target); // <-- create deck first
    showRandom();     // <-- then show from deck

    next.style.display = "inline-block";
    document.getElementById("start").textContent = "New Letter";
}

function setDeck(letter) {
    const deckSize = Math.floor(Math.random() * 5) + 6; // 6–10
    deck = shuffle(letters.filter(l => l !== letter)).slice(0, deckSize - 1);
    const insertPoint = Math.floor(Math.random() * deckSize);
    deck.splice(insertPoint, 0, letter); // insert target at random position
}

function showRandom() {
    if (deck.length > 0) {
        const randomIndex = Math.floor(Math.random() * deck.length);
        const randomCard = deck[randomIndex];
        card.textContent = randomCard;
    } else {
        card.textContent = '?';
        result.textContent = 'Deck is empty. Start again.';
    }
}

function check() {
    const shownLetter = card.textContent;
    if (shownLetter == target) {
        result.textContent = "SLAP! Correct!";
        result.style.color = "green";
    } else {
        result.textContent = "Oops! Wrong letter.";
        result.style.color = "red";
    }
};

function shuffle(arr) {
    return arr.slice().sort(() => Math.random() - 0.5);
}
