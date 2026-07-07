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

// פונקציה זמנית לשליחת הודעה ע"י המשתמש בצ'אט
function sendMessage() {
    const input = document.getElementById('userInput');
    const messageText = input.value.trim();
    if (messageText === '') return;

    // הוספת הודעת המשתמש למסך
    appendMessage(messageText, 'user-message');
    input.value = '';

    // סימולציה של תגובת בוט אוטומטית (בהמשך נחבר פה את ה-AI האמיתי)
    setTimeout(() => {
        appendMessage("תודה על הודעתך! המערכת כרגע בבנייה, בקרוב אענה לך בצורה חכמה.", 'bot-message');
    }, 1000);
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