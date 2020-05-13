import React, { Component } from 'react';
import io from 'socket.io-client';
import {
    SOCKET_ENDPOINT,
    TOKEN_KEY
} from '../../constants';
import { Redirect } from 'react-router-dom';

import MessageList from './message-list';
import MessageForm from './message-form';
import UserList from './user-list';
import Header from '../header';

export default class Chat extends Component {

    constructor(props) {
        super(props);
        this.initialState = {
            messages: [],
            users: [],
            typingMessage: '',
            currentUser: {},
            redirect: null
        };
        this.state = this.initialState;
        this.token = localStorage.getItem(TOKEN_KEY);
        this.socket = this.configureSocket(SOCKET_ENDPOINT, this.token);
    }

    componentDidMount() {
        this.socket.emit('join');
    }

    componentWillUnmount() {
        this.socket.emit('disconnect');
    }

    configureSocket (endpoint, token) {
        const socket = io.connect(`${endpoint}?token=${token}`);

        socket.on('messages', messages => {
            this.setState({ messages });
        });

        socket.on('currentUser', currentUser => {
            this.setState({ currentUser });
        });

        socket.on('users', users => {
            this.setState({ users });
        });

        socket.on('newMessage', message => {
            clearTimeout(this.typingTimeout);
            this.setState({
                typingMessage: '',
                messages: [...this.state.messages, message]
            });
        });

        socket.on('newUser', user => {
            this.setState({
                users: [...this.state.users, user]
            });
        });

        socket.on('disconnect', user => {
            this.setState({redirect: '/login'});
        });

        socket.on('typingMessage', username => {
            if (!this.state.typingMessage) {
                this.setState({typingMessage: `${username} is typing a message...`});
                this.typingTimeout = setTimeout(() => {
                    this.setState({typingMessage: ''});
                }, 2000);
            }
        });

        return socket;
    }

    sendMessage = text => {
        this.socket.emit('newMessage', text);
    };

    showTypingMessage = () => {
        this.socket.emit('typingMessage');
    };

    logOut = () => {
        localStorage.clear();
        this.setState({redirect: '/login'});
    }

    exitChat = () => {
        localStorage.clear();
        this.socket.emit('exit');
        this.setState({redirect: '/login'});
    }

    render() {
        const {
            messages,
            users,
            typingMessage,
            currentUser,
            redirect
        } = this.state;

        const userList = users.filter(user => user.username !== currentUser.username);

        return (
            redirect ?
                <Redirect to={redirect}/>
                : <section className="chat-container">
                    <div className="chat">
                        <Header/>
                        <div className="chat-area">
                            <UserList
                                currentUser={ currentUser }
                                userList={ userList }
                                logOut = { this.logOut }
                                exitChat = { this.exitChat }
                            />
                            <div className="message-area">
                                <MessageList
                                    messageList={ messages }
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