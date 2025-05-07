var expectedLetter = 'a';
const headText = document.getElementById("Head");

function isCorrect(letter) {
    if (letter == expectedLetter) {
        console.log("Correct");
        headText.textContent = "Correct!";
    }
    else {
        console.log("Incorrect");
        headText.textContent = "Incorrect";
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

