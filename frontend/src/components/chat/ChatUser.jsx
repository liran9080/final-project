// זה הקובץ ChatUser.js - יצרתי אותו כדי להציג את השם של כל משתמש בנפרד
// מביא את הספריה של ריאקט כדי שאוכל ליצור קומפוננטה
import { useContext } from 'react';
// מחבר את קובץ העיצוב שיצרתי
import '../../css/ChatUser.css';
import AuthContext from '../../context/AuthContext';

// מגדיר את הקומפוננטה שמקבלת נתונים מבחוץ דרך props
const ChatUser = (props) => {
    const { authData } = useContext(AuthContext)

    // מחזיר את ה-HTML שיוצג למסך
    return (
        // דיב שעוטף את המשתמש בשביל ה-CSS
        <div className="chat-user-container">
            {/** שם את השם שקיבלתי בתוך תגית P כמו במשימה */}
            <div className='chat-user-names'>
                <p className="user-name">{props.name}</p>
                <button onClick={props.onClick}>הצגת שיחה</button>
            </div>


        </div>
    );
}

// מוציא את הקומפוננטה החוצה כדי שאוכל לייבא אותה לקבצים אחרים
export default ChatUser;