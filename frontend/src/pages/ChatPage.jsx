// זה הקובץ Chat.js - הקומפוננטה הראשית שמאגדת את כל האפליקציה שלי
// מביא את הספריה של ריאקט
import { useState, useEffect, useContext } from "react";
// מביא את קומפוננטת הרשימה שיצרתי
import ChatUserList from '../components/chat/ChatUserList';
// מביא את קומפוננטת יצירת ההודעה שיצרתי
import CreateMessage from '../components/chat/CreateMessage';
// מביא את קומפוננטת החיפוש שיצרתי
import ChatSearch from '../components/chat/ChatSearch';
import useHttp from "../hooks/useHttp";
import AuthContext from '../context/AuthContext'
import assignmentApi from "../api/assignmentApi";
import chatApi from "../api/chatApi";
import ChatMessage from "../components/chat/ChatMessage";


import '../css/ChatPage.css'
// הקומפוננטה הראשית שמאגדת את הכל ביחד
const ChatPage = () => {
    const { authData } = useContext(AuthContext)
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);
    const { send, message, loading, isError } = useHttp();

    const loadChatUsers = async () => {
        if (!authData || !authData.user) {
            return;
        }
        if (authData.user.isProfessional) {
            const result = await send({
                func: assignmentApi.getUserByProfessionalId,
                id: authData.user.userId
            });
            if (result.ok)
                setUsers(result.data)   // rename assignmentUser to user
        } else {
            const result = await send({
                func: assignmentApi.getUserByUserId,
                id: authData.user.userId
            });
            if (result.ok)
                setUsers(result.data)   // rename assignmentprofessional to user
        }
    }
    useEffect(() => {
        loadChatUsers()
    }, [])

    const showMessages = async (otherUserid) => {
        let userId = otherUserid;
        let professionalId = authData.user.userId;
        if(!authData.user.isProfessional){
            userId = authData.user.userId;
            professionalId = otherUserid;
        }
        const result = await send({
            func: chatApi.getChat,
            data:{professionalId, userId}
        });
        if(result){
            setMessages(result.data)
        }
    }
    // יוצר מערך זמני של משתמשים כדי שיהיה לי מה להציג בבדיקה (הכנסתי את השמות שרציתי)
    const tempUsers = [
        // משתמש ראשון בשם ליאור עם הנתונים שלו
        { userId: 1, email: 'lior@mail.com', fullName: 'Lior Tamir', isAdmin: false, isProffesional: true },
        // משתמש שני בשם לירן עם הנתונים שלו
        { userId: 2, email: 'liran@mail.com', fullName: 'Liran Shifrin', isAdmin: true, isProffesional: false }
    ];
    const chats = [
        { chatId: 1, senderId: 1, receiverId: 2, createDate: '2026-02-03', text: "שלום", read: false },
        { chatId: 2, senderId: 1, receiverId: 2, createDate: '2026-02-03', text: "מה שלומך ?", read: true },
        { chatId: 3, senderId: 2, receiverId: 1, createDate: '2026-02-03', text: "טוב, תודה", read: false },
        { chatId: 4, senderId: 2, receiverId: 1, createDate: '2026-02-03', text: "Thank you", read: true },
        { chatId: 5, senderId: 1, receiverId: 2, createDate: '2026-02-03', text: "Can we talk", read: false },
        { chatId: 6, senderId: 2, receiverId: 1, createDate: '2026-02-03', text: "Yes", read: true },
    ]

    // לוקח את המשתמש הראשון מתוך המערך כדי לבדוק עליו את טופס השליחה
    const selectedUser = tempUsers[0];

    if (!authData) return;
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
                <ChatUserList users={users} showMessages={showMessages} />
                <div>
                    <div className='chat-user-messages'>
                        {
                           messages.map(chat => <ChatMessage key={chats.chatId} message={chat} loginId={authData.user.userId} />)
                        }
                    </div>
                    {/**מציג את אזור שליחת ההודעה ומעביר לו את המשתמש שבחרתי */}
                    <CreateMessage targetUser={selectedUser} />
                </div>

            </div>
        </div>
    );
}

// מייצא את הקומפוננטה הראשית כדי שהאפליקציה תוכל להציג אותה
export default ChatPage;