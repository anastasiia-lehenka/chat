import MessageList from './message-list';
import NewMessageForm from './message-form';
import React, { Component, Fragment } from 'react';
import io from 'socket.io-client';
import { ENDPOINT } from '../../constants';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: 'User1',
            messages: [
                {
                    _id: 1,
                    author: 'Some user',
                    text: 'Hello'
                },
                {
                    _id: 2,
                    author: 'User1',
                    text: 'Higbjkddddd ddddddddddf ddddgfvbmfcjgirrfh rrrrrrrrrrrrr'
                },
            ],
            typingMessage: ''
        };
        this.socket = io.connect(ENDPOINT);
        this.socket.emit('join', this.state.currentUser);
    }

    componentDidMount() {
        this.socket.on('message', message => {
            this.setState({messages: [...this.state.messages, message]});
        });
        this.socket.on('typing-message', message => {
            if (!this.state.typingMessage) {
                this.setState({typingMessage: message.text});
                setTimeout(() => {
                    this.setState({typingMessage: ''});
                }, 2000);
            }
        });
    }

    sendMessage = message => {
        this.socket.emit('message', {author: this.state.currentUser, text: message});
    };

    render() {
        const {
            messages,
            currentUser,
            typingMessage
        } = this.state;

        return (
            <Fragment>
                <MessageList
                    messageList={messages}
                    currentUser={currentUser}
                    typingMessage={typingMessage}
                />
                <NewMessageForm
                    sendMessage={this.sendMessage}
                    socket={this.socket}
                    currentUser={currentUser}
                />
            </Fragment>
        );
    }
};