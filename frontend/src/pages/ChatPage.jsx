// זה הקובץ Chat.js - הקומפוננטה הראשית שמאגדת את כל האפליקציה שלי
// מביא את הספריה של ריאקט
import React from 'react';
// מביא את קומפוננטת הרשימה שיצרתי
import ChatList from '../components/chat/ChatList';
// מביא את קומפוננטת יצירת ההודעה שיצרתי
import CreateMessage from '../components/chat/CreateMessage';
// מביא את קומפוננטת החיפוש שיצרתי
import ChatSearch from '../components/chat/ChatSearch';

// הקומפוננטה הראשית שמאגדת את הכל ביחד
const ChatPage = () => {
    // יוצר מערך זמני של משתמשים כדי שיהיה לי מה להציג בבדיקה (הכנסתי את השמות שרציתי)
    const tempUsers = [
        // משתמש ראשון בשם ליאור עם הנתונים שלו
        { userId: 1, email: 'lior@mail.com', fullName: 'Lior Tamir', isAdmin: false, isProffesional: true },
        // משתמש שני בשם לירן עם הנתונים שלו
        { userId: 2, email: 'liran@mail.com', fullName: 'Liran Shifrin', isAdmin: true, isProffesional: false }
    ];
    

    // לוקח את המשתמש הראשון מתוך המערך כדי לבדוק עליו את טופס השליחה
    const selectedUser = tempUsers[0];

    // מחזיר את כל המסך הראשי של הצ'אט
    return (
        
        <div className="main-chat-page"> {/* הדיב שעוטף את כל העמוד */}
            {/*כותרת ראשית של העמוד*/}
            <h1>Chat System</h1>
            {/** שם למעלה את הקומפוננטה של החיפוש */}
            <ChatSearch />
            {/* קו מפריד בין החיפוש לשאר העמוד */}
            <hr />
            {/* עוטף את החלק התחתון של הצ'אט */}
            <div className="chat-content">
                {/** מציג את רשימת המשתמשים ומעביר לה את המערך שיצרתי */}
                <ChatList users={tempUsers} />
                {/**מציג את אזור שליחת ההודעה ומעביר לו את המשתמש שבחרתי */}
                <CreateMessage targetUser={selectedUser} />
            </div>
        </div>
    );
}

// מייצא את הקומפוננטה הראשית כדי שהאפליקציה תוכל להציג אותה
export default ChatPage;