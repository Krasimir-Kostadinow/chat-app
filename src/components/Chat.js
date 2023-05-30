import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import "../styles/Chat.css";

export const Chat = (props) => {
    const { roomName } = props;
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMesages] = useState([]);
    const refMessages = collection(db, 'messages');

    useEffect(() => {
        const queryMessage = query(refMessages, where('roomName', '==', roomName), orderBy('createdAt'));

        onSnapshot(queryMessage, (snapshot) => {
            const messages = [];
            snapshot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id });
            })
            setMesages(messages)
        });
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newMessage === '') return;

        await addDoc(refMessages, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            roomName
        });

        setNewMessage('');
    }

    return (
        <div className="chat-app">
            <h1 className="title-room">Chat Room {roomName}</h1>
            {/* <div className="content-chat">{messages.map((message) => <h4 className="message-user" key={message.id}> {message.user}: {message.text}</h4>)}</div>
            <form className="form-chat" onSubmit={handleSubmit}>
                <input onChange={(e) => setNewMessage(e.target.value)} className="new-message-input" placeholder="Type your message here..." value={newMessage}></input>
                <button type="Submit" className="btn-send">Send</button>
            </form> */}
            <div className="chat-box">
                <div className="messages">
                    {/* <div class="msg">Kathlyn : Hey! what's up?</div>
                    <div class="msg">Kevin : Heya! Nothing much, you?</div> */}
                    {messages.map((message) => <div className="msg" key={message.id}><span className="title-msg">{message.user}: </span><p className="content-msg">{message.text}</p></div>)}
                </div>
                <div className="input-holder">
                    <form className="control" onSubmit={handleSubmit}>
                        <input onChange={(e) => setNewMessage(e.target.value)} className="chat-input" placeholder="Type your message here..." value={newMessage} type="text" />
                        <button type="Submit" className="chat-btn">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
}