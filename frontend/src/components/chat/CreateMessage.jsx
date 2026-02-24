// זה הקובץ CreateMessage.js - יצרתי אותו כדי שיהיה אפשר לשלוח הודעה למשתמש
// מביא את הספריה של ריאקט
import React from 'react';

// יוצר קומפוננטה שמקבלת את המשתמש שאני שולח לו הודעה
const CreateMessage = (props) => {
    // שומר את המשתמש במשתנה שיהיה לי נוח לעבוד איתו
    const targetUser = props.targetUser;

    // מחזיר את ה-HTML של אזור השליחה
    return (
        // עוטף את הטופס של יצירת ההודעה
        <div className="create-message-area">
            // מציג כותרת עם השם המלא של המשתמש שאני שולח לו
            <h3>Send message to: {targetUser.fullName}</h3>
            // שדה טקסט כדי להקליד בו את ההודעה
            <input type="text" placeholder="Type a message..." />
            // כפתור לשליחת ההודעה
            <button>Send</button>
        </div>
    );
}

// מייצא כדי שיהיה אפשר להציג את זה במסך הראשי
export default CreateMessage;