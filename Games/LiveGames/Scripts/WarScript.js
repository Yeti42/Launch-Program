const baseDeck = Array.from({ length: 52 }, (_, i) => i + 1); // A standard deck of cards
let p1Deck = [];
let p2Deck = [];
let card1 = 0;
let card2 = 0;
let war1 = [];
let war2 = [];
let wasEqual = false;

// Shuffle the deck and distribute it between players
function initializeGame() {
    const shuffledDeck = baseDeck.sort(() => Math.random() - 0.5);
    p1Deck = shuffledDeck.slice(0, 26); // First half to player 1
    p2Deck = shuffledDeck.slice(26);   // Second half to player 2
}

initializeGame();

/**
 * Draw a card for the player's deck
 */
function draw() {
    // Check if a player has run out of cards
    if (p1Deck.length === 0) {
        endGame("Computer wins!");
        return;
    }
    if (p2Deck.length === 0) {
        endGame("You win!");
        return;
    }

    // Draw the top cards
    card1 = p1Deck.shift();
    card2 = p2Deck.shift();

    const text1 = document.getElementById("p1");
    const text2 = document.getElementById("p2");
    const headText = document.getElementById("head");

    text1.textContent = card1;
    text2.textContent = card2;

    if (card1 > card2) {
        headText.textContent = "You have the higher card!";
        processCards(1);
    } else if (card1 < card2) {
        headText.textContent = "Computer has the higher card!";
        processCards(2);
    } else {
        headText.textContent = "War!";
        processCards(3);
    }
}

function processCards(cardCheck) {
    setTimeout(() => {
        switch (cardCheck) {
            case 1: // Player 1 wins
                p1Deck.push(card1, card2);
                if (wasEqual) handleWarWin(1);
                break;

            case 2: // Player 2 wins
                p2Deck.push(card1, card2);
                if (wasEqual) handleWarWin(2);
                break;

            case 3: // War!
                wasEqual = true;
                equalCards();
                break;
        }
    }, 1000);
}

function equalCards() {
    if (p1Deck.length < 2 || p2Deck.length < 2) {
        // If either player can't continue the war
        const winner = p1Deck.length > p2Deck.length ? "You win!" : "Computer wins!";
        endGame(winner);
        return;
    }

    war1 = [p1Deck.shift(), p1Deck.shift()];
    war2 = [p2Deck.shift(), p2Deck.shift()];

    const text1 = document.getElementById("p1");
    const text2 = document.getElementById("p2");
    const headText = document.getElementById("head");

    text1.textContent = war1.at(-1); // Display the last drawn card for Player 1
    text2.textContent = war2.at(-1); // Display the last drawn card for Player 2

    if (war1.at(-1) > war2.at(-1)) {
        headText.textContent = "You have the higher card!";
        processCards(1);
    } else if (war1.at(-1) < war2.at(-1)) {
        headText.textContent = "Computer has the higher card!";
        processCards(2);
    } else {
        headText.textContent = "War, again!";
        processCards(3);
    }
}

function handleWarWin(winner) {
    const winningDeck = winner === 1 ? p1Deck : p2Deck;
    winningDeck.push(...war1, ...war2);
    war1 = [];
    war2 = [];
    wasEqual = false;
}

function endGame(message) {
    const headText = document.getElementById("head");
    headText.textContent = message;

    // Disable further interaction
    document.getElementById("drawButton").disabled = true;
}
