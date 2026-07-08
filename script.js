// מחברת הזיכרון של הצ'אט - כאן יישמרו כל ההודעות מההתחלה ללא הגבלה
let chatHistory = [];

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

function showLeadForm() {
    document.getElementById('leadForm').style.display = 'flex';
}

function hideLeadForm() {
    document.getElementById('leadForm').style.display = 'none';
}

async function sendMessage() {
    const input = document.getElementById('userInput');
    const messageText = input.value.trim();
    if (messageText === '') return;

    // 1. מציגים את הודעת המשתמש על המסך ומאפסים את התיבה
    appendMessage(messageText, 'user-message');
    input.value = '';

    // 2. שומרים את ההודעה החדשה של המשתמש בתוך מחברת הזיכרון
    chatHistory.push({ role: 'user', content: messageText });

    // 3. מציגים הודעת טעינה ("חושב...")
    appendMessage("חושב...", 'bot-message-loading');

    try {
        // 4. שולחים את כל היסטוריית השיחה המלאה לשרת שלנו
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ messages: chatHistory })
        });

        const data = await response.json();
        removeLoadingMessage();

        if (data.reply) {
            // 5. מציגים את תשובת הבוט החכמה על המסך
            appendMessage(data.reply, 'bot-message');
            
            // 6. שומרים גם את תשובת הבוט בתוך מחברת הזיכרון לשימוש בהודעה הבאה
            chatHistory.push({ role: 'assistant', content: data.reply });
        } else {
            appendMessage("אוי, משהו השתבש בקבלת התשובה. נסה שוב!", 'bot-message');
        }

    } catch (error) {
        console.error("Error communicating with AI:", error);
        removeLoadingMessage();
        appendMessage("סליחה, יש לי כרגע בעיית תקשורת. נסה שוב בעוד רגע.", 'bot-message');
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function appendMessage(text, className) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerText = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

function removeLoadingMessage() {
    const loadingMessage = document.querySelector('.bot-message-loading');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

function startLiveChat() {
    alert("מתחבר לנציג דיגיטלי...");
}

function submitForm(event) {
    event.preventDefault();
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    alert(`הפרטים נשלחו בהצלחה!\nשם: ${name}\nטלפון: ${phone}`);
    document.getElementById('contactForm').reset();
    hideLeadForm();
}