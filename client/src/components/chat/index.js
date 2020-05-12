import React, { Component } from 'react';
import io from 'socket.io-client';
import { SOCKET_ENDPOINT } from '../../constants';
import { Redirect } from 'react-router-dom';

import MessageList from './message-list';
import MessageForm from './message-form';
import UserList from './user-list';
import Header from '../header';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            users: [],
            typingMessage: ''
        };
        this.token = localStorage.getItem('token');
    }

    componentDidMount() {
        this.socket = io.connect(`${SOCKET_ENDPOINT}?token=${this.token}`);
        this.socket.emit('join');

        this.socket.on('messages', messages => {
            this.setState({ messages });
        });

        this.socket.on('currentUser', currentUser => {
            console.log(currentUser);
            this.setState({ currentUser });
        });

        this.socket.on('users', users => {
            this.setState({ users });
        });

        this.socket.on('newMessage', message => {
            clearTimeout(this.typingTimeout);
            this.setState({
                typingMessage: '',
                messages: [...this.state.messages, message]
            });
        });

        this.socket.on('newUser', user => {
            this.setState({
                users: [...this.state.users, user]
            });
        });

        this.socket.on('typingMessage', message => {
            if (!this.state.typingMessage) {
                this.setState({typingMessage: message.text});
                this.typingTimeout = setTimeout(() => {
                    this.setState({typingMessage: ''});
                }, 2000);
            }
        });
    }

    sendMessage = text => {
        this.socket.emit('newMessage', text);
    };

    showTypingMessage = () => {
        this.socket.emit('typingMessage');
    };

    render() {
        const {
            messages,
            users,
            typingMessage,
            currentUser
        } = this.state;

        return (
            !this.token
                ? <Redirect to="/login"/>
                : <section className="chat-container">
                    <div className="chat">
                        <Header/>
                        <div className="chat-area">
                            <UserList
                                currentUser={ currentUser }
                                userList={users}
                            />
                            <div className="message-area">
                                <MessageList
                                    messageList={messages}
                                    currentUser={ currentUser }
                                    typingMessage={ typingMessage }
                                />
                                <MessageForm
                                    sendMessage={ this.sendMessage }
                                    showTypingMessage={ this.showTypingMessage }
                                />
                            </div>
                        </div>
                    </div>
                </section>
        );
    }
};