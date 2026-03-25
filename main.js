// main.js - Core functionality for NexusOS UI

document.addEventListener('DOMContentLoaded', () => {
    initSystemTime();
    initDemoTabs();
    initAIChatbot();
    initScrollAnimations();
});

function initSystemTime() {
    const timeEl = document.getElementById('system-time');
    
    function updateTime() {
        const now = new Date();
        const hrs = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        timeEl.textContent = `${hrs}:${mins}`;
    }
    
    updateTime();
    setInterval(updateTime, 10000);
}

function initDemoTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => {
                p.classList.remove('active');
                p.classList.add('hidden');
            });

            // Add active to clicked target
            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetPane = document.getElementById(targetId);
            
            if(targetPane) {
                targetPane.classList.remove('hidden');
                // Small delay to trigger CSS transition
                setTimeout(() => targetPane.classList.add('active'), 10);
            }
        });
    });
}

function initAIChatbot() {
    const toggleBtn = document.getElementById('assistant-toggle');
    const chatContainer = document.getElementById('ai-assistant');
    const closeBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const inputEl = document.getElementById('chat-input');
    const messagesEl = document.getElementById('chat-messages');

    let isChatOpen = false;

    function toggleChat() {
        isChatOpen = !isChatOpen;
        if(isChatOpen) {
            chatContainer.classList.remove('hidden');
            chatContainer.style.opacity = '1';
            chatContainer.style.transform = 'translateY(0) scale(1)';
            inputEl.focus();
        } else {
            chatContainer.style.opacity = '0';
            chatContainer.style.transform = 'translateY(20px) scale(0.95)';
            setTimeout(() => chatContainer.classList.add('hidden'), 300);
        }
    }

    toggleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    function sendMessage() {
        const text = inputEl.value.trim();
        if(!text) return;

        // User message
        const userMsg = document.createElement('div');
        userMsg.className = 'msg user-msg';
        userMsg.textContent = text;
        messagesEl.appendChild(userMsg);
        
        inputEl.value = '';
        messagesEl.scrollTop = messagesEl.scrollHeight;

        // Simulated AI response
        setTimeout(() => {
            const aiMsg = document.createElement('div');
            aiMsg.className = 'msg ai-msg typeline';
            
            const responses = [
                "Processing request...",
                "System optimized for current terrain.",
                "Route updated based on real-time traffic.",
                "Executing command sequence."
            ];
            const response = responses[Math.floor(Math.random() * responses.length)];
            
            aiMsg.textContent = response;
            messagesEl.appendChild(aiMsg);
            messagesEl.scrollTop = messagesEl.scrollHeight;
        }, 1000);
    }

    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') sendMessage();
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-panel, .tech-card, .section-header').forEach(el => {
        el.classList.add('animate-ready');
        observer.observe(el);
    });
}
