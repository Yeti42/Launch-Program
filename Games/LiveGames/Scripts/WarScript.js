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
}