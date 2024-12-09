const baseDeck = [];
let p1Deck = [];
let p2Deck = [];
let card1 = 0;
let card2 = 0;

/**
 * Draw a card for the player's deck
 */
function draw() {
    card1 = p1Deck.shift();
    card2 = p2Deck.shift();

    const text1 = document.getElementById("p1");
    const text2 = document.getElementById("p2");
    const headText = document.getElementById("head");

    text1.textContent = card1;
    text2.textContent = card2;

    if (card1 > card2) {
        headText.textContent = "Player has the higher card!";
    } else if (card1 < card2) {
        headText.textContent = "Computer has the higher card!";
    } else if (card1 === card2) {
        headText.textContent = "Cards are equal!";
    }
}