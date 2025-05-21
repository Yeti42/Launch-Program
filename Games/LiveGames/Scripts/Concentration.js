const lowercase = [...Array(26)].map((_, i) => String.fromCharCode(97 + i));
const uppercase = [...Array(26)].map((_, i) => String.fromCharCode(65 + i));

var letters;
var matchedTotal = 0;

console.log("Lowercase:", lowercase);
console.log("Uppercase:", uppercase);

document.addEventListener("DOMContentLoaded", () => {
    letters = lowercase.concat(uppercase);

    // Shuffle the letters
    for (let i = letters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    // Save a mapping from cell ID to letter
    const cellLetters = {}; // key: cell id, value: letter

    for (let i = 0; i < 52; i++) {
        const cellId = (i + 1).toString();
        const cell = document.getElementById(cellId);
        if (cell) {
            cellLetters[cellId] = letters[i];
            cell.textContent = "?"; // hide letter initially
        }
    }

    var revealed = [];

    document.querySelectorAll("td").forEach(cell => {
        cell.addEventListener("click", () => {
            const cellId = cell.id;

            // Skip if already matched or already visible or if two cells already revealed
            if (cell.classList.contains("matched") || revealed.includes(cell) || revealed.length == 2) return;

            // Reveal the letter by setting textContent
            cell.textContent = cellLetters[cellId];
            revealed.push(cell);

            if (revealed.length === 2) {
                const [first, second] = revealed;

                if (cellLetters[first.id].toLowerCase() === cellLetters[second.id].toLowerCase()) {
                    first.classList.add("matched");
                    second.classList.add("matched");
                    matchedTotal = matchedTotal + 2;
                    revealed = [];
                } else {
                    setTimeout(() => {
                        first.textContent = "?";
                        second.textContent = "?";
                        revealed = [];
                    }, 1000);
                }
            }

            if (matchedTotal == 52) {
                document.getElementById("winText").textContent = "Well done!";
            }
        });
    });
});
