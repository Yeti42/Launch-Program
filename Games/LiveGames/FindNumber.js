let correctNumber = 0;
let correctAnswers = 0;
let incorrect = 0;
let rolled = false;

function roll() {
    if (!rolled) {
        const number = Math.floor(Math.random() * 6) + 1;
        const text = document.getElementById("headtext");
        const dice = document.getElementById("dice");
        rolled = true;

        text.textContent = "Pick the number that matches the dice roll";
        correctNumber = number;
        console.log(correctNumber);

        switch (number) {
            case 1:
                dice.src = "../images/dice1.png";
                break;
            case 2:
                dice.src = "../images/dice2.png";
                break;
            case 3:
                dice.src = "../images/dice3.png";
                break;
            case 4:
                dice.src = "../images/dice4.png";
                break;
            case 5:
                dice.src = "../images/dice5.png";
                break;
            case 6:
                dice.src = "../images/dice6.png";
                break;
        }
    }
}

function numberPick(number) {
    if (rolled) {
        const scoreText = document.getElementById("score");
        const headText = document.getElementById("headtext");
        if (number == correctNumber) {
            correctAnswers++;
        }
        else {
            incorrect++;
        }
        scoreText.textContent = correctAnswers + " correct answers and " + incorrect + " incorrect answers";
        headText.textContent = "Click the dice to roll";
        rolled = false;
    }
}