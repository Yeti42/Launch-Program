/**
 * @author Jacob Stevens
 * This handles the text display functions and the buttons
 */

// The letters people will play as
var playerOne = "X";
var playerTwo = "O";

/**
 * Selects the letters that will be used
 * @param {string} letters 
 */
function letterSelect(letters) {
    const chars = letters.split(""); // Split the letter into the invidual characters

    // Hold the characters for later
    playerOne = chars[0];
    playerTwo = chars[1];

    // Hide the letter buttons
    const hideButtons = document.getElementById("letters");
    hideButtons.style.display = "none";

    loadSelect(); // Load the letter selection screen
}

/**
 * Load the Character selection screen
 */
function loadSelect() {
    const headText = document.getElementById("head");
    headText.textContent = "Select your character";

    const buttons = document.getElementById("Select_character");
    buttons.style.display = "inherit";

    // Turn buttons on
    const buttonOne = document.getElementById("X");
    const buttonTwo = document.getElementById("O");

    // Give buttons the right text
    buttonOne.textContent = playerOne;
    buttonTwo.textContent = playerTwo;
}

/**
 * If someone won, show the win text
 * @param {*} letter The letter that won
 */
function showWin(letter) {
    const winBox = document.getElementById("head"); // Get the element that holds the text above the game grid

    // Check who won, then show the right text
    if (letter == player) {
        winBox.textContent = "You win!";
    } else if (letter == enemy) {
        winBox.textContent = "Computer wins.";
    }
    showReplay(); // Show the replay button
}

/**
 * Show the "players tied" text
 */
function showTie() {
    const winBox = document.getElementById("head");
    winBox.textContent = "You have tied.";
    showReplay(); // Show the replay button
}

/**
 * Show the replay button
 */
function showReplay() {
    const button = document.getElementById("reload");
    button.style.display = "inherit";
}

/**
 * Select the characters with the button
 * @param {int} choice The letter the player selected
 */
function characterSelect(choice) {
    // Check which letter was selected
    if (choice == 1) {
        console.log("Player selected option 1");
        selectedCharacters(playerOne, playerTwo);
    } else if (choice == 2) {
        console.log("Player selected option 2");
        selectedCharacters(playerTwo, playerOne);
    }
    // Switch text and buttons to the starting player select ones
    const hideButtons = document.getElementById("Select_character");
    hideButtons.style.display = "None";

    // Show who goes first text
    const headText = document.getElementById("head");
    headText.textContent = "Who goes first?";

    // Show buttons for who goes first
    const buttons = document.getElementById("playfirst");
    buttons.style.display = "inherit";
}

/**
 * Starts the game, with whoever is playing first
 * @param {string} character // Who should play first
 */
function play(character) {
    // Hide the play select buttons
    const hideButtons = document.getElementById("playfirst");
    hideButtons.style.display = "None";

    // Hide the top text
    const startHide = document.getElementById("head");
    startHide.textContent = "";

    loadGrid(); // Load the game grid

    // If the player selectede the computer to play first, have it play
    if (character == "computer") {
        enemyTurn = true; // Make it be the enemy's turn
        enemyTurnStarter(); // Enemy turn
    }
}

/**
 * Function to highlight the winning combination by adding a special class
 */
function highlightWinningCombination(a, b, c) {
    const cells = [a, b, c];

    // Loop through the cells, setting each to be the "winning-cell" class
    cells.forEach(index => {
        const cell = getCell(index); // Get the cell
        if (cell) {
            cell.classList.add("winning-cell"); // Add a class to style the winning cells
        }
    });
}