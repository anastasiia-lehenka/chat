import React from 'react';
import './styles.scss';

export default function Message(props) {
    return (
        <div className="message-container">
            <div className="message-text">
                { props.username }
                { props.text }
            </div>
            <img className="user-image" src={ props.img || 'user-profile-image.png' } alt="User's profile picture"/>
        </div>
    );
}
