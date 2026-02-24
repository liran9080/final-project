// זה הקובץ ChatMessage.js - הקומפוננטה שמציגה את הפרטים של הודעה בודדת
// מביא את הספריה של ריאקט
import React from 'react';
// מחבר את קובץ העיצוב של ההודעה
import '../../css/ChatMessage.css';

// יוצר קומפוננטה שמקבלת אובייקט של הודעה
const ChatMessage = (props) => {
    // שומר את ההודעה במשתנה כדי שיהיה לי קצר יותר לכתוב בהמשך
    const message = props.message;
    const loginId = props.loginId;
    const textSidecss = message.senderId == loginId ? 'flex-start' : 'flex-end'
    const readSidecss = message.senderId == loginId ? 'flex-end' : 'flex-start'
    // מחזיר את התצוגה למסך
    return (
        // עוטף את כל פרטי ההודעה
        <div className="message-container">
   
            {/**מדפיס את תוכן ההודעה עצמה */}
            <div className="message-content" style={{justifyContent: textSidecss}}>
                {/** בודק בתנאי אם ההודעה נקראה ומדפיס כן או לא בהתאם */}
                <span style={{color: message.read?'green':'red'}}>{message.read ? '✓✓' : '✓'}</span>                
                <span  style={{direction:'rtl'}}>Text: {message.text}</span>
                <span>{message.createDate.split("-").reverse().join("/")}</span>
            </div>
        </div>
    );
}

// מייצא את הקומפוננטה החוצה
export default ChatMessage;