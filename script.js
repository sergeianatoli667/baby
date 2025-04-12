const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');

let totalSeconds = (7 * 365 + 300) * 24 * 60 * 60 + 5 * 60 * 60 + 40 * 60; // Initial countdown time in seconds

function updateClockDisplay(seconds) {
    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    seconds %= 365 * 24 * 60 * 60;

    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;

    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    document.getElementById('years').textContent = years;
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = secs.toString().padStart(2, '0');
}

function tick() {
    if (totalSeconds > 0) {
        totalSeconds--;
        updateClockDisplay(totalSeconds);
    }
}

setInterval(tick, 1000); // Update clock every second

function addMessage(messageContent) {
    const messageDiv = document.createElement('div');

    const messageCount = chatHistory.childElementCount;
    const messageClass = messageCount % 2 === 0 ? 'chat-message-1' : 'chat-message-2';

    messageDiv.classList.add(messageClass);
    messageDiv.textContent = messageContent;

    chatHistory.prepend(messageDiv);
    chatHistory.scrollTop = 0;

    // Subtract 30 seconds from clock
    totalSeconds = Math.max(0, totalSeconds - 30);
    updateClockDisplay(totalSeconds);
}

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message);
            userInput.value = '';
        }
    }
});

// Initial render
updateClockDisplay(totalSeconds);
