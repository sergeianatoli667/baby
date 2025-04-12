const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');

// Store elements for clock updates
const yearsElem = document.getElementById('years');
const daysElem = document.getElementById('days');
const hoursElem = document.getElementById('hours');
const minutesElem = document.getElementById('minutes');
const secondsElem = document.getElementById('seconds');

let totalSeconds = (7 * 365 + 300) * 24 * 60 * 60 + 5 * 60 * 60 + 40 * 60; // Initial countdown time in seconds

// List of possible usernames
const usernames = [
    "SploinkLiberal", "ChubbyBabyGawkgawk", "SplootyDemocratic", "HairySexbomb",
    "SlovenianSquorf", "MonkeySqueefer", "RaccoonPeaceloving", "CuckSmurf",
    "LeftistSclurp", "LarryDavidSqueef"
];

function getRandomUsername() {
    const randomIndex = Math.floor(Math.random() * usernames.length);
    return usernames[randomIndex];
}

function updateClockDisplay(seconds) {
    const years = Math.floor(seconds / (365 * 24 * 60 * 60));
    seconds %= 365 * 24 * 60 * 60;

    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;

    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;

    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    yearsElem.textContent = years;
    daysElem.textContent = days;
    hoursElem.textContent = hours;
    minutesElem.textContent = minutes;
    secondsElem.textContent = secs.toString().padStart(2, '0');
}

function tick() {
    if (totalSeconds > 0) {
        totalSeconds--;
        updateClockDisplay(totalSeconds);
    }
}

// Start the clock with an interval of 1 second
setInterval(tick, 1000);

// Add message and update clock time
function addMessage(username, messageContent) {
    const messageDiv = document.createElement('div');
    const messageCount = chatHistory.childElementCount;
    const messageClass = messageCount % 2 === 0 ? 'chat-message-1' : 'chat-message-2';

    messageDiv.classList.add(messageClass);
    messageDiv.textContent = `${username}: ${messageContent}`;

    chatHistory.prepend(messageDiv);
    chatHistory.scrollTop = 0;

    // Subtract 5 minutes (300 seconds) from clock
    totalSeconds = Math.max(0, totalSeconds - 5 * 60);
    updateClockDisplay(totalSeconds);
}

// Generate and set username when the page loads
const username = getRandomUsername();

// Set the placeholder initially to "CHATTING REMOVES 5 MINUTES"
userInput.placeholder = "CHATTING REMOVES 5 MINUTES"; 

// When user interacts with the input box, show the username after the blinking cursor
userInput.addEventListener('focus', function() {
    userInput.value = `${username}: `; // Add the username before the message
    userInput.selectionStart = userInput.selectionEnd = userInput.value.length; // Move cursor to end
});

// Reset placeholder when focus is lost
userInput.addEventListener('blur', function() {
    if (!userInput.value) {
        userInput.placeholder = "CHATTING REMOVES 5 MINUTES";
    }
});

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const message = userInput.value.trim();
        if (message) {
            addMessage(username, message);
            userInput.value = ''; // Clear input after message is sent
            userInput.placeholder = "CHATTING REMOVES 5 MINUTES"; // Reset placeholder
        }
    }
});

// Initial render of the clock
updateClockDisplay(totalSeconds);
