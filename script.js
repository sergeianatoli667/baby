const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');

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

// Store the username for later
userInput.setAttribute('data-username', username);

// Set the placeholder initially to "CHATTING REMOVES 5 MINUTES"
userInput.placeholder = "CHATTING REMOVES 5 MINUTES"; 

// When user interacts with the input box, show the username after the blinking cursor
userInput.addEventListener('focus', function() {
    const storedUsername = userInput.getAttribute('data-username');
    userInput.value = `${storedUsername}: `; // Add the username before the message
    userInput.selectionStart = userInput.selectionEnd = userInput.value.length; // Move cursor to end
});

userInput.addEventListener('blur', function() {
    // Reset the placeholder when the user stops interacting with the input box
    if (!userInput.value) {
        userInput.placeholder = "CHATTING REMOVES 5 MINUTES";
    }
});

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const message = userInput.value.trim();
        if (message) {
            const username = userInput.getAttribute('data-username');
            addMessage(username, message);
            userInput.value = ''; // Clear input after message is sent
            userInput.placeholder = "CHATTING REMOVES 5 MINUTES"; // Reset placeholder
        }
    }
});

// Initial render
updateClockDisplay(totalSeconds);
