import React from 'react';
import User from '../user';

export default function UserList(props) {
    const {
        currentUser,
        userList
    } = props;

    // const filteredList = userList.filter(user => user._id != currentUser._id);
    // console.log(currentUser);

    return (
        <div className="user-list">
            <div className="current-user-section">
                <p className="user-list__text">You</p>
                <User username={ currentUser.username } showStatus={false}/>
                <button className="logout">Logout</button>
            </div>
            <div className="all-users-section">
                <p className="user-list__text user-list__text--chat-members">Chat members</p>
                    {userList.map (user => <User username={ user.username } showStatus={ user.isOnline } />)}
            </div>
        </div>
    );
}