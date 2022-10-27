import { Camera, CameraResultType } from '@capacitor/camera';
import { useQuery } from '@tanstack/react-query';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { storage } from '../api/firebase';
import useUsersStore from '../api/usersStore';
import { queryClient } from '../layout/App';
import { getPrivateMessages, sendMessage } from '../utils';

const MessagesPrivate = () => {

    queryClient.invalidateQueries()
    const { id } = useParams();
    const [currentMessage, setCurrentMessage] = useState('');
    const { uid } = useUsersStore(({ current }) => current);
    const { data } = useQuery(['messagePrivate'], getPrivateMessages.bind(null, id, uid));

    const handleChange = (e) => {
        setCurrentMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentMessage.trim().length > 0) {
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
                }) 
                .catch((error) => {
                    console.log(error);
                })
        }
    }

    const handleCamera = async () => {
        const image = await Camera.getPhoto({
            quality: 5,
            allowEditing: true,
            width : 300,
            height : 300,
            resultType: CameraResultType.Base64,
            webUseInput: true
        });

        const imageLoc = `/images/${Math.random()}.${image.format}`;

        const uploadTask = await uploadString(ref(storage, imageLoc), image.base64String, 'base64');

        const url = await getDownloadURL(uploadTask.ref);

        const message = {
            message: url,
            sender: uid,
            receiver: id,
            timestamp: Date.now(),
            unread: true,
            image: true
        }

        sendMessage(id, message)
            .then(() => {
                setCurrentMessage('');
            })
    }

    return (
        <div className='messages-private'>
            <div className="messages-list">
                {data && data.messages.map((message, i) => (
                    <div key={i} className={`message ${message.sender === uid ? 'message--sent' : 'message--received'}`}>
                        <div className={`message__content ${message.sender == uid ? "message_right" : "message_left"}`}>
                            {message.image ? <img src={`${message.message}`} alt="" /> : message.message}
                        </div>
                    </div>
                ))}
            </div>
            <div className="messages-textarea">
                <form onSubmit={handleSubmit}>
                    <textarea onChange={handleChange} value={currentMessage}></textarea>
                    <div className="messages-actions">
                        <button onClick={handleCamera}>
                            <i className="material-icons">camera_alt</i>
                        </button>
                        <button>send</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MessagesPrivate