// זה הקובץ ChatList.js - זו הרשימה שמציגה את כל המשתמשים ביחד
// מביא את הספריה של ריאקט
import React from 'react';
// מביא את הקומפוננטה של המשתמש הבודד שיצרתי קודם
import ChatUser from './ChatUser';
// מחבר את קובץ העיצוב של הרשימה
import '../../css/ChatList.css';

// מגדיר קומפוננטה שמקבלת את רשימת המשתמשים
const ChatList = (props) => {
    // מחזיר את התצוגה של הרשימה למסך
    return (
        
        <div className="chat-list"> {/** עוטף את כל הרשימה בדיב */}
            {/** עובר על מערך המשתמשים אחד אחד עם לולאת map */}
            {props.users.map((user) => {
                {/** מדפיס את הקומפוננטה של המשתמש עם השם שלו ומפתח ייחודי */}
                return <ChatUser key={user.userId} name={user.fullName} />;
            })}
        </div>
    );
}

// מאפשר לקבצים אחרים להשתמש ברשימה הזו
export default ChatList;