import React from 'react';

export default function UserList(props) {
    const {
        image,
        username,
        showStatus
    } = props;

    return (
        <div className="user">
            <img className="user__image" src={ image || '/user-profile-image.png' } alt="user avatar"/>
            <div className="user__data">
                <p className="user__name">{ username }</p>
                { showStatus && <span className="user__online-indicator">Online</span> }
            </div>
        </div>
    );
}