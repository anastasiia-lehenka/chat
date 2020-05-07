import MessageList from './message-list';
import NewMessageForm from './message-form';
import React, { Component } from 'react';
import io from 'socket.io-client';
import {SOCKET_ENDPOINT} from '../../constants';
import queryString from 'query-string';

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.currentUser = queryString.parse(this.props.location.search).username;
        this.socket = io.connect(SOCKET_ENDPOINT);
        this.socket.emit('join', this.currentUser);
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
        this.socket.emit('message', message);
    };

    render() {
        const {
            messages,
            typingMessage
        } = this.state;

        return (
            <section className="chat-container">
                <div className="chat">
                    <MessageList
                        messageList={messages}
                        currentUser={this.currentUser}
                        typingMessage={typingMessage}
                    />
                    <NewMessageForm
                        sendMessage={this.sendMessage}
                        socket={this.socket}
                        currentUser={this.currentUser}
                    />
                </div>
            </section>
        );
    }
};