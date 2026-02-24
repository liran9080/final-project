// זה הקובץ ChatUser.js - יצרתי אותו כדי להציג את השם של כל משתמש בנפרד
// מביא את הספריה של ריאקט כדי שאוכל ליצור קומפוננטה
import {useContext} from 'react';
// מחבר את קובץ העיצוב שיצרתי
import '../../css/ChatUser.css';
import ChatMessage from './ChatMessage';
import AuthContext from '../../context/AuthContext';

// מגדיר את הקומפוננטה שמקבלת נתונים מבחוץ דרך props
const ChatUser = (props) => {
    const { authData } = useContext(AuthContext)
    const chats = [
        {chatId:1, senderId: 1, receiverId: 2, createDate:'2026-02-03', text:"שלום", read:false},
        {chatId:2, senderId: 1, receiverId: 2, createDate:'2026-02-03', text:"מה שלומך ?", read:true},
        {chatId:3, senderId: 2, receiverId: 1, createDate:'2026-02-03', text:"טוב, תודה", read:false},
        {chatId:4, senderId: 2, receiverId: 1, createDate:'2026-02-03', text:"Thank you", read:true},
        {chatId:5, senderId: 1, receiverId: 2, createDate:'2026-02-03', text:"Can we talk", read:false},
        {chatId:6, senderId: 2, receiverId: 1, createDate:'2026-02-03', text:"Yes", read:true},
    ]
    // מחזיר את ה-HTML שיוצג למסך
    return (
        // דיב שעוטף את המשתמש בשביל ה-CSS
        <div className="chat-user-container">
            {/** שם את השם שקיבלתי בתוך תגית P כמו במשימה */}
            <div className='chat-user-names'>
            <p className="user-name">{authData.user.fullName}</p>
            <p className="user-name">{props.name}</p>
            </div>
            
            {
                chats.map( chat => <ChatMessage key={chats.chatId} message={chat} loginId={authData.user.userId}/>)
            }
        </div>
    );
}

// מוציא את הקומפוננטה החוצה כדי שאוכל לייבא אותה לקבצים אחרים
export default ChatUser;