import React, {Component} from 'react';
import './app.scss';
import MessageList from './components/message-list'
import NewMessageForm from './components/message-form';
import io from 'socket.io-client';
import {
    ENDPOINT
} from './constants';

export default class App extends Component {
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
                }
            ]
        };
        this.socket = io.connect(ENDPOINT);
        this.socket.emit('join', this.state.currentUser)
    }

    componentDidMount() {
        this.socket.on('message', message => {
            this.setState({messages: [...this.state.messages, message]});
        });
    }

    componentWillUnmount() {
        this.socket.emit('disconnect');
        this.socket.off();
    }

    sendMessage = message => {
        this.socket.emit('message', {author: this.state.currentUser, text: message});
    };

    render() {
        const {
            messages,
            currentUser
        } = this.state;

        return (
            <div className="App">
                <MessageList messageList = { messages } currentUser = { currentUser }/>
                <NewMessageForm sendMessage = { this.sendMessage }/>
            </div>
        );
    }
}
