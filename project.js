function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

function toggleChat() {
  const chat = document.getElementById('chat-box');
  chat.style.display = chat.style.display === 'none' ? 'block' : 'none';
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (message) {
    const chatBox = document.querySelector('#chat-box div:nth-child(2)');
    chatBox.innerHTML += <p style="color: var(--primary-color); margin-top: 0.5rem;">You: ${message}</p>;
    input.value = '';
  }
}