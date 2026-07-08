// פונקציה לפתיחה וסגירה של חלון הצ'אט בלחיצה על הבועה
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    if (chatWindow.style.display === 'none' || chatWindow.style.display === '') {
        chatWindow.style.display = 'flex';
    } else {
        chatWindow.style.display = 'none';
    }
}

// פונקציה שמציגה את טופס השארת הפרטים (Lead Form)
function showLeadForm() {
    document.getElementById('leadForm').style.display = 'flex';
}

// פונקציה שמסתיקה את טופס השארת הפרטים ומחזירה לצ'אט
function hideLeadForm() {
    document.getElementById('leadForm').style.display = 'none';
}

// פונקציה המבצעת שליחת הודעה אמיתית ל-AI בשרת
async function sendMessage() {
    const input = document.getElementById('userInput');
    const messageText = input.value.trim();
    if (messageText === '') return;

    // 1. הוספת הודעת המשתמש למסך ואיפוס השדה
    appendMessage(messageText, 'user-message');
    input.value = '';

    // 2. הוספת הודעת טעינה זמנית מהבוט ("חושב...") כדי שהגולש ידע שיש מענה
    appendMessage("חושב...", 'bot-message-loading');

    try {
        // 3. שליחת הבקשה האמיתית לשרת שלנו ב-Vercel
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: messageText })
        });

        const data = await response.json();

        // 4. הסרת הודעת הטעינה מהמסך
        removeLoadingMessage();

        // 5. הצגת התשובה החכמה שחזרה מ-OpenAI
        if (data.reply) {
            appendMessage(data.reply, 'bot-message');
        } else {
            appendMessage("אוי, משהו השתבש בקבלת התשובה. נסה שוב!", 'bot-message');
        }

    } catch (error) {
        console.error("Error communicating with AI:", error);
        removeLoadingMessage();
        appendMessage("סליחה, יש לי כרגע בעיית תקשורת. נסה שוב בעוד רגע.", 'bot-message');
    }
}

// פונקציה המאפשרת שליחת הודעה גם בלחיצה על מקש Enter במקלדת
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// פונקציה שמדפיסה פיזית את ההודעות בתוך חלון השיחה
function appendMessage(text, className) {
    const chatBody = document.getElementById('chatBody');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerText = text;
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight; // גלילה אוטומטית למטה
}

// פונקציה שמסירה את הודעת הטעינה ("חושב...") ברגע שהתשובה מגיעה
function removeLoadingMessage() {
    const loadingMessage = document.querySelector('.bot-message-loading');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// פונקציה בלחיצה על "נציג בשידור חי" - כרגע פותחת הודעה, בהמשך נחבר פה את הצאט החי
function startLiveChat() {
    alert("מתחבר לנציג דיגיטלי... (כאן נחבר בהמשך את חלון ה-Live Chat החינמי)");
}

// פונקציה המופעלת בעת שליחת טופס הפרטים
function submitForm(event) {
    event.preventDefault(); // מונע מהדף להתרענן
    
    const name = document.getElementById('userName').value;
    const phone = document.getElementById('userPhone').value;
    const message = document.getElementById('userMessage').value;

    alert(`הפרטים נשלחו בהצלחה!\nשם: ${name}\nטלפון: ${phone}\n(כאן נחבר בהמשך את האוטומציה ששולחת את זה ישירות אליך למייל/ל-CRM)`);
    
    // איפוס הטופס וחזרה לצ'אט
    document.getElementById('contactForm').reset();
    hideLeadForm();
}