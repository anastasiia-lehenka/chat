import React from 'react';

export default function User(props) {
    const {
        user,
        currentUser,
        toggleBanUser,
        toggleMuteUser
    } = props;

    const {
        _id,
        username,
        image,
        isOnline,
        isAdmin
    } = user;

    const isCurrentUser = currentUser._id === _id;
    const muteButtonText = user.isMuted ? 'Unmute' : 'Mute';
    const banButtonText = user.isBanned ? 'Unban' : 'Ban';

    if (!currentUser.isAdmin && user.isBanned &&!isCurrentUser) {
        return null;
    }

    return (
        <div className="user">
            <div className="user-info-section">
                <img className="user__image" src={ image || '/user-profile-image.png' } alt="user avatar"/>
                <div className="user__data">
                    <p className="user__name">{ username }</p>
                    { isAdmin &&
                        <span className="user__admin-label">admin</span>
                    }
                    { !isCurrentUser && isOnline &&
                        <span className="user__online-indicator"></span>
                    }
                </div>
            </div>
            { isCurrentUser || !currentUser.isAdmin || (
                <div className="user-actions-list">
                    <button className="user-action user-action--mute" onClick={ toggleMuteUser.bind(this, _id) }>{ muteButtonText }</button>
                    <button className="user-action user-action--ban" onClick={ toggleBanUser.bind(this, _id) }>{ banButtonText }</button>
                </div>)
            }
        </div>
    );
}