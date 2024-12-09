const baseDeck = [];
let p1Deck = [1, 2, 3, 4]; // TODO: set this correctly
let p2Deck = [4, 3, 2, 1];
let card1 = 0;
let card2 = 0;
let war1 = [];
let war2 = [];
let wasEqual = false;

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
        headText.textContent = "You have the higher card!";
        processCards(1);
    } else if (card1 < card2) {
        headText.textContent = "Computer has the higher card!";
        processCards(2);
    } else if (card1 === card2) {
        headText.textContent = "War!";
        processCards(3);
    }
}

function processCards(cardCheck) {
    setTimeout(() => {
        switch (cardCheck) {
            case 1:
                p1Deck.push(card1);
                p1Deck.push(card2);
                if (wasEqual) {
                    war1.forEach(num => {
                        p1Deck.push(num);
                    });
                    war2.forEach(num => {
                        p1Deck.push(num);
                    });
                    wasEqual = false;
                }
                break;

            case 2:
                p2Deck.push(card2);
                p2Deck.push(card1);
                if (wasEqual) {
                    war1.forEach(num => {
                        p1Deck.push(num);
                    });
                    war2.forEach(num => {
                        p1Deck.push(num);
                    });
                    wasEqual = false;
                }
                break;

            case 3:
                wasEqual = true;
                equalCards();
                break;
        }
    }, 1000);
}

function equalCards() {
    war1.unshift(p1Deck.shift());
    war1.unshift(p1Deck.shift());
    war2.unshift(p2Deck.shift());
    war2.unshift(p2Deck.shift());

    const text1 = document.getElementById("p1");
    const text2 = document.getElementById("p2");
    const headText = document.getElementById("head");

    text1.textContent = war1.at(0);
    text2.textContent = war2.at(0);

    if (war1.at(0) > war2.at(0)) {
        headText.textContent = "You have the higher card!";
        processCards(1);
    } else if (war1.at(0) < war2.at(0)) {
        headText.textContent = "Computer has the higher card!";
        processCards(2);
    } else if (war1.at(0) === war2.at(0)) {
        headText.textContent = "War, again!";
        processCards(3);
    }
}