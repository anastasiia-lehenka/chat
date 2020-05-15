import React from 'react';
import { formatDate } from '../../../helpers';

export default function Message(props) {
    const {
        img,
        currentUser,
        message,
        userList
    } = props;

    const {
        author,
        text,
        date,
    } = message;


    const isFromCurrentUser = author === currentUser.username;
    const isSystemMessage = author === 'SYSTEM';
    const messageContainerClasses = isFromCurrentUser ? "message-container message-container--from-current-user" : "message-container";
    const user = userList.find(user => user.username === author);
    const usernameClasses = user ? `message__username message__username--${user.color}` : 'message__username';
    const formattedDate = formatDate(new Date(date));

    return (
        (isSystemMessage ? <p className="system-message">{ text }</p> :
        <div className={messageContainerClasses}>
            {isFromCurrentUser ||
            <img className="user-image" src={img || '/user-profile-image.png'} alt="user avatar"/>
            }
            <div className="message">
                {isFromCurrentUser ||
                <p className={usernameClasses}>{author}</p>
                }
                <p className="message__text">{text}</p>
                <p className="message__date">{formattedDate}</p>
            </div>
        </div>
        )
    );
}
