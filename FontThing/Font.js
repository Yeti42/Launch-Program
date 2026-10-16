function getDayOfYear() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function applyDynamicFont() {
    const day = getDayOfYear();
    const body = document.body;
    const currentYear = new Date().getFullYear();
    const aprilFirst = new Date(currentYear, 3, 1); // Note: Months are 0-indexed (3 = April)
    const aprilFirstDayNumber = Math.floor((aprilFirst - new Date(currentYear, 0, 0)) / (1000 * 60 * 60 * 24));
    const decThirteenthDayNumber = aprilFirstDayNumber + 256;

    // Example condition: Use custom font for the first 181 days (approx. Jan - June)
    // Otherwise, leave it as the default font
    if (day === aprilFirstDayNumber) {
        body.classList.add('you_fool');
    } else if (day === decThirteenthDayNumber) {
        body.classList.add('you_fool')
    } else {
        body.classList.remove('you_fool');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    applyDynamicFont();
});