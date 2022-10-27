import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import useUsersStore from '../api/usersStore';
import { queryClient } from '../layout/App';
import { getMessages } from '../utils';

const Messages = () => {

    queryClient.invalidateQueries()
    const { uid } = useUsersStore(({ current }) => current);
    const { data } = useQuery(['messages'], getMessages.bind(null, uid), { refetchInterval: 500 });

    const printId = participants => {
        let user = Object.keys(participants).filter(id => id !== uid)[0];
        return user;
    }

    return (
        <div className='messages'>
            {data && Array.isArray(data) && data.map((message,i) => (
                <Link key={i} to={`/messages/${Object.keys(message.participants).filter(id => id !== uid)[0]}`} className="messages__item-link">
                    <div key={message.id} className="messages__item">
                        <img src="/anon-avatar.png" alt="" className="messages__item-image" />
                        <div className="messages__item-info">
                            <p className="messages__item-info-title">
                                {printId(message.participants)}
                            </p>
                            <p className="messages__item-info-message">
                                {message.messages[message.messages.length - 1].message}
                            </p>
                        </div>
                    </div>
                </Link>
            ))}
        </div >
    )
}

export default Messages