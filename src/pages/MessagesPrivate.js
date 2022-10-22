import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useUsersStore from '../api/usersStore';
import { getMessages, sendMessage } from '../utils';

const MessagesPrivate = () => {

    const { id } = useParams();
    const [messages, setMessages] = useState({ messages: [] });
    const [currentMessage, setCurrentMessage] = useState('');
    const { uid } = useUsersStore(({ current }) => current);
    const { data } = useQuery(['messages'], getMessages.bind(null, id, uid), { refetchInterval: 500 });



    useEffect(() => {
        handleMessages();
    }, []);

    const handleMessages = async () => {
        const messages = await getMessages(id, uid);
        setMessages(messages);
    }

    const handleChange = (e) => {
        setCurrentMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            message: currentMessage,
            sender: uid,
            receiver: id,
            timestamp: Date.now(),
            unread: true
        }
        sendMessage(id, message)
            .then(() => {
                setCurrentMessage('');
                handleMessages();
            })
    }

    const { messages: messagesList } = messages

    return (
        <div className='messages-private'>
            <div className="messages-list">
                {data && data.messages.map((message, i) => (
                    <div key={i} className={`message ${message.sender === uid ? 'message--sent' : 'message--received'}`}>
                        <div className={`message__content ${message.sender == uid ? "message_right" : "message_left"}`}>{message.message}</div>
                    </div>
                ))}
            </div>
            <div className="messages-textarea">
                <form onSubmit={handleSubmit}>
                    <textarea onChange={handleChange} value={currentMessage}></textarea>
                    <button>send</button>
                </form>
            </div>
        </div>
    )
}

export default MessagesPrivate