var expectedLetter = 'a';
const headText = document.getElementById("Head");
const image = document.getElementById("draggable")
var numberCorrect = 0;
var numberIncorrect = 0;
var canPark = true;
var isUserInteracting = false;

function randomLetter() {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    var randomIndex = Math.floor(Math.random() * letters.length);
    expectedLetter = letters[randomIndex];
    console.log(expectedLetter);
    randomIndex++;
    const imageID = "../images/WhereDidIPark/Car" + randomIndex + ".png";

    canPark = false;

    image.src = imageID;

    const targetCell = document.getElementById("Beans");
    const cellRect = targetCell.getBoundingClientRect();

    // Adjust image position to match the empty cell
    const offsetTop = window.scrollY + cellRect.top;
    const offsetLeft = window.scrollX + cellRect.left;

    image.style.position = "absolute";
    image.style.top = offsetTop + "px";
    image.style.left = offsetLeft + "px";

    setTimeout(() => {
        canPark = true; // Enable interaction again
        isUserInteracting = false; // Reset user interaction flag
    }, 500); // Adjust delay as needed
}

function isCorrect(letter) {
    if (isUserInteracting) return;

    isUserInteracting = true;


    if (letter == expectedLetter && canPark) {
        console.log("Correct");
        numberCorrect++;
        headText.textContent = "Correct! You have " + numberCorrect + " correct matches and " + numberIncorrect + " incorrect matches.";
        randomLetter();
    }
    else if (canPark) {
        console.log("Incorrect");
        numberIncorrect++;
        headText.textContent = "Incorrect. You have " + numberCorrect + " correct matches and " + numberIncorrect + " incorrect matches.";
        randomLetter();
    }
}

const img = document.getElementById("draggable");
let x, y, isDragging = false;

img.addEventListener("mousedown", (e) => {
    isDragging = true;
    x = e.clientX - img.offsetLeft;
    y = e.clientY - img.offsetTop;
    img.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    // Temporarily disable pointer events so elementFromPoint works
    img.style.pointerEvents = "none";

    img.style.left = (e.clientX - x) + "px";
    img.style.top = (e.clientY - y) + "px";
});

document.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    img.style.cursor = "grab";

    // Restore pointer events for the image
    img.style.pointerEvents = "auto";

    // Get the element under the cursor (the TD)
    const dropTarget = document.elementFromPoint(e.clientX, e.clientY);

    if (dropTarget && dropTarget.tagName === "TD" && dropTarget.id) {
        isCorrect(dropTarget.id);
        dropTarget.style.backgroundColor = "yellow";
        setTimeout(() => {
            dropTarget.style.backgroundColor = "";
        }, 300);
    }
});

