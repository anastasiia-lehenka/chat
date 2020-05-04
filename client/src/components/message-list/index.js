import Message from '../message';
import React from 'react';
import './styles.scss';

export default function MessageList(props) {

    return (
        <div className="message-list">
            { props.messageList.map(item =>
                <Message
                    key={item._id}
                    text={item.text}
                />
            )}
        </div>
    );
};