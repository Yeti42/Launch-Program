/**
 * @author Jacob Stevens
 * This handles the grid functions
 */


var turns = 0; // Variable to determine how many turns have been had
var player; // Variable that holds the letter the player chose to play as
var enemy; // Variable that holds the opponent's letter
var enemyTurn = false; // Variable to tell if it's the enemy's turn
var gameOver = false; // Variable to tell if play is still allowed
var lastPlayed = null; // Variable that holds the index of the last played cell

// The possible winning combinations
const winningCombinations = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // Rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // Columns
  [1, 5, 9], [3, 5, 7]             // Diagonals
];

/**
 * Loads the selected characters into the game
 * @param {string} playerChar The letter the player is playing as
 * @param {string} enemyChar The letter the enemy is playing as
 */
function selectedCharacters(playerChar, enemyChar) {
  player = playerChar;
  enemy = enemyChar;
}

/**
 * Load the cells with given functionality
 */
function loadGrid() {
  const grid = document.getElementById("grid");

  // For loop to create the 3x3 grid
  for (let i = 1; i <= 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i; // Store index (1 to 9)

    // Add listener for letting the player take thier turn and trigger the computer's turn
    cell.addEventListener("click", () => {
      // Check that the cell doesn't have something in it, it's not the enemy's turn, and the game is still going
      if (!cell.textContent && !enemyTurn && !gameOver) {
        cell.textContent = player; // Display player letter on click
        turns++; // Increase number of turns had by one
        checkIfWon(player); // Check if the player has won the game
        enemyTurnStarter(); // Trigger the enemy's turn
      }
    });

    grid.appendChild(cell);
  }
};

/**
 * Function to handle the enemy's turn
 */
function enemyTurnStarter() {
  enemyTurn = true; // Set it so that it's the enemy's turn

  // Wait a bit, then place the enemy's move
  setTimeout(() => {
    // Check that the game is not over
    if (!gameOver) {
      const winningMove = findBestMove(enemy); // Check if the enemy can win
      const blockingMove = findBestMove(player); // Check if the player needs to be blocked
      if (winningMove) {
        placeOByNumber(winningMove); // Take the winning move, if there is one
      } else if (blockingMove) {
        placeOByNumber(blockingMove); // Block the player's winning move, if there is one
      } else {
        placeOByNumber(selectRandomEmptyIndex()); // Fallback to a random move
      }
      checkIfWon(enemy); // Check if computer enemy won
      enemyTurn = false; // Enemy turn now over, allow player to go
    }
  }, 800);
}

/**
 * Find the best move for the enemy to take (to win or block).
 * @param {string} letter The letter to check for (player or enemy).
 * @returns The index of the best move, or null if none available.
 */
function findBestMove(letter) {
  // Check all possible win conditions
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    const cells = [getCellContent(a), getCellContent(b), getCellContent(c)]; // Get the content of three cells that could win

    // Check if two cells match the given letter and one is empty
    if (cells.filter(cell => cell === letter).length === 2 && cells.includes("")) {
      return combination[cells.indexOf("")]; // Return the empty cell's index
    }
  }

  return null; // No winning or blocking move found
}



/**
 * Function to fill a specific square with "O" based on a number (1–9)
 * @param {int} number The index of the grid cell to place the letter in
 * @returns Nothing, only returns if there was an error
 */
function placeOByNumber(number) {
  if (number < 1 || number > 9) {
    console.error("Number out of range. Please use a number between 1 and 9.");
    return;
  }

  const targetCell = document.querySelector(`.cell[data-index='${number}']`);

  if (targetCell && !targetCell.textContent) {
    targetCell.textContent = enemy; // Place enemy letter in the specified square
  } else {
    console.error("Square is already filled or does not exist.");
  }
  turns++;
}

// Function to randomly select an unfilled cell's index
function selectRandomEmptyIndex() {
  const cells = Array.from(document.querySelectorAll(".cell")); // Get all cells
  const emptyCells = cells.filter(cell => !cell.textContent); // Filter unfilled cells

  if (emptyCells.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length); // Select a random index
    const selectedCell = emptyCells[randomIndex]; // Get the random cell
    return selectedCell.dataset.index; // Return the data-index of the selected cell
  } else {
    console.error("No empty cells available, game is now over.");
    return null;
  }
}


// Function to check if someone has won the game
function checkIfWon(letter) {
  // Check if there have been enough turns for a win to occur
  if (turns < 4) {
    console.log("Game too young");
    return false;
  }

  // Check all the combinations
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (areThreeEqualToLetter(a, b, c, letter)) {
      showWin(letter); // Show the win text
      gameOver = true; // Stop play
      highlightWinningCombination(a, b, c); // Highlight the winning combination
      return true;
    }
  }

  if (turns >= 9) {
    console.log("Tied");
    showTie();
    gameOver = true; // Stop play
  }

  return false; // Return false if no-one has won yet
}

// Function to check if three cells are equal to each other and the given letter
function areThreeEqualToLetter(index1, index2, index3, letter) {
  // Get the content of the 3 cells
  const cell1 = getCellContent(index1);
  const cell2 = getCellContent(index2);
  const cell3 = getCellContent(index3);

  return cell1 === cell2 && cell2 === cell3 && cell3 === letter; // Output if all three cells are equal to the given letter
}

/**
 * Function to get the content of a cell
 * @param {int} index The index of the desired cell contents
 * @returns The value in the cell
 */
function getCellContent(index) {
  if (index < 1 || index > 9) {
    console.error("getCellContent input is out of range");
    return null; // Return null for invalid index
  }

  const targetCell = getCell(index); // Get the desired cell
  if (targetCell) {
    return targetCell.textContent; // Return the content of the target cell
  } else {
    console.error("Square does not exist.");
    return null; // Return null if the cell is not found
  }
}

/**
 * Function to get a cell
 * @param {int} index The index of the desired cell
 * @returns The desired cell
 */
function getCell(index) {
  // Make sure the cell index is valid
  if (index < 1 || index > 9) {
    console.error("getCell input is out of range");
    return null; // Return null for invalid index
  }

  return document.querySelector(`.cell[data-index='${index}']`);
}
