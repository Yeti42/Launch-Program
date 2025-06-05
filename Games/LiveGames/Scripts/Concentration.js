const lowercase = [...Array(26)].map((_, i) => String.fromCharCode(97 + i));
const uppercase = [...Array(26)].map((_, i) => String.fromCharCode(65 + i));

let matchedTotal = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Select 8 letters
    const selectedIndexes = [];
    while (selectedIndexes.length < 8) {
        const index = Math.floor(Math.random() * 26);
        if (!selectedIndexes.includes(index)) {
            selectedIndexes.push(index);
        }
    }

    // Get letter pairs, making 16 total letters
    const selectedLetters = selectedIndexes.flatMap(i => [lowercase[i], uppercase[i]]);

    // Shuffle letters
    for (let i = selectedLetters.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [selectedLetters[i], selectedLetters[j]] = [selectedLetters[j], selectedLetters[i]];
    }

    // Map of cell ID to letter
    const cellLetters = {};
    for (let i = 0; i < 16; i++) {
        const cellId = (i + 1).toString();
        const cell = document.getElementById(cellId);
        if (cell) {
            cellLetters[cellId] = selectedLetters[i];
            cell.textContent = "?"; // Hide initially
        }
    }

    let revealed = [];

    // Checker for when people click on the letters
    document.querySelectorAll("td").forEach(cell => {
        cell.addEventListener("click", () => {
            const cellId = cell.id;

            if (cell.classList.contains("matched") || revealed.includes(cell) || revealed.length === 2) return;

            cell.textContent = cellLetters[cellId];
            revealed.push(cell);

            if (revealed.length === 2) {
                const [first, second] = revealed;
                const firstLetter = cellLetters[first.id];
                const secondLetter = cellLetters[second.id];

                if (firstLetter.toLowerCase() === secondLetter.toLowerCase()) {
                    first.classList.add("matched");
                    second.classList.add("matched");
                    matchedTotal += 2;
                    revealed = [];
                } else {
                    setTimeout(() => {
                        first.textContent = "?";
                        second.textContent = "?";
                        revealed = [];
                    }, 1000);
                }
            }

            if (matchedTotal === 16) {
                document.getElementById("winText").textContent = "Well done!";
            }
        });
    });
});
