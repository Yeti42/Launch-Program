landed = null;
const correctText = document.getElementById("isCorrect");

function toss() {
    for (let i = 1; i < 10; i++) {
        const cell = document.getElementById(i);
        cell.style.backgroundColor = '';
    }
    selectedCell = Math.floor(Math.random() * 9) + 1;
    console.log(selectedCell);
    landed = document.getElementById(selectedCell);
    landed.style.backgroundColor = 'rgb(158, 158, 253)';
}

async function checkWord() {
    const word = document.getElementById('wordInput').value.toLowerCase();
    const pre = landed.textContent;

    if (word.startsWith(pre)) {
        const isReal = await isRealWord(word);
        if (isReal) {
            console.log("Correct");
            correctText.textContent = "Correct!";
        } else {
            console.log("Incorrect (not a real word)");
            correctText.textContent = "Incorrect, that is not a real word";
        }
    } else {
        console.log("Incorrect (doesn't start with the right letters)");
        correctText.textContent = `Incorrect, that word doesn't start with the right letters (${pre})`
    }
}

async function isRealWord(word) {
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        return res.ok;
    } catch (error) {
        return false;
    }
}

  