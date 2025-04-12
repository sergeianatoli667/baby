const chatHistory = document.getElementById('chat-history');
const userInput = document.getElementById('user-input');

function addMessage(messageContent) {
    const messageDiv = document.createElement('div');

    const messageCount = chatHistory.childElementCount;
    const messageClass = messageCount % 2 === 0 ? 'chat-message-1' : 'chat-message-2';

    messageDiv.classList.add(messageClass);
    messageDiv.textContent = messageContent;

    // Add to top
    chatHistory.prepend(messageDiv);

    // Scroll to top to show newest
    chatHistory.scrollTop = 0;
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
