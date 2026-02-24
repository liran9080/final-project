// זה הקובץ ChatSearch.js - שורת החיפוש של הצ'אט
// מביא את הספריה של ריאקט
import React from 'react';

// קומפוננטה לחיפוש שלא מקבלת נתונים מבחוץ בינתיים
const ChatSearch = () => {
    // מחזיר את התצוגה של שורת החיפוש
    return (
        // עוטף את אזור החיפוש
        <div className="search-bar">
            {/** טקסט פשוט שכתוב עליו חיפוש */}
            <span>Search: </span>
            {/**שדה שאפשר להקליד בו את החיפוש */}
            <input type="text" />
            {/** כפתור כדי להפעיל את החיפוש */}
            <button>Search</button>
        </div>
    );
}

// מוציא את זה החוצה לשימוש בשאר האפליקציה
export default ChatSearch;