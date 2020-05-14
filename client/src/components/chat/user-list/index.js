import React from 'react';
import User from '../user';

export default function UserList(props) {
    const {
        currentUser,
        userList,
        logOut,
        deleteAccount,
        isVisible,
        toggleBanUser,
        toggleMuteUser
    } = props;

    const classnames = isVisible ? "users users--toggle-menu" : "users";

    return (
        <div className={classnames}>
            <div className="current-user">
                <p className="users__text">You</p>
                <div className="current-user__data">
                    <User
                        user={ currentUser }
                        currentUser={ currentUser }
                    />
                    <button className="user-action user-action--logout" onClick={ logOut }>
                        <span className="fa fa-sign-out"></span>
                    </button>
                </div>
                <button className="user-action user-action--delete" onClick={ deleteAccount }>Delete account</button>
            </div>
            <div className="all-users-section">
                <p className="users__text users__text--chat-members">Chat members</p>
                <ul className="user-list">
                    { userList.map(user =>
                        <User
                            key={ user._id }
                            currentUser={ currentUser }
                            user={ user }
                            toggleBanUser={ toggleBanUser }
                            toggleMuteUser={ toggleMuteUser }
                        />
                    )}
                </ul>
            </div>
        </div>
    );
}