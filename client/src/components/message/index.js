import React from 'react';
import './styles.scss';

export default function Message(props) {
    const {
        img,
        author,
        text,
        currentUser
    } = props;

    const isFromCurrentUser = author === currentUser;
    const isSystemMessage = author === 'ADMIN';
    const classes = isFromCurrentUser ? "message-container message-container--from-current-user" : "message-container";

    return (
        (isSystemMessage ? <p className="system-message">{ text }</p> :
        <div className={classes}>
            {isFromCurrentUser ||
            <img className="user-image" src={img || 'user-profile-image.png'} alt="user avatar"/>
            }
            <div className="message">
                {isFromCurrentUser ||
                <p className="message__username">{author}</p>
                }
                <p className="message__text">{text}</p>
            </div>
        </div>
        )
    );
}
