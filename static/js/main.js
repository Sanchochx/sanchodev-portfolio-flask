document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15
});

document.querySelectorAll('.fade-element, .fade-left, .fade-right, .separator').forEach(el => {
    observer.observe(el);
});

// ========== CHAT WIDGET ==========
(function () {
    const toggleBtn = document.getElementById('chat-toggle');
    const panel = document.getElementById('chat-panel');
    const iconOpen = document.getElementById('chat-icon-open');
    const iconClose = document.getElementById('chat-icon-close');
    const messagesEl = document.getElementById('chat-messages');
    const inputEl = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');

    if (!toggleBtn || !panel) return;

    let chatHistory = [];
    let isLoading = false;
    let isOpen = false;

    // Toggle open/close
    toggleBtn.addEventListener('click', function () {
        isOpen = !isOpen;
        panel.classList.toggle('chat-open', isOpen);
        panel.setAttribute('aria-hidden', String(!isOpen));
        toggleBtn.setAttribute('aria-expanded', String(isOpen));
        iconOpen.style.display = isOpen ? 'none' : '';
        iconClose.style.display = isOpen ? '' : 'none';
        if (isOpen) {
            if (chatHistory.length === 0) {
                appendBubble('assistant', "Hi! I'm Santiago's AI assistant. Feel free to ask me about his background, skills, or projects.");
            }
            inputEl.focus();
        }
    });

    // Send on button click
    sendBtn.addEventListener('click', sendMessage);

    // Send on Enter (Shift+Enter = newline)
    inputEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    inputEl.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    function sendMessage() {
        const text = inputEl.value.trim();
        if (!text || isLoading) return;

        inputEl.value = '';
        inputEl.style.height = 'auto';

        appendBubble('user', text);
        chatHistory.push({ role: 'user', content: text });

        const typingEl = appendTypingIndicator();
        setLoading(true);

        // history excludes last user message; Me.chat() appends it internally
        const historyToSend = chatHistory.slice(0, -1);

        fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text, history: historyToSend })
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            typingEl.remove();
            if (data.reply) {
                appendBubble('assistant', data.reply);
                chatHistory.push({ role: 'assistant', content: data.reply });
            } else {
                appendBubble('error', data.error || 'Something went wrong.');
                chatHistory.pop(); // remove failed user message
            }
        })
        .catch(function () {
            typingEl.remove();
            appendBubble('error', 'Could not reach the server. Please try again.');
            chatHistory.pop(); // remove failed user message
        })
        .finally(function () {
            setLoading(false);
        });
    }

    function appendBubble(role, text) {
        const div = document.createElement('div');
        div.className = 'chat-bubble ' + role;
        div.textContent = text;
        messagesEl.appendChild(div);
        scrollToBottom();
        return div;
    }

    function appendTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        messagesEl.appendChild(div);
        scrollToBottom();
        return div;
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function setLoading(state) {
        isLoading = state;
        sendBtn.disabled = state;
        inputEl.disabled = state;
    }
})();
