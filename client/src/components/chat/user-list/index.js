import React from 'react';
import User from '../user';

export default function UserList(props) {
    const {
        currentUser,
        userList,
        logOut,
        exitChat
    } = props;

    return (
        <div className="users">
            <div className="current-user">
                <p className="users__text">You</p>
                <div className="current-user__data">
                    <User username={ currentUser.username } showStatus={ false }/>
                    <button className="current-user__action current-user__action--logout" onClick={ logOut }>
                        <span className="fa fa-sign-out"></span>
                    </button>
                </div>
                <button className="current-user__action current-user__action--leave" onClick={ exitChat }>Leave chat</button>
            </div>
            <div className="all-users-section">
                <p className="users__text users__text--chat-members">Chat members</p>
                <ul className="user-list">
                    { userList.map(user =>
                        <User
                            key={ user.username }
                            username={ user.username }
                            image={user.image}
                            showStatus={ user.isOnline }
                        />
                    )}
                </ul>
            </div>
        </div>
    );
}